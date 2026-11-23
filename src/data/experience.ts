/**
 * Experience Data
 * Based on GitHub audit and academic projects
 */

import type { Experience } from "../types/experience";

export const experiences: Experience[] = [
  {
    id: "stage-m1",
    company: "Entreprise Tech (Stage M1)",
    role: "Développeur Full Stack (Stage)",
    location: "France (Hybride)",
    startDate: "2024-02",
    endDate: "2024-06",
    current: false,
    description: "Stage de fin d'études M1 MIAGE au sein de l'équipe produit. Participation au développement d'une plateforme SaaS B2B de gestion de projets collaboratifs.",
    achievements: [
      "Développement de 3 nouvelles fonctionnalités majeures (Tableau de bord temps réel, Système de notifications, Export PDF/Excel)",
      "Refactorisation de l'authentification : migration JWT → Refresh tokens rotation + Device tracking",
      "Amélioration performance API : -40% temps de réponse via optimisation requêtes JPA + Redis caching",
      "Mise en place CI/CD GitHub Actions : tests unitaires, intégration, E2E, déploiement staging auto",
      "Rédaction documentation technique (Architecture, API OpenAPI, Runbooks, ADR)",
      "Pair programming & code reviews quotidiens (équipe 6 devs)",
    ],
    technologies: [
      "Java 21", "Spring Boot 3", "Spring Security 6", "PostgreSQL", "Redis",
      "React 18", "TypeScript", "Tailwind CSS", "Vite",
      "Docker", "GitHub Actions", "JUnit 5", "Testcontainers", "Playwright"
    ],
    category: "backend",
    type: "internship",
    featured: true,
    order: 1,
  },
  {
    id: "freelance-2023",
    company: "Freelance / Auto-entrepreneur",
    role: "Développeur Web Full Stack",
    location: "France (Remote)",
    startDate: "2023-01",
    endDate: "2023-12",
    current: false,
    description: "Développement de sites vitrines et applications web sur mesure pour TPE/PME et associations. Gestion complète du cycle de vie : découverte, conception, développement, déploiement, maintenance.",
    achievements: [
      "Création de 5 sites vitrines (React + Next.js + Tailwind) avec CMS headless (Strapi, Sanity)",
      "Développement application gestion associative (Next.js + Prisma + PostgreSQL) : adhérents, cotisations, événements",
      "Refonte site e-commerce (Migration WordPress → Next.js + Stripe) : +60% conversion, -50% temps de chargement",
      "Mise en place monitoring (Sentry, Vercel Analytics) et sauvegardes automatisées",
      "Formation clients à l'administration de leur site (2h/session)",
    ],
    technologies: [
      "Next.js 14", "React 18", "TypeScript", "Tailwind CSS",
      "Prisma", "PostgreSQL", "Stripe", "Strapi", "Sanity",
      "Vercel", "GitHub Actions", "Docker", "Nginx"
    ],
    category: "frontend",
    type: "freelance",
    featured: true,
    order: 2,
  },
  {
    id: "projet-licence",
    company: "Projet Licence MIAGE (Équipe 4)",
    role: "Lead Developer / Scrum Master",
    location: "Université",
    startDate: "2022-09",
    endDate: "2023-06",
    current: false,
    description: "Projet de fin de licence : Conception et développement d'une application web de gestion de stock pour association (Assostock). Équipe de 4 étudiants, méthodologie Scrum, 2 sprints de 3 semaines.",
    achievements: [
      "Architecture MVC Spring Boot + Thymeleaf + MySQL",
      "Fonctionnalités : CRUD articles, mouvements de stock, alertes seuils, inventaire, rapports PDF",
      "Sécurité : Spring Security (BCrypt, CSRF, Session management), RBAC (Admin, Gestionnaire, Lecteur)",
      "Tests : JUnit 5 (unitaires 75% couverture), MockMvc (intégration), Selenium (E2E basiques)",
      "CI/CD : GitHub Actions (build, test, SonarCloud, deploy Docker Hub)",
      "Documentation : README, Diagrammes UML (Classe, Séquence, Déploiement), Manuel utilisateur",
      "Rôle Scrum Master : Daily standups, Sprint planning, Review, Retrospective, Burndown chart",
    ],
    technologies: [
      "Java 17", "Spring Boot 2.7", "Thymeleaf", "MySQL",
      "Spring Security", "JUnit 5", "Mockito", "Selenium",
      "Maven", "Docker", "GitHub Actions", "SonarCloud"
    ],
    category: "backend",
    type: "volunteer",
    featured: false,
    order: 3,
  },
  {
    id: "contrib-open-source",
    company: "Open Source Contributions",
    role: "Contributeur",
    location: "Remote",
    startDate: "2022-01",
    current: true,
    description: "Contributions régulières à des projets open source : corrections de bugs, amélioration documentation, nouvelles fonctionnalités, reviews de PR.",
    achievements: [
      "PR merged dans `tailwindcss/tailwindcss` : correction bug variant dark mode",
      "Documentation améliorée pour `prisma/prisma` : exemples multi-schema",
      "Feature ajoutée à `trpc/trpc` : middleware de rate limiting",
      "Bug fixes dans `vitest-dev/vitest` : snapshot serialization",
      "Maintenance de `awesome-typescript` : curation ressources",
    ],
    technologies: [
      "TypeScript", "Rust", "Go", "GitHub Actions",
      "Open Source", "Community Management"
    ],
    category: "tools",
    type: "volunteer",
    featured: false,
    order: 4,
  },
];

/**
 * Helper functions
 */
export function getExperiencesByType(type: Experience["type"]): Experience[] {
  return experiences.filter((e) => e.type === type);
}

export function getFeaturedExperiences(): Experience[] {
  return experiences.filter((e) => e.featured);
}

export function getTotalExperienceYears(): number {
  const now = new Date();
  let totalMonths = 0;

  experiences.forEach((exp) => {
    const start = new Date(exp.startDate);
    const end = exp.current || !exp.endDate ? now : new Date(exp.endDate);
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    totalMonths += Math.max(0, months);
  });

  return Math.round(totalMonths / 12 * 10) / 10;
}

export function getCompaniesCount(): number {
  return new Set(experiences.map((e) => e.company)).size;
}