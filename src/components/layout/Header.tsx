import { useState, useEffect, useMemo, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "../../lib/utils";
import { Button } from "../ui/Button";
import { Container } from "./Container";
import { Menu, X, Sun, Moon, Download } from "lucide-react";
import { useScrollSpy } from "../../hooks/useScrollSpy";

/**
 * Header component with navigation and theme toggle
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
  const reducedMotion = useReducedMotion();
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

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("light", newTheme === "light");
  };

  // Close mobile menu on link click
  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  const shouldShowBackground = !transparent || isScrolled;

  return (
    <header
      className={cn(
        "w-full z-[300] transition-all duration-300",
        fixed && "fixed top-0 left-0",
        shouldShowBackground
          ? "bg-[var(--color-bg-primary)]/90 backdrop-blur-[20px] border-b border-[var(--color-border-primary)] shadow-[var(--shadow-sm)]"
          : "bg-transparent",
        className
      )}
      role="banner"
    >
      <Container size="xl" padding="md" center={false}>
        <div className="site-header-inner flex items-center justify-between h-16 lg:h-20 gap-4">
          {/* Logo */}
          <div className="flex-shrink-0" aria-label="Accueil">
            {logo || (
              <a
                href="#hero"
                className="site-brand-link font-display font-bold text-xl hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-primary)] rounded-sm"
                aria-label="Rakotoarinivo Herilala - Accueil"
              >
                RH
              </a>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Navigation principale">
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
                aria-current={item.href === `#${activeSection}` ? "location" : undefined}
                className="relative rounded-sm px-1 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-primary)]"
              >
                <span className="relative z-10">{item.label}</span>
                {item.href === `#${activeSection}` && (
                  <motion.span
                    layoutId="active-section-indicator"
                    className="pointer-events-none absolute inset-x-1 bottom-0 h-0.5 rounded-full bg-[var(--color-accent-primary)]"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    aria-hidden="true"
                  />
                )}
              </motion.a>
            ))}

            {/* CV Download Button */}
            {cvDownload && (
              <a
                href={cvDownload.href}
                download
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-sm bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] border border-[var(--color-border-primary)] hover:bg-[var(--color-bg-hover)] hover:border-[var(--color-border-secondary)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]"
                aria-label={`Télécharger le CV - ${cvDownload.label || "CV"}`}
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                <span>{cvDownload.label || "CV"}</span>
              </a>
            )}

            {cta && (
              <Button
                asAnchor
                href={cta.href}
                variant={cta.variant || "primary"}
                size="sm"
                external={cta.external}
              >
                {cta.label}
              </Button>
            )}

            {showThemeToggle && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]"
                aria-label={`Basculer en mode ${theme === "dark" ? "clair" : "sombre"}`}
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          id="mobile-menu"
          initial={false}
          animate={isMobileMenuOpen
            ? { height: "auto", opacity: 1 }
            : { height: 0, opacity: 0 }}
          transition={{
            duration: reducedMotion ? 0 : isMobileMenuOpen ? 0.24 : 0.18,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={cn(
            "lg:hidden overflow-hidden",
            isMobileMenuOpen && "pb-6"
          )}
          role="navigation"
          aria-label="Menu mobile"
          aria-hidden={!isMobileMenuOpen}
          inert={!isMobileMenuOpen}
        >
          <div className="flex flex-col gap-1 pt-4 border-t border-[var(--color-border-primary)]">
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                onClick={handleNavClick}
                whileTap={{ scale: 0.99 }}
                className="px-2 py-3 text-base font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] rounded-sm transition-colors"
              >
                {item.label}
              </motion.a>
            ))}

            {/* CV Download in Mobile */}
            {cvDownload && (
              <a
                href={cvDownload.href}
                download
                onClick={handleNavClick}
                className="flex items-center justify-center gap-2 px-4 py-3 text-base font-medium rounded-sm bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] border border-[var(--color-border-primary)] hover:bg-[var(--color-bg-hover)] hover:border-[var(--color-border-secondary)] transition-all"
              >
                <Download className="w-5 h-5" aria-hidden="true" />
                <span>{cvDownload.label || "Télécharger CV"}</span>
              </a>
            )}

            {cta && (
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
            )}
            {showThemeToggle && (
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center gap-2 px-2 py-3 text-base font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] rounded-sm transition-colors"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                <span>{theme === "dark" ? "Mode clair" : "Mode sombre"}</span>
              </button>
            )}
          </div>
        </motion.div>
      </Container>
    </header>
  );
}
