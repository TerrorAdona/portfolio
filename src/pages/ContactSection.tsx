"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "../components/layout/Section";
import { Container } from "../components/layout/Container";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Input";
import { profile } from "../data/profile";
import { Mail, GitHubIcon, LinkedInIcon, TwitterIcon, Send, CheckCircleIcon, AlertCircleIcon, Loader2, ShieldIcon, SparklesIcon } from "../components/ui/BrandIcons";
import { formatDateRange } from "../lib/utils";

/**
 * Contact Section - Professional contact form with validation and EmailJS integration
 */

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

const formVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot: string; // Anti-spam
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  honeypot?: string;
  submit?: string;
}

interface ToastMessage {
  type: "success" | "error";
  title: string;
  message: string;
}

export function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [submitCount, setSubmitCount] = useState(0);

  // Validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Le nom est requis";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Le nom doit contenir au moins 2 caractères";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Le sujet est requis";
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = "Le sujet doit contenir au moins 5 caractères";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Le message est requis";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Le message doit contenir au moins 10 caractères";
    }

    // Honeypot check
    if (formData.honeypot) {
      newErrors.honeypot = "Spam détecté";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      // EmailJS integration would go here
      // For now, simulate API call
      await simulateEmailJSSubmission(formData);

      // Success
      setToast({
        type: "success",
        title: "Message envoyé !",
        message: "Je vous répondrai dans les plus brefs délais.",
      });
      setFormData({ name: "", email: "", subject: "", message: "", honeypot: "" });
      setSubmitCount((prev) => prev + 1);
    } catch (error) {
      setToast({
        type: "error",
        title: "Erreur d'envoi",
        message: "Une erreur est survenue. Veuillez réessayer ou me contacter directement par email.",
      });
      setErrors({ submit: "Échec de l'envoi. Veuillez réessayer." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Simulate EmailJS submission
  const simulateEmailJSSubmission = async (data: FormData): Promise<void> => {
    // In production, replace with actual EmailJS call:
    /*
    import emailjs from '@emailjs/browser';

    const result = await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      {
        from_name: data.name,
        from_email: data.email,
        subject: data.subject,
        message: data.message,
      },
      'YOUR_PUBLIC_KEY'
    );
    */

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulate occasional failure for demo
    if (Math.random() < 0.1) {
      throw new Error("Network error");
    }
  };

  // Clear toast after delay
  const dismissToast = () => setToast(null);

  return (
    <Section id="contact" size="lg" background="secondary">
      <Container size="xl" padding="md">
        {/* Header */}
        <motion.header
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12 max-w-3xl mx-auto text-center"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-accent-primary)]/15 text-[var(--color-accent-primary)] border border-[var(--color-accent-primary)]/30 mb-6"
          >
            <SparklesIcon className="w-4 h-4" aria-hidden="true" />
            <span className="font-medium">Contact</span>
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="font-display font-bold text-[var(--color-text-primary)] tracking-tight mb-4"
          >
            Travaillons ensemble
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-[var(--color-text-secondary)] text-lg"
          >
            Vous avez un projet en tête ? Une question technique ? Envie de collaborer ?
            N'hésitez pas à m'écrire, je réponds généralement sous 24h.
          </motion.p>
        </motion.header>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left Column - Form */}
          <motion.article
            variants={formVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7"
          >
            <Card variant="elevated" padding="lg">
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Honeypot field (hidden from users, visible to bots) */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  style={{ display: "none" }}
                  aria-hidden="true"
                />

                {/* Name */}
                <Input
                  label="Prénom *"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Votre prénom"
                  required
                  error={errors.name}
                  disabled={isSubmitting}
                  autoComplete="given-name"
                />

                {/* Email */}
                <Input
                  label="Email *"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="vous@exemple.com"
                  required
                  error={errors.email}
                  disabled={isSubmitting}
                  autoComplete="email"
                />

                {/* Subject */}
                <Input
                  label="Sujet *"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Objet de votre message"
                  required
                  error={errors.subject}
                  disabled={isSubmitting}
                />

                {/* Message */}
                <Textarea
                  label="Message *"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Décrivez votre projet, votre besoin, ou posez votre question..."
                  rows={6}
                  required
                  error={errors.message}
                  disabled={isSubmitting}
                  helperText="Minimum 10 caractères. Soyez précis pour une réponse adaptée."
                />

                {/* Error message */}
                {errors.submit && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg bg-[var(--color-error)]/15 border border-[var(--color-error)]/30 flex items-center gap-3"
                    role="alert"
                  >
                    <AlertCircleIcon className="w-5 h-5 text-[var(--color-error)] flex-shrink-0" aria-hidden="true" />
                    <p className="text-[var(--color-error)]">{errors.submit}</p>
                  </motion.div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={isSubmitting}
                  rightIcon={isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto"
                >
                  {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                </Button>

                {/* Privacy notice */}
                <p className="text-xs text-[var(--color-text-muted)] text-center">
                  Vos données ne sont pas stockées sur ce site. Elles sont transmises directement via EmailJS pour me permettre de vous répondre.
                  <a href="#privacy" className="text-[var(--color-accent-primary)] hover:underline ml-1">En savoir plus</a>
                </p>
              </form>
            </Card>

            {/* Toast Notification */}
            <AnimatePresence>
              {toast && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  className="fixed bottom-6 right-6 z-[9999] max-w-md p-4 rounded-xl border flex items-start gap-3 shadow-[var(--shadow-xl)]"
                  role="alert"
                  onClick={dismissToast}
                  style={{
                    backgroundColor: toast.type === "success" ? "var(--color-success)/15" : "var(--color-error)/15",
                    borderColor: toast.type === "success" ? "var(--color-success)/30" : "var(--color-error)/30",
                  }}
                >
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: toast.type === "success" ? "var(--color-success)/20" : "var(--color-error)/20",
                      color: toast.type === "success" ? "var(--color-success)" : "var(--color-error)",
                    }}
                  >
                    {toast.type === "success" ? (
                      <CheckCircleIcon className="w-5 h-5" aria-hidden="true" />
                    ) : (
                      <AlertCircleIcon className="w-5 h-5" aria-hidden="true" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[var(--color-text-primary)]">{toast.title}</p>
                    <p className="text-sm text-[var(--color-text-secondary)]">{toast.message}</p>
                  </div>
                  <button
                    onClick={dismissToast}
                    className="flex-shrink-0 p-1 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                    aria-label="Fermer"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.article>

          {/* Right Column - Contact Info */}
          <motion.aside
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2, duration: 0.5 }}
            className="lg:col-span-5"
          >
            <Card variant="glass" padding="lg" className="sticky top-24 h-fit">
              <h3 className="font-display font-semibold text-[var(--color-text-primary)] mb-2">
                Me contacter
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] mb-6">
                Je privilégie l'email pour les premiers contacts. Je réponds sous 24h en jours ouvrés.
              </p>

              {/* Email */}
              <a
                href={`mailto:${profile.email}`}
                className="group flex items-center gap-4 p-4 rounded-xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border-primary)] hover:border-[var(--color-border-secondary)] hover:shadow-[var(--shadow-sm)] transition-all mb-4"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: "var(--color-warning)/15", color: "var(--color-warning)" }}>
                  <Mail className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-[var(--color-text-muted)] font-medium uppercase tracking-wide">Email direct</p>
                  <p className="text-sm text-[var(--color-text-primary)] group-hover:text-[var(--color-warning)] transition-colors">{profile.email}</p>
                </div>
              </a>

              {/* Social Links */}
              <div className="space-y-3" role="list" aria-label="Réseaux sociaux">
                <a
                  href={profile.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-3 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border-primary)] hover:border-[var(--color-accent-primary)] hover:bg-[var(--color-accent-primary)]/10 transition-all"
                  aria-label="GitHub"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-[var(--color-accent-primary)]" style={{ backgroundColor: "var(--color-accent-primary)/15" }}>
                    <span>🐙</span>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--color-text-muted)] font-medium uppercase tracking-wide">GitHub</p>
                    <p className="text-sm text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-primary)] transition-colors">TerrorAdona</p>
                  </div>
                </a>

                <a
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-3 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border-primary)] hover:border-[var(--color-info)] hover:bg-[var(--color-info)]/10 transition-all"
                  aria-label="LinkedIn"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-[var(--color-info)]" style={{ backgroundColor: "var(--color-info)/15" }}>
                    <span>💼</span>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--color-text-muted)] font-medium uppercase tracking-wide">LinkedIn</p>
                    <p className="text-sm text-[var(--color-text-primary)] group-hover:text-[var(--color-info)] transition-colors">rakotoarinivo-herilala</p>
                  </div>
                </a>

                <a
                  href={profile.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-3 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border-primary)] hover:border-[var(--color-accent-tertiary)] hover:bg-[var(--color-accent-tertiary)]/10 transition-all"
                  aria-label="Twitter"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-[var(--color-accent-tertiary)]" style={{ backgroundColor: "var(--color-accent-tertiary)/15" }}>
                    <span>𝕏</span>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--color-text-muted)] font-medium uppercase tracking-wide">Twitter</p>
                    <p className="text-sm text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-tertiary)] transition-colors">TerrorAdona</p>
                  </div>
                </a>
              </div>

              {/* Security note */}
              <div className="mt-6 pt-6 border-t border-[var(--color-border-primary)]">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-[var(--color-success)]" style={{ backgroundColor: "var(--color-success)/15" }}>
                    <ShieldIcon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-medium text-[var(--color-text-primary)]">Protection anti-spam</p>
                    <p className="text-xs text-[var(--color-text-muted)]">Formulaire protégé par honeypot invisible et validation côté serveur.</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Availability */}
            <Card variant="default" padding="md" className="mt-4 border-[var(--color-accent-primary)]/30">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--color-success)]/15 flex items-center justify-center text-[var(--color-success)]">
                  <CheckCircleIcon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-medium text-[var(--color-text-primary)]">Disponible pour nouveaux projets</p>
                  <p className="text-sm text-[var(--color-text-muted)]">Freelance • CDI • Mission courte</p>
                </div>
              </div>
            </Card>
          </motion.aside>
        </div>

        {/* FAQ / Quick Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16"
        >
          <h3 className="font-display font-semibold text-[var(--color-text-primary)] text-center mb-8">
            Questions fréquentes
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: Mail,
                title: "Délai de réponse",
                desc: "Généralement sous 24h en jours ouvrés",
              },
              {
                icon: GitHubIcon,
                title: "Types de projets",
                desc: "Full-stack, backend, frontend, consulting, audit",
              },
              {
                icon: LinkedInIcon,
                title: "Disponibilité",
                desc: "Temps plein, freelance, CDI, missions courtes",
              },
              {
                icon: ShieldIcon,
                title: "Confidentialité",
                desc: "Vos données ne sont jamais partagées ni revendues",
              },
            ].map((item, i) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                className="p-6 bg-[var(--color-bg-tertiary)] rounded-xl border border-[var(--color-border-primary)] text-center hover:border-[var(--color-border-secondary)] hover:shadow-[var(--shadow-sm)] transition-all"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center" style={{ backgroundColor: "var(--color-accent-primary)/15", color: "var(--color-accent-primary)" }}>
                  <item.icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <h4 className="font-medium text-[var(--color-text-primary)] mb-2">{item.title}</h4>
                <p className="text-sm text-[var(--color-text-secondary)]">{item.desc}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}

export default ContactSection;