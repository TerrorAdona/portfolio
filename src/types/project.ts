/**
 * Project Types
 */

import type { ProjectStatus, SkillCategory } from "./design-system";

export interface ProjectLink {
  /** Link label */
  label: string;
  /** URL */
  url: string;
  /** Icon name (Lucide) */
  icon?: string;
  /** External link */
  external?: boolean;
}

export interface ProjectImage {
  /** Image URL */
  src: string;
  /** Alt text */
  alt: string;
  /** Width */
  width?: number;
  /** Height */
  height?: number;
  /** Blur placeholder */
  blurDataURL?: string;
}

export interface ProjectTech {
  /** Technology name */
  name: string;
  /** Category */
  category: SkillCategory;
  /** Icon name (Lucide or custom) */
  icon?: string;
  /** Proficiency level (1-5) */
  level?: number;
  /** Featured in project */
  featured?: boolean;
}

export interface ProjectHighlight {
  /** Highlight title */
  title: string;
  /** Description */
  description: string;
  /** Icon */
  icon?: string;
}

export interface Project {
  /** Unique slug for routing */
  slug: string;
  /** Project name */
  name: string;
  /** Short tagline */
  tagline: string;
  /** Full description */
  description: string;
  /** Problem solved */
  problem: string;
  /** Solution provided */
  solution: string;
  /** Key features */
  features: string[];
  /** Technical highlights */
  highlights: ProjectHighlight[];
  /** Technologies used */
  techStack: ProjectTech[];
  /** Primary category */
  category: SkillCategory;
  /** Project status */
  status: ProjectStatus;
  /** Start date */
  startDate: string;
  /** End date (null if ongoing) */
  endDate?: string;
  /** Repository URL */
  repository?: string;
  /** Live demo URL */
  demo?: string;
  /** Documentation URL */
  docs?: string;
  /** Hero image */
  heroImage?: ProjectImage;
  /** Gallery images */
  gallery?: ProjectImage[];
  /** Featured project */
  featured?: boolean;
  /** Display order */
  order?: number;
  /** Tags for filtering */
  tags?: string[];
  /** Role in project */
  role?: "lead" | "contributor" | "maintainer" | "solo";
  /** Team size */
  teamSize?: number;
}

export interface ProjectFilters {
  /** Search query */
  query?: string;
  /** Category filter */
  category?: SkillCategory | "all";
  /** Status filter */
  status?: ProjectStatus | "all";
  /** Technology filter */
  tech?: string[];
  /** Featured only */
  featured?: boolean;
}

export interface ProjectSort {
  field: "name" | "date" | "order" | "status";
  direction: "asc" | "desc";
}

export interface ProjectsPageData {
  projects: Project[];
  categories: SkillCategory[];
  technologies: string[];
  totalCount: number;
  featuredCount: number;
}