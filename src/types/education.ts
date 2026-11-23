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
  /** Start date */
  startDate: string;
  /** End date */
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

export interface Certification {
  /** Unique identifier */
  id: string;
  /** Certification name */
  name: string;
  /** Issuing organization */
  issuer: string;
  /** Issue date */
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
}