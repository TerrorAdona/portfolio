"use client";

import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { Section } from "../components/layout/Section";
import { Container } from "../components/layout/Container";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Separator } from "../components/ui/Separator";
import { projects, getProjectBySlug } from "../data/projects";
import { ExternalLink, ArrowRight, ArrowLeft, GitHubIcon, CodeIcon, DatabaseIcon, CloudIcon, ServerIcon, WrenchIcon, TestTubeIcon, ShieldIcon, ZapIcon, AwardIcon, SparklesIcon, Calendar, MapPin, Clock, Users, GlobeIcon } from "../components/ui/BrandIcons";
import { formatDateRange } from "../lib/utils";
import { cn } from "../lib/utils";

/**
 * Project Detail Page - Structured presentation of a single project
 */

const animationVariants = {
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

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

const categoryIcons: Record<string, React.ComponentType<any>> = {
  backend: ServerIcon,
  frontend: CodeIcon,
  database: DatabaseIcon,
  devops: GlobeIcon,
  tools: WrenchIcon,
  testing: TestTubeIcon,
  soft: SparklesIcon,
};

function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, { label: string; variant: "success" | "warning" | "default" | "accent" }> = {
    completed: { label: "Terminé", variant: "success" },
    "in-progress": { label: "En cours", variant: "accent" },
    experimental: { label: "Expérimental", variant: "warning" },
    archived: { label: "Archivé", variant: "default" },
  };

  const config = variants[status] || { label: status, variant: "default" };

  return (
    <Badge variant={config.variant} size="sm">
      {config.label}
    </Badge>
  );
}

function TechBadge({ tech }: { tech: { name: string; category: string; featured?: boolean } }) {
  const IconComponent = categoryIcons[tech.category] || CodeIcon;

  return (
    <Badge
      variant={tech.featured ? "accent" : "outline"}
      size="sm"
      className="group transition-colors hover:bg-[var(--color-accent-primary)]/10"
    >
      <IconComponent className="w-3 h-3 mr-1.5" aria-hidden="true" />
      {tech.name}
    </Badge>
  );
}

function HighlightCard({ highlight, index }: { highlight: { title: string; description: string; icon?: string }; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
      className="p-5 bg-[var(--color-bg-tertiary)] rounded-xl border border-[var(--color-border-primary)] transition-all hover:border-[var(--color-border-secondary)] hover:shadow-[var(--shadow-sm)]"
    >
      <div className="flex items-start gap-4">
        <div
          className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
          style={{ backgroundColor: "var(--color-accent-primary)/15", color: "var(--color-accent-primary)" }}
        >
          <span role="img" aria-hidden="true">{highlight.icon || "✨"}</span>
        </div>
        <div>
          <h4 className="font-semibold text-[var(--color-text-primary)] mb-1">{highlight.title}</h4>
          <p className="text-sm text-[var(--color-text-secondary)]">{highlight.description}</p>
        </div>
      </div>
    </motion.article>
  );
}

function FeatureList({ features, title }: { features: string[]; title: string }) {
  return (
    <section className="space-y-3" aria-labelledby={title.toLowerCase().replace(/\s+/g, "-")}>
      <h3 className="font-semibold text-[var(--color-text-primary)] flex items-center gap-2">
        <SparklesIcon className="w-5 h-5 text-[var(--color-accent-primary)]" aria-hidden="true" />
        {title}
      </h3>
      <ul className="space-y-2" role="list">
        {features.map((feature, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
            className="flex items-start gap-3 p-3 bg-[var(--color-bg-tertiary)] rounded-lg border border-[var(--color-border-primary)]"
          >
            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--color-accent-primary)] mt-2" aria-hidden="true" />
            <span className="text-[var(--color-text-secondary)]">{feature}</span>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

function TechStackGrid({ techStack, title }: { techStack: Array<{ name: string; category: string; featured?: boolean }>; title: string }) {
  // Group by category
  const categories = techStack.reduce((acc, tech) => {
    if (!acc[tech.category]) acc[tech.category] = [];
    acc[tech.category].push(tech);
    return acc;
  }, {} as Record<string, typeof techStack>);

  const orderedCategories = ["frontend", "backend", "database", "devops", "tools", "testing", "soft"];

  return (
    <section aria-labelledby="tech-stack-title">
      <h3 id="tech-stack-title" className="font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
        <CodeIcon className="w-5 h-5 text-[var(--color-accent-primary)]" aria-hidden="true" />
        {title}
      </h3>
      <div className="space-y-4">
        {orderedCategories.map((cat) => {
          const techs = categories[cat];
          if (!techs || techs.length === 0) return null;

          const IconComponent = categoryIcons[cat] || CodeIcon;

          return (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-2 mb-2">
                <IconComponent className="w-4 h-4 text-[var(--color-accent-primary)]" aria-hidden="true" />
                <h4 className="font-medium text-[var(--color-text-primary)] capitalize">{cat}</h4>
                <span className="text-xs text-[var(--color-text-muted)]">({techs.length})</span>
              </div>
              <div className="flex flex-wrap gap-2 ml-6" role="list">
                {techs.map((tech) => (
                  <TechBadge key={tech.name} tech={tech} />
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function MetaInfo({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-[var(--color-bg-tertiary)] rounded-lg border border-[var(--color-border-primary)]">
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--color-accent-primary)]/15 flex items-center justify-center text-[var(--color-accent-primary)]">
        {icon}
      </div>
      <div>
        <p className="text-xs text-[var(--color-text-muted)] font-medium uppercase tracking-wide">{label}</p>
        <p className="text-sm text-[var(--color-text-primary)]">{value}</p>
      </div>
    </div>
  );
}

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug || "");

  if (!project) {
    return (
      <Section size="lg" background="secondary">
        <Container size="xl" padding="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <h2 className="font-display font-bold text-[var(--color-text-primary)] mb-4">Projet introuvable</h2>
            <p className="text-[var(--color-text-secondary)] mb-6">Le projet demandé n'existe pas.</p>
            <Button asAnchor href="/#projects" variant="primary">
              Retour aux projets
            </Button>
          </motion.div>
        </Container>
      </Section>
    );
  }

  return (
    <>
      {/* Breadcrumb / Header */}
      <Section size="sm" background="gradient" className="relative">
        <Container size="xl" padding="md">
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-4"
            aria-label="Fil d'Ariane"
          >
            <a href="/" className="hover:text-[var(--color-text-primary)] transition-colors">Accueil</a>
            <span aria-hidden="true">/</span>
            <a href="#projects" className="hover:text-[var(--color-text-primary)] transition-colors">Projets</a>
            <span aria-hidden="true">/</span>
            <span className="text-[var(--color-text-primary)] font-medium">{project.name}</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4"
          >
            <div>
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <StatusBadge status={project.status} />
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="font-display font-bold text-[var(--color-text-primary)] mt-2 mb-2"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
              >
                {project.name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-[var(--color-text-secondary)] text-lg"
              >
                {project.tagline}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-wrap items-center gap-3"
            >
              {project.repository && (
                <Button
                  asAnchor
                  href={project.repository}
                  variant="ghost"
                  size="lg"
                  external
                  leftIcon={<GitHubIcon className="w-5 h-5" />}
                >
                  Code source
                </Button>
              )}
              {project.demo && (
                <Button
                  asAnchor
                  href={project.demo}
                  variant="primary"
                  size="lg"
                  external
                  rightIcon={<ExternalLink className="w-5 h-5" />}
                >
                  Démo en ligne
                </Button>
              )}
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* Main Content */}
      <Section size="lg" background="secondary">
        <Container size="xl" padding="md">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Left Column - Main Content */}
            <motion.article
              className="lg:col-span-8 space-y-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Description */}
              <section aria-labelledby="description-title">
                <h2 id="description-title" className="font-display font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                  <CodeIcon className="w-6 h-6 text-[var(--color-accent-primary)]" aria-hidden="true" />
                  Présentation
                </h2>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="prose prose-invert max-w-none text-[var(--color-text-secondary)] leading-relaxed space-y-4"
                >
                  <p>{project.description}</p>
                </motion.div>
              </section>

              {/* Problem & Solution */}
              <div className="grid md:grid-cols-2 gap-6">
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="p-5 bg-[var(--color-bg-tertiary)] rounded-xl border border-[var(--color-border-primary)]"
                >
                  <h3 className="font-semibold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
                    <ZapIcon className="w-5 h-5 text-[var(--color-warning)]" aria-hidden="true" />
                    Problématique
                  </h3>
                  <p className="text-[var(--color-text-secondary)]">{project.problem}</p>
                </motion.section>

                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="p-5 bg-[var(--color-bg-tertiary)] rounded-xl border border-[var(--color-border-primary)]"
                >
                  <h3 className="font-semibold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
                    <SparklesIcon className="w-5 h-5 text-[var(--color-accent-primary)]" aria-hidden="true" />
                    Solution apportée
                  </h3>
                  <p className="text-[var(--color-text-secondary)]">{project.solution}</p>
                </motion.section>
              </div>

              {/* Objectives */}
              <section aria-labelledby="objectives-title">
                <h2 className="font-display font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                  <AwardIcon className="w-6 h-6 text-[var(--color-accent-primary)]" aria-hidden="true" />
                  Objectifs
                </h2>
                <FeatureList
                  features={[
                    "Concevoir une architecture robuste et évolutive",
                    "Implémenter une solution complète et fonctionnelle",
                    "Assurer la sécurité et la performance",
                    "Documenter l'architecture et les décisions techniques",
                    "Déployer en production avec CI/CD",
                  ]}
                  title="Objectifs du projet"
                />
              </section>

              {/* Technical Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <section aria-labelledby="highlights-title">
                  <h2 className="font-display font-semibold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
                    <AwardIcon className="w-6 h-6 text-[var(--color-accent-primary)]" aria-hidden="true" />
                    Points forts techniques
                  </h2>
                  <motion.div
                    className="grid md:grid-cols-2 gap-4"
                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
                    initial="hidden"
                    animate="visible"
                  >
                    {project.highlights.map((highlight, i) => (
                      <HighlightCard key={highlight.title} highlight={highlight} index={i} />
                    ))}
                  </motion.div>
                </section>
              )}

              {/* Features */}
              <FeatureList features={project.features} title="Fonctionnalités principales" />

              {/* Technical Architecture */}
              <section aria-labelledby="architecture-title">
                <h2 className="font-display font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                  <ServerIcon className="w-6 h-6 text-[var(--color-accent-primary)]" aria-hidden="true" />
                  Architecture technique
                </h2>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="prose prose-invert max-w-none text-[var(--color-text-secondary)] leading-relaxed space-y-4"
                >
                  <p>
                    Le projet suit une architecture <strong>MVC (Modèle-Vue-Contrôleur)</strong> classique avec une séparation claire des responsabilités.
                    La couche de présentation utilise <strong>Thymeleaf</strong> pour le rendu côté serveur, offrant un SEO optimal et une performance initiale rapide.
                  </p>
                  <p>
                    La couche métier utilise <strong>Spring Boot 3</strong> avec <strong>Spring Data JPA</strong> pour l'accès aux données,
                    et <strong>Spring Security 6</strong> pour l'authentification et l'autorisation (JWT, RBAC).
                  </p>
                  <p>
                    La base de données <strong>MySQL 8</strong> est gérée via <strong>Flyway</strong> pour les migrations versionnées.
                    L'application est conteneurisée avec <strong>Docker</strong> (multi-stage build) et déployée via <strong>GitHub Actions</strong>.
                  </p>
                </motion.div>
              </section>

              {/* Tech Stack */}
              <TechStackGrid techStack={project.techStack} title="Technologies utilisées" />

              {/* Challenges & Solutions */}
              {(project.highlights && project.highlights.length > 0) && (
                <section aria-labelledby="challenges-title">
                  <h2 className="font-display font-semibold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
                    <ShieldIcon className="w-6 h-6 text-[var(--color-accent-primary)]" aria-hidden="true" />
                    Difficultés rencontrées & Solutions
                  </h2>
                  <motion.div
                    className="space-y-4"
                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
                    initial="hidden"
                    animate="visible"
                  >
                    {project.highlights.map((highlight, i) => (
                      <motion.article
                        key={highlight.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
                        className="p-5 bg-[var(--color-bg-tertiary)] rounded-xl border border-[var(--color-border-primary)]"
                      >
                        <h4 className="font-semibold text-[var(--color-text-primary)] mb-2 flex items-center gap-2">
                          <ShieldIcon className="w-5 h-5 text-[var(--color-accent-primary)]" aria-hidden="true" />
                          {highlight.title}
                        </h4>
                        <p className="text-[var(--color-text-secondary)]">{highlight.description}</p>
                      </motion.article>
                    ))}
                  </motion.div>
                </section>
              )}

              {/* Screenshots placeholder */}
              <section aria-labelledby="screenshots-title">
                <h2 className="font-display font-semibold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
                  <AwardIcon className="w-6 h-6 text-[var(--color-accent-primary)]" aria-hidden="true" />
                  Captures d'écran
                </h2>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                      className="aspect-video bg-[var(--color-bg-tertiary)] rounded-xl border border-[var(--color-border-primary)] flex items-center justify-center overflow-hidden relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-primary)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative z-10 text-center p-8">
                        <CodeIcon className="w-12 h-12 mx-auto mb-3 text-[var(--color-text-muted)]" aria-hidden="true" />
                        <p className="text-[var(--color-text-secondary)]">Capture d'écran {i}</p>
                        <p className="text-xs text-[var(--color-text-muted)] mt-1">Ajouter une vraie capture</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </section>
            </motion.article>

            {/* Right Column - Sidebar */}
            <motion.aside
              className="lg:col-span-4 space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {/* Project Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="aspect-video bg-[var(--color-bg-tertiary)] rounded-xl border border-[var(--color-border-primary)] overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-primary)]/5 to-transparent" />
                <div className="relative h-full flex items-center justify-center">
                  <div className="text-center p-8">
                    <CodeIcon className="w-24 h-24 mx-auto mb-4 text-[var(--color-text-muted)]" aria-hidden="true" />
                    <h3 className="font-display font-semibold text-[var(--color-text-primary)] mb-2">{project.name}</h3>
                    <p className="text-[var(--color-text-secondary)]">Image de présentation du projet</p>
                  </div>
                </div>
              </motion.div>

              {/* Meta Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="space-y-3"
              >
                <h3 className="font-semibold text-[var(--color-text-primary)]">Informations</h3>
                <MetaInfo
                  label="Statut"
                  value={
                    <>
                      <StatusBadge status={project.status} />
                    </>
                  }
                  icon={<AwardIcon className="w-5 h-5" aria-hidden="true" />}
                />
                <MetaInfo
                  label="Période"
                  value={formatDateRange(project.startDate, project.endDate, false)}
                  icon={<Calendar className="w-5 h-5" aria-hidden="true" />}
                />
                <MetaInfo
                  label="Rôle"
                  value={
                    project.role === "solo" ? "Développeur solo" :
                    project.role === "lead" ? "Lead développeur" :
                    project.role === "contributor" ? "Contributeur" :
                    "Mainteneur"
                  }
                  icon={<Users className="w-5 h-5" aria-hidden="true" />}
                />
                {project.teamSize && (
                  <MetaInfo
                    label="Équipe"
                    value={`${project.teamSize} personne${project.teamSize > 1 ? "s" : ""}`}
                    icon={<Users className="w-5 h-5" aria-hidden="true" />}
                  />
                )}
                <MetaInfo
                  label="Technologies"
                  value={`${project.techStack.length} technologies`}
                  icon={<CodeIcon className="w-5 h-5" aria-hidden="true" />}
                />
              </motion.div>

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="space-y-3"
                >
                  <h3 className="font-semibold text-[var(--color-text-primary)]">Tags</h3>
                  <div className="flex flex-wrap gap-2" role="list">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" size="sm" role="listitem">{tag}</Badge>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex flex-col gap-3 pt-4 border-t border-[var(--color-border-primary)]"
              >
                {project.repository && (
                  <Button
                    asAnchor
                    href={project.repository}
                    variant="primary"
                    size="lg"
                    fullWidth
                    external
                    leftIcon={<GitHubIcon className="w-5 h-5" />}
                  >
                    Voir le code sur GitHub
                  </Button>
                )}
                {project.demo && (
                  <Button
                    asAnchor
                    href={project.demo}
                    variant="outline"
                    size="lg"
                    fullWidth
                    external
                    rightIcon={<ExternalLink className="w-5 h-5" />}
                  >
                    Voir la démo en ligne
                  </Button>
                )}
              </motion.div>
            </motion.aside>
          </div>
        </Container>
      </Section>

      {/* CTA - Other Projects */}
      <Section size="md" background="gradient" className="relative">
        <Container size="xl" padding="md" center={true}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl text-center"
          >
            <h2 className="font-display font-bold text-[var(--color-text-primary)] tracking-tight mb-4">
              Découvrir les autres projets
            </h2>
            <p className="text-[var(--color-text-secondary)] text-lg mb-8">
              Explorez l'ensemble de mon portfolio technique
            </p>
            <Button asAnchor href="#projects" variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
              Voir tous les projets
            </Button>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}

export default ProjectDetail;