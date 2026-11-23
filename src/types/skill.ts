/**
 * Skill Types
 */

import type { SkillCategory } from "./design-system";

export type SkillStatus = "mastered" | "experienced" | "learning";

export interface Skill {
  /** Unique identifier */
  id: string;
  /** Skill name */
  name: string;
  /** Category */
  category: SkillCategory;
  /** Proficiency level (1-5) */
  level: 1 | 2 | 3 | 4 | 5;
  /** Status based on real project evidence */
  status: SkillStatus;
  /** Years of experience */
  years?: number;
  /** Icon name (Lucide) */
  icon?: string;
  /** Custom icon component */
  customIcon?: string;
  /** Description */
  description?: string;
  /** Related technologies */
  related?: string[];
  /** Certification */
  certified?: boolean;
  /** Certification URL */
  certificationUrl?: string;
  /** Display order */
  order?: number;
  /** Featured in hero/about */
  featured?: boolean;
}

export interface SkillCategoryData {
  /** Category key */
  key: SkillCategory;
  /** Display label */
  label: string;
  /** Description */
  description: string;
  /** Icon */
  icon: string;
  /** Color accent */
  color: string;
  /** Skills in category */
  skills: Skill[];
}

export interface SkillGroup {
  category: SkillCategory;
  label: string;
  skills: Skill[];
}

export type ProficiencyLevel = "beginner" | "intermediate" | "advanced" | "expert";

export const PROFICIENCY_LABELS: Record<number, ProficiencyLevel> = {
  1: "beginner",
  2: "intermediate",
  3: "advanced",
  4: "expert",
  5: "expert",
};

export const PROFICIENCY_COLORS: Record<ProficiencyLevel, string> = {
  beginner: "var(--color-text-muted)",
  intermediate: "var(--color-info)",
  advanced: "var(--color-warning)",
  expert: "var(--color-accent-primary)",
};

export const STATUS_LABELS: Record<SkillStatus, { label: string; description: string; color: string }> = {
  mastered: {
    label: "Maîtrisé",
    description: "Utilisé en production dans des projets réels",
    color: "var(--color-success)",
  },
  experienced: {
    label: "Expérimenté",
    description: "Utilisé dans des configurations, POCs ou partiellement",
    color: "var(--color-info)",
  },
  learning: {
    label: "En apprentissage",
    description: "En cours d'exploration, notions de base acquises",
    color: "var(--color-warning)",
  },
};