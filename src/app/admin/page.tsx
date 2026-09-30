// src/app/admin/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5001";

type Project = {
  id: number;
  name_fr: string;
  name_en: string;
  description_fr: string;
  description_en: string;
  stack: string[];
  link: string;
  order_index: number;
};

type Skill = {
  id: number;
  name: string;
  level: number;
  tooltip_fr: string;
  tooltip_en: string;
  order_index: number;
};

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState<"projects" | "skills">("projects");

  // Données
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Formulaire projet
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
  const [projectForm, setProjectForm] = useState({
    name_fr: "",
    name_en: "",
    description_fr: "",
    description_en: "",
    stack: "",
    link: "#",
    order_index: 0,
  });

  // Formulaire compétence
  const [editingSkillId, setEditingSkillId] = useState<number | null>(null);
  const [skillForm, setSkillForm] = useState({
    name: "",
    level: 70,
    tooltip_fr: "",
    tooltip_en: "",
    order_index: 0,
  });

  useEffect(() => {
    const savedToken = localStorage.getItem("portfolio_admin_token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      loadData();
    }
  }, [token]);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 4000);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [resProj, resSkills] = await Promise.all([
        fetch(`${API_URL}/api/projects`),
        fetch(`${API_URL}/api/skills`),
      ]);

      if (resProj.ok) {
        const pData = await resProj.json();
        setProjects(pData);
      }
      if (resSkills.ok) {
        const sData = await resSkills.json();
        setSkills(sData);
      }
    } catch {
      showToast("Impossible de joindre le serveur backend Flask", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (res.ok && data.token) {
        setToken(data.token);
        localStorage.setItem("portfolio_admin_token", data.token);
        setPassword("");
      } else {
        setAuthError(data.error || "Mot de passe incorrect");
      }
    } catch {
      setAuthError("Erreur de connexion avec l API Flask");
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("portfolio_admin_token");
  };

  const resetProjectForm = () => {
    setEditingProjectId(null);
    setProjectForm({
      name_fr: "",
      name_en: "",
      description_fr: "",
      description_en: "",
      stack: "",
      link: "#",
      order_index: projects.length + 1,
    });
  };

  const handleEditProject = (proj: Project) => {
    setEditingProjectId(proj.id);
    setProjectForm({
      name_fr: proj.name_fr,
      name_en: proj.name_en,
      description_fr: proj.description_fr,
      description_en: proj.description_en,
      stack: proj.stack.join(", "),
      link: proj.link,
      order_index: proj.order_index,
    });
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name_fr: projectForm.name_fr,
      name_en: projectForm.name_en,
      description_fr: projectForm.description_fr,
      description_en: projectForm.description_en,
      stack: projectForm.stack.split(",").map((s) => s.trim()).filter(Boolean),
      link: projectForm.link || "#",
      order_index: Number(projectForm.order_index) || 0,
    };

    try {
      const url = editingProjectId
        ? `${API_URL}/api/projects/${editingProjectId}`
        : `${API_URL}/api/projects`;
      const method = editingProjectId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        showToast(editingProjectId ? "Projet mis à jour avec succès !" : "Nouveau projet ajouté !");
        resetProjectForm();
        loadData();
      } else {
        const err = await res.json();
        showToast(err.error || "Erreur lors de la sauvegarde", "error");
      }
    } catch {
      showToast("Erreur de connexion", "error");
    }
  };

  const handleDeleteProject = async (id: number, name: string) => {
    if (!confirm(`Supprimer le projet "${name}" ?`)) return;

    try {
      const res = await fetch(`${API_URL}/api/projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        showToast("Projet supprimé !");
        loadData();
      } else {
        showToast("Erreur lors de la suppression", "error");
      }
    } catch {
      showToast("Erreur réseau", "error");
    }
  };

  const resetSkillForm = () => {
    setEditingSkillId(null);
    setSkillForm({
      name: "",
      level: 70,
      tooltip_fr: "",
      tooltip_en: "",
      order_index: skills.length + 1,
    });
  };

  const handleEditSkill = (s: Skill) => {
    setEditingSkillId(s.id);
    setSkillForm({
      name: s.name,
      level: s.level,
      tooltip_fr: s.tooltip_fr || "",
      tooltip_en: s.tooltip_en || "",
      order_index: s.order_index,
    });
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: skillForm.name,
      level: Number(skillForm.level),
      tooltip_fr: skillForm.tooltip_fr,
      tooltip_en: skillForm.tooltip_en,
      order_index: Number(skillForm.order_index) || 0,
    };

    try {
      const url = editingSkillId
        ? `${API_URL}/api/skills/${editingSkillId}`
        : `${API_URL}/api/skills`;
      const method = editingSkillId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        showToast(editingSkillId ? "Compétence mise à jour !" : "Compétence ajoutée !");
        resetSkillForm();
        loadData();
      } else {
        const err = await res.json();
        showToast(err.error || "Erreur de sauvegarde", "error");
      }
    } catch {
      showToast("Erreur réseau", "error");
    }
  };

  const handleDeleteSkill = async (id: number, name: string) => {
    if (!confirm(`Supprimer la compétence "${name}" ?`)) return;

    try {
      const res = await fetch(`${API_URL}/api/skills/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        showToast("Compétence supprimée !");
        loadData();
      } else {
        showToast("Erreur lors de la suppression", "error");
      }
    } catch {
      showToast("Erreur réseau", "error");
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4">
        <div className="w-full max-w-md p-8 rounded-2xl bg-[var(--muted)] shadow-2xl border border-[var(--primary)]/30">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[var(--accent)]">Espace Administration</h1>
            <p className="text-gray-400 text-sm mt-2">Gère tes projets et compétences sans coder</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Mot de passe administrateur
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez votre mot de passe"
                className="w-full px-4 py-3 rounded-xl bg-[var(--background)] text-white border border-gray-700 focus:outline-none focus:border-[var(--accent)]"
                required
              />
            </div>

            {authError && (
              <p className="text-red-400 text-sm text-center bg-red-900/30 p-2 rounded-lg">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[var(--primary)] hover:bg-[var(--accent)] hover:text-black font-semibold transition"
            >
              Se connecter
            </button>

            <div className="text-center pt-2">
              <Link href="/fr" className="text-sm text-gray-400 hover:text-[var(--accent)]">
                ← Retour au portfolio
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-white p-6 md:p-12">
      {message && (
        <div
          className={`fixed bottom-6 right-6 px-6 py-3 rounded-xl shadow-2xl z-50 transition-all font-medium ${
            message.type === "success" ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b border-gray-800">
        <div>
          <h1 className="text-3xl font-bold text-[var(--accent)]">Espace Administration</h1>
          <p className="text-gray-400 text-sm mt-1">
            Modifications en direct synchronisées avec Supabase
          </p>
        </div>

        <div className="flex gap-4">
          <Link
            href="/fr"
            className="px-4 py-2 rounded-xl border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-black transition text-sm"
          >
            Voir le portfolio
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-red-600/80 hover:bg-red-600 transition text-sm"
          >
            Déconnexion
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mb-8 flex gap-4">
        <button
          onClick={() => setActiveTab("projects")}
          className={`px-6 py-3 rounded-xl font-semibold transition ${
            activeTab === "projects"
              ? "bg-[var(--accent)] text-black"
              : "bg-[var(--muted)] text-gray-300 hover:text-white"
          }`}
        >
          📁 Projets ({projects.length})
        </button>
        <button
          onClick={() => setActiveTab("skills")}
          className={`px-6 py-3 rounded-xl font-semibold transition ${
            activeTab === "skills"
              ? "bg-[var(--accent)] text-black"
              : "bg-[var(--muted)] text-gray-300 hover:text-white"
          }`}
        >
          ⚡ Compétences ({skills.length})
        </button>
      </div>

      <div className="max-w-6xl mx-auto">
        {activeTab === "projects" && (
          <div className="space-y-12">
            <div className="p-6 md:p-8 rounded-2xl bg-[var(--muted)] border border-gray-800 shadow-xl">
              <h2 className="text-xl font-bold mb-6 text-[var(--accent)]">
                {editingProjectId ? "✏️ Modifier le projet" : "➕ Ajouter un nouveau projet"}
              </h2>

              <form onSubmit={handleSaveProject} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                      Nom du projet (Français)
                    </label>
                    <input
                      type="text"
                      value={projectForm.name_fr}
                      onChange={(e) => setProjectForm({ ...projectForm, name_fr: e.target.value })}
                      placeholder="Ex: Analyseur de CV"
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--background)] border border-gray-700 text-white focus:outline-none focus:border-[var(--accent)]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                      Nom du projet (Anglais)
                    </label>
                    <input
                      type="text"
                      value={projectForm.name_en}
                      onChange={(e) => setProjectForm({ ...projectForm, name_en: e.target.value })}
                      placeholder="Ex: Resume Analyzer"
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--background)] border border-gray-700 text-white focus:outline-none focus:border-[var(--accent)]"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                      Description (Français)
                    </label>
                    <textarea
                      rows={3}
                      value={projectForm.description_fr}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, description_fr: e.target.value })
                      }
                      placeholder="Description détaillée du projet en français..."
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--background)] border border-gray-700 text-white focus:outline-none focus:border-[var(--accent)]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                      Description (Anglais)
                    </label>
                    <textarea
                      rows={3}
                      value={projectForm.description_en}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, description_en: e.target.value })
                      }
                      placeholder="Detailed project description in English..."
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--background)] border border-gray-700 text-white focus:outline-none focus:border-[var(--accent)]"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                      Technologies (séparées par une virgule)
                    </label>
                    <input
                      type="text"
                      value={projectForm.stack}
                      onChange={(e) => setProjectForm({ ...projectForm, stack: e.target.value })}
                      placeholder="Next.js, Python, Tailwind"
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--background)] border border-gray-700 text-white focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                      Lien du projet (URL ou #)
                    </label>
                    <input
                      type="text"
                      value={projectForm.link}
                      onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })}
                      placeholder="https://github.com/..."
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--background)] border border-gray-700 text-white focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                      Ordre d affichage (1, 2, 3...)
                    </label>
                    <input
                      type="number"
                      value={projectForm.order_index}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, order_index: Number(e.target.value) })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--background)] border border-gray-700 text-white focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--accent)] hover:text-black font-semibold transition"
                  >
                    {editingProjectId ? "Sauvegarder les modifications" : "Ajouter le projet"}
                  </button>
                  {editingProjectId && (
                    <button
                      type="button"
                      onClick={resetProjectForm}
                      className="px-6 py-2.5 rounded-xl bg-gray-700 hover:bg-gray-600 transition"
                    >
                      Annuler
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Projets en ligne ({projects.length})</h2>
              {loading && <p className="text-gray-400">Chargement...</p>}

              <div className="grid gap-4">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-5 rounded-xl bg-[var(--muted)] border border-gray-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-[var(--primary)] transition"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="text-xs px-2 py-0.5 rounded bg-[var(--primary)] text-white">
                          #{proj.order_index}
                        </span>
                        <h3 className="font-bold text-lg text-white">
                          {proj.name_fr}{" "}
                          <span className="text-gray-400 text-sm font-normal">
                            ({proj.name_en})
                          </span>
                        </h3>
                      </div>
                      <p className="text-sm text-gray-300 max-w-2xl">{proj.description_fr}</p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {proj.stack.map((s) => (
                          <span
                            key={s}
                            className="px-2 py-0.5 rounded bg-[var(--background)] text-xs text-[var(--accent)]"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 self-end md:self-center">
                      <button
                        onClick={() => handleEditProject(proj)}
                        className="px-4 py-2 rounded-lg bg-[var(--primary)] hover:bg-[var(--accent)] hover:text-black text-sm font-medium transition"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDeleteProject(proj.id, proj.name_fr)}
                        className="px-4 py-2 rounded-lg bg-red-600/80 hover:bg-red-600 text-sm font-medium transition"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "skills" && (
          <div className="space-y-12">
            <div className="p-6 md:p-8 rounded-2xl bg-[var(--muted)] border border-gray-800 shadow-xl">
              <h2 className="text-xl font-bold mb-6 text-[var(--accent)]">
                {editingSkillId ? "✏️ Modifier la compétence" : "➕ Ajouter une nouvelle compétence"}
              </h2>

              <form onSubmit={handleSaveSkill} className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                      Nom de la compétence
                    </label>
                    <input
                      type="text"
                      value={skillForm.name}
                      onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                      placeholder="Ex: FastAPI, Docker, PyTorch"
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--background)] border border-gray-700 text-white focus:outline-none focus:border-[var(--accent)]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                      Niveau de maîtrise ({skillForm.level}%)
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={skillForm.level}
                        onChange={(e) =>
                          setSkillForm({ ...skillForm, level: Number(e.target.value) })
                        }
                        className="w-full accent-[var(--accent)]"
                      />
                      <span className="font-bold text-[var(--accent)] w-12 text-right">
                        {skillForm.level}%
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                      Ordre d affichage (1, 2, 3...)
                    </label>
                    <input
                      type="number"
                      value={skillForm.order_index}
                      onChange={(e) =>
                        setSkillForm({ ...skillForm, order_index: Number(e.target.value) })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--background)] border border-gray-700 text-white focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                      Description / Infobulle (Français)
                    </label>
                    <input
                      type="text"
                      value={skillForm.tooltip_fr}
                      onChange={(e) => setSkillForm({ ...skillForm, tooltip_fr: e.target.value })}
                      placeholder="Ex: Framework moderne pour APIs rapides"
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--background)] border border-gray-700 text-white focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                      Description / Infobulle (Anglais)
                    </label>
                    <input
                      type="text"
                      value={skillForm.tooltip_en}
                      onChange={(e) => setSkillForm({ ...skillForm, tooltip_en: e.target.value })}
                      placeholder="Ex: Modern framework for fast APIs"
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--background)] border border-gray-700 text-white focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--accent)] hover:text-black font-semibold transition"
                  >
                    {editingSkillId ? "Sauvegarder les modifications" : "Ajouter la compétence"}
                  </button>
                  {editingSkillId && (
                    <button
                      type="button"
                      onClick={resetSkillForm}
                      className="px-6 py-2.5 rounded-xl bg-gray-700 hover:bg-gray-600 transition"
                    >
                      Annuler
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Compétences enregistrées ({skills.length})</h2>
              {loading && <p className="text-gray-400">Chargement...</p>}

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="p-4 rounded-xl bg-[var(--muted)] border border-gray-800 flex flex-col justify-between hover:border-[var(--primary)] transition"
                  >
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-white text-base">{skill.name}</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-[var(--accent)] text-black font-semibold">
                          {skill.level}%
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mb-4 line-clamp-2">
                        {skill.tooltip_fr || "Aucune description"}
                      </p>
                    </div>

                    <div className="flex gap-2 justify-end pt-2 border-t border-gray-800">
                      <button
                        onClick={() => handleEditSkill(skill)}
                        className="px-3 py-1 rounded bg-[var(--primary)] hover:bg-[var(--accent)] hover:text-black text-xs font-medium transition"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDeleteSkill(skill.id, skill.name)}
                        className="px-3 py-1 rounded bg-red-600/80 hover:bg-red-600 text-xs font-medium transition"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
