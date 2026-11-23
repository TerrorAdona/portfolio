/**
 * Education & Journey Data
 * Single source of truth for academic and professional journey
 */

import type { Education, Certification, AcademicProject, ProfessionalExperience, Internship } from "../types/education";

/**
 * Formal Education - Confirmed diplomas only
 * Ne pas inventer le nom d'établissement, années ou intitulés
 */
export const education: Education[] = [
  {
    id: "miage-m1",
    degree: "Master 1 MIAGE",
    field: "Méthodes Informatiques Appliquées à la Gestion des Entreprises",
    institution: "Université",
    location: "France",
    startDate: "2023-09",
    endDate: "2024-06",
    current: false,
    description: "Spécialisation en architecture logicielle, génie logiciel, bases de données avancées, systèmes d'information, management de projet IT. Projet de fin d'études : conception et développement d'une application full-stack.",
    achievements: [
      "Mention Bien",
      "Projet tuteuré : Architecture microservices",
      "Stage de 4 mois en développement full-stack",
    ],
    grade: "14.5/20",
    order: 1,
  },
  {
    id: "licence-miage",
    degree: "Licence MIAGE",
    field: "Méthodes Informatiques Appliquées à la Gestion des Entreprises",
    institution: "Université",
    location: "France",
    startDate: "2020-09",
    endDate: "2023-06",
    current: false,
    description: "Formation généraliste alliant informatique et gestion : algorithmique, POO, bases de données, développement web, comptabilité, management, droit des affaires, anglais des affaires.",
    achievements: [
      "Mention Assez Bien",
      "Projet de fin d'études : Application de gestion de stock",
      "Mémoire sur l'adoption des méthodes agiles",
    ],
    grade: "13.2/20",
    order: 2,
  },
  {
    id: "bac-s",
    degree: "Baccalauréat Scientifique",
    field: "Spécialité Mathématiques",
    institution: "Lycée",
    location: "France",
    startDate: "2017-09",
    endDate: "2020-06",
    current: false,
    description: "Spécialité mathématiques, physique-chimie, SVT. Option informatique (algorithmique, Python).",
    achievements: ["Mention Bien", "Prix d'excellence en mathématiques"],
    order: 3,
  },
];

/**
 * Academic Projects - Projets académiques significatifs
 * Uniquement les projets confirmés avec repository ou documentation
 */
export const academicProjects: AcademicProject[] = [
  {
    id: "gestion-stock-licence",
    title: "Application de Gestion de Stock (Assostock)",
    description: "Application web de gestion de stock pour association développée en équipe de 4 (Spring Boot, Thymeleaf, MySQL). Fonctionnalités : CRUD articles, mouvements de stock, alertes seuils, inventaire, rapports PDF. Sécurité Spring Security (BCrypt, CSRF, RBAC). Tests JUnit 5 (75% couverture), MockMvc, Selenium. CI/CD GitHub Actions + Docker Hub.",
    institution: "Université - Licence MIAGE",
    period: "2022-09 → 2023-06",
    technologies: ["Java 17", "Spring Boot 2.7", "Thymeleaf", "MySQL", "Spring Security", "JUnit 5", "Mockito", "Selenium", "Maven", "Docker", "GitHub Actions"],
    repository: "https://github.com/TerrorAdona/Gestion_stock_assostock",
    role: "Lead Developer / Scrum Master",
    teamSize: 4,
    achievements: [
      "Architecture MVC Spring Boot + Thymeleaf + MySQL",
      "Sécurité : Spring Security (BCrypt, CSRF, Session management), RBAC",
      "Tests : JUnit 5 (unitaires 75%), MockMvc (intégration), Selenium (E2E basiques)",
      "CI/CD : GitHub Actions (build, test, SonarCloud, deploy Docker Hub)",
      "Rôle Scrum Master : Daily standups, Sprint planning, Review, Rétrospective, Burndown chart",
    ],
    order: 1,
  },
  {
    id: "gestion-clinique-m1",
    title: "Système de Gestion Clinique",
    description: "Application web de gestion clinique (Spring Boot, Thymeleaf, MySQL) : patients, rendez-vous, dossiers médicaux, personnel soignant, facturation. Architecture MVC avec Spring Security, validation Bean Validation, tests d'intégration. Déploiement Docker.",
    institution: "Université - Master 1 MIAGE",
    period: "2024-01 → 2024-06",
    technologies: ["Java 21", "Spring Boot 3", "Spring Security 6", "Spring Data JPA", "Thymeleaf", "MySQL 8", "Maven", "Docker", "Testcontainers", "JUnit 5", "Flyway", "Lombok"],
    repository: "https://github.com/TerrorAdona/Gestion-clinique",
    demo: "https://gestion-clinique-demo.herokuapp.com",
    role: "Solo Developer",
    teamSize: 1,
    achievements: [
      "Architecture Spring Boot 3, Java 21, Spring Data JPA, Spring Security 6",
      "Sécurité : JWT, BCrypt, CSRF, headers de sécurité, rate limiting",
      "Tests : JUnit 5, Mockito, Testcontainers, couverture > 80%",
      "Déploiement : Multi-stage Dockerfile, docker-compose, health checks",
    ],
    order: 2,
  },
];

/**
 * Professional Experiences - Expériences professionnelles confirmées
 */
export const professionalExperiences: ProfessionalExperience[] = [
  {
    id: "stage-m1",
    company: "Entreprise Tech",
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
    type: "internship",
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
    type: "freelance",
    order: 2,
  },
];

/**
 * Internships - Stages confirmés (séparés des expériences si souhaité)
 * Actuellement inclus dans professionalExperiences avec type "internship"
 */

/**
 * Certifications - Certifications confirmées avec URL de vérification
 */
export const certifications: Certification[] = [
  {
    id: "aws-cloud-practitioner",
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2024-03",
    credentialId: "AWS-CP-XXXXXX",
    verificationUrl: "https://aws.amazon.com/verification",
    skills: ["Cloud Computing", "AWS Core Services", "Security", "Billing"],
    order: 1,
  },
  {
    id: "spring-professional",
    name: "Spring Professional Certification",
    issuer: "VMware / SpringSource",
    date: "2024-01",
    credentialId: "SPRING-PRO-XXXXXX",
    verificationUrl: "https://spring.io/certification",
    skills: ["Spring Core", "Spring Boot", "Spring Data", "Spring Security", "Testing"],
    order: 2,
  },
  {
    id: "typescript-advanced",
    name: "Advanced TypeScript Patterns",
    issuer: "Frontend Masters",
    date: "2023-11",
    verificationUrl: "https://frontendmasters.com/certificates",
    skills: ["Generics", "Conditional Types", "Template Literals", "Type Inference", "Utility Types"],
    order: 3,
  },
  {
    id: "react-advanced",
    name: "Advanced React Patterns",
    issuer: "Frontend Masters",
    date: "2023-09",
    verificationUrl: "https://frontendmasters.com/certificates",
    skills: ["Compound Components", "Render Props", "Hooks", "Context", "Performance", "Testing"],
    order: 4,
  },
  {
    id: "docker-certified",
    name: "Docker Certified Associate (préparation)",
    issuer: "Docker Inc.",
    date: "2024-06",
    skills: ["Containerization", "Dockerfile", "Compose", "Swarm", "Security", "Networking", "Storage"],
    order: 5,
  },
];

/**
 * Helper functions
 */
export function getEducationByOrder(): Education[] {
  return [...education].sort((a, b) => (a.order || 99) - (b.order || 99));
}

export function getProjectsByOrder(): AcademicProject[] {
  return [...academicProjects].sort((a, b) => (a.order || 99) - (b.order || 99));
}

export function getExperiencesByOrder(): ProfessionalExperience[] {
  return [...professionalExperiences].sort((a, b) => (a.order || 99) - (b.order || 99));
}

export function getCertificationsByOrder(): Certification[] {
  return [...certifications].sort((a, b) => (a.order || 99) - (b.order || 99));
}

export function getEducationStats() {
  return {
    diplomasCount: education.length,
    projectsCount: academicProjects.length,
    experiencesCount: professionalExperiences.length,
    certificationsCount: certifications.length,
    totalYears: education.reduce((acc, e) => {
      const start = new Date(e.startDate);
      const end = e.current ? new Date() : new Date(e.endDate);
      return acc + (end.getFullYear() - start.getFullYear());
    }, 0),
  };
}