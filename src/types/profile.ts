/**
 * Profile / Personal Information Types
 */

import type { SocialLinks } from "./design-system";

export interface AboutContent {
  /** Introduction paragraph */
  introduction: string;
  /** Passion for software development */
  passion: string;
  /** Full-stack capability description */
  fullstack: string;
  /** Architecture interest */
  architecture: string;
  /** Creating useful solutions */
  useful: string;
  /** Continuous learning philosophy */
  learning: string;
}

export interface PersonalInfoItem {
  label: string;
  value: string;
  icon: string;
}

export interface Profile {
  /** Full name */
  name: string;
  /** Professional title */
  title: string;
  /** Short tagline / hook */
  tagline: string;
  /** Longer bio for about page */
  bio: string;
  /** About section structured content */
  about: AboutContent;
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
  /** Personal professional info for About section */
  personalInfo: PersonalInfoItem[];
  /** Professional interests */
  interests: string[];
}

export interface ProfileSEO {
  title: string;
  description: string;
  ogImage: string;
  twitterHandle: string;
}