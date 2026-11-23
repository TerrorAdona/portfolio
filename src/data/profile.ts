/**
 * Profile Data
 * Single source of truth for personal information
 */

import type { Profile } from "../types/profile";

export const profile: Profile = {
  name: "Rakotoarinivo Herilala",
  title: "Développeur Full Stack",
  tagline: "Je construis des applications web robustes, performantes et accessibles.",
  bio: `Développeur Full Stack passionné avec une formation en MIAGE (Master 1) et une solide expérience en développement d'applications web modernes. Je maîtrise l'écosystème JavaScript/TypeScript (React, Next.js, Node.js) ainsi que les technologies backend (Spring Boot, PostgreSQL, APIs REST).

Mon approche : écrire du code propre, bien testé et documenté, avec une attention particulière à l'accessibilité, la performance et l'expérience développeur. J'aime résoudre des problèmes complexes et transformer des besoins métier en solutions techniques élégantes.

Quand je ne code pas, j'explore de nouvelles technologies, contribue à l'open source ou partage mes apprentissages.`,
  // About section specific content
  about: {
    introduction: `Je m'appelle Rakotoarinivo Herilala, et je suis développeur Full Stack. Titulaire d'une Licence en MIAGE, je viens de terminer mon parcours de M1 MIAGE (Méthodes Informatiques Appliquées à la Gestion des Entreprises).`,
    passion: `Ce qui m'anime dans le développement logiciel, c'est la capacité à transformer une idée abstraite en un produit concret, utile et performant. J'apprécie particulièrement la conception d'architectures applicatives solides, la réflexion sur la maintenabilité à long terme et l'optimisation des performances.`,
    fullstack: `Mon double profil frontend/backend me permet d'avoir une vision globale des projets : de la conception de l'expérience utilisateur à la modélisation des données, en passant par la définition des APIs et le déploiement.`,
    architecture: `Je m'intéresse particulièrement aux patterns d'architecture (Clean Architecture, DDD, Microservices), aux bonnes pratiques de code (SOLID, DRY, KISS) et à l'automatisation (CI/CD, tests, qualité).`,
    useful: `Mon objectif est de créer des solutions qui apportent une vraie valeur : utiles pour les utilisateurs, maintenables pour les équipes, performantes en production.`,
    learning: `L'apprentissage continu est au cœur de ma pratique : veille technologique quotidienne, expérimentation de nouveaux outils, contribution open source, partage de connaissances. Je crois que la curiosité technique est le moteur de l'excellence.`,
  },
  shortBio: "Full Stack Developer | React, TypeScript, Next.js, Spring Boot | MIAGE M1 | Open Source Enthusiast",
  avatar: "/images/avatar.jpg",
  email: "herilala.rakotoarinivo@gmail.com",
  location: "France",
  availability: "open",
  social: {
    github: "https://github.com/TerrorAdona",
    linkedin: "https://linkedin.com/in/rakotoarinivo-herilala",
    twitter: "https://twitter.com/TerrorAdona",
    email: "mailto:herilala.rakotoarinivo@gmail.com",
  },
  topSkills: ["TypeScript", "React", "Next.js", "Spring Boot", "PostgreSQL", "Tailwind CSS"],
  yearsExperience: 2,
  projectsCompleted: 6,
  technologiesCount: 15,
  // Personal professional info for About section
  personalInfo: [
    { label: "Localisation", value: "France", icon: "map-pin" },
    { label: "Disponibilité", value: "Ouvert aux opportunités", icon: "briefcase" },
    { label: "Formation", value: "M1 MIAGE (en cours)", icon: "graduation-cap" },
    { label: "Spécialisation", value: "Full Stack Web", icon: "code" },
    { label: "Langues", value: "Français (natif), Anglais (technique)", icon: "globe" },
  ],
  interests: [
    "Architecture logicielle & Clean Code",
    "Performance web & Core Web Vitals",
    "Accessibilité numérique (WCAG)",
    "DevOps & CI/CD (GitHub Actions, Docker)",
    "Open Source & contribution communautaire",
    "Veille technologique & expérimentation",
  ],
};