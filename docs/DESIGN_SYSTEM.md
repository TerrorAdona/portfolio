# Design System — Portfolio Rakotoarinivo Herilala

**Version :** 1.0  
**Dernière mise à jour :** 23 novembre 2026  
**Stack :** React + TypeScript + Vite + Tailwind CSS 4 + Framer Motion + Lucide React

---

## 1. Direction Artistique

### Inspirations
- **Linear** — Minimalisme radical, typographie expressive, dark mode natif
- **Vercel** — Grilles asymétriques, gradients subtils, micro-interactions précises
- **Raycast** — Glassmorphism maîtrisé, raccourcis clavier, fluidité
- **Stripe** — Hiérarchie visuelle impeccable, motion design intentionnel

### Principes
| Principe | Application |
|----------|-------------|
| **Dark Premium First** | Conçu pour le dark mode ; light mode dérivé |
| **Minimalisme fonctionnel** | Chaque élément a une raison d'être |
| **Typographie comme marque** | Titres expressifs, corps lisible, échelle harmonique |
| **Espacement généreux** | Respiration, lecture confortable, focus guidé |
| **Motion intentionnel** | Animation = feedback ou guidage, jamais décoration |
| **Accessibilité par défaut** | WCAG AA, reduced-motion, focus visible, contraste |

---

## 2. Couleurs (Color Tokens)

### Palette Dark (Principale)

```css
/* === BACKGROUNDS === */
--bg-primary: #09090B;        /* zinc-950 — Fond principal */
--bg-secondary: #111114;      /* zinc-900/950 mix — Sections, cards */
--bg-tertiary: #18181B;       /* zinc-900 — Surfaces élevées, modals */
--bg-hover: #1F1F23;          /* zinc-800 — Hover states */
--bg-active: #27272A;         /* zinc-800/700 — Active/pressed */

/* === BORDURES === */
--border-primary: #27272A;    /* zinc-800 — Bordures par défaut */
--border-secondary: #3F3F46;  /* zinc-700 — Bordures accentuées */
--border-focus: #8B5CF6;      /* violet-500 — Focus ring */

/* === TEXTE === */
--text-primary: #FAFAFA;      /* zinc-50 — Titres, texte principal */
--text-secondary: #A1A1AA;    /* zinc-400 — Corps, descriptions */
--text-muted: #71717A;        /* zinc-500 — Labels, meta, disabled */
--text-inverse: #09090B;      /* Sur fond accent */

/* === ACCENT (Violet/Bleu électrique) === */
--accent-primary: #8B5CF6;    /* violet-500 — Principal */
--accent-secondary: #6366F1;  /* indigo-500 — Secondaire */
--accent-tertiary: #22D3EE;   /* cyan-400 — Highlights, links */
--accent-glow: rgba(139, 92, 246, 0.15);  /* Glow subtil */
--accent-glow-strong: rgba(139, 92, 246, 0.3);

/* === SEMANTIQUE === */
--success: #22C55E;           /* green-500 */
--warning: #F59E0B;           /* amber-500 */
--error: #EF4444;             /* red-500 */
--info: #3B82F6;              /* blue-500 */
```

### Palette Light (Dérivée)

```css
--bg-primary-light: #FAFAFA;
--bg-secondary-light: #F4F4F5;
--bg-tertiary-light: #FFFFFF;
--text-primary-light: #09090B;
--text-secondary-light: #3F3F46;
--text-muted-light: #71717A;
--border-primary-light: #E4E4E7;
/* Accents inchangés pour cohérence marque */
```

### Utilisation dans Tailwind (v4)

```css
@theme {
  /* Colors */
  --color-bg-primary: #09090B;
  --color-bg-secondary: #111114;
  --color-bg-tertiary: #18181B;
  --color-bg-hover: #1F1F23;
  --color-bg-active: #27272A;

  --color-border-primary: #27272A;
  --color-border-secondary: #3F3F46;
  --color-border-focus: #8B5CF6;

  --color-text-primary: #FAFAFA;
  --color-text-secondary: #A1A1AA;
  --color-text-muted: #71717A;
  --color-text-inverse: #09090B;

  --color-accent-primary: #8B5CF6;
  --color-accent-secondary: #6366F1;
  --color-accent-tertiary: #22D3EE;
  --color-accent-glow: rgba(139, 92, 246, 0.15);

  --color-success: #22C55E;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
  --color-info: #3B82F6;
}
```

---

## 3. Typographie

### Familles de polices

| Usage | Police | Fallback | Variable CSS |
|-------|--------|----------|--------------|
| **Display / Titres** | **Geist** (Variable) | Inter, system-ui | `--font-display` |
| **UI / Corps** | **Geist** (Variable) | Inter, system-ui | `--font-ui` |
| **Code / Mono** | **Geist Mono** (Variable) | JetBrains Mono, monospace | `--font-mono` |

> **Pourquoi Geist ?** Variable font (poids 100-900), optimisée Vercel, lisibilité excellente, personnalité technique mais chaleureuse.

### Échelle typographique (Fluid clamp)

```css
@theme {
  /* Display — Titres héro, landing */
  --text-display-xl: clamp(3.5rem, 8vw, 6rem);     /* 56px - 96px */
  --text-display-lg: clamp(2.5rem, 5vw, 4rem);     /* 40px - 64px */
  --text-display-md: clamp(2rem, 4vw, 3rem);       /* 32px - 48px */
  --text-display-sm: clamp(1.5rem, 3vw, 2.25rem);  /* 24px - 36px */

  /* Heading — Sections, cards */
  --text-h1: clamp(1.875rem, 3vw, 2.5rem);         /* 30px - 40px */
  --text-h2: clamp(1.5rem, 2.5vw, 2rem);           /* 24px - 32px */
  --text-h3: clamp(1.25rem, 2vw, 1.5rem);          /* 20px - 24px */
  --text-h4: clamp(1.125rem, 1.5vw, 1.25rem);      /* 18px - 20px */

  /* Body — Texte courant */
  --text-lg: 1.125rem;     /* 18px — Lead paragraph */
  --text-base: 1rem;       /* 16px — Paragraph standard */
  --text-sm: 0.875rem;     /* 14px — Meta, labels */
  --text-xs: 0.75rem;      /* 12px — Captions, badges */

  /* Code */
  --text-code-sm: 0.8125rem;   /* 13px */
  --text-code-base: 0.875rem;  /* 14px */
}
```

### Poids & Styles

```css
@theme {
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  --font-display: "Geist Variable", "Inter", system-ui, sans-serif;
  --font-ui: "Geist Variable", "Inter", system-ui, sans-serif;
  --font-mono: "Geist Mono Variable", "JetBrains Mono", monospace;

  --tracking-tight: -0.02em;
  --tracking-normal: 0;
  --tracking-wide: 0.02em;
  --tracking-wider: 0.04em;
}
```

### Règles d'usage

| Élément | Police | Taille | Poids | Tracking | Ligne |
|---------|--------|--------|-------|----------|-------|
| Hero title | Display | `display-xl` | 700 | tight | 1.1 |
| Section title | Display | `display-md` | 600 | tight | 1.2 |
| Card title | UI | `h3` | 600 | normal | 1.3 |
| Body large | UI | `lg` | 400 | normal | 1.7 |
| Body | UI | `base` | 400 | normal | 1.6 |
| Small/Label | UI | `sm` | 500 | wide | 1.5 |
| Caption | UI | `xs` | 400 | wider | 1.4 |
| Code inline | Mono | `code-sm` | 400 | normal | 1.5 |
| Code block | Mono | `code-base` | 400 | normal | 1.6 |

---

## 4. Espacements (Spacing Scale)

```css
@theme {
  --space-0: 0;
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px — Base unit */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
  --space-32: 8rem;     /* 128px */

  /* Sémantiques */
  --space-section-x: clamp(1.5rem, 5vw, 4rem);   /* Padding horizontal sections */
  --space-section-y: clamp(4rem, 10vw, 8rem);    /* Padding vertical sections */
  --space-card: 1.5rem;                          /* Padding interne cards */
  --space-card-sm: 1rem;                         /* Cards compactes */
}
```

### Règles d'espacement

- **Section vertical** : `space-section-y` (mobile 64px → desktop 128px)
- **Section horizontal** : `space-section-x` (mobile 24px → desktop 64px)
- **Card padding** : `space-card` (24px) / `space-card-sm` (16px)
- **Gap grille** : `space-6` (24px) desktop, `space-4` (16px) mobile
- **Stack vertical** : `space-4` (16px) entre éléments liés, `space-8` (32px) entre groupes

---

## 5. Rayons (Border Radius)

```css
@theme {
  --radius-none: 0;
  --radius-xs: 0.125rem;   /* 2px — Badges, pills */
  --radius-sm: 0.25rem;    /* 4px — Inputs, boutons compacts */
  --radius-md: 0.375rem;   /* 6px — Cards, dropdowns */
  --radius-lg: 0.5rem;     /* 8px — Modals, panels */
  --radius-xl: 0.75rem;    /* 12px — Hero cards, featured */
  --radius-2xl: 1rem;      /* 16px — Large modals */
  --radius-full: 9999px;   /* Pills, avatars */
}
```

### Usage

| Composant | Radius |
|-----------|--------|
| Button, Input, Badge | `radius-sm` (4px) |
| Card, Dropdown, Tooltip | `radius-md` (6px) |
| Modal, Panel, Sheet | `radius-lg` (8px) |
| Featured Project Card | `radius-xl` (12px) |
| Avatar, Pill Badge | `radius-full` |

---

## 6. Ombres (Shadows & Glow)

```css
@theme {
  /* Ombres structurelles (elevation) */
  --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);

  /* Ombres colorées / Glow (accent) */
  --shadow-glow-sm: 0 0 0 1px var(--color-border-primary), 0 0 20px -5px var(--color-accent-glow);
  --shadow-glow-md: 0 0 0 1px var(--color-border-primary), 0 0 30px -5px var(--color-accent-glow);
  --shadow-glow-lg: 0 0 0 1px var(--color-border-primary), 0 0 40px -5px var(--color-accent-glow-strong);

  /* Focus ring */
  --shadow-focus: 0 0 0 2px var(--color-bg-primary), 0 0 0 4px var(--color-border-focus);

  /* Glassmorphism */
  --glass-bg: rgba(24, 24, 27, 0.7);           /* bg-tertiary @ 70% */
  --glass-border: rgba(39, 39, 42, 0.5);       /* border-primary @ 50% */
  --glass-blur: blur(20px);
}
```

### Usage

| Élévation | Shadow | Usage |
|-----------|--------|-------|
| Level 0 (flat) | Aucune | Cards au repos, surfaces de base |
| Level 1 | `shadow-sm` | Cards hover, dropdowns |
| Level 2 | `shadow-md` | Modals, panels |
| Level 3 | `shadow-lg` | Toasts, popovers |
| Level 4 | `shadow-xl` | Sheets, drawers |
| **Glow accent** | `shadow-glow-*` | Focus, hover accent, CTA primary |
| **Glass** | `glass-bg` + `glass-blur` + `glass-border` | Navbar, overlays, feature cards |

---

## 7. Composants — Spécifications

### 7.1 Boutons (Button)

#### Variantes

| Variante | Background | Texte | Bordure | Usage |
|----------|------------|-------|---------|-------|
| **Primary** | `accent-primary` | `text-inverse` | — | CTA principal |
| **Secondary** | `bg-tertiary` | `text-primary` | `border-primary` | Actions secondaires |
| **Outline** | Transparent | `text-primary` | `border-secondary` | Actions tertiaires |
| **Ghost** | Transparent | `text-secondary` | — | Navigation, liens stylisés |
| **Destructive** | `error` | `text-inverse` | — | Suppression, danger |

#### Tailles

| Taille | Padding (H x V) | Texte | Radius | Gap icône |
|--------|-----------------|-------|--------|-----------|
| **sm** | 12px × 6px | `text-sm` | `radius-sm` | 6px |
| **md** | 16px × 10px | `text-base` | `radius-sm` | 8px |
| **lg** | 20px × 12px | `text-lg` | `radius-md` | 10px |

#### États

| État | Primary | Secondary | Outline | Ghost |
|------|---------|-----------|---------|-------|
| **Default** | `accent-primary` | `bg-tertiary` | Transparent | Transparent |
| **Hover** | `accent-primary/90` + `shadow-glow-sm` | `bg-hover` | `bg-hover` | `bg-hover` |
| **Active** | `accent-primary` + `scale-[0.98]` | `bg-active` | `bg-active` | `bg-active` |
| **Focus** | `shadow-focus` | `shadow-focus` | `shadow-focus` | `shadow-focus` |
| **Disabled** | `opacity-50` + `cursor-not-allowed` | Idem | Idem | Idem |
| **Loading** | Spinner + `opacity-75` | Idem | Idem | Idem |

#### Animations (Framer Motion)

```tsx
// Variants réutilisables
const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.02, boxShadow: "var(--shadow-glow-sm)" },
  tap: { scale: 0.98 },
  focus: { boxShadow: "var(--shadow-focus)" },
};

// Transition commune
const buttonTransition = { type: "spring", stiffness: 400, damping: 17 };
```

---

### 7.2 Cartes (Card)

#### Variantes

| Variante | Background | Bordure | Shadow | Usage |
|----------|------------|---------|--------|-------|
| **Default** | `bg-secondary` | `border-primary` | `shadow-sm` (hover: `shadow-md`) | Projets, articles |
| **Elevated** | `bg-tertiary` | `border-secondary` | `shadow-lg` | Featured, modals |
| **Glass** | `glass-bg` + `glass-blur` | `glass-border` | `shadow-xl` | Hero, navbar, overlays |
| **Interactive** | `bg-secondary` | `border-primary` | `shadow-sm` → `shadow-glow-md` (hover) | Cards cliquables |

#### Structure

```tsx
<Card variant="default" padding="md" radius="md">
  <Card.Header>        // Optionnel: titre + action
  <Card.Content>       // Corps principal
  <Card.Footer>        // Optionnel: meta, actions
</Card>
```

#### Padding interne

| Padding | Valeur | Usage |
|---------|--------|-------|
| `sm` | `space-card-sm` (16px) | Cards compactes, liste dense |
| `md` | `space-card` (24px) | Standard |
| `lg` | `space-8` (32px) | Featured, hero cards |

---

### 7.3 Badges (Badge / Tag)

#### Variantes

| Variante | Background | Texte | Border | Usage |
|----------|------------|-------|--------|-------|
| **Default** | `bg-tertiary` | `text-secondary` | `border-primary` | Tech stack, catégories |
| **Accent** | `accent-primary/15` | `accent-primary` | `accent-primary/30` | Compétences principales |
| **Success** | `success/15` | `success` | `success/30` | Statut "Terminé" |
| **Outline** | Transparent | `text-secondary` | `border-secondary` | Filtres, tags neutres |

#### Tailles

| Taille | Padding | Texte | Radius | Usage |
|--------|---------|-------|--------|-------|
| **sm** | 4px × 8px | `text-xs` | `radius-xs` | Tech tags, liste dense |
| **md** | 6px × 10px | `text-sm` | `radius-sm` | Standard |
| **lg** | 8px × 12px | `text-base` | `radius-md` | Hero, featured |

---

### 7.4 États Interactifs (Global)

#### Focus Visible (Accessibilité)

```css
:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus);
}
```

#### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

#### Transitions Standards

```css
@theme {
  --transition-fast: 120ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-spring: 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

| Propriété | Durée | Courbe | Usage |
|-----------|-------|--------|-------|
| `color`, `background`, `border` | `transition-fast` | ease-out | Hover states simples |
| `transform`, `opacity`, `box-shadow` | `transition-base` | ease-out | Cards, modals, tooltips |
| `height`, `width` (layout) | `transition-slow` | ease-out | Accordions, drawers |
| `scale`, `rotate` (motion) | `transition-spring` | spring | Buttons tap, icon hover |

---

## 8. Grille & Layout

### Conteneur

```css
@theme {
  --container-sm: 640px;    /* Mobile large */
  --container-md: 768px;    /* Tablette */
  --container-lg: 1024px;   /* Desktop */
  --container-xl: 1280px;   /* Large desktop */
  --container-2xl: 1440px;  /* Ultra wide */
}
```

### Grille Projets (Responsive)

```css
.projects-grid {
  display: grid;
  gap: var(--space-6);
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .projects-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
  .projects-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (min-width: 1440px) {
  .projects-grid { grid-template-columns: repeat(4, 1fr); }
}
```

### Grille Compétences

```css
.skills-grid {
  display: grid;
  gap: var(--space-4);
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
}
```

---

## 9. Animations & Motion

### Principes

1. **Respect `prefers-reduced-motion`** — Toujours
2. **Durée max 300ms** pour micro-interactions
3. **Spring** pour tactile (tap, drag), **ease-out** pour hover
4. **Stagger** pour listes (50-100ms delay par item)
5. **Layout animations** (Framer Motion `layout`) pour réordonnancement

### Presets Framer Motion

```tsx
// Fade + slide up (entrée sections)
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
};

// Stagger children
export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } },
};

// Scale tap (boutons, cards interactives)
export const tapScale = {
  whileTap: { scale: 0.98 },
};

// Hover glow (cards, boutons accent)
export const hoverGlow = {
  whileHover: {
    boxShadow: "var(--shadow-glow-md)",
    y: -4,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

// Focus ring
export const focusRing = {
  focus: { boxShadow: "var(--shadow-focus)" },
};
```

### Page Transitions

```tsx
// AnimatePresence pour transitions entre pages
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3, ease: "easeInOut" },
};
```

---

## 10. Accessibilité (a11y)

### Checklist Obligatoire

- [ ] **Contraste** : Texte ≥ 4.5:1 (AA), Large text ≥ 3:1 — *Vérifié sur toutes les combinaisons*
- [ ] **Focus visible** : `focus-visible` ring sur tous les éléments interactifs
- [ ] **Sémantique HTML** : `header`, `main`, `section`, `article`, `nav`, `footer`, `button`, `a`
- [ ] **ARIA** : Labels sur icon buttons, `aria-expanded`/`aria-controls` sur dropdowns, `role="dialog"` sur modals
- [ ] **Reduced motion** : `prefers-reduced-motion` respecté globalement
- [ ] **Clavier** : Navigation Tab ordonnée, skip links, focus trap dans modals
- [ ] **Alt text** : Toutes les images décoratives `alt=""`, informatives décrites
- [ ] **Langue** : `lang="fr"` sur `<html>`, changements de langue signalés
- [ ] **Zoom** : Lisible à 200% sans perte de fonctionnalité

### Tokens a11y

```css
@theme {
  --focus-ring-width: 2px;
  --focus-ring-offset: 2px;
  --focus-ring-color: var(--color-border-focus);
  --skip-link-bg: var(--color-accent-primary);
  --skip-link-color: var(--color-text-inverse);
}
```

---

## 11. SEO & Métadonnées

### JSON-LD Schemas

```ts
// Person (Homepage)
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Rakotoarinivo Herilala",
  "jobTitle": "Full Stack Developer",
  "url": "https://herilala.dev",
  "sameAs": ["https://github.com/TerrorAdona", "https://linkedin.com/in/..."],
  "knowsAbout": ["TypeScript", "React", "Next.js", "Spring Boot", "PostgreSQL"]
}

// WebSite
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://herilala.dev",
  "name": "Rakotoarinivo Herilala — Portfolio",
  "description": "Portfolio développeur Full Stack — React, TypeScript, Spring Boot, Cloud"
}

// Project (chaque page projet)
{
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "Gestion Clinique",
  "description": "Système de gestion clinique Spring Boot + Thymeleaf + MySQL",
  "programmingLanguage": ["Java", "SQL"],
  "codeRepository": "https://github.com/TerrorAdona/Gestion-clinique",
  "dateCreated": "2024-01-15",
  "dateModified": "2024-06-20"
}
```

### Meta Tags Dynamiques

```ts
// lib/seo.ts
export function generateMetadata({ title, description, image, url, type = "website" }) {
  return {
    title: `${title} | Rakotoarinivo Herilala`,
    description,
    openGraph: {
      title,
      description,
      type,
      url,
      siteName: "Rakotoarinivo Herilala",
      images: [{ url: image || "/og-default.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image || "/og-default.png"],
    },
    robots: "index, follow",
    other: {
      "theme-color": "#09090B",
    },
  };
}
```

---

## 12. Performance

### Budgets

| Métrique | Cible | Outil |
|----------|-------|-------|
| **LCP** | < 2.5s | Lighthouse, Web Vitals |
| **CLS** | < 0.1 | Lighthouse |
| **FID/INP** | < 200ms | Lighthouse |
| **Bundle JS (gz)** | < 100kB | Vite build report |
| **CSS (gz)** | < 20kB | Vite build report |
| **Images** | WebP/AVIF, responsive, lazy | Sharp, @vitejs/plugin-image |

### Stratégies

- **Code splitting** : Routes lazy (`React.lazy` + `Suspense`)
- **Font loading** : `font-display: swap`, preload Geist variable
- **Images** : `srcset` + `sizes` + `loading="lazy"` + placeholder blur
- **CSS** : Tailwind JIT + purge, critical CSS inline
- **Third-party** : Analytics différé, pas de blocking scripts

---

## 13. Structure Fichiers Design System (Implémentation)

```
src/
├── styles/
│   ├── globals.css          # @import tailwind + CSS custom properties
│   ├── theme.css            # @theme tokens (Tailwind v4)
│   ├── animations.css       # Keyframes, reduced-motion
│   └── utilities.css        # Classes utilitaires custom
│
├── lib/
│   ├── theme.ts             # Theme provider, color-mode script
│   ├── utils.ts             # cn(), formatters, helpers
│   ├── constants.ts         # Breakpoints, durations, z-indices
│   └── seo.ts               # Metadata generators
│
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Button.stories.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Input.tsx
│   │   ├── Tooltip.tsx
│   │   ├── Modal.tsx
│   │   ├── Avatar.tsx
│   │   ├── Separator.tsx
│   │   ├── ScrollArea.tsx
│   │   └── index.ts
│   │
│   ├── layout/
│   │   ├── Container.tsx
│   │   ├── Section.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   └── index.ts
│   │
│   └── projects/
│       ├── ProjectCard.tsx
│       ├── ProjectModal.tsx
│       ├── TechBadge.tsx
│       └── index.ts
│
├── hooks/
│   ├── useTheme.ts
│   ├── useReducedMotion.ts
│   ├── useMediaQuery.ts
│   └── index.ts
│
└── types/
    ├── design-system.ts     # Variants, sizes, types communs
    └── index.ts
```

---

## 14. Checklist de Validation (Avant Merge)

### Design
- [ ] Palette respectée (pas de couleurs hors tokens)
- [ ] Typographie : tailles fluides, poids corrects, tracking
- [ ] Espacements : échelle respectée, pas de valeurs magiques
- [ ] Radius cohérents par composant
- [ ] Ombres : élévation logique, glow accent maîtrisé
- [ ] Dark mode natif, light mode dérivé fonctionnel

### Composants
- [ ] Button : 5 variantes × 3 tailles × 5 états = 75 combinaisons testées
- [ ] Card : 4 variantes × 3 paddings, interactive states
- [ ] Badge : 4 variantes × 3 tailles
- [ ] Focus visible sur tous les interactifs
- [ ] Reduced motion désactive toutes les animations

### Code
- [ ] TypeScript strict : pas de `any`, props typées
- [ ] Pas de styles inline (sauf CSS variables dynamiques)
- [ ] Classes Tailwind uniquement via `cn()` utility
- [ ] Barrel exports (`index.ts`) à jour
- [ ] Storybook stories pour primitives UI

### Performance
- [ ] Bundle size dans les budgets
- [ ] Lighthouse ≥ 95 (Performance, Accessibility, Best Practices, SEO)
- [ ] Pas de layout shift (CLS < 0.1)
- [ ] Images optimisées (WebP/AVIF, responsive)

### Accessibilité
- [ ] Audit axe-core / WAVE : 0 violations
- [ ] Navigation clavier complète
- [ ] Screen reader testé (NVDA/VoiceOver)
- [ ] Contraste vérifié toutes combinaisons

---

## 15. Évolutivité — Ajouter un Token

### Nouvelle couleur
1. Ajouter dans `styles/theme.css` (`@theme { --color-new: #... }`)
2. Ajouter type dans `types/design-system.ts`
3. Documenter usage dans ce fichier
4. Créer composant démo dans Storybook

### Nouveau composant UI
1. Créer dans `components/ui/` avec variants TypeScript
2. Exporter dans `components/ui/index.ts`
3. Stories Storybook
4. Tests unitaires (Rendering, Variants, Accessibility)
5. Documentation dans ce fichier

---

*Design System v1.0 — Prêt pour implémentation.  
Prochaine étape : Initialisation projet Vite + configuration Tailwind v4 + composants de base.*