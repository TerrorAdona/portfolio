/**
 * Education Data
 */

import type { Education, Certification } from "../types/education";

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
    name: "Docker Certified Associate (preparation)",
    issuer: "Docker Inc.",
    date: "2024-06",
    skills: ["Containerization", "Dockerfile", "Compose", "Swarm", "Security", "Networking", "Storage"],
    order: 5,
  },
];