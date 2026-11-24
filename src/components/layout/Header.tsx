import { useState, useEffect, useMemo, useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "../../lib/utils";
import { Button } from "../ui/Button";
import { Container } from "./Container";
import { Menu, X, Sun, Moon, Download, ChevronDown } from "lucide-react";
import { useScrollSpy } from "../../hooks/useScrollSpy";

/**
 * Header component with navigation and theme toggle
 * Manuscript-style: mechanical reveal entrance, smooth scroll transitions, copper accents
 */

export interface HeaderProps {
  /** Logo */
  logo?: ReactNode;
  /** Navigation items */
  navItems?: Array<{
    label: string;
    href: string;
    external?: boolean;
    variant?: "primary" | "secondary" | "outline";
  }>;
  /** CTA button */
  cta?: {
    label: string;
    href: string;
    variant?: "primary" | "secondary" | "outline";
    external?: boolean;
  };
  /** CV download */
  cvDownload?: {
    href: string;
    label?: string;
  };
  /** Theme toggle */
  showThemeToggle?: boolean;
  /** Fixed header */
  fixed?: boolean;
  /** Transparent background */
  transparent?: boolean;
  /** Custom className */
  className?: string;
}

const defaultNavItems = [
  { label: "Accueil", href: "#hero", external: false },
  { label: "À propos", href: "#about", external: false },
  { label: "Compétences", href: "#skills", external: false },
  { label: "Projets", href: "#projects", external: false },
  { label: "Parcours", href: "#experience", external: false },
  { label: "Contact", href: "#contact", external: false },
];

// Manuscript entrance variants
const headerVariants = {
  initial: { y: -100, opacity: 0 },
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const logoVariants = {
  initial: { x: -20, opacity: 0 },
  enter: {
    x: 0,
    opacity: 1,
    transition: { delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const navVariants = {
  initial: { y: -20, opacity: 0 },
  enter: (index: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: 0.2 + index * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const actionVariants = {
  initial: { x: 20, opacity: 0 },
  enter: (index: number) => ({
    x: 0,
    opacity: 1,
    transition: { delay: 0.25 + index * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const mobileMenuVariants = {
  closed: { height: 0, opacity: 0 },
  open: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Header({
  logo,
  navItems = defaultNavItems,
  cta,
  cvDownload,
  showThemeToggle = true,
  fixed = true,
  transparent = false,
  className,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isAnimatingTheme, setIsAnimatingTheme] = useState(false);
  const reducedMotion = useReducedMotion();
  const headerRef = useRef<HTMLHeaderElement>(null);

  // Scroll progress for header background intensity
  const { scrollYProgress } = useScroll({ target: headerRef, offset: ["start start", "end start"] });
  const bgOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const borderOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const shadowIntensity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  const sectionIds = useMemo(
    () => navItems
      .filter((item) => !item.external && item.href.startsWith("#"))
      .map((item) => item.href.slice(1)),
    [navItems]
  );
  const activeSection = useScrollSpy(sectionIds);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.classList.toggle("light", initialTheme === "light");
  }, []);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle theme with animation
  const toggleTheme = () => {
    setIsAnimatingTheme(true);
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("light", newTheme === "light");
    setTimeout(() => setIsAnimatingTheme(false), 300);
  };

  // Close mobile menu on link click
  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  const shouldShowBackground = !transparent || isScrolled;

  return (
    <motion.header
      ref={headerRef}
      variants={headerVariants}
      initial={reducedMotion ? false : "initial"}
      animate="enter"
      className={cn(
        "w-full z-[300]",
        fixed && "fixed top-0 left-0",
        shouldShowBackground && "bg-[var(--color-bg-primary)]/90 backdrop-blur-[20px] border-b border-[var(--color-border-primary)] shadow-[var(--shadow-sm)]",
        !shouldShowBackground && "bg-transparent",
        className
      )}
      role="banner"
      style={{
        transition: "background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <Container size="xl" padding="md" center={false}>
        <motion.div
          className="site-header-inner flex items-center justify-between h-16 lg:h-20 gap-4 relative"
          variants={logoVariants}
        >
          {/* Scroll Progress Bar */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-0.5 pointer-events-none bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] origin-left"
            animate={{ scaleX: scrollYProgress }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            aria-hidden="true"
          />

          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            aria-label="Accueil"
            variants={logoVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {logo || (
              <a
                href="#hero"
                className="site-brand-link flex items-center gap-2 font-display font-bold text-xl tracking-tight hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-primary)] rounded-sm px-1 py-0.5"
                aria-label="Rakotoarinivo Herilala - Accueil"
              >
                <span className="text-[var(--color-text-primary)]">Rakotoarinivo</span>
                <span className="text-[var(--color-accent-primary)] italic font-medium">Herilala</span>
              </a>
            )}
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            className="hidden lg:flex items-center gap-6"
            aria-label="Navigation principale"
            variants={navVariants}
          >
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                variants={navVariants.enter(index)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                aria-current={item.href === `#${activeSection}` ? "location" : undefined}
                className="relative rounded-sm px-1.5 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-primary)]"
              >
                <span className="relative z-10">{item.label}</span>
                {item.href === `#${activeSection}` && (
                  <motion.span
                    layoutId="active-section-indicator"
                    className="pointer-events-none absolute inset-x-2 bottom-1 h-0.5 rounded-full bg-[var(--color-accent-primary)]"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    aria-hidden="true"
                  />
                )}
              </motion.a>
            ))}
          </motion.nav>

          {/* Actions: CV, CTA, Theme Toggle */}
          <motion.div
            className="hidden lg:flex items-center gap-3"
            variants={actionVariants}
          >
            {/* CV Download Button */}
            {cvDownload && (
              <motion.a
                href={cvDownload.href}
                download
                variants={actionVariants.enter(0)}
                whileHover={{ y: -2, boxShadow: "var(--shadow-copper-sm)" }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-sm bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] border border-[var(--color-border-primary)] hover:bg-[var(--color-bg-hover)] hover:border-[var(--color-border-secondary)] hover:border-[var(--color-accent-primary)]/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]"
                aria-label={`Télécharger le CV - ${cvDownload.label || "CV"}`}
              >
                <Download className="w-4 h-4 transition-transform group-hover:rotate-90" aria-hidden="true" />
                <span>{cvDownload.label || "CV"}</span>
              </motion.a>
            )}

            {cta && (
              <motion.div
                variants={actionVariants.enter(cvDownload ? 1 : 0)}
              >
                <Button
                  asAnchor
                  href={cta.href}
                  variant={cta.variant || "primary"}
                  size="sm"
                  external={cta.external}
                  rightIcon={<ChevronDown className="w-4 h-4" />}
                >
                  {cta.label}
                </Button>
              </motion.div>
            )}

            {showThemeToggle && (
              <motion.button
                variants={actionVariants.enter(cvDownload && cta ? 2 : cvDownload || cta ? 1 : 0)}
                onClick={toggleTheme}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2.5 rounded-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]"
                aria-label={`Basculer en mode ${theme === "dark" ? "clair" : "sombre"}`}
                aria-pressed={theme === "light"}
              >
                <motion.span
                  animate={{
                    rotate: theme === "dark" ? 0 : 180,
                    scale: isAnimatingTheme ? 0.8 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {theme === "dark" ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </motion.span>
              </motion.button>
            )}
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 rounded-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.span
              animate={{
                rotate: isMobileMenuOpen ? 90 : 0,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.span>
          </motion.button>
        </motion.div>

        {/* Mobile Navigation */}
        <motion.div
          id="mobile-menu"
          variants={mobileMenuVariants}
          animate={isMobileMenuOpen ? "open" : "closed"}
          className={cn(
            "lg:hidden overflow-hidden",
            isMobileMenuOpen && "pb-6"
          )}
          role="navigation"
          aria-label="Menu mobile"
          aria-hidden={!isMobileMenuOpen}
          inert={!isMobileMenuOpen}
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
            className="flex flex-col gap-1 pt-4 border-t border-[var(--color-border-primary)]"
          >
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                onClick={handleNavClick}
                whileTap={{ scale: 0.99 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                className="px-3 py-3 text-base font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] rounded-sm transition-colors flex items-center gap-3"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.15 + index * 0.05, type: "spring", stiffness: 400 }}
                  className="w-5 h-5 text-[var(--color-accent-primary)]"
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.span>
                <span>{item.label}</span>
              </motion.a>
            ))}

            {/* CV Download in Mobile */}
            {cvDownload && (
              <motion.a
                href={cvDownload.href}
                download
                onClick={handleNavClick}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + navItems.length * 0.05, duration: 0.3 }}
                className="flex items-center justify-center gap-2 px-4 py-3 text-base font-medium rounded-sm bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] border border-[var(--color-border-primary)] hover:bg-[var(--color-bg-hover)] hover:border-[var(--color-border-secondary)] transition-all"
              >
                <Download className="w-5 h-5" aria-hidden="true" />
                <span>{cvDownload.label || "Télécharger CV"}</span>
              </motion.a>
            )}

            {cta && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + navItems.length * 0.05, duration: 0.3 }}
              >
                <Button
                  asAnchor
                  href={cta.href}
                  variant={cta.variant || "primary"}
                  fullWidth
                  onClick={handleNavClick}
                  external={cta.external}
                >
                  {cta.label}
                </Button>
              </motion.div>
            )}

            {showThemeToggle && (
              <motion.button
                onClick={toggleTheme}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + navItems.length * 0.05, duration: 0.3 }}
                className="flex items-center justify-center gap-3 px-3 py-3 text-base font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] rounded-sm transition-colors w-full"
              >
                <motion.span
                  animate={{
                    rotate: theme === "dark" ? 0 : 180,
                    scale: isAnimatingTheme ? 0.8 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </motion.span>
                <span>{theme === "dark" ? "Mode clair" : "Mode sombre"}</span>
              </motion.button>
            )}
          </motion.div>
        </motion.div>
      </Container>
    </motion.header>
  );
}