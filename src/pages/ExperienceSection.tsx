import { Section } from "../components/layout/Section";
import { Container } from "../components/layout/Container";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Separator } from "../components/ui/Separator";
import { experiences, getTotalExperienceYears, getCompaniesCount } from "../data/experience";
import { Briefcase, Building2, Calendar, MapPin, CheckCircle, Clock } from "lucide-react";

/**
 * Experience Section - Professional timeline
 */

export function ExperienceSection() {
  const totalYears = getTotalExperienceYears();
  const companiesCount = getCompaniesCount();

  return (
    <Section id="experience" size="lg" background="secondary">
      <Container size="xl" padding="md">
        <header className="section-heading mb-12 text-center max-w-2xl mx-auto">
          <div className="section-eyebrow inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-accent-primary)]/15 text-[var(--color-accent-primary)] border border-[var(--color-accent-primary)]/30 mb-6">
            <Briefcase className="w-4 h-4" aria-hidden="true" />
            <span className="font-medium">Parcours professionnel</span>
          </div>
          <h2 className="font-display font-bold text-[var(--color-text-primary)] tracking-tight mb-4">
            Expériences & Réalisations
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg">
            {totalYears} ans d'expérience à travers stages, freelance et projets académiques,
            avec une progression constante vers des responsabilités full-stack.
          </p>
        </header>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <Card variant="default" padding="md" className="text-center">
            <div className="font-display font-bold text-3xl text-[var(--color-accent-primary)] mb-1">
              {totalYears}+
            </div>
            <div className="text-sm text-[var(--color-text-muted)]">Années d'expérience</div>
          </Card>
          <Card variant="default" padding="md" className="text-center">
            <div className="font-display font-bold text-3xl text-[var(--color-accent-primary)] mb-1">
              {companiesCount}+
            </div>
            <div className="text-sm text-[var(--color-text-muted)]">Entreprises / Clients</div>
          </Card>
          <Card variant="default" padding="md" className="text-center">
            <div className="font-display font-bold text-3xl text-[var(--color-accent-primary)] mb-1">
              {experiences.length}+
            </div>
            <div className="text-sm text-[var(--color-text-muted)]">Expériences significatives</div>
          </Card>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-[var(--color-border-primary)] lg:left-8" aria-hidden="true" />

          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <article
                key={exp.id}
                className="relative lg:pl-20"
                aria-labelledby={`exp-${exp.id}-title`}
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-0 top-2 w-8 h-8 rounded-full border-2 border-[var(--color-bg-primary)] flex items-center justify-center lg:left-[calc(8px_-_1rem)] lg:w-10 lg:h-10"
                  aria-hidden="true"
                >
                  <div
                    className={`w-3 h-3 rounded-full ${exp.featured ? "bg-[var(--color-accent-primary)]" : "bg-[var(--color-border-secondary)]"}`}
                  />
                </div>

                {/* Content */}
                <Card variant="interactive" padding="md" className="relative">
                  <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <h3
                          id={`exp-${exp.id}-title`}
                          className="font-display font-semibold text-[var(--color-text-primary)] truncate"
                        >
                          {exp.role}
                        </h3>
                        {exp.featured && (
                          <Badge variant="accent" size="sm">Mis en avant</Badge>
                        )}
                        {exp.current && (
                          <Badge variant="success" size="sm">En cours</Badge>
                        )}
                      </div>
                      <p className="text-[var(--color-text-secondary)] font-medium">{exp.company}</p>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-[var(--color-text-muted)] flex-wrap">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" aria-hidden="true" />
                        {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" aria-hidden="true" />
                        {exp.location}
                      </span>
                    </div>
                  </header>

                  <Separator className="my-4" />

                  <p className="text-[var(--color-text-secondary)] mb-6">{exp.description}</p>

                  {/* Achievements */}
                  {exp.achievements.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-medium text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-[var(--color-success)]" aria-hidden="true" />
                        Réalisations clés
                      </h4>
                      <ul className="space-y-2" role="list">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)]">
                            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--color-border-secondary)] mt-2" aria-hidden="true" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies */}
                  <div>
                    <h4 className="font-medium text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-[var(--color-text-muted)]" aria-hidden="true" />
                      Technologies utilisées
                    </h4>
                    <div className="flex flex-wrap gap-2" role="list" aria-label="Technologies">
                      {exp.technologies.slice(0, 12).map((tech) => (
                        <Badge key={tech} variant="outline" size="sm" role="listitem">
                          {tech}
                        </Badge>
                      ))}
                      {exp.technologies.length > 12 && (
                        <Badge variant="outline" size="sm">+{exp.technologies.length - 12}</Badge>
                      )}
                    </div>
                  </div>
                </Card>
              </article>
            ))}
          </div>
        </div>

        {/* Education Link */}
        <div className="mt-16 text-center">
          <p className="text-[var(--color-text-muted)] mb-4">
            Voir aussi mon parcours académique et certifications
          </p>
          <a
            href="#education"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-accent-primary)] hover:text-[var(--color-accent-secondary)] transition-colors"
          >
            Formation & Certifications
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </Container>
    </Section>
  );
}

/**
 * Format date range for display
 */
function formatDateRange(start: string, end?: string, current?: boolean): string {
  const formatMonthYear = (dateStr: string) => {
    const [year, month] = dateStr.split("-");
    const months = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  const startFormatted = formatMonthYear(start);
  const endFormatted = current ? "Aujourd'hui" : end ? formatMonthYear(end) : "—";

  return `${startFormatted} — ${endFormatted}`;
}
