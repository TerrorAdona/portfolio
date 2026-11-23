import { Suspense, lazy } from "react";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Section } from "./components/layout/Section";
import { Container } from "./components/layout/Container";
import { Button } from "./components/ui/Button";
import { Card } from "./components/ui/Card";
import { Badge } from "./components/ui/Badge";
import { TechBadgeCloud } from "./components/projects/TechBadge";
import { profile } from "./data/profile";
import { projects } from "./data/projects";
import { skills } from "./data/skills";
import { experiences } from "./data/experience";
import { education, certifications } from "./data/education";
import { GitBranch, Users, MessageSquare, Mail, ExternalLink, ArrowRight } from "lucide-react";
import "./styles/globals.css";

// Lazy load heavy sections
const ProjectsSection = lazy(() => import("./pages/ProjectsSection").then((m) => ({ default: m.ProjectsSection })));
const AboutSection = lazy(() => import("./pages/AboutSection").then((m) => ({ default: m.AboutSection })));
const SkillsSection = lazy(() => import("./pages/SkillsSection").then((m) => ({ default: m.SkillsSection })));
const ExperienceSection = lazy(() => import("./pages/ExperienceSection").then((m) => ({ default: m.ExperienceSection })));
const ContactSection = lazy(() => import("./pages/ContactSection").then((m) => ({ default: m.ContactSection })));

// Skeleton loader
function SectionSkeleton() {
  return (
    <Section size="md" background="none">
      <Container size="xl" padding="md">
        <div className="animate-shimmer h-12 w-1/4 rounded-sm mb-8 bg-[var(--color-bg-tertiary)]" />
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-shimmer h-32 bg-[var(--color-bg-tertiary)] rounded-md" />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function App() {
  const navItems = [
    { label: "Projets", href: "#projects" },
    { label: "Compétences", href: "#skills" },
    { label: "Expérience", href: "#experience" },
    { label: "À propos", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <>
      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-link">
        Aller au contenu principal
      </a>

      {/* Header */}
      <Header
        logo={
          <a href="/" className="font-display font-bold text-xl text-[var(--color-text-primary)] hover:opacity-80 transition-opacity" aria-label="Accueil">
            RH
          </a>
        }
        navItems={navItems}
        cta={{
          label: "Voir mes projets",
          href: "#projects",
          variant: "primary",
        }}
        showThemeToggle={true}
        fixed={true}
      />

      {/* Main Content */}
      <main id="main-content" className="pt-16 lg:pt-20 min-h-screen">
        {/* Hero Section */}
        <Section id="hero" size="lg" background="gradient" className="relative overflow-hidden">
          <Container size="xl" padding="lg" center={true}>
            <div className="max-w-4xl text-center">
              {/* Badge */}
              <Badge variant="accent" size="md" className="mb-6 inline-flex items-center gap-2">
                <span className="w-4 h-4" aria-hidden="true">✨</span>
                <span>Disponible pour nouvelles opportunités</span>
              </Badge>

              {/* Name & Title */}
              <h1 className="font-display font-bold text-[var(--color-text-primary)] tracking-tight mb-6">
                {profile.name}
              </h1>
              <p className="text-[var(--color-text-secondary)] text-xl lg:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed">
                {profile.tagline}
              </p>

              {/* Short Bio */}
              <p className="text-[var(--color-text-muted)] text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                {profile.shortBio}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <Button
                  asAnchor
                  href="#projects"
                  variant="primary"
                  size="lg"
                  rightIcon={<span className="w-5 h-5" aria-hidden="true">→</span>}
                >
                  Voir mes projets
                </Button>
                <Button
                  asAnchor
                  href="#contact"
                  variant="outline"
                  size="lg"
                >
                  Me contacter
                </Button>
              </div>

              {/* Social Links */}
              <div className="flex items-center justify-center gap-6" role="list" aria-label="Réseaux sociaux">
                <a
                  href={profile.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]"
                  aria-label="GitHub"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823.92.823 1.855v2.792c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]"
                  aria-label="LinkedIn"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.36-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.141-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a
                  href={profile.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]"
                  aria-label="Twitter"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M23.953 4.57a10.005 10.005 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.055-1.896.16-2.825.195a4.9 4.9 0 00-8.379 4.367 4.877 4.877 0 01-2.144-.5v.05a4.89 4.89 0 003.92 4.772 4.9 4.9 0 01-2.227-.052c0 .022.01.043.01.065a4.89 4.89 0 003.49 3.38 4.86 4.86 0 01-2.24-.87 4.87 4.87 0 004.517 3.35 9.81 9.81 0 01-6.117 2.12c-.4 0-.8-.024-1.19-.07 3.26 2.04 7.12 3.27 11.25 3.27 13.5 0 20.9-11.2 20.9-20.9 0-.32-.008-.64-.024-.95a6.87 6.87 0 001.02-.63 6.87 6.87 0 002.94-3.63 13.74 13.74 0 00-.3-1.15z"/>
                  </svg>
                </a>
                <a
                  href={profile.social.email}
                  className="flex items-center justify-center w-12 h-12 rounded-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]"
                  aria-label="Email"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </a>
              </div>

              {/* Stats */}
              <div className="mt-16 flex flex-wrap items-center justify-center gap-8 lg:gap-16 text-center">
                <div>
                  <div className="font-display font-bold text-3xl lg:text-4xl text-[var(--color-text-primary)]">
                    {profile.yearsExperience}+
                  </div>
                  <div className="text-sm text-[var(--color-text-muted)]">Années d'expérience</div>
                </div>
                <div className="w-px h-12 bg-[var(--color-border-primary)] lg:h-16" aria-hidden="true" />
                <div>
                  <div className="font-display font-bold text-3xl lg:text-4xl text-[var(--color-text-primary)]">
                    {profile.projectsCompleted}+
                  </div>
                  <div className="text-sm text-[var(--color-text-muted)]">Projets réalisés</div>
                </div>
                <div className="w-px h-12 bg-[var(--color-border-primary)] lg:h-16" aria-hidden="true" />
                <div>
                  <div className="font-display font-bold text-3xl lg:text-4xl text-[var(--color-text-primary)]">
                    {profile.technologiesCount}+
                  </div>
                  <div className="text-sm text-[var(--color-text-muted)]">Technologies maîtrisées</div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Featured Projects Preview */}
        <Section id="projects" size="md" background="secondary">
          <Container size="xl" padding="md">
            <header className="mb-12 text-center max-w-2xl mx-auto">
              <Badge variant="accent" size="sm" className="mb-4">
                <span className="w-4 h-4 mr-1" aria-hidden="true">💻</span>
                Projets phares
              </Badge>
              <h2 className="font-display font-bold text-[var(--color-text-primary)] tracking-tight mb-4">
                Projets sélectionnés
              </h2>
              <p className="text-[var(--color-text-secondary)] text-lg">
                Une sélection de mes projets les plus aboutis, démontrant ma capacité à livrer des solutions complètes, de la conception au déploiement.
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project) => (
                <Card key={project.slug} variant="interactive" padding="md" className="flex flex-col h-full">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-[var(--color-text-primary)] truncate">{project.name}</h3>
                      <p className="text-sm text-[var(--color-text-muted)] mt-0.5 truncate">{project.tagline}</p>
                    </div>
                    <Badge variant={project.status === "completed" ? "success" : project.status === "in-progress" ? "accent" : "warning"} size="sm">
                      {project.status === "completed" ? "Terminé" : project.status === "in-progress" ? "En cours" : "Expérimental"}
                    </Badge>
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)] line-clamp-3 mb-4 flex-1">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4" role="list">
                    {project.techStack.filter((t) => t.featured).slice(0, 4).map((tech) => (
                      <Badge key={tech.name} variant="accent" size="sm" role="listitem">{tech.name}</Badge>
                    ))}
                    {project.techStack.length > 4 && (
                      <Badge variant="outline" size="sm">+{project.techStack.length - 4}</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 pt-3 border-t border-[var(--color-border-primary)]">
                    {project.repository && (
                      <Button asAnchor href={project.repository} variant="ghost" size="sm" external leftIcon={<span className="w-4 h-4" aria-hidden="true">⌘</span>} className="flex-1 justify-center">
                        Code
                      </Button>
                    )}
                    {project.demo && (
                      <Button asAnchor href={project.demo} variant="ghost" size="sm" external rightIcon={<span className="w-4 h-4" aria-hidden="true">→</span>} className="flex-1 justify-center">
                        Démo
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Button
                asAnchor
                href="#projects"
                variant="outline"
                size="lg"
                rightIcon={<span className="w-5 h-5" aria-hidden="true">→</span>}
              >
                Voir tous les projets
              </Button>
            </div>
          </Container>
        </Section>

        {/* Skills Preview */}
        <Section id="skills" size="md" background="none">
          <Container size="xl" padding="md">
            <header className="mb-12 text-center max-w-2xl mx-auto">
              <Badge variant="accent" size="sm" className="mb-4">
                <span className="w-4 h-4 mr-1" aria-hidden="true">⚡</span>
                Stack technique
              </Badge>
              <h2 className="font-display font-bold text-[var(--color-text-primary)] tracking-tight mb-4">
                Technologies maîtrisées
              </h2>
              <p className="text-[var(--color-text-secondary)] text-lg">
                Une expertise ciblée sur l'écosystème JavaScript/TypeScript moderne et les architectures backend robustes.
              </p>
            </header>

            <TechBadgeCloud
              technologies={skills.filter((s) => s.featured && s.level >= 4).map((s) => ({
                name: s.name,
                category: s.category,
                level: s.level,
              }))}
              size="md"
              showCategory={true}
            />
          </Container>
        </Section>

        {/* CTA Section */}
        <Section size="md" background="gradient" className="relative">
          <Container size="xl" padding="md" center={true}>
            <div className="max-w-2xl text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-accent-primary)]/15 text-[var(--color-accent-primary)] border border-[var(--color-accent-primary)]/30 mb-6">
                <span className="w-4 h-4" aria-hidden="true">✨</span>
                <span className="font-medium">Open to opportunities</span>
              </div>
              <h2 className="font-display font-bold text-[var(--color-text-primary)] tracking-tight mb-4">
                Disponible pour de nouveaux défis
              </h2>
              <p className="text-[var(--color-text-secondary)] text-lg mb-8">
                Vous avez un projet en tête ? Besoin d'un développeur Full Stack pour votre équipe ?
                Discutons de la façon dont je peux vous aider.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asAnchor href="#contact" variant="primary" size="lg" rightIcon={<span className="w-5 h-5" aria-hidden="true">→</span>}>
                  Me contacter
                </Button>
                <Button asAnchor href={profile.social.linkedin} variant="outline" size="lg" external rightIcon={<span className="w-4 h-4" aria-hidden="true">→</span>}>
                  LinkedIn
                </Button>
              </div>
            </div>
          </Container>
        </Section>

        {/* Lazy loaded sections */}
        <Suspense fallback={<SectionSkeleton />}>
          <ProjectsSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <SkillsSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <ExperienceSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <ContactSection />
        </Suspense>
      </main>

      {/* Footer */}
      <Footer
        copyright={`© ${new Date().getFullYear()} ${profile.name}. Tous droits réservés.`}
        showThemeToggle={true}
      />
    </>
  );
}

export default App;