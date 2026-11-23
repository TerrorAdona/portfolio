import { z } from "zod";

/**
 * Zod validation schemas for data integrity
 * Used at build time and runtime for form validation
 */

// Profile validation
export const profileSchema = z.object({
  name: z.string().min(1).max(100),
  title: z.string().min(1).max(100),
  tagline: z.string().min(1).max(200),
  bio: z.string().min(1).max(2000),
  shortBio: z.string().min(1).max(300),
  avatar: z.string().url(),
  email: z.string().email(),
  location: z.string().min(1).max(100),
  availability: z.enum(["open", "busy", "closed"]),
  social: z.object({
    github: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    twitter: z.string().url().optional(),
    email: z.string().email().optional(),
  }),
  topSkills: z.array(z.string()).max(10),
  yearsExperience: z.number().int().min(0),
  projectsCompleted: z.number().int().min(0),
  technologiesCount: z.number().int().min(0),
});

export type ProfileSchema = z.infer<typeof profileSchema>;

// Project validation
export const projectTechSchema = z.object({
  name: z.string().min(1).max(50),
  category: z.enum(["frontend", "backend", "database", "devops", "tools", "soft", "testing", "other"]),
  icon: z.string().optional(),
  level: z.number().int().min(1).max(5).optional(),
  featured: z.boolean().optional(),
});

export const projectHighlightSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
  icon: z.string().optional(),
});

export const projectSchema = z.object({
  slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/),
  name: z.string().min(1).max(100),
  tagline: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  problem: z.string().min(1).max(2000),
  solution: z.string().min(1).max(2000),
  features: z.array(z.string().min(1).max(200)).max(20),
  highlights: z.array(projectHighlightSchema).max(6),
  techStack: z.array(projectTechSchema).max(30),
  category: z.enum(["frontend", "backend", "database", "devops", "tools", "soft", "testing", "other"]),
  status: z.enum(["completed", "in-progress", "archived", "experimental"]),
  startDate: z.string().regex(/^\d{4}-\d{2}$/),
  endDate: z.string().regex(/^\d{4}-\d{2}$/).optional(),
  repository: z.string().url().optional(),
  demo: z.string().url().optional(),
  docs: z.string().url().optional(),
  heroImage: z.object({
    src: z.string().url(),
    alt: z.string().min(1).max(200),
    width: z.number().int().positive().optional(),
    height: z.number().int().positive().optional(),
    blurDataURL: z.string().optional(),
  }).optional(),
  gallery: z.array(z.object({
    src: z.string().url(),
    alt: z.string().min(1).max(200),
    width: z.number().int().positive().optional(),
    height: z.number().int().positive().optional(),
  })).max(10).optional(),
  featured: z.boolean().optional(),
  order: z.number().int().min(0).optional(),
  tags: z.array(z.string().min(1).max(50)).max(20).optional(),
  role: z.enum(["lead", "contributor", "maintainer", "solo"]).optional(),
  teamSize: z.number().int().positive().optional(),
});

export type ProjectSchema = z.infer<typeof projectSchema>;

// Skill validation
export const skillSchema = z.object({
  id: z.string().min(1).max(50),
  name: z.string().min(1).max(50),
  category: z.enum(["frontend", "backend", "database", "devops", "tools", "soft", "testing", "other"]),
  level: z.number().int().min(1).max(5),
  years: z.number().min(0).max(50).optional(),
  icon: z.string().optional(),
  description: z.string().max(500).optional(),
  related: z.array(z.string()).max(10).optional(),
  certified: z.boolean().optional(),
  certificationUrl: z.string().url().optional(),
  featured: z.boolean().optional(),
  order: z.number().int().min(0).optional(),
});

export type SkillSchema = z.infer<typeof skillSchema>;

// Education validation
export const educationSchema = z.object({
  id: z.string().min(1).max(50),
  degree: z.string().min(1).max(100),
  field: z.string().min(1).max(200),
  institution: z.string().min(1).max(100),
  location: z.string().min(1).max(100),
  startDate: z.string().regex(/^\d{4}-\d{2}$/),
  endDate: z.string().regex(/^\d{4}-\d{2}$/),
  current: z.boolean().optional(),
  description: z.string().max(1000).optional(),
  achievements: z.array(z.string().max(200)).max(10).optional(),
  grade: z.string().max(50).optional(),
  logo: z.string().url().optional(),
  website: z.string().url().optional(),
  order: z.number().int().min(0).optional(),
});

export type EducationSchema = z.infer<typeof educationSchema>;

export const certificationSchema = z.object({
  id: z.string().min(1).max(50),
  name: z.string().min(1).max(100),
  issuer: z.string().min(1).max(100),
  date: z.string().regex(/^\d{4}-\d{2}$/),
  expiryDate: z.string().regex(/^\d{4}-\d{2}$/).optional(),
  credentialId: z.string().max(100).optional(),
  verificationUrl: z.string().url().optional(),
  logo: z.string().url().optional(),
  skills: z.array(z.string().max(50)).max(20).optional(),
  order: z.number().int().min(0).optional(),
});

export type CertificationSchema = z.infer<typeof certificationSchema>;

// Experience validation
export const experienceSchema = z.object({
  id: z.string().min(1).max(50),
  company: z.string().min(1).max(100),
  role: z.string().min(1).max(100),
  location: z.string().min(1).max(100),
  startDate: z.string().regex(/^\d{4}-\d{2}$/),
  endDate: z.string().regex(/^\d{4}-\d{2}$/).optional(),
  current: z.boolean().optional(),
  description: z.string().min(1).max(2000),
  achievements: z.array(z.string().min(1).max(300)).max(15),
  technologies: z.array(z.string().min(1).max(50)).max(30),
  category: z.enum(["frontend", "backend", "database", "devops", "tools", "soft", "testing", "other"]),
  type: z.enum(["full-time", "part-time", "contract", "internship", "freelance", "volunteer"]),
  logo: z.string().url().optional(),
  website: z.string().url().optional(),
  order: z.number().int().min(0).optional(),
  featured: z.boolean().optional(),
});

export type ExperienceSchema = z.infer<typeof experienceSchema>;

// Contact form validation
export const contactFormSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(5).max(200),
  message: z.string().min(10).max(5000),
  honeypot: z.string().optional(), // Anti-spam
}).refine((data) => !data.honeypot, {
  message: "Spam detected",
  path: ["honeypot"],
});

export type ContactFormSchema = z.infer<typeof contactFormSchema>;

// Newsletter validation
export const newsletterSchema = z.object({
  email: z.string().email(),
  consent: z.boolean().refine((val) => val === true, {
    message: "Consent is required",
  }),
});

export type NewsletterSchema = z.infer<typeof newsletterSchema>;

// Validation helpers
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; errors: z.ZodError } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, errors: result.error };
}

export function assertValid<T>(schema: z.ZodSchema<T>, data: unknown): T {
  const result = schema.parse(data);
  return result;
}