"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";

type Props = { locale: string };

export default function Contact({ locale }: Props) {
  const t = locale === "fr" ? fr : en;
  const [showForm, setShowForm] = useState(true);
  const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || "xpqjdgpj";
  const [state, handleSubmit] = useForm(FORMSPREE_ID);

  useEffect(() => {
    if (state.succeeded) {
      setShowForm(false);
      const timer = setTimeout(() => setShowForm(true), 4000);
      return () => clearTimeout(timer);
    }
  }, [state.succeeded]);

  const inputCls =
    "w-full bg-[#101012] border border-white/10 focus:border-white/40 text-white placeholder-neutral-500 rounded-2xl px-6 py-4.5 text-sm outline-none transition-all duration-300";

  return (
    <section id="contact" className="py-36 bg-[#080809] border-t border-white/5 relative">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* EN-TÊTE ÉDITORIALE */}
        <div className="flex items-center gap-4 mb-10">
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-neutral-500 font-bold">
            05 // {locale === "fr" ? "CONTACT & COLLABORATION" : "GET IN TOUCH"}
          </span>
          <div className="h-px flex-1 bg-white/10 max-w-xs" />
        </div>

        {/* GRILLE 2 COLONNES ULTRA-AÉRÉE SANS AUCUNE COUPURE DE MOT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start w-full">
          
          {/* GAUCHE : IDENTITÉ & RÉSEAUX (7 cols pour que le titre respire pleinement) */}
          <div className="lg:col-span-7 flex flex-col justify-start space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-[1.08]"
            >
              {locale === "fr" ? (
                <>
                  Démarrer <br />
                  <span className="text-neutral-400 font-sans italic font-normal lowercase tracking-normal">une collaboration</span>
                </>
              ) : (
                <>
                  Let's <br />
                  <span className="text-neutral-400 font-sans italic font-normal lowercase tracking-normal">connect</span>
                </>
              )}
            </motion.h2>

            <p className="text-neutral-400 text-base sm:text-lg leading-relaxed font-normal max-w-xl">
              {locale === "fr"
                ? "Disponible pour des opportunités professionnelles, missions d'ingénierie full-stack ou intégration de solutions IA."
                : "Available for engineering opportunities, full-stack architectures, and applied AI systems."}
            </p>

            <div className="space-y-4 pt-4 border-t border-white/10 w-full max-w-xl">
              {[
                { label: "GITHUB", href: "https://github.com", desc: "// DÉPÔTS & CODE SOURCE" },
                { label: "LINKEDIN", href: "https://linkedin.com", desc: "// PROFIL PROFESSIONNEL" },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-white/[0.02] border border-white/10 hover:border-white/30 px-7 py-5 rounded-2xl group transition-all duration-300"
                >
                  <div>
                    <span className="font-display font-bold text-sm tracking-widest text-white group-hover:text-emerald-400 transition-colors">
                      {l.label}
                    </span>
                    <p className="text-[10px] font-mono text-neutral-500 mt-0.5">{l.desc}</p>
                  </div>
                  <span className="text-sm font-mono text-neutral-400 group-hover:text-white group-hover:translate-x-1 transition-all">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* DROITE : FORMULAIRE PROPREMENT CALIBRÉ (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-5 bg-[#101012] border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl"
          >
            {state.succeeded && !showForm ? (
              <div className="text-center py-14 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto text-xl font-bold border border-emerald-500/20">
                  ✓
                </div>
                <p className="font-display font-black text-2xl text-white uppercase">{t.contactThanks}</p>
                <p className="text-neutral-400 text-sm font-mono">// MESSAGE TRANSMIS AVEC SUCCÈS</p>
              </div>
            ) : (
              showForm && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder={t.contactName}
                      required
                      className={inputCls}
                    />
                    <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-400 text-xs mt-1.5 block font-mono" />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder={t.contactEmail}
                      required
                      className={inputCls}
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-400 text-xs mt-1.5 block font-mono" />
                  </div>
                  <div>
                    <textarea
                      name="message"
                      placeholder={t.contactMessage}
                      rows={5}
                      required
                      className={`${inputCls} resize-none`}
                    />
                    <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-400 text-xs mt-1.5 block font-mono" />
                  </div>
                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="w-full bg-white hover:bg-neutral-200 text-black font-mono uppercase tracking-[0.2em] font-bold text-xs py-5 rounded-2xl transition-all duration-300 active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-3 mt-3 cursor-pointer shadow-lg"
                  >
                    {state.submitting ? "ENVOI..." : t.contactSubmit.toUpperCase()}
                    <span>→</span>
                  </button>
                </form>
              )
            )}
          </motion.div>

        </div>

      </div>
    </section>
  );
}
