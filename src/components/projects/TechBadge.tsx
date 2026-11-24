import { type ReactNode, type CSSProperties } from "react";
import { cn } from "../../lib/utils";
import { Badge, type BadgeProps } from "../ui/Badge";

/**
 * TechBadge component - specialized badge for technology tags
 */

export interface TechBadgeProps extends Omit<BadgeProps, "variant" | "size" | "onClick" | "children" | "className"> {
  /** Technology name */
  name: string;
  /** Category */
  category: "frontend" | "backend" | "database" | "devops" | "tools" | "soft" | "testing" | "other";
  /** Size */
  size?: "sm" | "md" | "lg";
  /** Show category icon */
  showCategoryIcon?: boolean;
  /** Custom icon */
  icon?: ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Href for link */
  href?: string;
  /** External link */
  external?: boolean;
  /** Custom style */
  style?: CSSProperties;
  /** ClassName */
  className?: string;
}

const categoryConfig = {
  frontend: {
    variant: "accent" as const,
    icon: "🎨",
    color: "var(--color-accent-primary)",
  },
  backend: {
    variant: "default" as const,
    icon: "⚙️",
    color: "var(--color-info)",
  },
  database: {
    variant: "success" as const,
    icon: "🗄️",
    color: "var(--color-success)",
  },
  devops: {
    variant: "warning" as const,
    icon: "☁️",
    color: "var(--color-warning)",
  },
  tools: {
    variant: "outline" as const,
    icon: "🔧",
    color: "var(--color-text-muted)",
  },
  soft: {
    variant: "default" as const,
    icon: "💡",
    color: "var(--color-accent-tertiary)",
  },
  testing: {
    variant: "error" as const,
    icon: "🧪",
    color: "var(--color-error)",
  },
  other: {
    variant: "outline" as const,
    icon: "📦",
    color: "var(--color-text-muted)",
  },
} as const;

export function TechBadge({
  name,
  category = "other",
  size = "md",
  showCategoryIcon = false,
  icon,
  onClick,
  href,
  external = false,
  className,
}: TechBadgeProps) {
  const config = categoryConfig[category] || categoryConfig.other;

  const BadgeComponent = onClick || href ? "button" : "span";

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === "Enter" || e.key === " ") && onClick) {
      e.preventDefault();
      onClick();
    }
  };

  const isInteractive = onClick || href;

  return (
    <Badge
      variant={config.variant}
      size={size}
      onClick={onClick}
      className={cn(
        "cursor-pointer transition-all duration-120",
        "hover:scale-[1.02] hover:shadow-[var(--shadow-glow-sm)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]",
        className
      )}
      onKeyDown={handleKeyDown}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
    >
      {showCategoryIcon && icon ? (
        <span aria-hidden="true">{icon}</span>
      ) : showCategoryIcon ? (
        <span aria-hidden="true" role="img" aria-label={category}>{config.icon}</span>
      ) : null}
      {name}
    </Badge>
  );
}

/**
 * TechBadge Cloud - animated tag cloud
 */
export interface TechBadgeCloudProps {
  /** Technologies */
  technologies: Array<{
    name: string;
    category: TechBadgeProps["category"];
    level?: number; // 1-5
    href?: string;
  }>;
  /** Size */
  size?: "sm" | "md" | "lg";
  /** Show category */
  showCategory?: boolean;
  /** Interactive */
  interactive?: boolean;
  /** On click handler */
  onTechClick?: (name: string, category: string) => void;
  /** ClassName */
  className?: string;
}

export function TechBadgeCloud({
  technologies,
  size = "md",
  showCategory = true,
  interactive = true,
  onTechClick,
  className,
}: TechBadgeCloudProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap gap-2",
        className
      )}
      role="list"
      aria-label="Technologies"
    >
      {technologies.map((tech, index) => (
        <TechBadge
          key={`${tech.name}-${index}`}
          name={tech.name}
          category={tech.category}
          size={size}
          showCategoryIcon={showCategory}
          onClick={interactive ? () => onTechClick?.(tech.name, tech.category) : undefined}
          href={tech.href}
          style={{
            animationDelay: `${index * 30}ms`,
          } as CSSProperties}
        />
      ))}
    </div>
  );
}

/**
 * Tech Stack Categories - grouped display
 */
export interface TechStackCategoriesProps {
  /** Technologies grouped by category */
  categories: Record<string, Array<{
    name: string;
    level?: number;
    href?: string;
  }>>;
  /** Size */
  size?: "sm" | "md" | "lg";
  /** Show level indicator */
  showLevel?: boolean;
  /** ClassName */
  className?: string;
}

const categoryLabels: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Base de données",
  devops: "DevOps / Cloud",
  tools: "Outils",
  soft: "Soft Skills",
  testing: "Tests",
  other: "Autres",
};

const categoryIcons: Record<string, ReactNode> = {
  frontend: <span role="img" aria-label="frontend">🎨</span>,
  backend: <span role="img" aria-label="backend">⚙️</span>,
  database: <span role="img" aria-label="database">🗄️</span>,
  devops: <span role="img" aria-label="devops">☁️</span>,
  tools: <span role="img" aria-label="tools">🔧</span>,
  soft: <span role="img" aria-label="soft">💡</span>,
  testing: <span role="img" aria-label="testing">🧪</span>,
  other: <span role="img" aria-label="other">📦</span>,
};

export function TechStackCategories({
  categories,
  size = "md",
  showLevel = false,
  className,
}: TechStackCategoriesProps) {
  const orderedCategories = [
    "frontend",
    "backend",
    "database",
    "devops",
    "tools",
    "testing",
    "soft",
    "other",
  ] as const;

  return (
    <div className={cn("space-y-6", className)} role="list" aria-label="Compétences techniques">
      {orderedCategories.map((cat) => {
        const techs = categories[cat];
        if (!techs || techs.length === 0) return null;

        return (
          <section key={cat} className="space-y-3" aria-labelledby={`cat-${cat}`}>
            <header className="flex items-center gap-2">
              <span role="img" aria-hidden="true">{categoryIcons[cat]}</span>
              <h3 id={`cat-${cat}`} className="font-medium text-[var(--color-text-primary)]">
                {categoryLabels[cat] || cat}
              </h3>
              <span className="text-xs text-[var(--color-text-muted)] font-normal">
                ({techs.length})
              </span>
            </header>
            <div className="flex flex-wrap gap-2" role="list">
              {techs.map((tech, index) => (
                <TechBadge
                  key={`${cat}-${tech.name}-${index}`}
                  name={tech.name}
                  category={cat as TechBadgeProps["category"]}
                  size={size}
                  showCategoryIcon={false}
                  href={tech.href}
                >
                  {tech.name}
                  {showLevel && tech.level && (
                    <span
                      className="absolute -bottom-1 -right-1 w-1.5 h-1.5 rounded-full bg-[var(--color-accent-primary)]"
                      aria-label={`Niveau ${tech.level}/5`}
                    />
                  )}
                </TechBadge>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}