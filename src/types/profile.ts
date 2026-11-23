/**
 * Profile / Personal Information Types
 */

import type { SocialLinks } from "./design-system";

export interface Profile {
  /** Full name */
  name: string;
  /** Professional title */
  title: string;
  /** Short tagline / hook */
  tagline: string;
  /** Longer bio for about page */
  bio: string;
  /** Short bio for hero */
  shortBio: string;
  /** Profile image */
  avatar: string;
  /** Email */
  email: string;
  /** Location */
  location: string;
  /** Availability status */
  availability: "open" | "busy" | "closed";
  /** Social links */
  social: SocialLinks;
  /** Skills summary for hero */
  topSkills: string[];
  /** Years of experience */
  yearsExperience: number;
  /** Number of projects completed */
  projectsCompleted: number;
  /** Technologies count */
  technologiesCount: number;
}

export interface ProfileSEO {
  title: string;
  description: string;
  ogImage: string;
  twitterHandle: string;
}