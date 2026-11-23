import { Section } from "../components/layout/Section";
import { Container } from "../components/layout/Container";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { TechBadgeCloud } from "../components/projects/TechBadge";
import { profile } from "../data/profile";
import { skills, getFeaturedSkills } from "../data/skills";
import { education, certifications } from "../data/education";
import { Github, Linkedin, Twitter, Mail, Award, GraduationCap, BookOpen, MapPin, Calendar, Code2 } from "lucide-react";

/**
 * About Section - Personal story, education, certifications
 */

export function AboutSection() {
  const featuredSkills = getFeaturedSkills();

  return (
    <Section id="about" size="lg" background="secondary">
      <Container size="xl" padding="md">
        <header className="mb-12 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-accent-primary)]/15 text-[var(--color-accent-primary)] border border-[var(--color-accent-primary)]/30 mb-6">
            <Code2 className="w-4 h-4" aria-hidden="true" />
            <span className="font-medium">À propos</span>
          </div>
          <h2 className="font-display font-bold text-[var(--color-text-primary)] tracking-tight mb-4">
            {profile.name}
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg">
            {profile.title} — {profile.location} — {profile.availability === "open" ? "Disponible" : "Indisponible"}
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Bio */}
          <article className="lg:col-span-2 space-y-8">
            <section aria-labelledby="bio-title">
              <h3 id="bio-title" className="font-display font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                <Code2 className="w-6 h-6 text-[var(--color-accent-primary)]" aria-hidden="true" />
                Parcours & Philosophie
              </h3>
              <div className="prose prose-invert max-w-none text-[var(--color-text-secondary)] leading-relaxed space-y-4">
                <p>{profile.bio.split("\n\n")[0]}</p>
                <p>{profile.bio.split("\n\n")[1]}</p>
                <p>{profile.bio.split("\n\n")[2]}</p>
              </div>
            </section>

            <section aria-labelledby="approach-title">
              <h3 id="approach-title" className="font-display font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                <Award className="w-6 h-6 text-[var(--color-accent-primary)]" aria-hidden="true" />
                Approche de développement
              </h3>
              <ul className="space-y-3" role="list">
                {[
                  "Code propre, typé et testé — TypeScript strict, ESLint, Prettier, tests unitaires & E2E",
                  "Accessibilité par défaut — WCAG AA, HTML sémantique, focus visible, reduced-motion",
                  "Performance first — Bundle splitting, lazy loading, optimisation images, Core Web Vitals",
                  "Architecture évolutive — Séparation données/présentation, composants réutilisables, documentation",
                  "Apprentissage continu — Veille techno, open source, expérimentation, partage de connaissances",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[var(--color-text-secondary)]">
                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[var(--color-accent-primary)] mt-2" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="tech-focus-title">
              <h3 id="tech-focus-title" className="font-display font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-[var(--color-accent-primary)]" aria-hidden="true" />
                Focus technologique actuel
              </h3>
              <TechBadgeCloud
                technologies={featuredSkills.map((s) => ({
                  name: s.name,
                  category: s.category,
                  level: s.level,
                }))}
                size="md"
                showCategory={true}
              />
            </section>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Profile Card */}
            <Card variant="elevated" padding="lg" className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-[var(--color-bg-tertiary)] overflow-hidden border-2 border-[var(--color-border-primary)]">
                <div className="w-full h-full flex items-center justify-center text-3xl font-display font-bold text-[var(--color-accent-primary)]">
                  {profile.name.split(" ").map((n) => n[0]).join("")}
                </div>
              </div>
              <h3 className="font-display font-semibold text-[var(--color-text-primary)] mb-1">{profile.name}</h3>
              <p className="text-sm text-[var(--color-text-secondary)] mb-2">{profile.title}</p>
              <p className="text-xs text-[var(--color-text-muted)] mb-4">{profile.location}</p>
              <div className="flex items-center justify-center gap-3 mb-4">
                <Badge variant={profile.availability === "open" ? "success" : "warning"} size="sm">
                  {profile.availability === "open" ? "Disponible" : "Indisponible"}
                </Badge>
              </div>
              <div className="flex items-center justify-center gap-4" role="list">
                <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-muted)] hover:text-[var(--color-accent-primary)] transition-colors" aria-label="GitHub"><Github className="w-5 h-5" /></a>
                <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-muted)] hover:text-[var(--color-accent-primary)] transition-colors" aria-label="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                <a href={profile.social.twitter} target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-muted)] hover:text-[var(--color-accent-primary)] transition-colors" aria-label="Twitter"><Twitter className="w-5 h-5" /></a>
                <a href={profile.social.email} className="text-[var(--color-text-muted)] hover:text-[var(--color-accent-primary)] transition-colors" aria-label="Email"><Mail className="w-5 h-5" /></a>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card variant="default" padding="md">
              <h4 className="font-medium text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-[var(--color-accent-primary)]" aria-hidden="true" />
                En chiffres
              </h4>
              <dl className="space-y-3" role="list">
                <div className="flex justify-between items-center">
                  <dt className="text-[var(--color-text-secondary)]">Années d'expérience</dt>
                  <dd className="font-display font-bold text-[var(--color-accent-primary)]">{profile.yearsExperience}+</dd>
                </div>
                <div className="flex justify-between items-center">
                  <dt className="text-[var(--color-text-secondary)]">Projets réalisés</dt>
                  <dd className="font-display font-bold text-[var(--color-accent-primary)]">{profile.projectsCompleted}+</dd>
                </div>
                <div className="flex justify-between items-center">
                  <dt className="text-[var(--color-text-secondary)]">Technologies maîtrisées</dt>
                  <dd className="font-display font-bold text-[var(--color-accent-primary)]">{profile.technologiesCount}+</dd>
                </div>
              </dl>
            </Card>

            {/* Top Skills */}
            <Card variant="default" padding="md">
              <h4 className="font-medium text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-[var(--color-accent-primary)]" aria-hidden="true" />
                Top compétences
              </h4>
              <div className="flex flex-wrap gap-2" role="list">
                {profile.topSkills.map((skill) => (
                  <Badge key={skill} variant="accent" size="sm" role="listitem">{skill}</Badge>
                ))}
              </div>
            </Card>
          </aside>
        </div>

        {/* Education & Certifications */}
        <div className="mt-16 grid lg:grid-cols-2 gap-8">
          {/* Education */}
          <section aria-labelledby="education-title">
            <header className="mb-6 flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-md bg-[var(--color-bg-tertiary)] text-[var(--color-accent-primary)]">
                <GraduationCap className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 id="education-title" className="font-display font-semibold text-[var(--color-text-primary)]">
                Formation
              </h3>
            </header>
            <div className="space-y-4">
              {education.map((edu) => (
                <article key={edu.id} className="p-4 bg-[var(--color-bg-tertiary)] rounded-lg border border-[var(--color-border-primary)]">
                  <header className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h4 className="font-medium text-[var(--color-text-primary)]">{edu.degree}</h4>
                      <p className="text-sm text-[var(--color-text-secondary)]">{edu.field}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-[var(--color-text-muted)] flex-shrink-0">
                      <Calendar className="w-3 h-3" aria-hidden="true" />
                      <span>{formatDateRange(edu.startDate, edu.endDate, edu.current)}</span>
                    </div>
                  </header>
                  <p className="text-sm text-[var(--color-text-muted)] mb-2">{edu.institution}, {edu.location}</p>
                  {edu.grade && (
                    <p className="text-sm text-[var(--color-text-muted)]">
                      <span className="font-medium">Mention : </span>{edu.grade}
                    </p>
                  )}
                  {edu.achievements && edu.achievements.length > 0 && (
                    <ul className="mt-2 space-y-1" role="list">
                      {edu.achievements.map((ach, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-[var(--color-text-muted)]">
                          <span className="flex-shrink-0 w-1 h-1 rounded-full bg-[var(--color-border-secondary)] mt-1.5" aria-hidden="true" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section aria-labelledby="certifications-title">
            <header className="mb-6 flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-md bg-[var(--color-bg-tertiary)] text-[var(--color-warning)]">
                <Award className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 id="certifications-title" className="font-display font-semibold text-[var(--color-text-primary)]">
                Certifications
              </h3>
            </header>
            <div className="space-y-4">
              {certifications.map((cert) => (
                <article key={cert.id} className="p-4 bg-[var(--color-bg-tertiary)] rounded-lg border border-[var(--color-border-primary)]">
                  <header className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h4 className="font-medium text-[var(--color-text-primary)]">{cert.name}</h4>
                      <p className="text-sm text-[var(--color-text-secondary)]">{cert.issuer}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-[var(--color-text-muted)] flex-shrink-0">
                      <Calendar className="w-3 h-3" aria-hidden="true" />
                      <span>{formatMonthYear(cert.date)}</span>
                    </div>
                  </header>
                  {cert.skills && cert.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1" role="list">
                      {cert.skills.map((skill) => (
                        <Badge key={skill} variant="outline" size="sm" role="listitem">{skill}</Badge>
                      ))}
                    </div>
                  )}
                  {cert.verificationUrl && (
                    <a href={cert.verificationUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-[var(--color-accent-primary)] hover:text-[var(--color-accent-secondary)] transition-colors mt-2">
                      Vérifier <span aria-hidden="true">→</span>
                    </a>
                  )}
                </article>
              ))}
            </div>
          </section>
        </div>
      </Container>
    </Section>
  );
}

function formatDateRange(start: string, end?: string, current?: boolean): string {
  const [startYear, startMonth] = start.split("-");
  const months = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
  const startFormatted = `${months[parseInt(startMonth) - 1]} ${startYear}`;

  if (current) return `${startFormatted} — Aujourd'hui`;
  if (!end) return startFormatted;

  const [endYear, endMonth] = end.split("-");
  const endFormatted = `${months[parseInt(endMonth) - 1]} ${endYear}`;

  return `${startFormatted} — ${endFormatted}`;
}

function formatMonthYear(dateStr: string): string {
  const [year, month] = dateStr.split("-");
  const months = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
  return `${months[parseInt(month) - 1]} ${year}`;
}