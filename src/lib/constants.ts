/**
 * Application constants and configuration
 * Centralized values used across the application
 */

// ============================================================
// BREAKPOINTS (matching Tailwind defaults)
// ============================================================
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export type Breakpoint = keyof typeof breakpoints;

// ============================================================
// TRANSITION DURATIONS
// ============================================================
export const transitions = {
  fast: 120,
  base: 200,
  slow: 300,
  spring: 400,
} as const;

export type Transition = keyof typeof transitions;

// ============================================================
// Z-INDEX SCALE
// ============================================================
export const zIndex = {
  dropdown: 100,
  sticky: 200,
  fixed: 300,
  modalBackdrop: 400,
  modal: 500,
  popover: 600,
  tooltip: 700,
  toast: 800,
  skipLink: 9999,
} as const;

export type ZIndex = keyof typeof zIndex;

// ============================================================
// ANIMATION DELAYS (for stagger effects)
// ============================================================
export const staggerDelays = {
  base: 50,
  fast: 30,
  slow: 80,
} as const;

// ============================================================
// CONTAINER MAX WIDTHS
// ============================================================
export const containers = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1440,
} as const;

export type Container = keyof typeof containers;

// ============================================================
// SPACING SCALE (rem values)
// ============================================================
export const spacing = {
  0: 0,
  1: 0.25,
  2: 0.5,
  3: 0.75,
  4: 1,
  5: 1.25,
  6: 1.5,
  8: 2,
  10: 2.5,
  12: 3,
  16: 4,
  20: 5,
  24: 6,
  32: 8,
} as const;

// ============================================================
// ICON SIZES
// ============================================================
export const iconSizes = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  "2xl": 48,
} as const;

export type IconSize = keyof typeof iconSizes;

// ============================================================
// AVATAR SIZES
// ============================================================
export const avatarSizes = {
  sm: 32,
  md: 40,
  lg: 56,
  xl: 80,
  "2xl": 120,
} as const;

export type AvatarSize = keyof typeof avatarSizes;

// ============================================================
// BUTTON SIZES
// ============================================================
export const buttonSizes = {
  sm: { padding: "0.5rem 0.75rem", fontSize: "0.875rem", gap: "0.375rem" },
  md: { padding: "0.5rem 1rem", fontSize: "1rem", gap: "0.5rem" },
  lg: { padding: "0.75rem 1.25rem", fontSize: "1.125rem", gap: "0.5rem" },
} as const;

export type ButtonSize = keyof typeof buttonSizes;

// ============================================================
// CARD PADDINGS
// ============================================================
export const cardPaddings = {
  sm: "1rem",
  md: "1.5rem",
  lg: "2rem",
} as const;

export type CardPadding = keyof typeof cardPaddings;

// ============================================================
// BADGE SIZES
// ============================================================
export const badgeSizes = {
  sm: { padding: "0.25rem 0.5rem", fontSize: "0.75rem" },
  md: { padding: "0.25rem 0.75rem", fontSize: "0.875rem" },
  lg: { padding: "0.5rem 1rem", fontSize: "1rem" },
} as const;

export type BadgeSize = keyof typeof badgeSizes;

// ============================================================
// ROUTES
// ============================================================
export const routes = {
  home: "/",
  projects: "/projects",
  projectDetail: (slug: string) => `/projects/${slug}`,
  about: "/about",
  contact: "/contact",
  notFound: "*",
} as const;

// ============================================================
// SEO DEFAULTS
// ============================================================
export const seoDefaults = {
  title: "Rakotoarinivo Herilala — Full Stack Developer",
  description:
    "Portfolio de Rakotoarinivo Herilala, développeur Full Stack spécialisé en React, TypeScript, Next.js, Spring Boot et architectures cloud.",
  siteName: "Rakotoarinivo Herilala",
  url: "https://herilala.dev",
  ogImage: "/og-default.png",
  twitterHandle: "@TerrorAdona",
  locale: "fr_FR",
  themeColor: "#09090B",
} as const;

// ============================================================
// SOCIAL LINKS
// ============================================================
export const socialLinks = {
  github: "https://github.com/TerrorAdona",
  linkedin: "https://linkedin.com/in/rakotoarinivo-herilala",
  twitter: "https://twitter.com/TerrorAdona",
  email: "mailto:herilala.rakotoarinivo@gmail.com",
} as const;

// ============================================================
// NAVIGATION ITEMS
// ============================================================
export const navItems = [
  { label: "Accueil", href: routes.home },
  { label: "Projets", href: routes.projects },
  { label: "À propos", href: routes.about },
  { label: "Contact", href: routes.contact },
] as const;

// ============================================================
// SKILL CATEGORIES
// ============================================================
export const skillCategories = [
  "frontend",
  "backend",
  "database",
  "devops",
  "tools",
  "soft",
] as const;

export type SkillCategory = (typeof skillCategories)[number];

// ============================================================
// PROJECT STATUS
// ============================================================
export const projectStatuses = [
  "completed",
  "in-progress",
  "archived",
  "experimental",
] as const;

export type ProjectStatus = (typeof projectStatuses)[number];

// ============================================================
// CONTACT FORM FIELDS
// ============================================================
export const contactFields = [
  "name",
  "email",
  "subject",
  "message",
] as const;

export type ContactField = (typeof contactFields)[number];

// ============================================================
// EXTERNAL LINKS ICONS (Lucide React names)
// ============================================================
export const externalIcons = {
  github: "Github",
  linkedin: "Linkedin",
  twitter: "Twitter",
  email: "Mail",
  external: "ExternalLink",
  download: "Download",
} as const;