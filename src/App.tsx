import { Suspense, lazy } from "react";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Section } from "./components/layout/Section";
import { Container } from "./components/layout/Container";
import { Button } from "./components/ui/Button";
import { Card } from "./components/ui/Card";
import { Badge } from "./components/ui/Badge";
import { TechBadgeCloud } from "./components/projects/TechBadge";
import { HeroIllustration } from "./components/ui/HeroIllustration";
import { GitHubIcon, LinkedInIcon, TwitterIcon, SparklesIcon } from "./components/ui/BrandIcons";
import { profile } from "./data/profile";
import { projects } from "./data/projects";
import { skills } from "./data/skills";
import { ExternalLink, ArrowRight, Send, Mail } from "lucide-react";
import { motion } from "framer-motion";
import "./styles/globals.css";

// Lazy load heavy sections
const ProjectsSection = lazy(() => import("./pages/ProjectsSection").then((m) => ({ default: m.ProjectsSection })));
const AboutSection = lazy(() => import("./pages/AboutSection"));
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

// Framer Motion variants for Hero animations - using proper easing
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.34, 1.56, 0.64, 1] as const,
    },
  },
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.34, 1.56, 0.64, 1] as const,
    },
  },
};

function App() {
  const navItems = [
    { label: "Accueil", href: "#hero" },
    { label: "À propos", href: "#about" },
    { label: "Compétences", href: "#skills" },
    { label: "Projets", href: "#projects" },
    { label: "Parcours", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <>
      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-link">
        Aller au contenu principal
      </a>

      {/* Header / Navbar */}
      <Header
        logo={
          <a
            href="#hero"
            className="font-display font-bold text-xl text-[var(--color-text-primary)] hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-primary)] rounded-sm"
            aria-label="Rakotoarinivo Herilala - Accueil"
          >
            RH
          </a>
        }
        navItems={navItems}
        cvDownload={{
          href: "/cv.pdf",
          label: "CV",
        }}
        showThemeToggle={true}
        fixed={true}
        transparent={true}
      />

      {/* Main Content */}
      <main id="main-content" className="min-h-screen">
        {/* Hero Section */}
        <Section id="hero" size="lg" background="gradient" className="relative overflow-hidden min-h-screen flex items-center">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[var(--color-accent-primary)]/5 blur-3xl animate-float" />
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-[var(--color-accent-tertiary)]/5 blur-3xl animate-float" style={{ animationDelay: "1s" }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[var(--color-accent-primary)]/10" />
          </div>

          <Container size="xl" padding="lg" center={false}>
            <div className="flex lg:flex-row-reverse items-center justify-between gap-12 lg:gap-20 min-h-[calc(100vh-4rem)]">
              {/* Hero Content - Left Side */}
              <motion.div
                className="flex-1 max-w-2xl text-left lg:text-left"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Badge - Available for opportunities */}
                <motion.div
                  variants={badgeVariants}
                  className="mb-8"
                >
                  <Badge variant="accent" size="md" className="inline-flex items-center gap-2 px-4 py-2">
                    <motion.span
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.3, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as const }}
                      className="w-4 h-4 flex-shrink-0"
                      aria-hidden="true"
                    >
                      <SparklesIcon className="w-4 h-4" />
                    </motion.span>
                    <span className="font-medium">Disponible pour opportunités professionnelles</span>
                  </Badge>
                </motion.div>

                {/* Name */}
                <motion.h1
                  variants={itemVariants}
                  className="font-display font-bold text-[var(--color-text-primary)] tracking-tight mb-6 leading-[1.1]"
                  style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
                >
                  Rakotoarinivo Herilala
                </motion.h1>

                {/* Title */}
                <motion.p
                  variants={itemVariants}
                  className="text-[var(--color-accent-primary)] font-semibold text-lg mb-4 tracking-wide uppercase"
                >
                  Full Stack Developer
                </motion.p>

                {/* Tagline / Accroche */}
                <motion.p
                  variants={itemVariants}
                  className="text-[var(--color-text-secondary)] text-xl lg:text-2xl mb-10 max-w-xl leading-relaxed"
                >
                  "Je transforme des idées en expériences numériques."
                </motion.p>

                {/* Presentation text */}
                <motion.p
                  variants={itemVariants}
                  className="text-[var(--color-text-muted)] text-base lg:text-lg mb-12 max-w-xl leading-relaxed"
                >
                  Développeur Full Stack et diplômé d'une Licence, je viens de terminer mon parcours de M1 MIAGE.
                  Je m'intéresse à la conception et au développement d'applications web modernes, évolutives et utiles.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row items-start gap-4 mb-16"
                >
                  <Button
                    asAnchor
                    href="#projects"
                    variant="primary"
                    size="lg"
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                    className="group"
                  >
                    Découvrir mes projets
                    <motion.span
                      className="inline-block transition-transform group-hover:translate-x-1"
                    >
                      →
                    </motion.span>
                  </Button>
                  <Button
                    asAnchor
                    href="#contact"
                    variant="outline"
                    size="lg"
                    className="group"
                  >
                    Me contacter
                    <motion.span
                      className="inline-block transition-transform group-hover:translate-x-1"
                    >
                      <Send className="w-5 h-5" />
                    </motion.span>
                  </Button>
                </motion.div>

                {/* Social Links */}
                <motion.div
                  variants={itemVariants}
                  className="flex items-center gap-6"
                  role="list"
                  aria-label="Réseaux sociaux"
                >
                  <a
                    href={profile.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center w-12 h-12 rounded-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent-primary)] hover:bg-[var(--color-bg-hover)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]"
                    aria-label="GitHub"
                  >
                    <GitHubIcon className="w-6 h-6 transition-transform group-hover:scale-110" aria-hidden="true" />
                    <span className="sr-only">GitHub</span>
                  </a>
                  <a
                    href={profile.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center w-12 h-12 rounded-sm text-[var(--color-text-muted)] hover:text-[var(--color-info)] hover:bg-[var(--color-bg-hover)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]"
                    aria-label="LinkedIn"
                  >
                    <LinkedInIcon className="w-6 h-6 transition-transform group-hover:scale-110" aria-hidden="true" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                  <a
                    href={profile.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center w-12 h-12 rounded-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent-tertiary)] hover:bg-[var(--color-bg-hover)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]"
                    aria-label="Twitter"
                  >
                    <TwitterIcon className="w-6 h-6 transition-transform group-hover:scale-110" aria-hidden="true" />
                    <span className="sr-only">Twitter</span>
                  </a>
                  <a
                    href={profile.social.email}
                    className="group flex items-center justify-center w-12 h-12 rounded-sm text-[var(--color-text-muted)] hover:text-[var(--color-warning)] hover:bg-[var(--color-bg-hover)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]"
                    aria-label="Email"
                  >
                    <Mail className="w-6 h-6 transition-transform group-hover:scale-110" aria-hidden="true" />
                    <span className="sr-only">Email</span>
                  </a>
                </motion.div>
              </motion.div>

              {/* Hero Illustration - Right Side */}
              <motion.div
                className="hidden lg:flex lg:flex-1 lg:max-w-[500px] lg:max-h-[500px] relative"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.4, 0, 0.2, 1] as const }}
              >
                <div className="relative">
                  <HeroIllustration size={480} />
                  {/* Floating tech badges around illustration */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[
                      { label: "React", top: "10%", left: "5%", color: "#61DAFB" },
                      { label: "TypeScript", top: "20%", right: "5%", color: "#3178C6" },
                      { label: "Node.js", bottom: "20%", left: "5%", color: "#339933" },
                      { label: "PostgreSQL", bottom: "10%", right: "5%", color: "#4169E1" },
                      { label: "Spring Boot", top: "50%", right: "-5%", color: "#6DB33F" },
                      { label: "Docker", bottom: "40%", right: "-5%", color: "#2496ED" },
                    ].map((tech, i) => (
                      <motion.span
                        key={tech.label}
                        variants={iconVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                        className="absolute px-3 py-1.5 text-xs font-medium rounded-full border backdrop-blur-sm transition-all hover:scale-105"
                        style={{
                          top: tech.top,
                          bottom: tech.bottom,
                          left: tech.left,
                          right: tech.right,
                          background: `${tech.color}15`,
                          borderColor: `${tech.color}40`,
                          color: tech.color,
                        }}
                      >
                        {tech.label}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </Container>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--color-text-muted)] hidden lg:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            <span className="text-xs font-medium uppercase tracking-wider">Descendre</span>
            <motion.svg
              className="w-6 h-6"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </motion.svg>
          </motion.div>
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
                      <Button asAnchor href={project.demo} variant="ghost" size="sm" external rightIcon={<ExternalLink className="w-4 h-4" />} className="flex-1 justify-center">
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
                rightIcon={<ArrowRight className="w-5 h-5" />}
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
                <Button asAnchor href="#contact" variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Me contacter
                </Button>
                <Button asAnchor href={profile.social.linkedin} variant="outline" size="lg" external rightIcon={<ExternalLink className="w-4 h-4" />}>
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