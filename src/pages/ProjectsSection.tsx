"use client";

import { useState, motion } from "framer-motion";
import { Section } from "../components/layout/Section";
import { Container } from "../components/layout/Container";
import { Grid } from "../components/layout/Section";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { ProjectCard, ProjectCardSkeleton } from "../components/projects/ProjectCard";
import { projects, getFeaturedProjects, getProjectsByCategory, getAllTechnologies } from "../data/projects";
import { CodeIcon, DatabaseIcon, CloudIcon, ServerIcon, ExternalLink, GitHubIcon, SparklesIcon, ZapIcon } from "../components/ui/BrandIcons";
import { cn } from "../lib/utils";

/**
 * Projects Section - Main portfolio showcase with filtering and animations
 */

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const filterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.34, 1.56, 0.64, 1] as const,
    },
  },
};

const skeletonVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

type FilterType = "all" | "frontend" | "backend" | "fullstack" | "database" | "devops" | "tools" | "soft";

const filterOptions: { key: FilterType; label: string; icon: React.ComponentType<any>; count: number }[] = [
  { key: "all", label: "Tous", icon: SparklesIcon, count: projects.length },
  { key: "frontend", label: "Frontend", icon: CodeIcon, count: projects.filter(p => p.category === "frontend").length },
  { key: "backend", label: "Backend", icon: ServerIcon, count: projects.filter(p => p.category === "backend").length },
  { key: "fullstack", label: "Full Stack", icon: ZapIcon, count: projects.filter(p => p.category === "database").length }, // using database as fullstack proxy
  { key: "database", label: "Database", icon: DatabaseIcon, count: projects.filter(p => p.category === "database").length },
];

function FilterButton({ filter, activeFilter, onChange, count }: { filter: FilterType; activeFilter: FilterType; onChange: (f: FilterType) => void; count: number }) {
  const isActive = activeFilter === filter;

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => onChange(filter)}
      className={cn(
        "relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]",
        isActive
          ? "bg-[var(--color-accent-primary)] text-white shadow-[var(--shadow-glow-sm)]"
          : "bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)]"
      )}
      aria-pressed={isActive}
      aria-label={`Filtrer par ${filter}`}
    >
      {filterOptions.find(f => f.key === filter)?.icon && (
        <span className="mr-1.5" aria-hidden="true">
          {React.createElement(filterOptions.find(f => f.key === filter)?.icon || SparklesIcon, { className: "w-4 h-4" })}
        </span>
      )}
      {filter === "all" ? "Tous" : filterOptions.find(f => f.key === filter)?.label}
      <span
        className={cn(
          "ml-2 px-1.5 py-0.5 text-xs font-medium rounded-full",
          isActive
            ? "bg-white/20 text-white"
            : "bg-[var(--color-bg-primary)] text-[var(--color-text-muted)]"
        )}
      >
        {count}
      </span>
    </motion.button>
  );
}

function ProjectCardWrapper({ project, index }: { project: typeof projects[0]; index: number }) {
  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.05 }}
    >
      <ProjectCard project={project} />
    </motion.article>
  );
}

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [isLoading, setIsLoading] = useState(false);

  // Filter projects
  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const featuredProjects = projects.filter(p => p.featured);

  const handleFilterChange = (filter: FilterType) => {
    setIsLoading(true);
    setActiveFilter(filter);
    // Small delay for visual feedback
    setTimeout(() => setIsLoading(false), 200);
  };

  return (
    <Section id="projects" size="lg" background="secondary">
      <Container size="xl" padding="md">
        {/* Header */}
        <motion.header
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12 max-w-3xl mx-auto text-center"
        >
          <motion.div
            variants={filterVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-accent-primary)]/15 text-[var(--color-accent-primary)] border border-[var(--color-accent-primary)]/30 mb-6"
          >
            <SparklesIcon className="w-4 h-4" aria-hidden="true" />
            <span className="font-medium">Portfolio de projets</span>
          </motion.div>
          <motion.h2
            variants={filterVariants}
            className="font-display font-bold text-[var(--color-text-primary)] tracking-tight mb-4"
          >
            Mes réalisations
          </motion.h2>
          <motion.p
            variants={filterVariants}
            className="text-[var(--color-text-secondary)] text-lg"
          >
            {projects.length} projets développés, de l'expérimentation technique aux applications full-stack en production.
          </motion.p>
        </motion.header>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-10"
          role="group"
          aria-label="Filtres de projets"
        >
          {filterOptions.map((filter) => (
            <FilterButton
              key={filter.key}
              filter={filter.key}
              activeFilter={activeFilter}
              onChange={handleFilterChange}
              count={filter.count}
            />
          ))}
        </motion.div>

        {/* Featured Projects - Highlighted */}
        {activeFilter === "all" && featuredProjects.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mb-12"
            aria-labelledby="featured-title"
          >
            <h3 id="featured-title" className="sr-only">Projets mis en avant</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, i) => (
                <ProjectCardWrapper key={project.slug} project={{ ...project, featured: true }} index={i} />
              ))}
            </div>
          </motion.section>
        )}

        {/* Projects Grid */}
        <motion.div
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } }}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label={`Projets ${activeFilter === "all" ? "" : activeFilter}`}
        >
          {isLoading ? (
            Array.from({ length: 6 }, (_, i) => (
              <motion.div
                key={`skeleton-${i}`}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
              >
                <ProjectCardSkeleton />
              </motion.div>
            ))
          ) : filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectCardWrapper key={project.slug} project={project} index={index} />
            ))
          ) : (
            <motion.div
              className="col-span-full text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <SparklesIcon className="w-12 h-12 mx-auto mb-4 text-[var(--color-text-muted)]" aria-hidden="true" />
              <h3 className="font-semibold text-[var(--color-text-primary)] mb-2">
                Aucun projet trouvé
              </h3>
              <p className="text-[var(--color-text-secondary)]">
                Aucun projet ne correspond au filtre « {filterOptions.find(f => f.key === activeFilter)?.label} ».
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Stats / CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-8 mb-6 text-sm text-[var(--color-text-secondary)]">
            <span className="flex items-center gap-1.5">
              <GitHubIcon className="w-4 h-4" aria-hidden="true" />
              {projects.length} projets sur GitHub
            </span>
            <span className="flex items-center gap-1.5">
              <SparklesIcon className="w-4 h-4" aria-hidden="true" />
              {getAllTechnologies().length} technologies
            </span>
            <span className="flex items-center gap-1.5">
              <ZapIcon className="w-4 h-4" aria-hidden="true" />
              {projects.filter(p => p.status === "completed").length} terminés
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asAnchor
              href="https://github.com/TerrorAdona"
              variant="outline"
              size="lg"
              external
              rightIcon={<ExternalLink className="w-4 h-4" />}
            >
              Voir tous les dépôts
            </Button>
            <Button
              asAnchor
              href="#projects"
              variant="ghost"
              size="lg"
              className="hidden sm:inline-flex"
            >
              Réinitialiser les filtres
            </Button>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}

export default ProjectsSection;