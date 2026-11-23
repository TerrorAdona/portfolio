import type { SEOProps, PersonSchema, WebSiteSchema, ProjectSchema, BreadcrumbSchema } from "../types/seo";
import { seoDefaults, socialLinks } from "../lib/constants";

/**
 * SEO utilities for metadata generation
 */

/**
 * Generate page metadata
 */
export function generateMetadata(props: Partial<SEOProps>): SEOProps {
  return {
    title: props.title || seoDefaults.title,
    description: props.description || seoDefaults.description,
    canonical: props.canonical || seoDefaults.url,
    ogImage: props.ogImage || seoDefaults.ogImage,
    ogType: props.ogType || "website",
    twitterCard: props.twitterCard || "summary_large_image",
    noIndex: props.noIndex || false,
    noFollow: props.noFollow || false,
  };
}

/**
 * Generate Person JSON-LD schema
 */
export function generatePersonSchema(): PersonSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Rakotoarinivo Herilala",
    jobTitle: "Full Stack Developer",
    url: seoDefaults.url,
    image: `${seoDefaults.url}/images/avatar.jpg`,
    sameAs: [
      socialLinks.github,
      socialLinks.linkedin,
      socialLinks.twitter,
    ],
    knowsAbout: [
      "TypeScript",
      "React",
      "Next.js",
      "Spring Boot",
      "PostgreSQL",
      "Tailwind CSS",
      "Docker",
      "GitHub Actions",
    ],
    description: "Développeur Full Stack spécialisé en React, TypeScript, Next.js, Spring Boot et architectures cloud. Passionné par le code propre, l'accessibilité et la performance.",
    email: "herilala.rakotoarinivo@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "France",
      addressCountry: "FR",
    },
  };
}

/**
 * Generate WebSite JSON-LD schema
 */
export function generateWebSiteSchema(): WebSiteSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Rakotoarinivo Herilala — Portfolio",
    url: seoDefaults.url,
    description: seoDefaults.description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${seoDefaults.url}/search?q={search_term_string}`,
      },
      queryInput: "required name=search_term_string",
    },
  };
}

/**
 * Generate Project JSON-LD schema
 */
export function generateProjectSchema(project: {
  name: string;
  description: string;
  url: string;
  image: string;
  dateCreated: string;
  dateModified: string;
  programmingLanguages: string[];
  codeRepository: string;
  keywords: string[];
}): ProjectSchema {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.description,
    url: project.url,
    image: project.image,
    dateCreated: project.dateCreated,
    dateModified: project.dateModified,
    author: {
      "@type": "Person",
      name: "Rakotoarinivo Herilala",
    },
    programmingLanguage: project.programmingLanguages,
    codeRepository: project.codeRepository,
    keywords: project.keywords.join(", "),
  };
}

/**
 * Generate Breadcrumb JSON-LD schema
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>): BreadcrumbSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate Organization JSON-LD schema
 */
export function generateOrganizationSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Rakotoarinivo Herilala",
    url: seoDefaults.url,
    logo: `${seoDefaults.url}/images/logo.png`,
    sameAs: [
      socialLinks.github,
      socialLinks.linkedin,
      socialLinks.twitter,
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+33-00-00-00-00",
      contactType: "customer service",
      availableLanguage: ["French", "English"],
    },
  };
}

/**
 * Combine multiple JSON-LD schemas
 */
export function combineJsonLd(...schemas: object[]): object[] {
  return schemas.filter(Boolean);
}

/**
 * Generate all homepage schemas
 */
export function generateHomepageSchemas(): object[] {
  return combineJsonLd(
    generatePersonSchema(),
    generateWebSiteSchema(),
    generateOrganizationSchema()
  );
}

/**
 * Generate project page schemas
 */
export function generateProjectPageSchemas(project: {
  name: string;
  description: string;
  url: string;
  image: string;
  dateCreated: string;
  dateModified: string;
  programmingLanguages: string[];
  codeRepository: string;
  keywords: string[];
  breadcrumbs: Array<{ name: string; url: string }>;
}): object[] {
  return combineJsonLd(
    generatePersonSchema(),
    generateWebSiteSchema(),
    generateProjectSchema(project),
    generateBreadcrumbSchema(project.breadcrumbs)
  );
}