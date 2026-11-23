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

Quand je ne code pas, je explore de nouvelles technologies, contribue à l'open source ou partage mes apprentissages.`,
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
};