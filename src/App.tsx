import { Suspense, lazy, useState, useEffect, useRef } from "react";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Section } from "./components/layout/Section";
import { Container } from "./components/layout/Container";
import { Button } from "./components/ui/Button";
import { Card } from "./components/ui/Card";
import { Badge } from "./components/ui/Badge";
import { TechBadgeCloud } from "./components/projects/TechBadge";
import { GitHubIcon, LinkedInIcon, TwitterIcon } from "./components/ui/BrandIcons";
import { ScrollReveal } from "./components/ui/ScrollReveal";
import { profile } from "./data/profile";
import { projects } from "./data/projects";
import { skills } from "./data/skills";
import { ExternalLink, ArrowRight, Mail } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion, useScroll } from "framer-motion";
import { pageVariants, backToTopVariants } from "./lib/animations";
import "./styles/globals.css";

// Lazy load heavy sections
const ProjectsSection = lazy(() => import("./pages/ProjectsSection").then((m) => ({ default: m.ProjectsSection })));
const AboutSection = lazy(() => import("./pages/AboutSection"));
const SkillsSection = lazy(() => import("./pages/SkillsSection").then((m) => ({ default: m.SkillsSection })));
const ExperienceSection = lazy(() => import("./pages/ExperienceSection").then((m) => ({ default: m.ExperienceSection })));
const ContactSection = lazy(() => import("./pages/ContactSection").then((m) => ({ default: m.ContactSection })));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetail"));

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
      staggerChildren: 0.05,
      delayChildren: 0.04,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.44,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const portfolioNavItems = [
  { label: "Accueil", href: "#hero" },
  { label: "À propos", href: "#about" },
  { label: "Compétences", href: "#skills" },
  { label: "Projets", href: "#projects" },
  { label: "Parcours", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

function PortfolioHome() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { scrollYProgress } = useScroll();
  const reducedMotion = useReducedMotion();
  const location = useLocation();

  useEffect(() => {
    let frame = 0;
    let targetObserver: MutationObserver | undefined;

    const scrollToHashTarget = () => {
      targetObserver?.disconnect();
      targetObserver = undefined;
      if (frame) window.cancelAnimationFrame(frame);

      const encodedTargetId = window.location.hash.slice(1);
      if (!encodedTargetId) return;

      let targetId = encodedTargetId;
      try {
        targetId = decodeURIComponent(encodedTargetId);
      } catch {
        // Keep the raw fragment if it is not valid URI encoding.
      }

      const scrollWhenAvailable = () => {
        const target = document.getElementById(targetId);
        if (!target) return false;

        targetObserver?.disconnect();
        targetObserver = undefined;
        frame = window.requestAnimationFrame(() => {
          target.scrollIntoView({
            behavior: reducedMotion ? "auto" : "smooth",
            block: "start",
          });
        });
        return true;
      };

      if (scrollWhenAvailable()) return;

      // Some targets live inside lazy-loaded sections. Wait for their DOM node
      // instead of giving up after a fixed number of animation frames.
      targetObserver = new MutationObserver(scrollWhenAvailable);
      targetObserver.observe(document.body, { childList: true, subtree: true });
    };

    scrollToHashTarget();
    window.addEventListener("hashchange", scrollToHashTarget);

    return () => {
      window.removeEventListener("hashchange", scrollToHashTarget);
      targetObserver?.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [location.hash, reducedMotion]);

  // Show back to top button after scrolling
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  };

  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <>
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-[9999] pointer-events-none"
        style={{
          scaleX: scrollYProgress,
          transformOrigin: "0% 50%",
          background: "linear-gradient(90deg, var(--color-accent-primary), var(--color-accent-tertiary))",
        }}
        aria-hidden="true"
      />

      {/* Header / Navbar */}
      <Header
        logo={
          <a
            href="#hero"
            className="site-brand-link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-primary)] rounded-sm"
            aria-label="Rakotoarinivo Herilala - Accueil"
          >
            <span className="site-brand-name">Rakotoarinivo Herilala</span>
          </a>
        }
        navItems={portfolioNavItems}
        cvDownload={{
          href: "/cv.pdf",
          label: "CV",
        }}
        showThemeToggle={true}
        fixed={true}
        transparent={true}
      />

      {/* Main Content */}
      <main id="main-content" className="portfolio-main min-h-screen">
        {/* Hero Section */}
        <Section id="hero" size="lg" background="none" className="hero-section">
          <Container size="xl" padding="lg" center={false}>
            <div className="hero-layout">
              <motion.div
                className="hero-copy"
                variants={containerVariants}
                initial={reducedMotion ? false : "hidden"}
                animate="visible"
              >
                <motion.p variants={itemVariants} className="hero-availability">
                  {"Disponible pour de nouvelles opportunit\u00e9s"}
                </motion.p>

                <motion.h1 variants={itemVariants} className="hero-title">
                  <span>Rakotoarinivo</span>
                  <span>Herilala</span>
                </motion.h1>

                <motion.p variants={itemVariants} className="hero-role">
                  {"D\u00e9veloppeur Full Stack"}
                </motion.p>

                <motion.p variants={itemVariants} className="hero-lead">
                  {"Je transforme des id\u00e9es en applications utiles, robustes et accessibles."}
                </motion.p>

                <motion.p variants={itemVariants} className="hero-description">
                  {"Form\u00e9 en MIAGE, je con\u00e7ois des exp\u00e9riences web modernes \u2014 du frontend \u00e0 l\u2019architecture backend \u2014 avec une attention particuli\u00e8re \u00e0 la qualit\u00e9 et \u00e0 la performance."}
                </motion.p>

                <motion.div variants={itemVariants} className="hero-actions">
                  <Button
                    asAnchor
                    href="#projects"
                    variant="primary"
                    size="lg"
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                  >
                    {"D\u00e9couvrir mes projets"}
                  </Button>
                  <Button asAnchor href="#contact" variant="outline" size="lg">
                    Me contacter
                  </Button>
                </motion.div>

                <motion.nav
                  variants={itemVariants}
                  className="hero-socials"
                  aria-label={"R\u00e9seaux sociaux"}
                >
                  <a href={profile.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <GitHubIcon className="w-5 h-5" aria-hidden="true" />
                    <span className="sr-only">GitHub</span>
                  </a>
                  <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <LinkedInIcon className="w-5 h-5" aria-hidden="true" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                  <a href={profile.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <TwitterIcon className="w-5 h-5" aria-hidden="true" />
                    <span className="sr-only">Twitter</span>
                  </a>
                  <a href={profile.social.email} aria-label="Email">
                    <Mail className="w-5 h-5" aria-hidden="true" />
                    <span className="sr-only">Email</span>
                  </a>
                </motion.nav>
              </motion.div>

              <motion.figure
                className="hero-visual"
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.48, delay: reducedMotion ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}
                role="img"
                aria-label={"Sch\u00e9ma de d\u00e9veloppement full stack : interface React et TypeScript, services Spring et Node.js, donn\u00e9es PostgreSQL."}
              >
                <div className="architecture-card" aria-hidden="true">
                  <div className="architecture-heading">
                    <span>{"De l\u2019id\u00e9e au produit"}</span>
                    <span className="architecture-status">Full stack</span>
                  </div>
                  <div className="architecture-flow">
                    <div className="architecture-node">
                      <small>01 / Interface</small>
                      <strong>{"Exp\u00e9rience"}</strong>
                      <span>{"React \u00b7 TypeScript"}</span>
                    </div>
                    <span className="architecture-arrow" aria-hidden="true">{"\u2192"}</span>
                    <div className="architecture-node">
                      <small>02 / Services</small>
                      <strong>Logique</strong>
                      <span>{"Spring \u00b7 Node.js"}</span>
                    </div>
                    <span className="architecture-arrow" aria-hidden="true">{"\u2192"}</span>
                    <div className="architecture-node">
                      <small>03 / {"Donn\u00e9es"}</small>
                      <strong>Fondations</strong>
                      <span>PostgreSQL</span>
                    </div>
                  </div>
                  <div className="architecture-stack">
                    <span>Concevoir</span>
                    <span>Construire</span>
                    <span>{"Am\u00e9liorer"}</span>
                  </div>
                </div>
                <figcaption className="architecture-caption">
                  {"Une approche compl\u00e8te : une interface claire, des services fiables et des donn\u00e9es bien structur\u00e9es."}
                </figcaption>
              </motion.figure>
            </div>
          </Container>
        </Section>
        {/* Featured Projects Preview */}
        <Section id="featured-projects-preview" size="md" background="secondary">
          <Container size="xl" padding="md">
            <ScrollReveal variant="fadeInUp" delay={100}>
              <header className="section-heading mb-12 text-center max-w-2xl mx-auto">
                <Badge variant="accent" size="sm" className="section-eyebrow mb-4">
                  <span className="w-4 h-4 mr-1" aria-hidden="true">💻</span>
                  Projets phares
                </Badge>
                <h2 className="section-title font-display font-bold text-[var(--color-text-primary)] tracking-tight mb-4">
                  Projets sélectionnés
                </h2>
                <p className="text-[var(--color-text-secondary)] text-lg">
                  Une sélection de mes projets les plus aboutis, démontrant ma capacité à livrer des solutions complètes, de la conception au déploiement.
                </p>
              </header>
            </ScrollReveal>

            <ScrollReveal variant="fadeInUp" delay={200}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProjects.map((project) => (
                  <Card key={project.slug} variant="interactive" padding="md" className="portfolio-project-card flex flex-col h-full">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-[var(--color-text-primary)] truncate">
                        <Link to={`/projects/${project.slug}`} className="hover:text-[var(--color-accent-primary)] transition-colors">
                          {project.name}
                        </Link>
                      </h3>
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
            </ScrollReveal>

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
        <Section id="skills-preview" size="md" background="none">
          <Container size="xl" padding="md">
            <ScrollReveal variant="fadeInUp" delay={100}>
              <header className="section-heading mb-12 text-center max-w-2xl mx-auto">
                <Badge variant="accent" size="sm" className="section-eyebrow mb-4">
                  <span className="w-4 h-4 mr-1" aria-hidden="true">⚡</span>
                  Stack technique
                </Badge>
                <h2 className="section-title font-display font-bold text-[var(--color-text-primary)] tracking-tight mb-4">
                Technologies maîtrisées
              </h2>
              <p className="text-[var(--color-text-secondary)] text-lg">
                Une expertise ciblée sur l'écosystème JavaScript/TypeScript moderne et les architectures backend robustes.
              </p>
            </header>
            </ScrollReveal>

            <ScrollReveal variant="fadeInUp" delay={200}>
              <TechBadgeCloud
              technologies={skills.filter((s) => s.featured && s.level >= 4).map((s) => ({
                name: s.name,
                category: s.category,
                level: s.level,
              }))}
              size="md"
              showCategory={true}
            />
            </ScrollReveal>
          </Container>
        </Section>

        {/* CTA Section */}
        <Section size="md" background="gradient" className="portfolio-cta relative">
          <Container size="xl" padding="md" center={true}>
            <ScrollReveal variant="fadeInUp" delay={100}>
              <div className="section-heading max-w-2xl text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-accent-primary)]/15 text-[var(--color-accent-primary)] border border-[var(--color-accent-primary)]/30 mb-6">
                  <span className="w-4 h-4" aria-hidden="true">✨</span>
                  <span className="font-medium">Open to opportunities</span>
                </div>
                <h2 className="section-title font-display font-bold text-[var(--color-text-primary)] tracking-tight mb-4">
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
            </ScrollReveal>
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

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            variants={backToTopVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="back-to-top fixed bottom-8 right-8 z-[999] p-4 rounded-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border-primary)] text-[var(--color-text-primary)] shadow-[var(--shadow-lg)] hover:bg-[var(--color-bg-hover)] hover:border-[var(--color-accent-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]"
            aria-label="Retour en haut"
            onClick={scrollToTop}
          >
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer
        copyright={`© ${new Date().getFullYear()} ${profile.name}. Tous droits réservés.`}
        showThemeToggle={true}
        className="site-footer"
      />
    </>
  );
}

function App() {
  const location = useLocation();
  const reducedMotion = useReducedMotion();
  const previousPath = useRef(location.pathname);

  useEffect(() => {
    if (previousPath.current !== location.pathname && !location.hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
    previousPath.current = location.pathname;
  }, [location.pathname, location.hash]);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Aller au contenu principal
      </a>
      <AnimatePresence mode={reducedMotion ? "sync" : "wait"} initial={false}>
        <motion.div
          key={location.pathname}
          className="min-h-screen"
          variants={pageVariants}
          initial={reducedMotion ? false : "initial"}
          animate={reducedMotion ? undefined : "animate"}
          exit={reducedMotion ? undefined : "exit"}
        >
          <Routes location={location}>
            <Route path="/" element={<PortfolioHome />} />
            <Route
              path="/projects/:slug"
              element={
                <Suspense fallback={<SectionSkeleton />}>
                  <ProjectDetailPage />
                </Suspense>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default App;
