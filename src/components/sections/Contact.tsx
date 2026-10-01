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
    "w-full bg-[#111111] border border-neutral-800 focus:border-white text-white placeholder-neutral-600 rounded-xl px-5 py-4 text-sm outline-none transition-all duration-200";

  return (
    <section
      id="contact"
      className="relative w-full bg-[#080808] text-white py-36 sm:py-44 border-t border-neutral-900 select-none overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-black text-white/[0.015] tracking-tighter leading-none pointer-events-none whitespace-nowrap">
        CONNECT
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-12">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.28em] text-neutral-500">
            {locale === "fr" ? "06 \u2014 CONTACT" : "06 \u2014 GET IN TOUCH"}
          </span>
          <div className="h-[1px] w-12 bg-neutral-800" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

          {/* GAUCHE */}
          <div className="lg:col-span-5">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-[0.95] mb-8"
            >
              {t.contactTitle || (locale === "fr" ? "Demarrons un projet" : "Let\u2019s connect")}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              viewport={{ once: true }}
              className="text-neutral-400 text-sm sm:text-base leading-[1.9] mb-12 max-w-sm"
            >
              {locale === "fr"
                ? "Un projet, une opportunite, ou juste envie d\u2019echanger ? Je reponds sous 24h."
                : "A project, opportunity, or just want to chat? I reply within 24h."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {[
                { label: "GitHub", href: "https://github.com" },
                { label: "LinkedIn", href: "https://linkedin.com" },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-[#141414] border border-neutral-800 hover:border-white px-6 py-5 rounded-xl group transition-all duration-200"
                >
                  <span className="text-xs font-bold uppercase tracking-widest text-neutral-300 group-hover:text-white transition-colors">
                    {l.label}
                  </span>
                  <svg
                    className="w-4 h-4 text-neutral-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 17L17 7m0 0H7m10 0v10"
                    />
                  </svg>
                </a>
              ))}
            </motion.div>
          </div>

          {/* FORMULAIRE */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-[#141414] border border-neutral-800 rounded-3xl p-8 sm:p-12 shadow-2xl"
          >
            {state.succeeded && !showForm ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center mb-6">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-white font-black text-xl uppercase tracking-tight mb-2">
                  {t.contactThanks}
                </p>
                <p className="text-neutral-500 text-xs uppercase tracking-widest font-mono">
                  {locale === "fr" ? "Je vous repondrai tres rapidement." : "I will get back to you shortly."}
                </p>
              </motion.div>
            ) : (
              showForm && (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder={t.contactName}
                      required
                      className={inputCls}
                    />
                    <ValidationError
                      prefix="Name"
                      field="name"
                      errors={state.errors}
                      className="text-red-400 text-xs mt-1.5 block font-mono"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder={t.contactEmail}
                      required
                      className={inputCls}
                    />
                    <ValidationError
                      prefix="Email"
                      field="email"
                      errors={state.errors}
                      className="text-red-400 text-xs mt-1.5 block font-mono"
                    />
                  </div>

                  <div>
                    <textarea
                      name="message"
                      placeholder={t.contactMessage}
                      rows={6}
                      required
                      className={`${inputCls} resize-none`}
                    />
                    <ValidationError
                      prefix="Message"
                      field="message"
                      errors={state.errors}
                      className="text-red-400 text-xs mt-1.5 block font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="w-full bg-white hover:bg-neutral-200 text-black font-black uppercase tracking-wider text-xs py-4.5 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-[0.99] mt-3"
                  >
                    {state.submitting ? (
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                    ) : (
                      t.contactSubmit
                    )}
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
