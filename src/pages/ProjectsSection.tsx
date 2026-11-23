import { Suspense } from "react";
import { Section } from "../components/layout/Section";
import { Container } from "../components/layout/Container";
import { Grid } from "../components/layout/Section";
import { ProjectCard, ProjectCardSkeleton } from "../components/projects/ProjectCard";
import { projects } from "../data/projects";
import { Code, Github, ExternalLink, ArrowRight } from "lucide-react";

/**
 * Projects Section - Full projects listing
 */

export function ProjectsSection() {
  const allProjects = projects;

  return (
    <Section id="projects" size="lg" background="secondary">
      <Container size="xl" padding="md">
        <header className="mb-12 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-accent-primary)]/15 text-[var(--color-accent-primary)] border border-[var(--color-accent-primary)]/30 mb-6">
            <Code className="w-4 h-4" aria-hidden="true" />
            <span className="font-medium">Tous les projets</span>
          </div>
          <h2 className="font-display font-bold text-[var(--color-text-primary)] tracking-tight mb-4">
            Portfolio de projets
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg">
            {allProjects.length} projets développés, de l'expérimentation technique aux applications full-stack en production.
          </p>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10" role="group" aria-label="Filtres projets">
          <button
            className="px-4 py-2 text-sm font-medium rounded-sm bg-[var(--color-accent-primary)] text-white transition-colors"
            aria-pressed="true"
          >
            Tous ({allProjects.length})
          </button>
          <button className="px-4 py-2 text-sm font-medium rounded-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] transition-colors">
            Backend ({allProjects.filter((p) => p.category === "backend").length})
          </button>
          <button className="px-4 py-2 text-sm font-medium rounded-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] transition-colors">
            Frontend ({allProjects.filter((p) => p.category === "frontend").length})
          </button>
          <button className="px-4 py-2 text-sm font-medium rounded-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] transition-colors">
            Full Stack ({allProjects.filter((p) => p.category === "database").length})
          </button>
        </div>

        {/* Projects Grid */}
        <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap="md" className="mb-10">
          {allProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </Grid>

        {/* Load more / CTA */}
        <div className="text-center">
          <p className="text-[var(--color-text-muted)] mb-4">
            {allProjects.length} projets au total — Les projets non terminés sont inclus pour montrer le processus d'apprentissage.
          </p>
          <a
            href="https://github.com/TerrorAdona"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-accent-primary)] hover:text-[var(--color-accent-secondary)] transition-colors"
          >
            Voir tous les dépôts sur GitHub
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </Container>
    </Section>
  );
}