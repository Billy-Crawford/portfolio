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

  const inputClass = "w-full bg-[#0f0f0f] border border-[#1f1f1f] focus:border-[#10b981] text-white placeholder-[#4a4a4a] rounded-xl px-4 py-3.5 text-sm outline-none transition-colors duration-200";

  return (
    <section id="contact" className="py-28 bg-[#080808] relative overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#10b981]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* GAUCHE */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }} viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-8 h-px bg-[#10b981]" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#10b981]">Contact</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }} viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4"
            >
              {t.contactTitle}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }} viewport={{ once: true }}
              className="text-[#737373] text-base leading-relaxed mb-8 max-w-sm"
            >
              {locale === "fr"
                ? "Un projet, une opportunité ou juste envie d'échanger ? Je réponds sous 24h."
                : "A project, opportunity or just want to chat? I reply within 24 hours."}
            </motion.p>

            {/* Liens */}
            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }} viewport={{ once: true }}
              className="space-y-3"
            >
              {[
                { label: "GitHub", href: "https://github.com", icon: "↗" },
                { label: "LinkedIn", href: "https://linkedin.com", icon: "↗" },
              ].map(l => (
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between bg-[#0f0f0f] border border-[#1f1f1f] hover:border-[#10b981]/40 px-5 py-3.5 rounded-xl group transition-colors">
                  <span className="text-sm font-semibold text-[#a3a3a3] group-hover:text-white transition-colors">{l.label}</span>
                  <span className="text-[#10b981] text-sm">{l.icon}</span>
                </a>
              ))}
            </motion.div>
          </div>

          {/* FORMULAIRE */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }}
            className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-3xl p-8"
          >
            {state.succeeded && !showForm ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#10b981]/10 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-white font-bold text-lg mb-1">{t.contactThanks}</p>
                <p className="text-[#737373] text-sm">{locale === "fr" ? "Je vous répondrai bientôt." : "I'll get back to you soon."}</p>
              </motion.div>
            ) : showForm && (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <input type="text" name="name" placeholder={t.contactName} required className={inputClass} />
                  <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-400 text-xs mt-1" />
                </div>
                <div>
                  <input type="email" name="email" placeholder={t.contactEmail} required className={inputClass} />
                  <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-400 text-xs mt-1" />
                </div>
                <div>
                  <textarea name="message" placeholder={t.contactMessage} rows={5} required className={`${inputClass} resize-none`} />
                  <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-400 text-xs mt-1" />
                </div>
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="w-full bg-[#10b981] text-[#080808] font-bold text-sm py-3.5 rounded-xl hover:bg-[#0d9e6e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {state.submitting ? (
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : t.contactSubmit}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
