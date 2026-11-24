"use client";

import { useEffect } from "react";

/**
 * Structured Data (JSON-LD) Component
 * Injects JSON-LD structured data for SEO
 */

interface PersonSchema {
  "@context": "https://schema.org";
  "@type": "Person";
  name: string;
  jobTitle: string;
  url: string;
  image: string;
  sameAs: string[];
  knowsAbout: string[];
  description: string;
  email: string;
  address: {
    "@type": "PostalAddress";
    addressLocality: string;
    addressCountry: string;
  };
}

interface WebSiteSchema {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  url: string;
  description: string;
  potentialAction: {
    "@type": "SearchAction";
    target: {
      "@type": "EntryPoint";
      urlTemplate: string;
    };
    queryInput: string;
  };
}

interface ProjectSchema {
  "@context": "https://schema.org";
  "@type": "CreativeWork";
  name: string;
  description: string;
  url: string;
  image: string;
  dateCreated: string;
  dateModified: string;
  author: {
    "@type": "Person";
    name: string;
  };
  programmingLanguage: string[];
  codeRepository: string;
  keywords: string[];
}

interface BreadcrumbSchema {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }>;
}

const personSchema: PersonSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rakotoarinivo Herilala",
  jobTitle: "Full Stack Developer",
  url: "https://herilala.dev",
  image: "https://herilala.dev/images/avatar.jpg",
  sameAs: [
    "https://github.com/TerrorAdona",
    "https://linkedin.com/in/rakotoarinivo-herilala",
    "https://twitter.com/TerrorAdona",
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
    "REST API",
    "GraphQL",
    "Clean Architecture",
    "Domain-Driven Design",
  ],
  description: "Développeur Full Stack spécialisé en React, TypeScript, Next.js, Spring Boot et architectures cloud. Passionné par le code propre, l'accessibilité et la performance.",
  email: "herilala.rakotoarinivo@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "France",
    addressCountry: "FR",
  },
};

const webSiteSchema: WebSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Rakotoarinivo Herilala — Portfolio",
  url: "https://herilala.dev",
  description: "Portfolio de Rakotoarinivo Herilala, développeur Full Stack spécialisé en React, TypeScript, Next.js, Spring Boot et architectures cloud.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://herilala.dev/search?q={search_term_string}",
    },
    queryInput: "required name=search_term_string",
  },
};

export function StructuredData() {
  useEffect(() => {
    // Remove any existing structured data scripts
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach((script) => script.remove());

    // Inject Person schema
    const personScript = document.createElement("script");
    personScript.type = "application/ld+json";
    personScript.textContent = JSON.stringify(personSchema, null, 2);
    document.head.appendChild(personScript);

    // Inject WebSite schema
    const webSiteScript = document.createElement("script");
    webSiteScript.type = "application/ld+json";
    webSiteScript.textContent = JSON.stringify(webSiteSchema, null, 2);
    document.head.appendChild(webSiteScript);

    // Cleanup on unmount
    return () => {
      personScript.remove();
      webSiteScript.remove();
    };
  }, []);

  return null;
}

export function ProjectStructuredData(project: {
  name: string;
  description: string;
  url: string;
  image: string;
  dateCreated: string;
  dateModified: string;
  programmingLanguages: string[];
  codeRepository: string;
  keywords: string[];
}) {
  useEffect(() => {
    // Remove any existing project structured data
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"][data-project]');
    existingScripts.forEach((script) => script.remove());

    const projectSchema: ProjectSchema = {
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
      keywords: project.keywords,
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-project", "true");
    script.textContent = JSON.stringify(projectSchema, null, 2);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [project.url]);

  return null;
}

export function BreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  useEffect(() => {
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"][data-breadcrumb]');
    existingScripts.forEach((script) => script.remove());

    const breadcrumbSchema: BreadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-breadcrumb", "true");
    script.textContent = JSON.stringify(breadcrumbSchema, null, 2);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [items]);

  return null;
}