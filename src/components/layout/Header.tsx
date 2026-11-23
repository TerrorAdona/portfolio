import { useState, useEffect, type ReactNode } from "react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/Button";
import { Container } from "./Container";
import { Menu, X, Sun, Moon } from "lucide-react";

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
  }>;
  /** CTA button */
  cta?: {
    label: string;
    href: string;
    variant?: "primary" | "secondary" | "outline";
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

export function Header({
  logo,
  navItems = [],
  cta,
  showThemeToggle = true,
  fixed = true,
  transparent = false,
  className,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

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
        "w-full z-[300] transition-all duration-200",
        fixed && "fixed top-0 left-0",
        shouldShowBackground
          ? "bg-[var(--color-bg-primary)]/80 backdrop-blur-[20px] border-b border-[var(--color-border-primary)] shadow-[var(--shadow-sm)]"
          : "bg-transparent",
        className
      )}
      role="banner"
    >
      <Container size="xl" padding="md" center={false}>
        <div className="flex items-center justify-between h-16 lg:h-20 gap-4">
          {/* Logo */}
          <div className="flex-shrink-0" aria-label="Accueil">
            {logo || (
              <a
                href="/"
                className="font-display font-bold text-xl text-[var(--color-text-primary)] hover:opacity-80 transition-opacity"
                aria-label="Rakotoarinivo Herilala - Accueil"
              >
                RH
              </a>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Navigation principale">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                {item.label}
              </a>
            ))}
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
            className="lg:hidden p-2 rounded-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          id="mobile-menu"
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-200 ease-out",
            isMobileMenuOpen ? "max-h-96 opacity-100 pb-6" : "max-h-0 opacity-0"
          )}
          role="navigation"
          aria-label="Menu mobile"
        >
          <div className="flex flex-col gap-2 pt-4 border-t border-[var(--color-border-primary)]">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                onClick={handleNavClick}
                className="px-2 py-3 text-base font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] rounded-sm transition-colors"
              >
                {item.label}
              </a>
            ))}
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
        </div>
      </Container>
    </header>
  );
}