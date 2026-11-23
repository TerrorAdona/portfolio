/**
 * Education Types
 */

export interface Education {
  /** Unique identifier */
  id: string;
  /** Degree name */
  degree: string;
  /** Field of study */
  field: string;
  /** Institution */
  institution: string;
  /** Location */
  location: string;
  /** Start date (YYYY-MM) */
  startDate: string;
  /** End date (YYYY-MM) */
  endDate: string;
  /** Currently studying */
  current?: boolean;
  /** Description */
  description?: string;
  /** Achievements */
  achievements?: string[];
  /** GPA/Grade */
  grade?: string;
  /** Logo */
  logo?: string;
  /** Website */
  website?: string;
  /** Display order */
  order?: number;
}

export interface AcademicProject {
  /** Unique identifier */
  id: string;
  /** Project title */
  title: string;
  /** Description */
  description: string;
  /** Institution */
  institution: string;
  /** Period (human readable) */
  period: string;
  /** Technologies used */
  technologies: string[];
  /** Repository URL */
  repository?: string;
  /** Demo URL */
  demo?: string;
  /** Role in project */
  role?: string;
  /** Team size */
  teamSize?: number;
  /** Key achievements */
  achievements?: string[];
  /** Display order */
  order?: number;
}

export interface ProfessionalExperience {
  /** Unique identifier */
  id: string;
  /** Company/Organization */
  company: string;
  /** Role/Title */
  role: string;
  /** Location */
  location: string;
  /** Start date (YYYY-MM) */
  startDate: string;
  /** End date (YYYY-MM) */
  endDate?: string;
  /** Currently working */
  current?: boolean;
  /** Description */
  description: string;
  /** Key achievements */
  achievements: string[];
  /** Technologies used */
  technologies: string[];
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

export interface Internship {
  /** Unique identifier */
  id: string;
  /** Company/Organization */
  company: string;
  /** Role/Title */
  role: string;
  /** Location */
  location: string;
  /** Start date (YYYY-MM) */
  startDate: string;
  /** End date (YYYY-MM) */
  endDate?: string;
  /** Description */
  description: string;
  /** Achievements */
  achievements: string[];
  /** Technologies used */
  technologies: string[];
  /** Supervisor */
  supervisor?: string;
  /** Display order */
  order?: number;
}

export interface Certification {
  /** Unique identifier */
  id: string;
  /** Certification name */
  name: string;
  /** Issuing organization */
  issuer: string;
  /** Issue date (YYYY-MM) */
  date: string;
  /** Expiry date */
  expiryDate?: string;
  /** Credential ID */
  credentialId?: string;
  /** Verification URL */
  verificationUrl?: string;
  /** Logo */
  logo?: string;
  /** Skills validated */
  skills?: string[];
  /** Display order */
  order?: number;
}

export interface EducationPageData {
  education: Education[];
  certifications: Certification[];
  academicProjects: typeof import("../data/education").academicProjects;
  professionalExperiences: typeof import("../data/education").professionalExperiences;
}