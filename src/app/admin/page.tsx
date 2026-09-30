"use client";
import { useState, useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5001";

// ─── Types ────────────────────────────────────────────────────────────────────
type Project = { id: number; name_fr: string; name_en: string; description_fr: string; description_en: string; stack: string[]; link: string; order_index: number };
type Skill   = { id: number; name: string; level: number; tooltip_fr: string; tooltip_en: string; order_index: number };
type Service = { id: number; text_fr: string; text_en: string; order_index: number };
type Content = Record<string, { value_fr: string; value_en: string }>;

const emptyProject = (): Omit<Project,"id"> => ({ name_fr:"", name_en:"", description_fr:"", description_en:"", stack:[], link:"#", order_index:0 });
const emptySkill   = (): Omit<Skill,"id">   => ({ name:"", level:50, tooltip_fr:"", tooltip_en:"", order_index:0 });
const emptyService = (): Omit<Service,"id"> => ({ text_fr:"", text_en:"", order_index:0 });

// ─── Helpers UI ───────────────────────────────────────────────────────────────
const Input = ({ label, value, onChange, type="text", rows=0 }: { label:string; value:string|number; onChange:(v:string)=>void; type?:string; rows?:number }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs text-gray-400">{label}</label>
    {rows > 0
      ? <textarea rows={rows} className="bg-gray-700 text-white rounded p-2 text-sm resize-y" value={value} onChange={e=>onChange(e.target.value)} />
      : <input type={type} className="bg-gray-700 text-white rounded p-2 text-sm" value={value} onChange={e=>onChange(e.target.value)} />
    }
  </div>
);

const Btn = ({ onClick, children, color="blue", disabled=false }: { onClick:()=>void; children:React.ReactNode; color?:string; disabled?:boolean }) => {
  const colors: Record<string,string> = { blue:"bg-blue-600 hover:bg-blue-700", red:"bg-red-600 hover:bg-red-700", green:"bg-green-600 hover:bg-green-700", gray:"bg-gray-600 hover:bg-gray-700" };
  return <button onClick={onClick} disabled={disabled} className={`px-3 py-1 rounded text-white text-sm ${colors[color] || colors.blue} disabled:opacity-40`}>{children}</button>;
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
  const [editing, setEditing]       = useState<Record<number, boolean>>({});

  const flash = (m: string) => { setMsg(m); setTimeout(() => setMsg(""), 3000); };

  useEffect(() => {
    const t = localStorage.getItem("portfolio_admin_token") || "";
    if (t) setToken(t);
  }, []);

  const headers = () => ({ "Content-Type": "application/json", Authorization: `Bearer ${token}` });

  // ── Login ──────────────────────────────────────────────────────────────────
  const login = async () => {
    try {
      const r = await fetch(`${API_URL}/api/auth/login`, { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ password: pwd }) });
      const d = await r.json();
      if (d.token) { setToken(d.token); localStorage.setItem("portfolio_admin_token", d.token); setLoginErr(""); }
      else setLoginErr("Mot de passe incorrect");
    } catch { setLoginErr("Erreur de connexion avec l API Flask"); }
  };

  // ── Fetch all ──────────────────────────────────────────────────────────────
  const loadAll = async () => {
    const [pr, sk, sv, ct] = await Promise.all([
      fetch(`${API_URL}/api/projects`).then(r=>r.json()).catch(()=>[]),
      fetch(`${API_URL}/api/skills`).then(r=>r.json()).catch(()=>[]),
      fetch(`${API_URL}/api/services`).then(r=>r.json()).catch(()=>[]),
      fetch(`${API_URL}/api/content`).then(r=>r.json()).catch(()=>({})),
    ]);
    setProjects(pr); setSkills(sk); setServices(sv); setContent(ct);
  };

  useEffect(() => { if (token) loadAll(); }, [token]);

  // ── CRUD Projects ──────────────────────────────────────────────────────────
  const addProject = async () => {
    const r = await fetch(`${API_URL}/api/projects`, { method:"POST", headers:headers(), body: JSON.stringify({ ...newProject, stack: typeof newProject.stack === "string" ? (newProject.stack as unknown as string).split(",").map(s=>s.trim()) : newProject.stack }) });
    if (r.ok) { flash("Projet ajouté !"); setNewProject(emptyProject()); loadAll(); }
    else flash("Erreur");
  };
  const saveProject = async (p: Project) => {
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
    const r = await fetch(`${API_URL}/api/skills`, { method:"POST", headers:headers(), body: JSON.stringify(newSkill) });
    if (r.ok) { flash("Compétence ajoutée !"); setNewSkill(emptySkill()); loadAll(); }
    else flash("Erreur");
  };
  const saveSkill = async (s: Skill) => {
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
    const r = await fetch(`${API_URL}/api/services`, { method:"POST", headers:headers(), body: JSON.stringify(newService) });
    if (r.ok) { flash("Service ajouté !"); setNewService(emptyService()); loadAll(); }
    else flash("Erreur");
  };
  const saveService = async (s: Service) => {
    const r = await fetch(`${API_URL}/api/services/${s.id}`, { method:"PUT", headers:headers(), body: JSON.stringify(s) });
    if (r.ok) { flash("Sauvegardé !"); setEditing(e=>({...e,[s.id]:false})); loadAll(); }
    else flash("Erreur");
  };
  const delService = async (id: number) => {
    if (!confirm("Supprimer ?")) return;
    await fetch(`${API_URL}/api/services/${id}`, { method:"DELETE", headers:headers() });
    flash("Supprimé"); loadAll();
  };

  // ── Update Content ─────────────────────────────────────────────────────────
  const saveContent = async (key: string) => {
    const r = await fetch(`${API_URL}/api/content/${key}`, { method:"PUT", headers:headers(), body: JSON.stringify(content[key]) });
    if (r.ok) flash("Sauvegardé !");
    else flash("Erreur");
  };
  const updateContent = (key: string, lang: "value_fr"|"value_en", val: string) => {
    setContent(c => ({ ...c, [key]: { ...c[key], [lang]: val } }));
  };

  // ── Not logged in ──────────────────────────────────────────────────────────
  if (!token) return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-2xl w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold text-white text-center">🔒 Admin</h1>
        <input type="password" placeholder="Mot de passe" className="w-full bg-gray-700 text-white rounded p-3" value={pwd} onChange={e=>setPwd(e.target.value)} onKeyDown={e=>e.key==="Enter"&&login()} />
        {loginErr && <p className="text-red-400 text-sm">{loginErr}</p>}
        <button onClick={login} className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded p-3 font-semibold">Se connecter</button>
      </div>
    </div>
  );

  const TABS = [
    { key:"projects", label:"📁 Projets" },
    { key:"skills",   label:"⚡ Compétences" },
    { key:"services", label:"🛠️ Services" },
    { key:"content",  label:"✏️ Textes" },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">🎛️ Dashboard Portfolio</h1>
          <div className="flex gap-3 items-center">
            <a href="/" className="text-sm text-gray-400 hover:text-white">← Portfolio</a>
            <button onClick={()=>{ localStorage.removeItem("portfolio_admin_token"); setToken(""); }} className="text-sm bg-gray-700 px-3 py-1 rounded">Déconnexion</button>
          </div>
        </div>

        {msg && <div className="bg-green-700 text-white px-4 py-2 rounded mb-4 text-sm">{msg}</div>}

        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {TABS.map(t => (
            <button key={t.key} onClick={()=>setTab(t.key)} className={`px-4 py-2 rounded-lg text-sm font-medium ${tab===t.key ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── PROJETS ── */}
        {tab === "projects" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Projets ({projects.length})</h2>

            {/* Formulaire ajout */}
            <div className="bg-gray-800 p-5 rounded-xl space-y-3">
              <h3 className="font-medium text-green-400">+ Nouveau projet</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input label="Nom FR" value={newProject.name_fr} onChange={v=>setNewProject(p=>({...p,name_fr:v}))} />
                <Input label="Nom EN" value={newProject.name_en} onChange={v=>setNewProject(p=>({...p,name_en:v}))} />
                <Input label="Description FR" value={newProject.description_fr} onChange={v=>setNewProject(p=>({...p,description_fr:v}))} rows={2} />
                <Input label="Description EN" value={newProject.description_en} onChange={v=>setNewProject(p=>({...p,description_en:v}))} rows={2} />
                <Input label="Stack (séparée par virgules)" value={Array.isArray(newProject.stack)?newProject.stack.join(", "):(newProject.stack as unknown as string)} onChange={v=>setNewProject(p=>({...p,stack:v as unknown as string[]}))} />
                <Input label="Lien" value={newProject.link} onChange={v=>setNewProject(p=>({...p,link:v}))} />
                <Input label="Ordre" type="number" value={newProject.order_index} onChange={v=>setNewProject(p=>({...p,order_index:+v}))} />
              </div>
              <Btn onClick={addProject} color="green">Ajouter</Btn>
            </div>

            {/* Liste projets */}
            {projects.map(p => (
              <div key={p.id} className="bg-gray-800 p-4 rounded-xl">
                {editing[p.id] ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Input label="Nom FR" value={p.name_fr} onChange={v=>setProjects(ps=>ps.map(x=>x.id===p.id?{...x,name_fr:v}:x))} />
                      <Input label="Nom EN" value={p.name_en} onChange={v=>setProjects(ps=>ps.map(x=>x.id===p.id?{...x,name_en:v}:x))} />
                      <Input label="Description FR" value={p.description_fr} onChange={v=>setProjects(ps=>ps.map(x=>x.id===p.id?{...x,description_fr:v}:x))} rows={3} />
                      <Input label="Description EN" value={p.description_en} onChange={v=>setProjects(ps=>ps.map(x=>x.id===p.id?{...x,description_en:v}:x))} rows={3} />
                      <Input label="Stack" value={Array.isArray(p.stack)?p.stack.join(", "):(p.stack as unknown as string)} onChange={v=>setProjects(ps=>ps.map(x=>x.id===p.id?{...x,stack:v as unknown as string[]}:x))} />
                      <Input label="Lien" value={p.link} onChange={v=>setProjects(ps=>ps.map(x=>x.id===p.id?{...x,link:v}:x))} />
                      <Input label="Ordre" type="number" value={p.order_index} onChange={v=>setProjects(ps=>ps.map(x=>x.id===p.id?{...x,order_index:+v}:x))} />
                    </div>
                    <div className="flex gap-2">
                      <Btn onClick={()=>saveProject(p)} color="green">💾 Sauvegarder</Btn>
                      <Btn onClick={()=>setEditing(e=>({...e,[p.id]:false}))} color="gray">Annuler</Btn>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{p.name_fr} / {p.name_en}</p>
                      <p className="text-gray-400 text-sm mt-1">{p.description_fr.slice(0,80)}…</p>
                      <p className="text-xs text-purple-400 mt-1">{Array.isArray(p.stack)?p.stack.join(", "):p.stack}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <Btn onClick={()=>setEditing(e=>({...e,[p.id]:true}))} color="blue">✏️</Btn>
                      <Btn onClick={()=>delProject(p.id)} color="red">🗑️</Btn>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── SKILLS ── */}
        {tab === "skills" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Compétences ({skills.length})</h2>

            <div className="bg-gray-800 p-5 rounded-xl space-y-3">
              <h3 className="font-medium text-green-400">+ Nouvelle compétence</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input label="Nom" value={newSkill.name} onChange={v=>setNewSkill(s=>({...s,name:v}))} />
                <Input label="Niveau (0-100)" type="number" value={newSkill.level} onChange={v=>setNewSkill(s=>({...s,level:Math.min(100,Math.max(0,+v))}))} />
                <Input label="Infobulle FR" value={newSkill.tooltip_fr} onChange={v=>setNewSkill(s=>({...s,tooltip_fr:v}))} />
                <Input label="Infobulle EN" value={newSkill.tooltip_en} onChange={v=>setNewSkill(s=>({...s,tooltip_en:v}))} />
                <Input label="Ordre" type="number" value={newSkill.order_index} onChange={v=>setNewSkill(s=>({...s,order_index:+v}))} />
              </div>
              <Btn onClick={addSkill} color="green">Ajouter</Btn>
            </div>

            {skills.map(s => (
              <div key={s.id} className="bg-gray-800 p-4 rounded-xl">
                {editing[s.id] ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Input label="Nom" value={s.name} onChange={v=>setSkills(sk=>sk.map(x=>x.id===s.id?{...x,name:v}:x))} />
                      <Input label="Niveau" type="number" value={s.level} onChange={v=>setSkills(sk=>sk.map(x=>x.id===s.id?{...x,level:+v}:x))} />
                      <Input label="Infobulle FR" value={s.tooltip_fr} onChange={v=>setSkills(sk=>sk.map(x=>x.id===s.id?{...x,tooltip_fr:v}:x))} />
                      <Input label="Infobulle EN" value={s.tooltip_en} onChange={v=>setSkills(sk=>sk.map(x=>x.id===s.id?{...x,tooltip_en:v}:x))} />
                      <Input label="Ordre" type="number" value={s.order_index} onChange={v=>setSkills(sk=>sk.map(x=>x.id===s.id?{...x,order_index:+v}:x))} />
                    </div>
                    <div className="flex gap-2">
                      <Btn onClick={()=>saveSkill(s)} color="green">💾 Sauvegarder</Btn>
                      <Btn onClick={()=>setEditing(e=>({...e,[s.id]:false}))} color="gray">Annuler</Btn>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{s.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="h-2 bg-gray-600 rounded-full w-32">
                          <div className="h-2 bg-purple-500 rounded-full" style={{width:`${s.level}%`}} />
                        </div>
                        <span className="text-sm text-gray-400">{s.level}%</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Btn onClick={()=>setEditing(e=>({...e,[s.id]:true}))} color="blue">✏️</Btn>
                      <Btn onClick={()=>delSkill(s.id)} color="red">🗑️</Btn>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── SERVICES ── */}
        {tab === "services" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Services ({services.length})</h2>

            <div className="bg-gray-800 p-5 rounded-xl space-y-3">
              <h3 className="font-medium text-green-400">+ Nouveau service</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input label="Texte FR" value={newService.text_fr} onChange={v=>setNewService(s=>({...s,text_fr:v}))} />
                <Input label="Texte EN" value={newService.text_en} onChange={v=>setNewService(s=>({...s,text_en:v}))} />
                <Input label="Ordre" type="number" value={newService.order_index} onChange={v=>setNewService(s=>({...s,order_index:+v}))} />
              </div>
              <Btn onClick={addService} color="green">Ajouter</Btn>
            </div>

            {services.map(s => (
              <div key={s.id} className="bg-gray-800 p-4 rounded-xl">
                {editing[s.id] ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Input label="Texte FR" value={s.text_fr} onChange={v=>setServices(sv=>sv.map(x=>x.id===s.id?{...x,text_fr:v}:x))} />
                      <Input label="Texte EN" value={s.text_en} onChange={v=>setServices(sv=>sv.map(x=>x.id===s.id?{...x,text_en:v}:x))} />
                      <Input label="Ordre" type="number" value={s.order_index} onChange={v=>setServices(sv=>sv.map(x=>x.id===s.id?{...x,order_index:+v}:x))} />
                    </div>
                    <div className="flex gap-2">
                      <Btn onClick={()=>saveService(s)} color="green">💾 Sauvegarder</Btn>
                      <Btn onClick={()=>setEditing(e=>({...e,[s.id]:false}))} color="gray">Annuler</Btn>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{s.text_fr}</p>
                      <p className="text-gray-400 text-sm">{s.text_en}</p>
                    </div>
                    <div className="flex gap-2">
                      <Btn onClick={()=>setEditing(e=>({...e,[s.id]:true}))} color="blue">✏️</Btn>
                      <Btn onClick={()=>delService(s.id)} color="red">🗑️</Btn>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── TEXTES ── */}
        {tab === "content" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Textes du portfolio</h2>
            <p className="text-gray-400 text-sm">Modifie les textes du Hero, About et Footer directement ici.</p>

            {Object.entries(content).map(([key, val]) => (
              <div key={key} className="bg-gray-800 p-5 rounded-xl space-y-3">
                <h3 className="font-medium text-purple-400 capitalize">{key.replace(/_/g," ")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input label="Français" value={val.value_fr} onChange={v=>updateContent(key,"value_fr",v)} rows={3} />
                  <Input label="English" value={val.value_en} onChange={v=>updateContent(key,"value_en",v)} rows={3} />
                </div>
                <Btn onClick={()=>saveContent(key)} color="green">💾 Sauvegarder</Btn>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
