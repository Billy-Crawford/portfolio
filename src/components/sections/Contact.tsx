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
    "w-full bg-neutral-900/80 border border-neutral-800 focus:border-emerald-500 text-white placeholder-neutral-500 rounded-xl px-4 py-3.5 text-sm outline-none transition-colors";

  return (
    <section id="contact" className="py-28 bg-[#080808] border-t border-neutral-900/60 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-emerald-500" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Contact</span>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight"
            >
              {t.contactTitle}
            </motion.h2>

            <p className="text-neutral-400 text-base leading-relaxed">
              {locale === "fr"
                ? "Un projet en tête, une opportunité ou simplement envie d'échanger ? N'hésitez pas à me contacter."
                : "Have a project in mind, an opportunity, or just want to connect? Feel free to reach out."}
            </p>

            <div className="space-y-3 pt-2">
              {[
                { label: "GitHub", href: "https://github.com" },
                { label: "LinkedIn", href: "https://linkedin.com" },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-neutral-900/60 border border-neutral-800 hover:border-emerald-500/40 px-5 py-4 rounded-xl group transition-colors"
                >
                  <span className="text-sm font-semibold text-neutral-300 group-hover:text-white transition-colors">
                    {l.label}
                  </span>
                  <span className="text-emerald-400 text-sm">↗</span>
                </a>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-neutral-900/40 border border-neutral-800 rounded-2xl p-8"
          >
            {state.succeeded && !showForm ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <p className="text-white font-bold text-lg">{t.contactThanks}</p>
              </div>
            ) : (
              showForm && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder={t.contactName}
                      required
                      className={inputCls}
                    />
                    <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-400 text-xs mt-1" />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder={t.contactEmail}
                      required
                      className={inputCls}
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-400 text-xs mt-1" />
                  </div>
                  <div>
                    <textarea
                      name="message"
                      placeholder={t.contactMessage}
                      rows={5}
                      required
                      className={`${inputCls} resize-none`}
                    />
                    <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-400 text-xs mt-1" />
                  </div>
                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-sm py-4 rounded-xl transition-all duration-300 active:scale-95 disabled:opacity-50"
                  >
                    {state.submitting ? "..." : t.contactSubmit}
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
