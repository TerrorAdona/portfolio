# Audit GitHub — Profil TerrorAdona

**Date de l'audit :** 23 novembre 2026  
**Profil analysé :** https://github.com/TerrorAdona  
**Nombre de dépôts publics :** 6

---

## Résumé exécutif

Le profil GitHub présente **6 dépôts publics**, principalement des projets académiques, des scaffolds techniques et des expérimentations. **Aucun projet n'est actuellement prêt pour une mise en avant directe dans un portfolio professionnel** sans travaux de finalisation, documentation et polissage significatifs.

### Répartition par maturité

| Niveau | Nombre | Dépôts |
|--------|--------|--------|
| **Expérimental / Scaffold** | 3 | `eco`, `Todolist-react`, `talenta` |
| **Projet académique / Coursework** | 2 | `Test-IRD1`, `Gestion_stock_assostock` |
| **Projet incomplet (backend Spring Boot)** | 1 | `Gestion-clinique` |

---

## Analyse détaillée par dépôt

---

### 1. `eco`

| Critère | Détail |
|---------|--------|
| **Nom** | eco |
| **Description réelle** | Projet Next.js avec Prisma ORM, intégration multi-agents IA (Claude, Windsurf, .agents), configuration proxy TypeScript. Pas de description fonctionnelle métier. |
| **Problématique résolue** | Aucune identifiée — semble être un terrain d'expérimentation technique / architecture multi-agents. |
| **Fonctionnalités existantes** | • Next.js 15 (App Router)<br>• Prisma ORM (schéma présent)<br>• Configuration ESLint, Vitest, PostCSS<br>• Intégration skills pour 3 environnements IA<br>• Fichiers de configuration proxy et types TypeScript |
| **Stack technique vérifiée** | TypeScript, Next.js, Prisma, React, Vitest, ESLint (flat config), PostCSS |
| **Niveau de maturité** | **Expérimental / Work-in-progress actif** (52 commits, mais 0 étoile, 0 fork, pas de release) |
| **Points forts** | • Architecture moderne Next.js + Prisma<br>• Configuration outillage complète (tests, lint, types)<br>• Expérimentation multi-agents IA documentée (AGENTS.md, CLAUDE.md)<br>• 52 commits = activité soutenue |
| **Points faibles** | • **Aucune description fonctionnelle** (README = boilerplate Next.js)<br>• Pas de documentation métier<br>• Pas de déploiement visible<br>• Pas de tests visibles dans le code source<br>• Projet "vitrine technique" sans produit identifiable |
| **Intérêt recruteur** | **Faible à moyen** — Montre une curiosité technique et une maîtrise de l'écosystème Next.js/Prisma/outillage, mais l'absence de produit fini réduit l'impact. |
| **Recommandation** | **NE PAS PUBLIER en l'état** — Nécessite : définition d'un produit, documentation métier, tests, déploiement démo. Peut devenir un projet "showcase architecture" si finalisé. |

---

### 2. `Test-IRD1`

| Critère | Détail |
|---------|--------|
| **Nom** | Test-IRD1 |
| **Description réelle** | Dépôt "fourre-tout" académique : cours, TP, exercices patterns (Composite/Decorator), UML, Scrum, IHM, projet Django partiel (`manage.py`, `db.sqlite3`), analyse de risques, CV. |
| **Problématique résolue** | Aucune — collection de travaux pratiques et cours (niveau Licence/M1). |
| **Fonctionnalités existantes** | • Projet Django embryonnaire (`manage.py`, `db.sqlite3`, `.env`)<br>• Exercices patterns GoF (Composite, Decorator)<br>• Documents : UML, Scrum, IHM, Framework Web, Analyse risques<br>• 3 modèles CV |
| **Stack technique vérifiée** | Python (Django probable), SQLite, documents académiques (PDF/DOCX/ODT/XLS) |
| **Niveau de maturité** | **Coursework / Académique** (26 commits, 0 étoile, base de données commitée = mauvaise pratique) |
| **Points forts** | • Montre un parcours académique structuré<br>• Couverture large : patterns, UML, agile, IHM, Django<br>• Preuve de travail sur design patterns |
| **Points faibles** | • **Mélange code + docs + assets + binaires** (`.rar`, images jeu)<br>• `db.sqlite3` versionnée = anti-pattern<br>• Pas de `requirements.txt` / `pyproject.toml` visible<br>• Projet Django non fonctionnel (pas de migrations, pas d'app)<br>• README non renseigné |
| **Intérêt recruteur** | **Faible** — Dépôt "brouillon" qui nuit à l'image professionnelle s'il est visible. |
| **Recommandation** | **NE PAS PUBLIER** — Doit être **archivé ou mis en privé**. Extraire éventuellement les exercices patterns dans un dépôt dédié "design-patterns-exercises" propre. |

---

### 3. `Todolist-react`

| Critère | Détail |
|---------|--------|
| **Nom** | Todolist-react |
| **Description réelle** | Scaffold Vite + React + TypeScript (template officiel). **Aucune implémentation de todo** visible — seulement la configuration de base. |
| **Problématique résolue** | Aucune — template non démarré. |
| **Fonctionnalités existantes** | • Configuration Vite + React + TS<br>• ESLint flat config avec rules React<br>• TypeScript strict (tsconfig.app.json, tsconfig.node.json)<br>• HMR configuré |
| **Stack technique vérifiée** | React 18+, TypeScript, Vite, ESLint (flat config) |
| **Niveau de maturité** | **Scaffold vide** (6 commits, 0 étoile, README = template Vite inchangé) |
| **Points forts** | • Stack moderne bien configurée<br>• Base saine pour démarrer |
| **Points faibles** | • **Zero code applicatif**<br>• README non personnalisé<br>• Aucun commit métier |
| **Intérêt recruteur** | **Nul** — Montre seulement "savoir lancer `npm create vite`". |
| **Recommandation** | **NE PAS PUBLIER** — Soit **implémenter réellement la todo** (CRUD, localStorage, filtres, tests), soit supprimer/archiver. |

---

### 4. `Gestion_stock_assostock`

| Critère | Détail |
|---------|--------|
| **Nom** | Gestion_stock_assostock |
| **Description réelle** | "création de assostock" — Système de gestion de stock pour association. Structure minimale : dossier `gestion_stock/` + 2 fichiers config (`.gitattributes`, `.hintrc`). |
| **Problématique résolue** | Gestion de stock associative (intention déclarée, non vérifiée dans le code). |
| **Fonctionnalités existantes** | **Non visibles** — Structure trop maigre pour évaluer. `.hintrc` suggère Haxe ou outil de hinting. |
| **Stack technique vérifiée** | **Indéterminée** — Pas de `package.json`, `pom.xml`, `requirements.txt`, `composer.json` visible. |
| **Niveau de maturité** | **Très précoce / Incomplet** (21 commits, 0 étoile, structure squelettique) |
| **Points forts** | • Intention métier claire (associatif) |
| **Points faibles** | • **Aucun code source visible** dans l'arborescence GitHub<br>• Pas de fichier de build/dépendances détecté<br>• Langage/Framework inconnu<br>• Pas de documentation |
| **Intérêt recruteur** | **Nul en l'état** — Impossible d'évaluer les compétences. |
| **Recommandation** | **NE PAS PUBLIER** — Il faut : pousser le code source réel, ajouter `README`, fichier de build, documentation. Si le code existe en local mais pas pushé, le push est prioritaire. |

---

### 5. `talenta`

| Critère | Détail |
|---------|--------|
| **Nom** | talenta |
| **Description réelle** | "Application web en nextJs de création de logo simple" — Scaffold Next.js 15 (App Router) avec police Geist, README = boilerplate Next.js non personnalisé. |
| **Problématique résolue** | Générateur de logo simple (intention), **non implémenté**. |
| **Fonctionnalités existantes** | • Next.js 15 App Router<br>• Police Geist optimisée (`next/font`)<br>• Configuration ESLint, PostCSS, TypeScript standard |
| **Stack technique vérifiée** | Next.js 15, React 18+, TypeScript, PostCSS, ESLint |
| **Niveau de maturité** | **Scaffold précoce** (7 commits, 0 étoile, README inchangé) |
| **Points forts** | • Stack Next.js moderne maîtrisée<br>• Configuration outillage correcte |
| **Points faibles** | • **Zero fonctionnalité métier** (génération logo absente)<br>• README non adapté au projet<br>• 7 commits seulement = projet abandonné très tôt |
| **Intérêt recruteur** | **Faible** — Montre la capacité à initialiser un projet Next.js, pas à livrer une feature. |
| **Recommandation** | **PRÉSENTER SECONDAIREMENT SI FINALISÉ** — Si le générateur de logo est implémenté (canvas/SVG, export, templates, présets), cela devient un **petit projet complet** sympa pour montrer : Next.js, client-side rendering, manipulation graphique, UX. Sinon : archiver. |

---

### 6. `Gestion-clinique`

| Critère | Détail |
|---------|--------|
| **Nom** | Gestion-clinique |
| **Description réelle** | "Projet de gestion clinique en spring boot, thymeleaf et mysql" — Projet Maven Spring Boot standard (wrapper, `pom.xml`, `src/`). |
| **Problématique résolue** | Gestion d'une clinique : patients, rendez-vous, dossiers médicaux, personnel (supposé, non vérifié). |
| **Fonctionnalités existantes** | **Non visibles dans l'arborescence** — Seuls les fichiers de build Maven sont listés. Le code source dans `src/` n'est pas détaillé. |
| **Stack technique vérifiée** | Java 17+/21, Spring Boot 3.x, Thymeleaf, MySQL, Maven |
| **Niveau de maturité** | **Incomplet / Début de projet** (4 commits seulement, 0 étoile, pas de release) |
| **Points forts** | • Stack enterprise solide (Spring Boot, Thymeleaf, MySQL)<br>• Maven wrapper présent (reproductibilité)<br>• Problématique métier réelle (santé) |
| **Points faibles** | • **4 commits = projet à peine démarré**<br>• Pas de code source visible pour évaluer la qualité<br>• Pas de tests, pas de documentation, pas de Docker<br>• Thymeleaf = approche "legacy" (SSR), moins valorisée que REST API + frontend séparé |
| **Intérêt recruteur** | **Moyen potentiel** — Spring Boot est très demandé. Si le projet est complet (CRUD, sécurité, tests, Docker), il devient un **bon projet backend enterprise**. |
| **Recommandation** | **PRÉSENTER SECONDAIREMENT SI FINALISÉ** — Priorité : pousser le code complet, ajouter tests (JUnit, Testcontainers), Docker, README avec schéma BDD, API docs (Swagger), sécurité (Spring Security). Peut devenir **projet phare backend** si abouti. |

---

## Synthèse des technologies

### Technologies **maîtrisées** (preuve de code réel, configuration, usage répété)

| Technologie | Preuve |
|-------------|--------|
| **TypeScript** | 4/6 projets (eco, Todolist-react, talenta, Gestion_stock_assostock probable) |
| **Next.js (App Router)** | 2 projets (eco, talenta) + config complète |
| **React / Vite** | 2 projets (Todolist-react, eco) |
| **Prisma ORM** | 1 projet (eco) — schema + config |
| **ESLint (flat config)** | 3 projets (eco, Todolist-react, talenta) |
| **PostCSS / CSS moderne** | 2 projets (eco, talenta) |
| **Vitest** | 1 projet (eco) |
| **Maven / Spring Boot** | 1 projet (Gestion-clinique) — structure projet correcte |
| **Thymeleaf** | 1 projet (Gestion-clinique) |
| **Git / GitHub** | 6 dépôts, commits réguliers |

### Technologies **expérimentées / effleurées** (une seule occurrence, pas de profondeur visible)

| Technologie | Contexte | Niveau |
|-------------|----------|--------|
| **Python / Django** | Test-IRD1 (manage.py seul) | Déclamée seulement |
| **Haxe / .hintrc** | Gestion_stock_assostock | Inconnue |
| **Design Patterns (GoF)** | Test-IRD1 (exercices PDF) | Académique uniquement |
| **UML / Merise / Scrum** | Test-IRD1 (documents PDF) | Théorique |
| **Docker / CI-CD** | **Aucun** projet | Absent |
| **Tests automatisés** | eco (config Vitest seulement) | Config seulement |
| **Base de données (MySQL/PostgreSQL)** | Prisma (eco), MySQL déclaré (Gestion-clinique) | Config / Déclaré |
| **Déploiement (Vercel, Cloud)** | Déclaré dans README Next.js boilerplate | Non fait |

---

## Sélection argumentée pour le portfolio

### ⭐ Projets à **finaliser en priorité** (potentiel fort)

| Projet | Pourquoi | Travaux requis |
|--------|----------|----------------|
| **Gestion-clinique** | Stack enterprise recherchée (Spring Boot), domaine métier concret (santé), montre compétences backend complètes | • Code complet (entités, repositories, services, controllers)<br>• Spring Security (JWT/RBAC)<br>• Tests unitaires + intégration (Testcontainers)<br>• Docker + docker-compose<br>• Swagger/OpenAPI<br>• README pro (architecture, BDD, API, démo) |
| **eco** | Vitrine technique full-stack moderne (Next.js + Prisma + outillage pro), 52 commits = investissement réel | • Définir un **produit réel** (pas juste tech demo)<br>• Implémenter features métier<br>• Tests (Vitest + Playwright)<br>• Déploiement Vercel + DB managée<br>• Storybook / Doc composants<br>• README orienté produit |

### 📦 Projets **secondaires** (si finalisés, bons compléments)

| Projet | Pourquoi | Travaux requis |
|--------|----------|----------------|
| **talenta** | Petit projet complet "fun" : Next.js + manipulation graphique (canvas/SVG), export, UX | • Générateur de logo fonctionnel (formes, texte, couleurs, export PNG/SVG)<br>• Templates/présets<br>• Tests E2E<br>• Déploiement Vercel |
| **Gestion_stock_assostock** | Projet associatif = dimension sociale valorisée, stack à clarifier | • **Pousser le code source réel**<br>• Identifier la stack<br>• README complet<br>• Déploiement démo |

### 🚫 Projets à **exclure / archiver**

| Projet | Raison | Action |
|--------|--------|--------|
| **Test-IRD1** | Dépôt "brouillon" académique, mélange tout, `db.sqlite3` commitée, anti-patterns | **Mettre en privé** ou supprimer. Extraire exercices patterns si souhaité. |
| **Todolist-react** | Scaffold vide, zéro value ajoutée | **Implémenter vraiment** OU **supprimer**. |

---

## Plan d'action recommandé avant publication portfolio

### Phase 1 — Nettoyage (Semaine 1)
1. **Archiver/Privater** `Test-IRD1` et `Todolist-react`
2. Vérifier si `Gestion_stock_assostock` a du code en local non pushé → **pousser tout**
3. Nettoyer les README boilerplate sur `eco` et `talenta`

### Phase 2 — Finalisation projets phares (Semaines 2-5)
| Projet | Objectif | Livrables |
|--------|----------|-----------|
| **Gestion-clinique** | Projet backend enterprise complet | Code + Tests + Docker + Swagger + README pro + Déploiement |
| **eco** | Projet full-stack vitrine moderne | Produit défini + Features + Tests + Storybook + Déploiement + Doc |

### Phase 3 — Projets secondaires (Semaines 6-8)
| Projet | Objectif |
|--------|----------|
| **talenta** | Générateur logo complet + déployé |
| **Gestion_stock_assostock** | Code pushé + README + démo (si code existe) |

### Phase 4 — Portfolio (Semaine 9+)
- Créer le site portfolio (Next.js / Astro / VitePress)
- Intégrer les 2-3 projets finalisés avec : **contexte, problématique, stack, architecture, défis, résultats, lien GitHub, lien démo**
- Ajouter page "Compétences" honnête (maîtrisé vs expérimenté)
- Déployer sur domaine personnel

---

## Conclusion

**Aujourd'hui : 0/6 projets portfolio-ready.**  
**Potentiel : 2 projets phares + 2 secondaires** si investissement temps réel (4-8 semaines de dev).

Le profil montre une **base technique solide** (TypeScript, Next.js, Spring Boot, outillage moderne) mais **manque cruellement de projets aboutis, documentés, testés et déployés**. C'est le point unique à corriger pour transformer ce GitHub en atout recrutement.

> **Conseil stratégique** : Ne pas chercher à "remplir" le portfolio avec quantité. **2 projets excellents** (1 full-stack moderne + 1 backend enterprise) valent mieux que 6 projets incomplets. Concentrer l'énergie sur `Gestion-clinique` et `eco`.

---

*Audit réalisé le 2026-11-23 — Basé sur l'analyse publique des 6 dépôts GitHub de TerrorAdona.*