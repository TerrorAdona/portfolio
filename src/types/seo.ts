/**
 * SEO Types
 */

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "profile";
  twitterCard?: "summary" | "summary_large_image";
  noIndex?: boolean;
  noFollow?: boolean;
}

export interface JSONLDProps {
  /** Schema.org type */
  "@context": "https://schema.org";
  "@type": string;
  [key: string]: unknown;
}

export interface PersonSchema extends JSONLDProps {
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

export interface WebSiteSchema extends JSONLDProps {
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

export interface ProjectSchema extends JSONLDProps {
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

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface BreadcrumbSchema extends JSONLDProps {
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }>;
}

export interface OrganizationSchema extends JSONLDProps {
  "@type": "Organization";
  name: string;
  url: string;
  logo: string;
  sameAs: string[];
  contactPoint: {
    "@type": "ContactPoint";
    telephone: string;
    contactType: string;
    availableLanguage: string[];
  };
}