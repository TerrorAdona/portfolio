import { useState, useEffect, type ReactNode } from "react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/Button";
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";

/**
 * Navbar component - standalone navigation bar
 * Can be used independently or within Header
 */

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  children?: NavItem[];
  badge?: string;
  badgeVariant?: "default" | "accent" | "success" | "warning" | "error";
}

export interface NavbarProps {
  /** Logo/brand */
  logo?: ReactNode;
  /** Navigation items */
  items: NavItem[];
  /** CTA button */
  cta?: {
    label: string;
    href: string;
    variant?: "primary" | "secondary" | "outline";
    external?: boolean;
  };
  /** Theme toggle */
  showThemeToggle?: boolean;
  /** Variant */
  variant?: "default" | "transparent" | "bordered" | "elevated";
  /** Position */
  position?: "static" | "fixed" | "sticky";
  /** Custom className */
  className?: string;
  /** onItemClick callback */
  onItemClick?: (item: NavItem) => void;
}

const variantStyles = {
  default: "bg-[var(--color-bg-primary)] border-b border-[var(--color-border-primary)]",
  transparent: "bg-transparent",
  bordered: "bg-[var(--color-bg-primary)] border-b border-[var(--color-border-primary)] shadow-[var(--shadow-sm)]",
  elevated: "bg-[var(--color-bg-primary)] shadow-[var(--shadow-md)]",
} as const;

const positionStyles = {
  static: "",
  fixed: "fixed top-0 left-0 right-0 z-[300]",
  sticky: "sticky top-0 z-[300]",
} as const;

export function Navbar({
  logo,
  items,
  cta,
  showThemeToggle = true,
  variant = "default",
  position = "sticky",
  className,
  onItemClick,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.classList.toggle("light", initialTheme === "light");
  }, []);

  // Handle scroll for transparent variant
  useEffect(() => {
    if (variant !== "transparent") return;
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [variant]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("light", newTheme === "light");
  };

  const shouldShowBackground = variant !== "transparent" || isScrolled;

  const handleItemClick = (item: NavItem) => {
    onItemClick?.(item);
    if (!item.children) setIsMobileMenuOpen(false);
  };

  const handleDropdownToggle = (href: string) => {
    setOpenDropdown((prev) => (prev === href ? null : href));
  };

  const handleKeyDown = (e: React.KeyboardEvent, item: NavItem) => {
    if (e.key === "Enter" || e.key === " ") {
      if (item.children) {
        e.preventDefault();
        handleDropdownToggle(item.href);
      } else {
        handleItemClick(item);
      }
    } else if (e.key === "Escape") {
      setOpenDropdown(null);
    }
  };

  return (
    <nav
      className={cn(
        "w-full transition-all duration-200",
        positionStyles[position],
        shouldShowBackground ? variantStyles[variant] : variantStyles.transparent,
        className
      )}
      role="navigation"
      aria-label="Navigation principale"
    >
      <div className="mx-auto max-w-[1440px] px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20 gap-4">
          {/* Logo */}
          <div className="flex-shrink-0" aria-label="Accueil">
            {logo || (
              <a
                href="/"
                className="font-display font-bold text-xl text-[var(--color-text-primary)] hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-primary)] rounded-sm"
                aria-label="Accueil"
              >
                RH
              </a>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-1 lg:flex-1 lg:justify-center">
            {items.map((item) => (
              <NavItemDesktop
                key={item.href}
                item={item}
                openDropdown={openDropdown}
                onDropdownToggle={handleDropdownToggle}
                onClick={handleItemClick}
                onKeyDown={handleKeyDown}
              />
            ))}
          </div>

          {/* Actions */}
          <div className="hidden lg:flex lg:items-center lg:gap-3">
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
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="navbar-mobile-menu"
            aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          id="navbar-mobile-menu"
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-200 ease-out border-t border-[var(--color-border-primary)]",
            isMobileMenuOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"
          )}
          role="navigation"
          aria-label="Menu mobile"
        >
          <div className="flex flex-col gap-1 pt-4">
            {items.map((item) => (
              <NavItemMobile
                key={item.href}
                item={item}
                openDropdown={openDropdown}
                onDropdownToggle={handleDropdownToggle}
                onClick={handleItemClick}
              />
            ))}
            {cta && (
              <Button
                asAnchor
                href={cta.href}
                variant={cta.variant || "primary"}
                fullWidth
                onClick={() => setIsMobileMenuOpen(false)}
                external={cta.external}
                className="mt-2"
              >
                {cta.label}
              </Button>
            )}
            {showThemeToggle && (
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center gap-2 px-2 py-3 text-base font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] rounded-sm transition-colors mt-2"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                <span>{theme === "dark" ? "Mode clair" : "Mode sombre"}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

/**
 * Desktop Nav Item with dropdown support
 */
function NavItemDesktop({
  item,
  openDropdown,
  onDropdownToggle,
  onClick,
  onKeyDown,
}: {
  item: NavItem;
  openDropdown: string | null;
  onDropdownToggle: (href: string) => void;
  onClick: (item: NavItem) => void;
  onKeyDown: (e: React.KeyboardEvent, item: NavItem) => void;
}) {
  const hasChildren = item.children && item.children.length > 0;
  const isOpen = openDropdown === item.href;

  return (
    <div className="relative" onMouseLeave={() => hasChildren && !isOpen && onDropdownToggle(item.href)}>
      <button
        type="button"
        onClick={() => hasChildren ? onDropdownToggle(item.href) : onClick(item)}
        onKeyDown={(e) => onKeyDown(e, item)}
        className={cn(
          "px-3 py-2 text-sm font-medium rounded-sm transition-colors",
          "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
          "hover:bg-[var(--color-bg-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]",
          hasChildren && "pr-8 flex items-center gap-1.5"
        )}
        aria-expanded={hasChildren ? isOpen : undefined}
        aria-haspopup={hasChildren ? "true" : undefined}
      >
        {item.label}
        {item.badge && (
          <span className={cn(
            "px-1.5 py-0.5 text-xs font-medium rounded-xs",
            item.badgeVariant === "accent" && "bg-[var(--color-accent-primary)]/15 text-[var(--color-accent-primary)]",
            item.badgeVariant === "success" && "bg-[var(--color-success)]/15 text-[var(--color-success)]",
            item.badgeVariant === "warning" && "bg-[var(--color-warning)]/15 text-[var(--color-warning)]",
            item.badgeVariant === "error" && "bg-[var(--color-error)]/15 text-[var(--color-error)]",
            item.badgeVariant === "default" && "bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)]"
          )}>
            {item.badge}
          </span>
        )}
        {hasChildren && (
          <ChevronDown
            className={cn(
              "w-4 h-4 text-[var(--color-text-muted)] transition-transform",
              isOpen && "rotate-180"
            )}
            aria-hidden="true"
          />
        )}
      </button>

      {hasChildren && (
        <div
          className={cn(
            "absolute top-full left-0 mt-2 min-w-[200px]",
            "bg-[var(--color-bg-tertiary)] border border-[var(--color-border-primary)] rounded-md shadow-[var(--shadow-lg)]",
            "py-1 animate-slide-down",
            "z-[100]"
          )}
          role="menu"
        >
          {item.children!.map((child) => (
            <button
              key={child.href}
              type="button"
              onClick={() => { onClick(child); onDropdownToggle(item.href); }}
              className={cn(
                "w-full px-3 py-2 text-sm text-left font-medium rounded-none",
                "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
                "hover:bg-[var(--color-bg-hover)] transition-colors",
                "focus-visible:outline-none focus-visible:bg-[var(--color-bg-hover)]"
              )}
              role="menuitem"
              tabIndex={-1}
            >
              {child.label}
              {child.badge && (
                <span className="ml-auto px-1.5 py-0.5 text-xs font-medium rounded-xs bg-[var(--color-bg-secondary)] text-[var(--color-text-muted)]">
                  {child.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Mobile Nav Item with collapsible dropdown
 */
function NavItemMobile({
  item,
  openDropdown,
  onDropdownToggle,
  onClick,
}: {
  item: NavItem;
  openDropdown: string | null;
  onDropdownToggle: (href: string) => void;
  onClick: (item: NavItem) => void;
}) {
  const hasChildren = item.children && item.children.length > 0;
  const isOpen = openDropdown === item.href;
  const [mobileOpen, setMobileOpen] = useState(false);

  // Sync with global dropdown state
  useEffect(() => {
    setMobileOpen(isOpen);
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => hasChildren ? (setMobileOpen(!mobileOpen), onDropdownToggle(item.href)) : onClick(item)}
        className={cn(
          "w-full px-2 py-3 text-base font-medium rounded-sm transition-colors flex items-center justify-between",
          "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
          "hover:bg-[var(--color-bg-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]"
        )}
        aria-expanded={hasChildren ? mobileOpen : undefined}
      >
        <span>{item.label}</span>
        {item.badge && (
          <span className="px-1.5 py-0.5 text-xs font-medium rounded-xs bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)]">
            {item.badge}
          </span>
        )}
        {hasChildren && (
          <ChevronDown
            className={cn(
              "w-4 h-4 text-[var(--color-text-muted)] transition-transform flex-shrink-0",
              mobileOpen && "rotate-180"
            )}
            aria-hidden="true"
          />
        )}
      </button>

      {hasChildren && mobileOpen && (
        <div className="mt-1 ml-4 pl-3 border-l border-[var(--color-border-primary)] animate-slide-down">
          {item.children!.map((child) => (
            <button
              key={child.href}
              type="button"
              onClick={() => { onClick(child); setMobileOpen(false); onDropdownToggle(item.href); }}
              className="w-full px-2 py-2 text-sm font-medium text-left rounded-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] transition-colors"
            >
              {child.label}
              {child.badge && (
                <span className="ml-auto px-1.5 py-0.5 text-xs font-medium rounded-xs bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)]">
                  {child.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}