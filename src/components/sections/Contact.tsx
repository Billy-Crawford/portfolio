// billy-portfolio/src/components/sections/Contact.tsx

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

  // Formspree hook
  const [state, handleSubmit] = useForm("xpqjdgpj");

  // Réafficher le formulaire 3s après succès
  useEffect(() => {
    if (state.succeeded) {
      setShowForm(false);
      const timer = setTimeout(() => {
        setShowForm(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state.succeeded]);

  return (
    <section id="contact" className="min-h-screen flex flex-col items-center py-20">
      <motion.h2
        className="text-3xl md:text-5xl font-bold text-[var(--accent)] mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        {t.contactTitle}
      </motion.h2>

      {state.succeeded && !showForm ? (
        <motion.p
          className="text-lg text-green-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          {t.contactThanks}
        </motion.p>
      ) : (
        showForm && (
          <motion.form
            className="flex flex-col w-full max-w-xl gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="name"
              placeholder={t.contactName}
              className="px-4 py-3 rounded-xl bg-[var(--muted)] text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              required
            />
            <ValidationError prefix="Name" field="name" errors={state.errors} />

            <input
              type="email"
              name="email"
              placeholder={t.contactEmail}
              className="px-4 py-3 rounded-xl bg-[var(--muted)] text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              required
            />
            <ValidationError prefix="Email" field="email" errors={state.errors} />

            <textarea
              name="message"
              placeholder={t.contactMessage}
              rows={6}
              className="px-4 py-3 rounded-xl bg-[var(--muted)] text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              required
            />
            <ValidationError prefix="Message" field="message" errors={state.errors} />

            <button
              type="submit"
              disabled={state.submitting}
              className="px-6 py-3 rounded-xl bg-[var(--primary)] shadow-lg hover:scale-105 transition-transform"
            >
              {t.contactSubmit}
            </button>
          </motion.form>
        )
      )}
    </section>
  );
}
