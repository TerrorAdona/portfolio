import { Section } from "../components/layout/Section";
import { Container } from "../components/layout/Container";
import { TechStackCategories } from "../components/projects/TechBadge";
import { skills, skillCategories, getSkillsByCategory } from "../data/skills";
import { Sparkles, Zap, Database, Cloud, Code, Award } from "lucide-react";

/**
 * Skills Section - Detailed skills breakdown
 */

const categoryIcons = {
  frontend: <Code className="w-5 h-5" aria-hidden="true" />,
  backend: <Zap className="w-5 h-5" aria-hidden="true" />,
  database: <Database className="w-5 h-5" aria-hidden="true" />,
  devops: <Cloud className="w-5 h-5" aria-hidden="true" />,
  tools: <Award className="w-5 h-5" aria-hidden="true" />,
  soft: <Sparkles className="w-5 h-5" aria-hidden="true" />,
};

export function SkillsSection() {
  return (
    <Section id="skills" size="lg" background="secondary">
      <Container size="xl" padding="md">
        <header className="mb-12 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-accent-primary)]/15 text-[var(--color-accent-primary)] border border-[var(--color-accent-primary)]/30 mb-6">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            <span className="font-medium">Compétences techniques</span>
          </div>
          <h2 className="font-display font-bold text-[var(--color-text-primary)] tracking-tight mb-4">
            Stack technique & Expertise
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg">
            Une expertise ciblée sur l'écosystème JavaScript/TypeScript moderne et les architectures backend robustes,
            avec une approche pragmatique : choisir le bon outil pour le problème.
          </p>
        </header>

        <div className="space-y-10">
          {skillCategories.map((cat) => {
            const catSkills = getSkillsByCategory(cat.key);
            const mastered = catSkills.filter((s) => s.level >= 4).length;
            const experimented = catSkills.filter((s) => s.level < 4).length;

            if (catSkills.length === 0) return null;

            return (
              <section key={cat.key} className="space-y-4" aria-labelledby={`skills-${cat.key}`}>
                <header className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center justify-center w-12 h-12 rounded-md bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)]">
                    {categoryIcons[cat.key as keyof typeof categoryIcons] || <span>📦</span>}
                  </div>
                  <div>
                    <h3 id={`skills-${cat.key}`} className="font-display font-semibold text-[var(--color-text-primary)]">
                      {cat.label}
                    </h3>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      {mastered} maîtrisés{experimented > 0 ? `, ${experimented} expérimentés` : ""} — {catSkills.length} total
                    </p>
                  </div>
                </header>

                <TechStackCategories
                  categories={{
                    [cat.key]: catSkills.map((s) => ({
                      name: s.name,
                      level: s.level,
                    })),
                  }}
                  size="md"
                  showLevel={true}
                />
              </section>
            );
          })}
        </div>

        {/* Proficiency Legend */}
        <div className="mt-12 p-6 bg-[var(--color-bg-tertiary)] rounded-lg border border-[var(--color-border-primary)]">
          <h4 className="font-medium text-[var(--color-text-primary)] mb-4">Niveaux de maîtrise</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { level: 5, label: "Expert", desc: "Architecture, optimisation, mentorat, contributions open source" },
              { level: 4, label: "Avancé", desc: "Autonome sur projets complexes, bonnes pratiques, debugging avancé" },
              { level: 3, label: "Intermédiaire", desc: "Productif au quotidien, compréhension solide, apprentissage actif" },
              { level: 2, label: "Débutant+", desc: "Bases acquises, projets guidés, documentation fréquente" },
              { level: 1, label: "Découverte", desc: "Notions de base, tutoriels, expérimentations初期" },
            ].map(({ level, label, desc }) => (
              <div key={level} className="p-4 bg-[var(--color-bg-secondary)] rounded-md border border-[var(--color-border-primary)]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-display font-bold text-[var(--color-text-primary)]">{level}/5</span>
                  <span className="font-medium text-[var(--color-text-secondary)]">{label}</span>
                </div>
                <p className="text-sm text-[var(--color-text-muted)]">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <section className="mt-16" aria-labelledby="soft-skills">
          <header className="mb-8">
            <h3 id="soft-skills" className="font-display font-semibold text-[var(--color-text-primary)] mb-2">
              Soft Skills
            </h3>
            <p className="text-[var(--color-text-secondary)]">
              Au-delà du technique, ces compétences transverses sont essentielles pour livrer des projets de qualité en équipe.
            </p>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills
              .filter((s) => s.category === "soft")
              .map((skill) => (
                <article
                  key={skill.id}
                  className="p-5 bg-[var(--color-bg-tertiary)] rounded-lg border border-[var(--color-border-primary)] hover:border-[var(--color-border-secondary)] transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-md bg-[var(--color-accent-primary)]/15 flex items-center justify-center text-[var(--color-accent-primary)]">
                      <Sparkles className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="font-medium text-[var(--color-text-primary)]">{skill.name}</h4>
                      <p className="text-sm text-[var(--color-text-muted)] mt-1">{skill.description}</p>
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </section>
      </Container>
    </Section>
  );
}