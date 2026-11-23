/**
 * Experience Types
 */

import type { SkillCategory } from "./design-system";

export interface Experience {
  /** Unique identifier */
  id: string;
  /** Company/Organization */
  company: string;
  /** Role/Title */
  role: string;
  /** Location */
  location: string;
  /** Start date */
  startDate: string;
  /** End date */
  endDate?: string;
  /** Currently working */
  current?: boolean;
  /** Description */
  description: string;
  /** Key achievements */
  achievements: string[];
  /** Technologies used */
  technologies: string[];
  /** Category */
  category: SkillCategory;
  /** Employment type */
  type: "full-time" | "part-time" | "contract" | "internship" | "freelance" | "volunteer";
  /** Company logo */
  logo?: string;
  /** Company website */
  website?: string;
  /** Display order */
  order?: number;
  /** Featured */
  featured?: boolean;
}

export interface ExperiencePageData {
  experiences: Experience[];
  totalYears: number;
  companiesCount: number;
}