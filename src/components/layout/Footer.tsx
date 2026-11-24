import React, { type ReactNode, type ReactElement } from "react";
import { cn } from "../../lib/utils";
import { Container } from "./Container";
import { ExternalLink } from "lucide-react";
import { GitHubIcon, LinkedInIcon, TwitterIcon, Mail } from "../ui/BrandIcons";

/**
 * Footer component
 */

export interface FooterProps {
  /** Copyright text */
  copyright?: string;
  /** Social links */
  socialLinks?: Array<{
    label: string;
    href: string;
    icon: ReactNode;
    external?: boolean;
  }>;
  /** Navigation links */
  navLinks?: Array<{
    label: string;
    href: string;
    external?: boolean;
  }>;
  /** Custom className */
  className?: string;
  /** Show theme toggle */
  showThemeToggle?: boolean;
}

const defaultSocialLinks = [
  { label: "GitHub", href: "https://github.com/TerrorAdona", icon: <GitHubIcon className="w-5 h-5" />, external: true },
  { label: "LinkedIn", href: "https://linkedin.com/in/rakotoarinivo-herilala", icon: <LinkedInIcon className="w-5 h-5" />, external: true },
  { label: "Twitter", href: "https://twitter.com/TerrorAdona", icon: <TwitterIcon className="w-5 h-5" />, external: true },
  { label: "Email", href: "mailto:herilala.rakotoarinivo@gmail.com", icon: <Mail className="w-5 h-5" />, external: true },
];

const defaultNavLinks = [
  { label: "Accueil", href: "/" },
  { label: "Projets", href: "/projects" },
  { label: "À propos", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Footer({
  copyright = `© ${new Date().getFullYear()} Rakotoarinivo Herilala. Tous droits réservés.`,
  socialLinks = defaultSocialLinks,
  navLinks = defaultNavLinks,
  className,
  showThemeToggle = false,
}: FooterProps) {
  return (
    <footer
      className={cn(
        "bg-[var(--color-bg-secondary)] border-t border-[var(--color-border-primary)]",
        className
      )}
      role="contentinfo"
    >
      <Container size="xl" padding="lg" center={false}>
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-12 py-8">
          {/* Brand & Copyright */}
          <div className="flex flex-col items-center lg:items-start gap-4 text-center lg:text-left">
            <div className="font-display font-bold text-xl text-[var(--color-text-primary)]">
              RH
            </div>
            <p className="text-sm text-[var(--color-text-muted)] max-w-xs">
              {copyright}
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-4 lg:gap-6" aria-label="Navigation pied de page">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-sm",
                  "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]",
                  "hover:bg-[var(--color-bg-hover)] transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]"
                )}
                aria-label={link.label}
              >
                {link.icon}
                {link.external && <ExternalLink className="w-3 h-3 ml-1 opacity-50" aria-hidden="true" />}
              </a>
            ))}
            {showThemeToggle && (
              <ThemeToggleButton className="w-10 h-10" />
            )}
          </div>
        </div>
      </Container>
    </footer>
  );
}

/**
 * Theme Toggle Button (inline)
 */
function ThemeToggleButton({ className }: { className?: string }) {
  const [theme, setTheme] = React.useState<"dark" | "light">("dark");

  React.useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("light", newTheme === "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "flex items-center justify-center rounded-sm",
        "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]",
        "hover:bg-[var(--color-bg-hover)] transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]",
        className
      )}
      aria-label={`Basculer en mode ${theme === "dark" ? "clair" : "sombre"}`}
    >
      {theme === "dark" ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="5" strokeWidth="2" />
          <path strokeWidth="2" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeWidth="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      )}
    </button>
  );
}