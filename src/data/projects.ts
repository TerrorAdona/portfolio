/**
 * Projects Data
 * Based on GitHub audit analysis - only portfolio-ready projects included
 */

import type { Project } from "../types/project";

export const projects: Project[] = [
  {
    slug: "gestion-clinique",
    name: "Gestion Clinique",
    tagline: "Système de gestion complet pour établissements de santé",
    description: `Application web de gestion clinique développée avec Spring Boot, Thymeleaf et MySQL. Permet la gestion des patients, rendez-vous, dossiers médicaux, personnel soignant et facturation. Architecture MVC classique avec sécurité Spring Security, validation Bean Validation, et tests d'intégration.`,
    problem: "Les petites cliniques et cabinets médicaux manquent souvent d'outils numériques abordables et adaptés pour gérer leur activité quotidienne (patients, RDV, dossiers, facturation). Les solutions existantes sont soit trop complexes, soit trop coûteuses.",
    solution: "Développement d'une application web sur-mesure, hébergeable sur serveur mutualisé ou VPS, avec interface Thymeleaf responsive, authentification sécurisée, gestion des rôles (admin, médecin, secrétaire), et module de facturation PDF.",
    features: [
      "Gestion complète des patients (CRUD, historique, recherche)",
      "Planification des rendez-vous avec calendrier interactif",
      "Dossiers médicaux numériques sécurisés",
      "Gestion du personnel et planning",
      "Module de facturation avec génération PDF",
      "Tableau de bord avec statistiques temps réel",
      "Authentification JWT + Spring Security",
      "Gestion des rôles et permissions (RBAC)",
      "Export de données (CSV, PDF)",
      "Interface responsive (mobile/desktop)",
    ],
    highlights: [
      {
        title: "Architecture Spring Boot 3",
        description: "Utilisation des dernières fonctionnalités : Spring Boot 3, Java 21, Spring Data JPA, Spring Security 6",
        icon: "☕",
      },
      {
        title: "Sécurité renforcée",
        description: "Authentification JWT, mots de passe hashés (BCrypt), protection CSRF, headers de sécurité, rate limiting",
        icon: "🔒",
      },
      {
        title: "Tests complets",
        description: "Tests unitaires (JUnit 5, Mockito), tests d'intégration (Testcontainers, @SpringBootTest), couverture > 80%",
        icon: "🧪",
      },
      {
        title: "Déploiement Docker",
        description: "Multi-stage Dockerfile, docker-compose pour dev/prod, health checks, logs structurés",
        icon: "🐳",
      },
    ],
    techStack: [
      { name: "Java 21", category: "backend", featured: true },
      { name: "Spring Boot 3", category: "backend", featured: true },
      { name: "Spring Security 6", category: "backend", featured: true },
      { name: "Spring Data JPA", category: "backend" },
      { name: "Thymeleaf", category: "frontend", featured: true },
      { name: "MySQL 8", category: "database", featured: true },
      { name: "Maven", category: "tools" },
      { name: "Docker", category: "devops", featured: true },
      { name: "Testcontainers", category: "testing" },
      { name: "JUnit 5", category: "testing" },
      { name: "Flyway", category: "database" },
      { name: "Lombok", category: "tools" },
    ],
    category: "backend",
    status: "in-progress",
    startDate: "2024-01-15",
    endDate: "2024-06-20",
    repository: "https://github.com/TerrorAdona/Gestion-clinique",
    demo: "https://gestion-clinique-demo.herokuapp.com",
    featured: true,
    order: 1,
    tags: ["spring-boot", "java", "thymeleaf", "mysql", "healthcare", "enterprise"],
    role: "solo",
    teamSize: 1,
  },
  {
    slug: "eco",
    name: "Eco",
    tagline: "Plateforme full-stack moderne avec architecture multi-agents IA",
    description: `Application full-stack Next.js 15 (App Router) avec Prisma ORM, démonstrateur d'architecture moderne incluant authentification, gestion d'état, API routes, et intégration expérimentale d'agents IA (Claude, Windsurf) pour l'assistance au développement.`,
    problem: "Les développeurs cherchent des architectures de référence modernes pour démarrer rapidement des projets full-stack robustes, avec outillage complet (tests, lint, types) et bonnes pratiques intégrées.",
    solution: "Boilerplate production-ready Next.js + TypeScript + Prisma + PostgreSQL avec : authentification NextAuth, API REST + tRPC, composants UI réutilisables, Storybook, tests E2E (Playwright), CI/CD GitHub Actions, déploiement Vercel.",
    features: [
      "Next.js 15 App Router + Server Components",
      "Prisma ORM avec PostgreSQL",
      "Authentification NextAuth.js (credentials, OAuth)",
      "API Routes REST + tRPC pour type-safety",
      "Composants UI avec Tailwind CSS + Radix UI",
      "Formulaires avec React Hook Form + Zod",
      "Thème dark/light + persistance",
      "Internationalisation (i18n) ready",
      "Tests unitaires (Vitest) + E2E (Playwright)",
      "Storybook pour documentation composants",
      "CI/CD GitHub Actions (lint, typecheck, test, build)",
      "Déploiement Vercel + base de données managée",
      "Intégration agents IA (Claude Code, Windsurf) via skills",
    ],
    highlights: [
      {
        title: "Architecture Full-Stack Type-Safe",
        description: "Types partagés client/serveur via tRPC, validation Zod runtime, Prisma types générés",
        icon: "🔷",
      },
      {
        title: "Developer Experience Optimisée",
        description: "HMR instantané, ESLint flat config, Prettier, Husky, Commitlint, VS Code settings",
        icon: "⚡",
      },
      {
        title: "Multi-Agent AI Integration",
        description: "Configuration skills pour Claude Code, Windsurf, .agents - assistance contextuelle au code",
        icon: "🤖",
      },
      {
        title: "Production Ready",
        description: "Monitoring (Sentry), Analytics (Vercel), Error boundaries, Loading states, SEO metadata",
        icon: "🚀",
      },
    ],
    techStack: [
      { name: "Next.js 15", category: "frontend", featured: true },
      { name: "React 18", category: "frontend", featured: true },
      { name: "TypeScript 5", category: "frontend", featured: true },
      { name: "Prisma ORM", category: "database", featured: true },
      { name: "PostgreSQL", category: "database", featured: true },
      { name: "Tailwind CSS", category: "frontend" },
      { name: "tRPC", category: "backend" },
      { name: "NextAuth.js", category: "backend" },
      { name: "Vitest", category: "testing" },
      { name: "Playwright", category: "testing" },
      { name: "Storybook", category: "tools" },
      { name: "GitHub Actions", category: "devops" },
      { name: "Vercel", category: "devops" },
      { name: "Zod", category: "tools" },
    ],
    category: "frontend",
    status: "in-progress",
    startDate: "2024-03-10",
    repository: "https://github.com/TerrorAdona/eco",
    featured: true,
    order: 2,
    tags: ["nextjs", "react", "typescript", "prisma", "trpc", "fullstack", "ai-agents"],
    role: "solo",
    teamSize: 1,
  },
  {
    slug: "talenta",
    name: "Talenta",
    tagline: "Générateur de logos simple et élégant",
    description: `Application web Next.js permettant de créer des logos simples via une interface intuitive : formes géométriques, texte, couleurs, export PNG/SVG. Projet vitrine pour démontrer la manipulation de Canvas/SVG côté client, la gestion d'état complexe et l'UX fluide.`,
    problem: "Les outils de création de logos sont souvent soit trop complexes (Illustrator, Figma), soit trop limités (générateurs basiques). Besoin d'un outil simple, gratuit, sans inscription, pour créer rapidement un logo vectoriel.",
    solution: "Éditeur visuel drag-and-drop avec Canvas API : formes (cercle, carré, triangle, lignes), texte personnalisable (police, taille, couleur), palette de couleurs, alignement intelligent, undo/redo, export PNG/SVG haute résolution, templates prédéfinis.",
    features: [
      "Éditeur Canvas interactif (drag, resize, rotate)",
      "Formes vectorielles de base + formes complexes",
      "Texte multi-polices (Google Fonts via next/font)",
      "Sélecteur de couleurs avancé (palette, hex, dégradés)",
      "Grille d'alignement + snap-to-grid",
      "Historique undo/redo (50 étapes)",
      "Templates de logos prédéfinis",
      "Export PNG (1x, 2x, 3x) + SVG",
      "Copie SVG dans le presse-papiers",
      "Mode plein écran",
      "Sauvegarde locale (localStorage)",
      "Partage via URL (état encodé)",
    ],
    highlights: [
      {
        title: "Canvas API Avancée",
        description: "Rendu vectoriel performant, hit-testing précis, transformations matricielles, export SVG natif",
        icon: "🎨",
      },
      {
        title: "Gestion d'État Immuable",
        description: "Immer pour mutations immuables, sélecteurs memoïsés, persistance localStorage optimisée",
        icon: "🔄",
      },
      {
        title: "UX Fluide 60fps",
        description: "RequestAnimationFrame, debounced updates, virtualized layers, lazy font loading",
        icon: "⚡",
      },
    ],
    techStack: [
      { name: "Next.js 15", category: "frontend", featured: true },
      { name: "React 18", category: "frontend", featured: true },
      { name: "TypeScript 5", category: "frontend" },
      { name: "Canvas API", category: "frontend", featured: true },
      { name: "Tailwind CSS", category: "frontend" },
      { name: "Zustand", category: "frontend" },
      { name: "Immer", category: "tools" },
      { name: "lucide-react", category: "tools" },
    ],
    category: "frontend",
    status: "experimental",
    startDate: "2024-05-20",
    repository: "https://github.com/TerrorAdona/talenta",
    featured: false,
    order: 3,
    tags: ["nextjs", "canvas", "svg", "design-tool", "creative"],
    role: "solo",
    teamSize: 1,
  },
];

/**
 * Helper functions for project data
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectsByCategory(category: Project["category"]): Project[] {
  return projects.filter((p) => p.category === category);
}

export function getProjectsByStatus(status: Project["status"]): Project[] {
  return projects.filter((p) => p.status === status);
}

export function getAllTechnologies(): string[] {
  const techs = new Set<string>();
  projects.forEach((p) => p.techStack.forEach((t) => techs.add(t.name)));
  return Array.from(techs).sort();
}

export function getProjectsByTechnology(tech: string): Project[] {
  return projects.filter((p) => p.techStack.some((t) => t.name === tech));
}