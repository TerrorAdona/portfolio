import {
  ArrowUpRight,
  Code2,
  Database,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type {
  GitHubProject,
  GitHubProjectCategory,
} from "../../data/github-projects";

const categoryDetails: Record<
  GitHubProjectCategory,
  { label: string; Icon: typeof Code2 }
> = {
  web: { label: "Application web", Icon: Code2 },
  ai: { label: "IA & données", Icon: Sparkles },
  backend: { label: "Backend & systèmes", Icon: Database },
  accessibility: { label: "Accessibilité", Icon: ShieldCheck },
};

function formatLastPush(date: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
}

export function GitHubProjectCard({ project }: { project: GitHubProject }) {
  const { label, Icon } = categoryDetails[project.category];

  return (
    <article className="repo-project-card">
      <div className="repo-project-card__top">
        <span
          className="repo-project-card__icon"
          data-category={project.category}
          aria-hidden="true"
        >
          <Icon size={20} strokeWidth={1.8} />
        </span>
        <span className="repo-project-card__category">{label}</span>
        <a
          className="repo-project-card__corner-link"
          href={project.repository}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ouvrir le dépôt ${project.name} dans un nouvel onglet`}
        >
          <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </div>

      <h3 className="repo-project-card__title">
        <a href={project.repository} target="_blank" rel="noopener noreferrer">
          {project.name}
        </a>
      </h3>
      <p className="repo-project-card__description">{project.description}</p>

      <ul className="repo-project-card__technologies" aria-label="Technologies">
        {project.technologies.map((technology) => (
          <li key={technology}>{technology}</li>
        ))}
      </ul>

      <div className="repo-project-card__footer">
        <span className="repo-project-card__language">
          <Code2 size={14} aria-hidden="true" />
          {project.language}
        </span>
        <span className="repo-project-card__updated">
          Mis à jour {formatLastPush(project.lastPush)}
        </span>
      </div>

      <a
        className="repo-project-card__cta"
        href={project.repository}
        target="_blank"
        rel="noopener noreferrer"
      >
        Explorer le dépôt
        <ArrowUpRight size={16} aria-hidden="true" />
      </a>
    </article>
  );
}
