"use client";
import { useState, useEffect } from "react";
import { z } from "zod";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5001";

// ─── Types ────────────────────────────────────────────────────────────────────
type Project = { id: number; name_fr: string; name_en: string; description_fr: string; description_en: string; stack: string[]; link: string; order_index: number };
type Skill   = { id: number; name: string; level: number; tooltip_fr: string; tooltip_en: string; order_index: number };
type Service = {
  id: number;
  title_fr: string;
  title_en: string;
  description_fr: string;
  description_en: string;
  text_fr?: string;
  text_en?: string;
  order_index: number;
};
type Content = Record<string, { value_fr: string; value_en: string }>;

const emptyProject = (): Omit<Project,"id"> => ({ name_fr:"", name_en:"", description_fr:"", description_en:"", stack:[], link:"#", order_index:0 });
const emptySkill   = (): Omit<Skill,"id">   => ({ name:"", level:50, tooltip_fr:"", tooltip_en:"", order_index:0 });
const emptyService = (): Omit<Service, "id"> => ({
  title_fr: "",
  title_en: "",
  description_fr: "",
  description_en: "",
  text_fr: "",
  text_en: "",
  order_index: 0,
});

// ─── Helpers Services parsing & payload ──────────────────────────────────────
const parseRawService = (s: any): Service => {
  let title_fr = s.title_fr || "";
  let description_fr = s.description_fr || "";
  let title_en = s.title_en || "";
  let description_en = s.description_en || "";

  if (s.text_fr && (!title_fr || !description_fr)) {
    if (s.text_fr.includes("\n---\n")) {
      const [t, ...d] = s.text_fr.split("\n---\n");
      title_fr = title_fr || t.trim();
      description_fr = description_fr || d.join("\n---\n").trim();
    } else if (s.text_fr.includes(" ::: ")) {
      const [t, ...d] = s.text_fr.split(" ::: ");
      title_fr = title_fr || t.trim();
      description_fr = description_fr || d.join(" ::: ").trim();
    } else {
      title_fr = title_fr || s.text_fr.trim();
    }
  }

  if (s.text_en && (!title_en || !description_en)) {
    if (s.text_en.includes("\n---\n")) {
      const [t, ...d] = s.text_en.split("\n---\n");
      title_en = title_en || t.trim();
      description_en = description_en || d.join("\n---\n").trim();
    } else if (s.text_en.includes(" ::: ")) {
      const [t, ...d] = s.text_en.split(" ::: ");
      title_en = title_en || t.trim();
      description_en = description_en || d.join(" ::: ").trim();
    } else {
      title_en = title_en || s.text_en.trim();
    }
  }

  return {
    id: s.id,
    title_fr,
    title_en,
    description_fr,
    description_en,
    text_fr: s.text_fr,
    text_en: s.text_en,
    order_index: s.order_index ?? 0,
  };
};

const formatServicePayload = (s: Omit<Service, "id"> | Service) => {
  const t_fr = (s.title_fr || "").trim();
  const d_fr = (s.description_fr || "").trim();
  const t_en = (s.title_en || "").trim();
  const d_en = (s.description_en || "").trim();

  const text_fr = d_fr ? `${t_fr}\n---\n${d_fr}` : t_fr;
  const text_en = d_en ? `${t_en}\n---\n${d_en}` : t_en;

  return {
    text_fr,
    text_en,
    order_index: Number(s.order_index) || 0,
  };
};

// ─── Zod Schemas ──────────────────────────────────────────────────────────────
const ProjectSchema = z.object({
  name_fr: z.string().min(2, "Le nom FR doit contenir au moins 2 caractères"),
  name_en: z.string().min(2, "Le nom EN doit contenir au moins 2 caractères"),
  description_fr: z.string().min(5, "La description FR est trop courte"),
  description_en: z.string().min(5, "La description EN est trop courte"),
  stack: z.union([z.string(), z.array(z.string())]),
  link: z.string().url("Le lien doit être une URL valide").or(z.literal("#")),
  order_index: z.number().int("L'ordre doit être un entier"),
});

const SkillSchema = z.object({
  name: z.string().min(2, "Le nom de la compétence est requis"),
  level: z.number().min(0, "Le niveau minimum est 0").max(100, "Le niveau maximum est 100"),
  tooltip_fr: z.string(),
  tooltip_en: z.string(),
  order_index: z.number().int("L'ordre doit être un entier"),
});

const ServiceSchema = z.object({
  title_fr: z.string().min(2, "Le titre du service FR doit contenir au moins 2 caractères"),
  title_en: z.string().min(2, "Le titre du service EN doit contenir au moins 2 caractères"),
  description_fr: z.string().min(5, "La description FR doit contenir au moins 5 caractères"),
  description_en: z.string().min(5, "La description EN doit contenir au moins 5 caractères"),
  order_index: z.number().int("L'ordre doit être un entier"),
});

// ─── Helpers UI Monochrome ───────────────────────────────────────────────────
const Input = ({ label, value, onChange, type="text", rows=0 }: { label:string; value:string|number; onChange:(v:string)=>void; type?:string; rows?:number }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">{label}</label>
    {rows > 0
      ? <textarea rows={rows} className="bg-[#121212] border border-neutral-800 focus:border-white text-white rounded-xl p-3 text-sm resize-y outline-none transition-colors" value={value} onChange={e=>onChange(e.target.value)} />
      : <input type={type} className="bg-[#121212] border border-neutral-800 focus:border-white text-white rounded-xl p-3 text-sm outline-none transition-colors" value={value} onChange={e=>onChange(e.target.value)} />
    }
  </div>
);

const Select = ({ label, value, onChange, options }: { label:string; value:string|number; onChange:(v:string)=>void; options:{ value:string|number; label:string }[] }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">{label}</label>
    <select
      className="bg-[#121212] border border-neutral-800 focus:border-white text-white rounded-xl p-3 text-sm outline-none transition-colors cursor-pointer"
      value={value}
      onChange={e=>onChange(e.target.value)}
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value} className="bg-[#18181b] text-white">
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

const getAdminSkillTier = (level: number) => {
  if (level >= 80) {
    return {
      label: "🟢 EN PRODUCTION",
      desc: "Core Stack · Déployé sur systèmes réels",
      badgeCls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    };
  }
  if (level >= 65) {
    return {
      label: "🔵 ARCHITECTURE & SYSTÈMES",
      desc: "Conception avancée & Scalabilité",
      badgeCls: "bg-sky-500/10 text-sky-400 border-sky-500/30",
    };
  }
  return {
    label: "🟣 R&D & RECHERCHE APPLIQUÉE",
    desc: "Modélisation IA, Deep Learning & R&D",
    badgeCls: "bg-purple-500/10 text-purple-400 border-purple-500/30",
  };
};

const skillTierOptions = [
  { value: 90, label: "🟢 Production & Core Stack (Éprouvé sur systèmes réels)" },
  { value: 75, label: "🔵 Architecture & Systèmes (Conception avancée, APIs)" },
  { value: 55, label: "🟣 R&D & Recherche Appliquée (Modélisation IA, deep learning)" },
];

const Btn = ({ onClick, children, color="blue", disabled=false }: { onClick:()=>void; children:React.ReactNode; color?:string; disabled?:boolean }) => {
  const colors: Record<string,string> = {
    blue: "bg-white text-black hover:bg-neutral-200",
    green: "bg-white text-black hover:bg-neutral-200 font-bold",
    red: "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20",
    gray: "bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white"
  };
  return <button onClick={onClick} disabled={disabled} className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed ${colors[color] || colors.blue}`}>{children}</button>;
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AdminPage() {
  const [token, setToken]       = useState<string>("");
  const [pwd, setPwd]           = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [tab, setTab]           = useState<"projects"|"skills"|"services"|"content">("projects");
  const [msg, setMsg]           = useState("");

  const [projects, setProjects] = useState<Project[]>([]);
  const [skills,   setSkills]   = useState<Skill[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [content,  setContent]  = useState<Content>({});

  const [newProject, setNewProject] = useState(emptyProject());
  const [newSkill,   setNewSkill]   = useState(emptySkill());
  const [newService, setNewService] = useState(emptyService());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editing, setEditing]       = useState<Record<number, boolean>>({});

  const flash = (m: string) => { setMsg(m); setTimeout(() => setMsg(""), 3000); };

  useEffect(() => {
    const t = localStorage.getItem("portfolio_admin_token") || "";
    if (!t) return;
    fetch(`${API_URL}/api/auth/verify`, {
      headers: { Authorization: `Bearer ${t}` },
    })
      .then((r) => {
        if (r.ok) setToken(t);
        else {
          localStorage.removeItem("portfolio_admin_token");
          setLoginErr("Session expirée, reconnectez-vous.");
        }
      })
      .catch(() => setToken(t));
  }, []);

  const headers = () => ({ "Content-Type": "application/json", Authorization: `Bearer ${token}` });

  // ── Login ──────────────────────────────────────────────────────────────────
  const login = async () => {
    try {
      const r = await fetch(`${API_URL}/api/auth/login`, { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ password: pwd }) });
      const d = await r.json();
      if (d.token) { setToken(d.token); localStorage.setItem("portfolio_admin_token", d.token); setLoginErr(""); }
      else setLoginErr("Mot de passe incorrect");
    } catch { setLoginErr("Erreur de connexion avec l'API Flask"); }
  };

  // ── Fetch all ──────────────────────────────────────────────────────────────
  const loadAll = async () => {
    const [pr, sk, sv, ct] = await Promise.all([
      fetch(`${API_URL}/api/projects`).then(r=>r.json()).catch(()=>[]),
      fetch(`${API_URL}/api/skills`).then(r=>r.json()).catch(()=>[]),
      fetch(`${API_URL}/api/services`).then(r=>r.json()).catch(()=>[]),
      fetch(`${API_URL}/api/content`).then(r=>r.json()).catch(()=>({})),
    ]);
    setProjects(pr); setSkills(sk); setServices(Array.isArray(sv) ? sv.map(parseRawService) : []); setContent(ct);
  };

  useEffect(() => { if (token) loadAll(); }, [token]);

  // ── CRUD Projects ──────────────────────────────────────────────────────────
  const addProject = async () => {
    const parsed = ProjectSchema.safeParse(newProject);
    if (!parsed.success) { setLoginErr(parsed.error.issues[0].message); return; }
    setLoginErr("");
    const r = await fetch(`${API_URL}/api/projects`, { method:"POST", headers:headers(), body: JSON.stringify({ ...newProject, stack: typeof newProject.stack === "string" ? (newProject.stack as unknown as string).split(",").map(s=>s.trim()) : newProject.stack }) });
    if (r.ok) { flash("Projet ajouté !"); setNewProject(emptyProject()); loadAll(); }
    else flash("Erreur");
  };
  const saveProject = async (p: Project) => {
    const parsed = ProjectSchema.safeParse(p);
    if (!parsed.success) { setLoginErr(parsed.error.issues[0].message); return; }
    setLoginErr("");
    const r = await fetch(`${API_URL}/api/projects/${p.id}`, { method:"PUT", headers:headers(), body: JSON.stringify({ ...p, stack: typeof p.stack === "string" ? (p.stack as unknown as string).split(",").map(s=>s.trim()) : p.stack }) });
    if (r.ok) { flash("Sauvegardé !"); setEditing(e=>({...e,[p.id]:false})); loadAll(); }
    else flash("Erreur");
  };
  const delProject = async (id: number) => {
    if (!confirm("Supprimer ce projet ?")) return;
    await fetch(`${API_URL}/api/projects/${id}`, { method:"DELETE", headers:headers() });
    flash("Supprimé"); loadAll();
  };

  // ── CRUD Skills ────────────────────────────────────────────────────────────
  const addSkill = async () => {
    const parsed = SkillSchema.safeParse(newSkill);
    if (!parsed.success) { setLoginErr(parsed.error.issues[0].message); return; }
    setLoginErr("");
    const r = await fetch(`${API_URL}/api/skills`, { method:"POST", headers:headers(), body: JSON.stringify(newSkill) });
    if (r.ok) { flash("Compétence ajoutée !"); setNewSkill(emptySkill()); loadAll(); }
    else flash("Erreur");
  };
  const saveSkill = async (s: Skill) => {
    const parsed = SkillSchema.safeParse(s);
    if (!parsed.success) { setLoginErr(parsed.error.issues[0].message); return; }
    setLoginErr("");
    const r = await fetch(`${API_URL}/api/skills/${s.id}`, { method:"PUT", headers:headers(), body: JSON.stringify(s) });
    if (r.ok) { flash("Sauvegardé !"); setEditing(e=>({...e,[s.id]:false})); loadAll(); }
    else flash("Erreur");
  };
  const delSkill = async (id: number) => {
    if (!confirm("Supprimer ?")) return;
    await fetch(`${API_URL}/api/skills/${id}`, { method:"DELETE", headers:headers() });
    flash("Supprimé"); loadAll();
  };

  // ── CRUD Services ──────────────────────────────────────────────────────────
  const addService = async () => {
    if (isSubmitting) return;

    const tFr = (newService.title_fr || newService.text_fr || "").trim().toLowerCase();
    const tEn = (newService.title_en || newService.text_en || "").trim().toLowerCase();

    const isDuplicate = services.some(s => {
      const sFr = (s.title_fr || s.text_fr || "").split("\n---\n")[0].trim().toLowerCase();
      const sEn = (s.title_en || s.text_en || "").split("\n---\n")[0].trim().toLowerCase();
      return (tFr && sFr === tFr) || (tEn && sEn === tEn);
    });

    if (isDuplicate) {
      setLoginErr("Un service portant ce titre existe déjà. Modifiez le service existant pour éviter les doublons.");
      return;
    }

    const parsed = ServiceSchema.safeParse(newService);
    if (!parsed.success) { setLoginErr(parsed.error.issues[0].message); return; }
    setLoginErr("");
    setIsSubmitting(true);
    try {
      const payload = formatServicePayload(newService);
      const r = await fetch(`${API_URL}/api/services`, { method:"POST", headers:headers(), body: JSON.stringify(payload) });
      if (r.ok) { flash("Service ajouté avec succès !"); setNewService(emptyService()); await loadAll(); }
      else {
        const errJson = await r.json().catch(() => ({}));
        flash(errJson.error || "Erreur lors de l'ajout");
      }
    } catch {
      flash("Erreur réseau");
    } finally {
      setIsSubmitting(false);
    }
  };
  const saveService = async (s: Service) => {
    if (isSubmitting) return;
    const parsed = ServiceSchema.safeParse(s);
    if (!parsed.success) { setLoginErr(parsed.error.issues[0].message); return; }
    setLoginErr("");
    setIsSubmitting(true);
    try {
      const payload = formatServicePayload(s);
      const r = await fetch(`${API_URL}/api/services/${s.id}`, { method:"PUT", headers:headers(), body: JSON.stringify(payload) });
      if (r.ok) { flash("Sauvegardé !"); setEditing(e=>({...e,[s.id]:false})); await loadAll(); }
      else {
        const errJson = await r.json().catch(() => ({}));
        flash(errJson.error || "Erreur");
      }
    } catch {
      flash("Erreur réseau");
    } finally {
      setIsSubmitting(false);
    }
  };
  const delService = async (id: number) => {
    if (!confirm("Supprimer ?")) return;
    await fetch(`${API_URL}/api/services/${id}`, { method:"DELETE", headers:headers() });
    flash("Supprimé"); loadAll();
  };

  // ── Update Content ─────────────────────────────────────────────────────────
  const saveContent = async (key: string) => {
    const r = await fetch(`${API_URL}/api/content/${key}`, { method:"PUT", headers:headers(), body: JSON.stringify(content[key])});
    if (r.ok) flash("Sauvegardé !");
    else flash("Erreur");
  };
  const updateContent = (key: string, lang: "value_fr"|"value_en", val: string) => {
    setContent(c => ({ ...c, [key]: { ...c[key], [lang]: val } }));
  };

  // ── Not logged in ──────────────────────────────────────────────────────────
  if (!token) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
      <div className="bg-[#121212] border border-neutral-800 p-8 sm:p-10 rounded-3xl w-full max-w-sm space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <span className="w-10 h-10 rounded-full bg-white text-black font-black text-xs inline-flex items-center justify-center">
            OB
          </span>
          <h1 className="text-xl font-black uppercase tracking-wider text-white">Espace Studio</h1>
          <p className="text-xs text-neutral-500 font-mono">// Accès gestionnaire sécurisé</p>
        </div>

        <div className="space-y-4">
          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full bg-[#181818] border border-neutral-800 focus:border-white text-white rounded-xl p-3.5 text-sm outline-none transition-colors"
            value={pwd}
            onChange={e=>setPwd(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&login()}
          />
          {loginErr && <p className="text-red-400 text-xs font-mono">{loginErr}</p>}
          <button
            onClick={login}
            className="w-full bg-white hover:bg-neutral-200 text-black font-black uppercase tracking-widest text-xs py-3.5 rounded-xl transition-all duration-150 active:scale-[0.99]"
          >
            S'authentifier
          </button>
        </div>
      </div>
    </div>
  );

  const TABS = [
    { key:"projects", label:"Projets" },
    { key:"skills",   label:"Compétences" },
    { key:"services", label:"Services" },
    { key:"content",  label:"Textes" },
  ] as const;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 sm:p-10 selection:bg-white selection:text-black">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Dashboard */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8 pb-6 border-b border-neutral-800">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 block mb-1">
              PORTFOLIO // BACKSTAGE
            </span>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">Studio Dashboard</h1>
          </div>

          <div className="flex gap-4 items-center">
            <a href="/" className="text-xs uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">
              ← Voir le site
            </a>
            <button
              onClick={()=>{ localStorage.removeItem("portfolio_admin_token"); setToken(""); }}
              className="text-xs uppercase tracking-widest bg-neutral-900 border border-neutral-800 hover:border-neutral-700 px-4 py-2 rounded-xl text-neutral-300 transition-colors"
            >
              Déconnexion
            </button>
          </div>
        </div>

        {msg && <div className="bg-neutral-800 border border-neutral-700 text-white px-4 py-3 rounded-xl mb-6 text-xs font-mono uppercase tracking-wider">{msg}</div>}
        {loginErr && <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6 text-xs font-mono">{loginErr}</div>}

        {/* Tabs Stylisées */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={()=>setTab(t.key)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                tab===t.key
                  ? "bg-white text-black shadow-sm"
                  : "bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white hover:border-neutral-700"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── PROJETS ── */}
        {tab === "projects" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-black uppercase tracking-wider">Projets Répertoire ({projects.length})</h2>
            </div>

            {/* Formulaire ajout */}
            <div className="bg-[#121212] border border-neutral-800 p-6 rounded-2xl space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block border-b border-neutral-800 pb-2">
                + Nouveau projet
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Nom FR" value={newProject.name_fr} onChange={v=>setNewProject(p=>({...p,name_fr:v}))} />
                <Input label="Nom EN" value={newProject.name_en} onChange={v=>setNewProject(p=>({...p,name_en:v}))} />
                <Input label="Description FR" value={newProject.description_fr} onChange={v=>setNewProject(p=>({...p,description_fr:v}))} rows={2} />
                <Input label="Description EN" value={newProject.description_en} onChange={v=>setNewProject(p=>({...p,description_en:v}))} rows={2} />
                <Input label="Stack (séparée par virgules)" value={Array.isArray(newProject.stack)?newProject.stack.join(", "):(newProject.stack as unknown as string)} onChange={v=>setNewProject(p=>({...p,stack:v as unknown as string[]}))} />
                <Input label="Lien" value={newProject.link} onChange={v=>setNewProject(p=>({...p,link:v}))} />
                <Input label="Ordre" type="number" value={newProject.order_index} onChange={v=>setNewProject(p=>({...p,order_index:+v}))} />
              </div>
              <div className="pt-2">
                <Btn onClick={addProject} color="green">Enregistrer le projet</Btn>
              </div>
            </div>

            {/* Liste projets */}
            <div className="grid grid-cols-1 gap-4">
              {projects.map(p => (
                <div key={p.id} className="bg-[#121212] border border-neutral-800/80 rounded-2xl p-5">
                  {editing[p.id] ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Nom FR" value={p.name_fr} onChange={v=>setProjects(ps=>ps.map(x=>x.id===p.id?{...x,name_fr:v}:x))} />
                        <Input label="Nom EN" value={p.name_en} onChange={v=>setProjects(ps=>ps.map(x=>x.id===p.id?{...x,name_en:v}:x))} />
                        <Input label="Description FR" value={p.description_fr} onChange={v=>setProjects(ps=>ps.map(x=>x.id===p.id?{...x,description_fr:v}:x))} rows={3} />
                        <Input label="Description EN" value={p.description_en} onChange={v=>setProjects(ps=>ps.map(x=>x.id===p.id?{...x,description_en:v}:x))} rows={3} />
                        <Input label="Stack" value={Array.isArray(p.stack)?p.stack.join(", "):(p.stack as unknown as string)} onChange={v=>setProjects(ps=>ps.map(x=>x.id===p.id?{...x,stack:v as unknown as string[]}:x))} />
                        <Input label="Lien" value={p.link} onChange={v=>setProjects(ps=>ps.map(x=>x.id===p.id?{...x,link:v}:x))} />
                        <Input label="Ordre" type="number" value={p.order_index} onChange={v=>setProjects(ps=>ps.map(x=>x.id===p.id?{...x,order_index:+v}:x))} />
                      </div>
                      <div className="flex gap-2">
                        <Btn onClick={()=>saveProject(p)} color="green">Sauvegarder</Btn>
                        <Btn onClick={()=>setEditing(e=>({...e,[p.id]:false}))} color="gray">Annuler</Btn>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono text-neutral-500">#{p.order_index}</span>
                          <p className="font-bold text-base text-white tracking-tight">{p.name_fr} / {p.name_en}</p>
                        </div>
                        <p className="text-neutral-400 text-xs mt-1.5 line-clamp-2 max-w-2xl">{p.description_fr}</p>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {(Array.isArray(p.stack) ? p.stack : [p.stack]).map((st, i) => (
                            <span key={i} className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">
                              {st}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <Btn onClick={()=>setEditing(e=>({...e,[p.id]:true}))} color="gray">Modifier</Btn>
                        <Btn onClick={()=>delProject(p.id)} color="red">Supprimer</Btn>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── SKILLS ── */}
        {tab === "skills" && (
          <div className="space-y-6">
            <h2 className="text-lg font-black uppercase tracking-wider">Arsenal Technique ({skills.length})</h2>

            <div className="bg-[#121212] border border-neutral-800 p-6 rounded-2xl space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block border-b border-neutral-800 pb-2">
                + Nouvelle compétence
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Nom de la technologie" value={newSkill.name} onChange={v=>setNewSkill(s=>({...s,name:v}))} />
                <Select label="Maturité Opérationnelle" value={newSkill.level} onChange={v=>setNewSkill(s=>({...s,level:+v}))} options={skillTierOptions} />
                <Input label="Rôle & Contexte d'usage FR" value={newSkill.tooltip_fr} onChange={v=>setNewSkill(s=>({...s,tooltip_fr:v}))} />
                <Input label="Rôle & Contexte d'usage EN" value={newSkill.tooltip_en} onChange={v=>setNewSkill(s=>({...s,tooltip_en:v}))} />
                <Input label="Ordre d'affichage" type="number" value={newSkill.order_index} onChange={v=>setNewSkill(s=>({...s,order_index:+v}))} />
              </div>
              <div className="pt-2">
                <Btn onClick={addSkill} color="green">Ajouter la compétence</Btn>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {skills.map(s => (
                <div key={s.id} className="bg-[#121212] border border-neutral-800/80 rounded-2xl p-5">
                  {editing[s.id] ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Nom de la technologie" value={s.name} onChange={v=>setSkills(sk=>sk.map(x=>x.id===s.id?{...x,name:v}:x))} />
                        <Select label="Maturité Opérationnelle" value={s.level} onChange={v=>setSkills(sk=>sk.map(x=>x.id===s.id?{...x,level:+v}:x))} options={skillTierOptions} />
                        <Input label="Rôle & Contexte d'usage FR" value={s.tooltip_fr} onChange={v=>setSkills(sk=>sk.map(x=>x.id===s.id?{...x,tooltip_fr:v}:x))} />
                        <Input label="Rôle & Contexte d'usage EN" value={s.tooltip_en} onChange={v=>setSkills(sk=>sk.map(x=>x.id===s.id?{...x,tooltip_en:v}:x))} />
                        <Input label="Ordre d'affichage" type="number" value={s.order_index} onChange={v=>setSkills(sk=>sk.map(x=>x.id===s.id?{...x,order_index:+v}:x))} />
                      </div>
                      <div className="flex gap-2">
                        <Btn onClick={()=>saveSkill(s)} color="green">Sauvegarder</Btn>
                        <Btn onClick={()=>setEditing(e=>({...e,[s.id]:false}))} color="gray">Annuler</Btn>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono text-neutral-500">#{s.order_index}</span>
                          <p className="font-bold text-base text-white">{s.name}</p>
                        </div>
                        {(() => {
                          const tier = getAdminSkillTier(s.level);
                          return (
                            <div className="flex flex-wrap items-center gap-3 mt-2">
                              <span className={`inline-flex items-center text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${tier.badgeCls}`}>
                                {tier.label}
                              </span>
                              <span className="text-xs text-neutral-400 font-mono">// {tier.desc}</span>
                              {s.tooltip_fr && (
                                <span className="text-xs text-neutral-500 font-sans italic block w-full mt-1">
                                  "{s.tooltip_fr}"
                                </span>
                              )}
                            </div>
                          );
                        })()}
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <Btn onClick={()=>setEditing(e=>({...e,[s.id]:true}))} color="gray">Modifier</Btn>
                        <Btn onClick={()=>delSkill(s.id)} color="red">Supprimer</Btn>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── SERVICES ── */}
        {tab === "services" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
              <h2 className="text-lg font-black uppercase tracking-wider">Catalogue Services ({services.length})</h2>
              <span className="text-xs font-mono text-neutral-500">// Titres et descriptions complètes FR & EN</span>
            </div>

            {/* Formulaire ajout */}
            <div className="bg-[#121212] border border-neutral-800 p-6 rounded-2xl space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block border-b border-neutral-800 pb-2">
                + Nouveau service
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Titre du service (FR)" value={newService.title_fr} onChange={v=>setNewService(s=>({...s,title_fr:v}))} />
                <Input label="Titre du service (EN)" value={newService.title_en} onChange={v=>setNewService(s=>({...s,title_en:v}))} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Description détaillée (FR)" rows={3} value={newService.description_fr} onChange={v=>setNewService(s=>({...s,description_fr:v}))} />
                <Input label="Detailed description (EN)" rows={3} value={newService.description_en} onChange={v=>setNewService(s=>({...s,description_en:v}))} />
              </div>
              <div className="w-full md:w-48">
                <Input label="Ordre d'affichage" type="number" value={newService.order_index} onChange={v=>setNewService(s=>({...s,order_index:+v}))} />
              </div>
              <div className="pt-2">
                <Btn onClick={addService} color="green" disabled={isSubmitting}>{isSubmitting ? "Ajout en cours..." : "Ajouter le service"}</Btn>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {services.map(s => (
                <div key={s.id} className="bg-[#121212] border border-neutral-800/80 rounded-2xl p-5">
                  {editing[s.id] ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Titre FR" value={s.title_fr} onChange={v=>setServices(sv=>sv.map(x=>x.id===s.id?{...x,title_fr:v}:x))} />
                        <Input label="Titre EN" value={s.title_en} onChange={v=>setServices(sv=>sv.map(x=>x.id===s.id?{...x,title_en:v}:x))} />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Description FR" rows={3} value={s.description_fr} onChange={v=>setServices(sv=>sv.map(x=>x.id===s.id?{...x,description_fr:v}:x))} />
                        <Input label="Description EN" rows={3} value={s.description_en} onChange={v=>setServices(sv=>sv.map(x=>x.id===s.id?{...x,description_en:v}:x))} />
                      </div>
                      <div className="w-full md:w-48">
                        <Input label="Ordre" type="number" value={s.order_index} onChange={v=>setServices(sv=>sv.map(x=>x.id===s.id?{...x,order_index:+v}:x))} />
                      </div>
                      <div className="flex gap-2">
                        <Btn onClick={()=>saveService(s)} color="green" disabled={isSubmitting}>{isSubmitting ? "Sauvegarde..." : "Sauvegarder"}</Btn>
                        <Btn onClick={()=>setEditing(e=>({...e,[s.id]:false}))} color="gray">Annuler</Btn>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono text-neutral-500">#{s.order_index}</span>
                          <p className="font-bold text-white text-base">{s.title_fr}</p>
                        </div>
                        {s.description_fr && (
                          <p className="text-neutral-300 text-xs font-sans leading-relaxed pl-7">
                            {s.description_fr}
                          </p>
                        )}
                        <div className="pt-2 border-t border-neutral-800/60 pl-7 space-y-1">
                          <p className="text-xs font-mono text-neutral-400 font-semibold">{s.title_en}</p>
                          {s.description_en && (
                            <p className="text-neutral-500 text-xs font-sans italic leading-relaxed">
                              {s.description_en}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0 self-end md:self-start">
                        <Btn onClick={()=>setEditing(e=>({...e,[s.id]:true}))} color="gray">Modifier</Btn>
                        <Btn onClick={()=>delService(s.id)} color="red" disabled={isSubmitting}>Supprimer</Btn>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TEXTES DU SITE ── */}
        {tab === "content" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-black uppercase tracking-wider">Textes & Éditoriaux</h2>
              <p className="text-neutral-500 text-xs font-mono mt-1">// Modifiez les contenus du Hero, About et Footer.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {Object.entries(content).map(([key, val]) => (
                <div key={key} className="bg-[#121212] border border-neutral-800 p-6 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                    <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-300 font-bold">{key.replace(/_/g," ")}</h3>
                    <span className="text-[10px] font-mono text-neutral-500">[DYNAMIC_FIELD]</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Français" value={val.value_fr} onChange={v=>updateContent(key,"value_fr",v)} rows={3} />
                    <Input label="English" value={val.value_en} onChange={v=>updateContent(key,"value_en",v)} rows={3} />
                  </div>
                  <div className="pt-2">
                    <Btn onClick={()=>saveContent(key)} color="green" disabled={isSubmitting}>{isSubmitting ? "Sauvegarde..." : "Sauvegarder les modifications"}</Btn>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

