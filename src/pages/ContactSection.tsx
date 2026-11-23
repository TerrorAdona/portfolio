import { useState } from "react";
import { Section } from "../components/layout/Section";
import { Container } from "../components/layout/Container";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Input";
import { profile } from "../data/profile";
import { Mail, Github, Linkedin, Twitter, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

/**
 * Contact Section - Contact form and information
 */

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In production, replace with actual API call
    // const response = await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });

    // Simulate success
    setStatus("success");
    setFormData({ name: "", email: "", subject: "", message: "" });

    // Reset after 5 seconds
    setTimeout(() => setStatus("idle"), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Section id="contact" size="lg" background="secondary">
      <Container size="xl" padding="md">
        <header className="mb-12 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-accent-primary)]/15 text-[var(--color-accent-primary)] border border-[var(--color-accent-primary)]/30 mb-6">
            <Send className="w-4 h-4" aria-hidden="true" />
            <span className="font-medium">Contact</span>
          </div>
          <h2 className="font-display font-bold text-[var(--color-text-primary)] tracking-tight mb-4">
            Travaillons ensemble
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg">
            Vous avez un projet en tête ? Une question technique ? Envie de collaborer ?
            N'hésitez pas à m'écrire, je réponds généralement sous 24h.
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <aside className="lg:col-span-1 space-y-6">
            <Card variant="elevated" padding="lg" className="h-full">
              <h3 className="font-display font-semibold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
                <Mail className="w-6 h-6 text-[var(--color-accent-primary)]" aria-hidden="true" />
                Me contacter
              </h3>

              <div className="space-y-4">
                <a
                  href={profile.social.email}
                  className="flex items-center gap-3 p-3 rounded-md bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-bg-hover)] transition-colors group"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-md bg-[var(--color-accent-primary)]/15 flex items-center justify-center text-[var(--color-accent-primary)] group-hover:bg-[var(--color-accent-primary)] group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--color-text-muted)] font-medium uppercase tracking-wide">Email</p>
                    <p className="text-sm text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-primary)] transition-colors">
                      {profile.email.replace("@", "<span className='text-[var(--color-accent-primary)]'>@</span>")}
                    </p>
                  </div>
                </a>

                <a
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-md bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-bg-hover)] transition-colors group"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-md bg-[var(--color-info)]/15 flex items-center justify-center text-[var(--color-info)] group-hover:bg-[var(--color-info)] group-hover:text-white transition-colors">
                    <Linkedin className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--color-text-muted)] font-medium uppercase tracking-wide">LinkedIn</p>
                    <p className="text-sm text-[var(--color-text-primary)]">Profil professionnel</p>
                  </div>
                </a>

                <a
                  href={profile.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-md bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-bg-hover)] transition-colors group"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-md bg-[var(--color-text-muted)]/15 flex items-center justify-center text-[var(--color-text-muted)] group-hover:bg-[var(--color-text-muted)] group-hover:text-white transition-colors">
                    <Github className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--color-text-muted)] font-medium uppercase tracking-wide">GitHub</p>
                    <p className="text-sm text-[var(--color-text-primary)]">Code & projets open source</p>
                  </div>
                </a>

                <a
                  href={profile.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-md bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-bg-hover)] transition-colors group"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-md bg-[var(--color-accent-tertiary)]/15 flex items-center justify-center text-[var(--color-accent-tertiary)] group-hover:bg-[var(--color-accent-tertiary)] group-hover:text-white transition-colors">
                    <Twitter className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--color-text-muted)] font-medium uppercase tracking-wide">Twitter</p>
                    <p className="text-sm text-[var(--color-text-primary)]">Veille tech & actualités</p>
                  </div>
                </a>
              </div>
            </Card>

            {/* Availability */}
            <Card variant="default" padding="md" className="border-[var(--color-accent-primary)]/30">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--color-success)]/15 flex items-center justify-center text-[var(--color-success)]">
                  <CheckCircle className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-medium text-[var(--color-text-primary)]">Disponible pour nouveaux projets</p>
                  <p className="text-sm text-[var(--color-text-muted)]">Temps plein • Freelance • CDI</p>
                </div>
              </div>
            </Card>
          </aside>

          {/* Contact Form */}
          <article className="lg:col-span-2">
            <Card variant="elevated" padding="lg">
              <h3 className="font-display font-semibold text-[var(--color-text-primary)] mb-6">
                Envoyer un message
              </h3>

              {status === "success" && (
                <div className="mb-6 p-4 rounded-md bg-[var(--color-success)]/15 border border-[var(--color-success)]/30 flex items-center gap-3" role="alert">
                  <CheckCircle className="w-5 h-5 text-[var(--color-success)] flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-[var(--color-success)]">Message envoyé !</p>
                    <p className="text-sm text-[var(--color-text-secondary)]">Je vous répondrai dès que possible.</p>
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className="mb-6 p-4 rounded-md bg-[var(--color-error)]/15 border border-[var(--color-error)]/30 flex items-center gap-3" role="alert">
                  <AlertCircle className="w-5 h-5 text-[var(--color-error)] flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-[var(--color-error)]">Erreur d'envoi</p>
                    <p className="text-sm text-[var(--color-text-secondary)]">{errorMessage || "Veuillez réessayer plus tard."}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Input
                    label="Prénom *"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Votre prénom"
                    required
                    error={status === "error" && !formData.name ? "Le prénom est requis" : undefined}
                    disabled={status === "submitting"}
                  />
                  <Input
                    label="Email *"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="vous@exemple.com"
                    required
                    error={status === "error" && !formData.email ? "L'email est requis" : undefined}
                    disabled={status === "submitting"}
                  />
                </div>

                <Input
                  label="Sujet *"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Objet de votre message"
                  required
                  error={status === "error" && !formData.subject ? "Le sujet est requis" : undefined}
                  disabled={status === "submitting"}
                />

                <Textarea
                  label="Message *"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Décrivez votre projet, votre besoin, ou posez votre question..."
                  rows={6}
                  required
                  error={status === "error" && !formData.message ? "Le message est requis" : undefined}
                  disabled={status === "submitting"}
                  helperText="Minimum 10 caractères. Soyez précis pour une réponse adaptée."
                />

                <div className="flex items-center justify-between pt-2">
                  <p className="text-xs text-[var(--color-text-muted)]">
                    * Champs obligatoires. Vos données ne sont pas stockées ni partagées.
                  </p>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={status === "submitting"}
                    rightIcon={status === "submitting" ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                    disabled={status === "submitting"}
                  >
                    {status === "submitting" ? "Envoi en cours..." : "Envoyer le message"}
                  </Button>
                </div>
              </form>
            </Card>
          </article>
        </div>

        {/* FAQ / Quick Links */}
        <div className="mt-16">
          <h3 className="font-display font-semibold text-[var(--color-text-primary)] text-center mb-8">
            Questions fréquentes
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: Code2,
                title: "Délai de réponse",
                desc: "Généralement sous 24h en jours ouvrés",
              },
              {
                icon: Github,
                title: "Types de projets",
                desc: "Full-stack, backend, frontend, consulting, audit",
              },
              {
                icon: Linkedin,
                title: "Disponibilité",
                desc: "Temps plein, freelance, CDI, missions courtes",
              },
              {
                icon: Mail,
                title: "Tarifs",
                desc: "Sur devis selon l'étendue et la complexité",
              },
            ].map((item, i) => (
              <Card key={i} variant="default" padding="md" className="text-center h-full">
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-[var(--color-bg-tertiary)] flex items-center justify-center text-[var(--color-accent-primary)]">
                  <item.icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <h4 className="font-medium text-[var(--color-text-primary)] mb-2">{item.title}</h4>
                <p className="text-sm text-[var(--color-text-secondary)]">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}