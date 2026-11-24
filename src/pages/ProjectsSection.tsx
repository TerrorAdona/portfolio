"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Search, X } from "lucide-react";
import { Container } from "../components/layout/Container";
import { Section } from "../components/layout/Section";
import { GitHubProjectCard } from "../components/projects/GitHubProjectCard";
import { Button } from "../components/ui/Button";
import {
  githubProjects,
  type GitHubProjectCategory,
} from "../data/github-projects";
import { GitHubIcon } from "../components/ui/BrandIcons";

type ProjectFilter = "all" | GitHubProjectCategory;

const filters: { id: ProjectFilter; label: string }[] = [
  { id: "all", label: "Tous les projets" },
  { id: "web", label: "Web" },
  { id: "ai", label: "IA & données" },
  { id: "backend", label: "Backend" },
  { id: "accessibility", label: "Accessibilité" },
];

function normalizeSearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("fr");
}

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");
  const [query, setQuery] = useState("");
  const shouldReduceMotion = useReducedMotion();

  const normalizedQuery = normalizeSearch(query.trim());
  const visibleProjects = useMemo(
    () =>
      githubProjects.filter((project) => {
        const matchesFilter =
          activeFilter === "all" || project.category === activeFilter;
        const searchableContent = normalizeSearch(
          [
            project.name,
            project.description,
            project.language,
            ...project.technologies,
          ].join(" ")
        );

        return matchesFilter && searchableContent.includes(normalizedQuery);
      }),
    [activeFilter, normalizedQuery]
  );

  return (
    <Section id="projects" size="lg" background="secondary">
      <Container size="xl" padding="md">
        <header className="repo-projects-heading">
          <div>
            <p className="section-eyebrow">
              <GitHubIcon className="h-4 w-4" aria-hidden="true" />
              Projets sélectionnés
            </p>
            <h2 className="section-title">Du concret, du code, des idées.</h2>
            <p>
              Une sélection de dépôts publics, du produit web à l’IA locale et
              aux interfaces accessibles.
            </p>
          </div>
          <div className="repo-projects-count" aria-label={`${githubProjects.length} projets`}>
            <strong>{String(githubProjects.length).padStart(2, "0")}</strong>
            <span>projets publics</span>
          </div>
        </header>

        <div className="repo-projects-toolbar">
          <div className="repo-projects-filters" role="group" aria-label="Filtrer les projets">
            {filters.map((filter) => {
              const count =
                filter.id === "all"
                  ? githubProjects.length
                  : githubProjects.filter(
                      (project) => project.category === filter.id
                    ).length;
              const isActive = activeFilter === filter.id;

              return (
                <button
                  key={filter.id}
                  type="button"
                  className="repo-projects-filter"
                  aria-pressed={isActive}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.label}
                  <span>{count}</span>
                </button>
              );
            })}
          </div>

          <label className="repo-projects-search">
            <Search size={17} aria-hidden="true" />
            <span className="sr-only">Rechercher un projet</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Projet ou technologie…"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Effacer la recherche"
              >
                <X size={16} aria-hidden="true" />
              </button>
            )}
          </label>
        </div>

        <p className="repo-projects-result-count" aria-live="polite">
          {visibleProjects.length} projet{visibleProjects.length > 1 ? "s" : ""}
          {normalizedQuery ? " trouvé" + (visibleProjects.length > 1 ? "s" : "") : ""}
        </p>

        <motion.div layout className="repo-projects-grid">
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleProjects.length > 0 ? (
              visibleProjects.map((project) => (
                <motion.div
                  key={project.repository}
                  layout
                  initial={
                    shouldReduceMotion
                      ? false
                      : { opacity: 0, y: 12 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.2,
                    layout: { duration: shouldReduceMotion ? 0 : 0.22 },
                  }}
                >
                  <GitHubProjectCard project={project} />
                </motion.div>
              ))
            ) : (
              <motion.div
                key="empty"
                className="repo-projects-empty"
                initial={shouldReduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Search size={22} aria-hidden="true" />
                <h3>Aucun projet trouvé</h3>
                <p>Essaie un autre terme ou réinitialise les filtres.</p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setActiveFilter("all");
                  }}
                >
                  Réinitialiser la recherche
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="repo-projects-cta">
          <p>Envie de parcourir le reste de mon activité ?</p>
          <Button
            asAnchor
            href="https://github.com/TerrorAdona?tab=repositories"
            variant="outline"
            size="md"
            external
            rightIcon={<ArrowUpRight className="h-4 w-4" aria-hidden="true" />}
          >
            Tous mes dépôts GitHub
          </Button>
        </div>
      </Container>
    </Section>
  );
}

export default ProjectsSection;
