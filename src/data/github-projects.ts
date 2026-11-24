export type GitHubProjectCategory =
  | "web"
  | "ai"
  | "backend"
  | "accessibility";

export interface GitHubProject {
  name: string;
  description: string;
  category: GitHubProjectCategory;
  language: string;
  technologies: string[];
  repository: string;
  lastPush: string;
}

/**
 * Curated snapshot of the portfolio-worthy public repositories.
 * Keeping this data local avoids making the portfolio depend on GitHub's API
 * availability or rate limits at runtime.
 */
export const githubProjects: GitHubProject[] = [
  {
    name: "SmartEnergy-Hub",
    description:
      "Plateforme de supervision énergétique : ingestion des données de capteurs et suivi des consommations.",
    category: "backend",
    language: "Kotlin",
    technologies: ["Spring Boot", "React", "Cassandra", "Redis"],
    repository: "https://github.com/TerrorAdona/SmartEnergy-Hub",
    lastPush: "2026-11-06",
  },
  {
    name: "eco",
    description:
      "Application web construite avec Next.js et TypeScript, avec une base Prisma et une architecture full-stack.",
    category: "web",
    language: "TypeScript",
    technologies: ["Next.js", "TypeScript", "Prisma", "React"],
    repository: "https://github.com/TerrorAdona/eco",
    lastPush: "2026-10-18",
  },
  {
    name: "toro",
    description:
      "Gestionnaire de tâches Django dont l’interface s’adapte aux profils et aux besoins d’accessibilité.",
    category: "accessibility",
    language: "Python",
    technologies: ["Django", "Python", "Accessibilité", "IHM adaptative"],
    repository: "https://github.com/TerrorAdona/toro",
    lastPush: "2026-09-23",
  },
  {
    name: "Financia",
    description:
      "Application de finances personnelles pour suivre comptes, transactions, budgets et objectifs d’épargne.",
    category: "web",
    language: "TypeScript",
    technologies: ["Next.js", "React", "PostgreSQL", "Prisma"],
    repository: "https://github.com/TerrorAdona/Financia",
    lastPush: "2026-09-16",
  },
  {
    name: "local-rag-system",
    description:
      "Assistant documentaire local : recherche sémantique et réponses générées à partir de documents avec leurs sources.",
    category: "ai",
    language: "Python",
    technologies: ["Streamlit", "LangChain", "ChromaDB", "Ollama"],
    repository: "https://github.com/TerrorAdona/local-rag-system",
    lastPush: "2026-07-17",
  },
  {
    name: "Gestion-clinique",
    description:
      "Application de gestion clinique développée avec Spring Boot, Thymeleaf et MySQL.",
    category: "backend",
    language: "Java",
    technologies: ["Spring Boot", "Thymeleaf", "MySQL"],
    repository: "https://github.com/TerrorAdona/Gestion-clinique",
    lastPush: "2026-03-10",
  },
  {
    name: "talenta",
    description:
      "Application web Next.js dédiée à la création de logos simples.",
    category: "web",
    language: "TypeScript",
    technologies: ["Next.js", "TypeScript"],
    repository: "https://github.com/TerrorAdona/talenta",
    lastPush: "2025-12-02",
  },
  {
    name: "Gestion_stock_assostock",
    description:
      "Application de gestion de stock conçue pour le projet Assostock.",
    category: "web",
    language: "TypeScript",
    technologies: ["TypeScript", "Gestion de stock"],
    repository: "https://github.com/TerrorAdona/Gestion_stock_assostock",
    lastPush: "2025-11-28",
  },
];
