import { type ReactNode } from "react";
import { cn } from "../../lib/utils";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { GitHubIcon, ExternalLinkIcon, ArrowRightIcon } from "../ui/BrandIcons";

/**
 * Project Card component
 */

export interface ProjectCardProps {
  /** Project data */
  project: {
    slug: string;
    name: string;
    tagline: string;
    description: string;
    techStack: Array<{
      name: string;
      category: string;
      featured?: boolean;
    }>;
    status: string;
    featured?: boolean;
    repository?: string;
    demo?: string;
    heroImage?: {
      src: string;
      alt: string;
    };
  };
  /** Variant */
  variant?: "default" | "featured" | "compact";
  /** Click handler */
  onClick?: () => void;
  /** Custom className */
  className?: string;
}

export function ProjectCard({
  project,
  variant = "default",
  onClick,
  className,
}: ProjectCardProps) {
  const isInteractive = !!onClick;
  const featuredTechs = project.techStack.filter((t) => t.featured).slice(0, 4);
  const otherTechsCount = project.techStack.length - featuredTechs.length;

  const statusVariants: Record<string, "default" | "accent" | "success" | "warning" | "error"> = {
    completed: "success",
    "in-progress": "accent",
    archived: "default",
    experimental: "warning",
  };

  const statusLabels: Record<string, string> = {
    completed: "Terminé",
    "in-progress": "En cours",
    archived: "Archivé",
    experimental: "Expérimental",
  };

  return (
    <Card
      variant={variant === "featured" ? "elevated" : "interactive"}
      padding="md"
      hoverable
      onClick={onClick}
      ariaLabel={isInteractive ? `Voir le projet ${project.name}` : undefined}
      className={cn(
        "flex flex-col h-full",
        variant === "featured" && "lg:col-span-2 lg:row-span-2",
        className
      )}
    >
      {/* Hero Image */}
      {project.heroImage && (
        <div className="relative aspect-video w-full mb-4 rounded-md overflow-hidden">
          <img
            src={project.heroImage.src}
            alt={project.heroImage.alt}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
          {project.featured && (
            <span className="absolute top-3 left-3 px-2 py-1 text-xs font-medium bg-[var(--color-accent-primary)]/90 text-white rounded-xs">
              Mis en avant
            </span>
          )}
        </div>
      )}

      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="min-w-0 flex-1">
            <h3 className="font-display font-semibold text-[var(--color-text-primary)] truncate">
              {project.name}
            </h3>
            <p className="text-sm text-[var(--color-text-muted)] mt-0.5 truncate">
              {project.tagline}
            </p>
          </div>
          <Badge
            variant={statusVariants[project.status] || "default"}
            size="sm"
          >
            {statusLabels[project.status] || project.status}
          </Badge>
        </div>

        {/* Description */}
        <p className="text-sm text-[var(--color-text-secondary)] line-clamp-3 mb-4 flex-1">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4" role="list" aria-label="Technologies utilisées">
          {featuredTechs.map((tech) => (
            <Badge
              key={tech.name}
              variant="accent"
              size="sm"
              role="listitem"
            >
              {tech.name}
            </Badge>
          ))}
          {otherTechsCount > 0 && (
            <Badge variant="outline" size="sm">
              +{otherTechsCount}
            </Badge>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-[var(--color-border-primary)]">
          {project.repository && (
            <Button
              asAnchor
              href={project.repository}
              variant="ghost"
              size="sm"
              external
              leftIcon={<GitHubIcon className="w-4 h-4" />}
              className="flex-1 justify-center"
            >
              Code
            </Button>
          )}
          {project.demo && (
            <Button
              asAnchor
              href={project.demo}
              variant="ghost"
              size="sm"
              external
              rightIcon={<ExternalLinkIcon className="w-4 h-4" />}
              className="flex-1 justify-center"
            >
              Démo
            </Button>
          )}
          {isInteractive && !project.repository && !project.demo && (
            <Button variant="ghost" size="sm" className="flex-1 justify-center" rightIcon={<ArrowRightIcon className="w-4 h-4" />}>
              Voir détails
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

/**
 * Project Card Grid
 */
export interface ProjectCardGridProps {
  projects: ProjectCardProps["project"][];
  /** Columns configuration */
  cols?: {
    base?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  /** Gap */
  gap?: "sm" | "md" | "lg";
  /** Click handler */
  onProjectClick?: (project: ProjectCardProps["project"]) => void;
  /** ClassName */
  className?: string;
}

export function ProjectCardGrid({
  projects,
  cols = { base: 1, sm: 2, lg: 3 },
  gap = "md",
  onProjectClick,
  className,
}: ProjectCardGridProps) {
  const gapStyles = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  } as const;

  const colStyles = `grid-cols-1 ${cols.sm ? `sm:grid-cols-${cols.sm}` : ""} ${cols.md ? `md:grid-cols-${cols.md}` : ""} ${cols.lg ? `lg:grid-cols-${cols.lg}` : ""} ${cols.xl ? `xl:grid-cols-${cols.xl}` : ""}`;

  return (
    <div
      className={cn(
        "grid",
        colStyles,
        gapStyles[gap],
        className
      )}
      role="list"
      aria-label="Projets"
    >
      {projects.map((project) => (
        <ProjectCard
          key={project.slug}
          project={project}
          variant={project.featured ? "featured" : "default"}
          onClick={() => onProjectClick?.(project)}
        />
      ))}
    </div>
  );
}

/**
 * Project Card Skeleton (loading state)
 */
export function ProjectCardSkeleton({ variant = "default" }: { variant?: "default" | "featured" }) {
  return (
    <Card variant={variant === "featured" ? "elevated" : "interactive"} padding="md" className="flex flex-col h-full">
      <div className="aspect-video w-full mb-4 rounded-md animate-shimmer bg-[var(--color-bg-tertiary)]" />
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="min-w-0 flex-1">
          <div className="h-6 w-3/4 animate-shimmer bg-[var(--color-bg-tertiary)] rounded-sm" />
          <div className="h-4 w-1/2 animate-shimmer bg-[var(--color-bg-tertiary)] rounded-sm mt-1" />
        </div>
        <div className="h-5 w-20 animate-shimmer bg-[var(--color-bg-tertiary)] rounded-xs" />
      </div>
      <div className="h-4 w-full animate-shimmer bg-[var(--color-bg-tertiary)] rounded-sm mb-2" />
      <div className="h-4 w-5/6 animate-shimmer bg-[var(--color-bg-tertiary)] rounded-sm mb-2" />
      <div className="flex flex-wrap gap-2 mb-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-5 w-16 animate-shimmer bg-[var(--color-bg-tertiary)] rounded-xs" />
        ))}
      </div>
      <div className="flex items-center gap-2 pt-2 border-t border-[var(--color-border-primary)]">
        <div className="h-8 w-20 animate-shimmer bg-[var(--color-bg-tertiary)] rounded-sm" />
        <div className="h-8 w-20 animate-shimmer bg-[var(--color-bg-tertiary)] rounded-sm" />
      </div>
    </Card>
  );
}