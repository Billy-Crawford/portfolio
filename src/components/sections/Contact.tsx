// billy-portfolio/src/components/sections/Contact.tsx
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";

type Props = { locale: string };

export default function Contact({ locale }: Props) {
  const t = locale === "fr" ? fr : en;
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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

      {submitted ? (
        <motion.p
          className="text-lg text-green-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          {t.contactThanks}
        </motion.p>
      ) : (
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
            value={form.name}
            onChange={handleChange}
            className="px-4 py-3 rounded-xl bg-[var(--muted)] text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            required
          />
          <input
            type="email"
            name="email"
            placeholder={t.contactEmail}
            value={form.email}
            onChange={handleChange}
            className="px-4 py-3 rounded-xl bg-[var(--muted)] text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            required
          />
          <textarea
            name="message"
            placeholder={t.contactMessage}
            value={form.message}
            onChange={handleChange}
            rows={6}
            className="px-4 py-3 rounded-xl bg-[var(--muted)] text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[var(--primary)] shadow-lg hover:scale-105 transition-transform"
          >
            {t.contactSubmit}
          </button>
        </motion.form>
      )}
    </section>
  );
}
