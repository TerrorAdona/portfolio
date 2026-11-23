import { motion } from "framer-motion";
import { Section } from "../components/layout/Section";
import { Container } from "../components/layout/Container";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { skills, skillCategories, getSkillsByCategory, getSkillsByCategoryAndStatus, STATUS_LABELS, SkillStatus } from "../data/skills";
import { CodeIcon, DatabaseIcon, CloudIcon, AwardIcon, SparklesIcon, ZapIcon, ServerIcon, CpuIcon, HardDriveIcon, LayersIcon, TerminalIcon, TestTubeIcon, WrenchIcon, ShieldIcon, BrainIcon, UsersIcon, GlobeIcon } from "../components/ui/BrandIcons";

/**
 * Skills Section - Professional skills presentation with categories and status
 */

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const categoryVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

const skillVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: [0.34, 1.56, 0.64, 1] as const,
    },
  }),
};

const legendVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.3, duration: 0.5 },
  },
};

// Category icon mapping
const categoryIcons: Record<string, React.ComponentType<any>> = {
  frontend: CodeIcon,
  backend: ServerIcon,
  database: DatabaseIcon,
  devops: CloudIcon,
  tools: WrenchIcon,
  soft: UsersIcon,
};

function SkillCard({ skill, index, onClick }: { skill: typeof skills[0]; index: number; onClick?: () => void }) {
  const statusConfig = STATUS_LABELS[skill.status];

  return (
    <motion.article
      variants={skillVariants(index)}
      initial="hidden"
      animate="visible"
      className="group relative p-5 bg-[var(--color-bg-tertiary)] rounded-xl border border-[var(--color-border-primary)] transition-all duration-300 hover:border-[var(--color-border-secondary)] hover:shadow-[var(--shadow-md)] hover:-translate-y-1 cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick?.(); } }}
    >
      {/* Status indicator bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-xl"
        style={{ backgroundColor: statusConfig.color }}
      />

      {/* Header with icon and status */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div
          className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
          style={{ backgroundColor: `${skill.icon}20` }}
        >
          <span role="img" aria-label={skill.name}>{skill.icon}</span>
        </div>
        <Badge
          variant={skill.status === "mastered" ? "success" : skill.status === "experienced" ? "default" : "warning"}
          size="sm"
          className="flex-shrink-0"
        >
          {statusConfig.label}
        </Badge>
      </div>

      {/* Skill name and level */}
      <h4 className="font-semibold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-accent-primary)] transition-colors">
        {skill.name}
      </h4>

      {/* Level indicator */}
      <div className="mb-3" role="progressbar" aria-valuenow={skill.level} aria-valuemin={1} aria-valuemax={5} aria-label={`${skill.name} niveau ${skill.level}/5`}>
        <div className="flex gap-1 mb-1">
          {[1, 2, 3, 4, 5].map((lvl) => (
            <div
              key={lvl}
              className="flex-1 h-1.5 rounded transition-colors"
              style={{
                backgroundColor: lvl <= skill.level ? "var(--color-accent-primary)" : "var(--color-border-primary)",
              }}
            />
          ))}
        </div>
        <div className="flex justify-between text-xs text-[var(--color-text-muted)]">
          <span>Débutant</span>
          <span>Expert</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 mb-3">
        {skill.description}
      </p>

      {/* Related technologies */}
      {skill.related && skill.related.length > 0 && (
        <div className="flex flex-wrap gap-1.5" role="list" aria-label="Technologies associées">
          {skill.related.slice(0, 4).map((rel, i) => (
            <Badge key={rel} variant="outline" size="sm" role="listitem" className="text-xs">
              {rel}
            </Badge>
          ))}
          {skill.related.length > 4 && (
            <Badge variant="outline" size="sm" className="text-xs">
              +{skill.related.length - 4}
            </Badge>
          )}
        </div>
      )}

      {/* Years experience */}
      {skill.years && (
        <div className="mt-3 pt-3 border-t border-[var(--color-border-primary)] flex items-center justify-between">
          <span className="text-xs text-[var(--color-text-muted)]">
            {skill.years} an{skill.years > 1 ? "s" : ""} d'expérience
          </span>
          {skill.certified && (
            <Badge variant="success" size="sm" className="text-xs">Certifié</Badge>
          )}
        </div>
      )}
    </motion.article>
  );
}

function SkillCategory({ category, index }: { category: typeof skillCategories[0]; index: number }) {
  const categorySkills = getSkillsByCategory(category.key);
  const masteredSkills = getSkillsByCategoryAndStatus(category.key, "mastered");
  const experiencedSkills = getSkillsByCategoryAndStatus(category.key, "experienced");
  const learningSkills = getSkillsByCategoryAndStatus(category.key, "learning");

  const IconComponent = categoryIcons[category.key] || CodeIcon;

  return (
    <motion.section
      variants={categoryVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.1 }}
      className="space-y-6"
      aria-labelledby={`category-${category.key}`}
    >
      {/* Category Header */}
      <header className="flex items-center gap-4 pb-4 border-b border-[var(--color-border-primary)]">
        <div
          className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
          style={{ backgroundColor: `${category.color}20`, color: category.color }}
        >
          <IconComponent className="w-7 h-7" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 id={`category-${category.key}`} className="font-display font-semibold text-[var(--color-text-primary)]">
            {category.label}
          </h3>
          <p className="text-sm text-[var(--color-text-muted)]">{category.description}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {masteredSkills.length > 0 && (
            <Badge variant="success" size="sm">{masteredSkills.length}</Badge>
          )}
          {experiencedSkills.length > 0 && (
            <Badge variant="default" size="sm">{experiencedSkills.length}</Badge>
          )}
          {learningSkills.length > 0 && (
            <Badge variant="warning" size="sm">{learningSkills.length}</Badge>
          )}
        </div>
      </header>

      {/* Skills Grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        role="list"
        aria-label={`${category.label} compétences`}
      >
        {categorySkills.map((skill, i) => (
          <SkillCard key={skill.id} skill={skill} index={i} />
        ))}
      </div>
    </motion.section>
  );
}

function StatusLegend() {
  return (
    <motion.div
      variants={legendVariants}
      initial="hidden"
      animate="visible"
      className="mt-12 p-6 bg-[var(--color-bg-tertiary)] rounded-xl border border-[var(--color-border-primary)]"
      role="region"
      aria-label="Légende des statuts de compétence"
    >
      <h4 className="font-medium text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
        <SparklesIcon className="w-5 h-5 text-[var(--color-accent-primary)]" aria-hidden="true" />
        Légende des statuts
      </h4>
      <p className="text-sm text-[var(--color-text-secondary)] mb-4">
        Ces statuts reflètent mon niveau réel basé sur des projets concrets, pas des auto-évaluations.
      </p>
      <div className="flex flex-wrap items-center gap-4 lg:gap-8">
        {Object.entries(STATUS_LABELS).map(([key, config]) => (
          <div key={key} className="flex items-center gap-3">
            <div
              className="w-4 h-4 rounded-full flex-shrink-0"
              style={{ backgroundColor: config.color }}
            />
            <div>
              <span className="font-medium text-[var(--color-text-primary)]">{config.label}</span>
              <p className="text-xs text-[var(--color-text-muted)]">{config.description}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function StatsSummary() {
  const masteredCount = skills.filter((s) => s.status === "mastered").length;
  const experiencedCount = skills.filter((s) => s.status === "experienced").length;
  const learningCount = skills.filter((s) => s.status === "learning").length;
  const totalCount = skills.length;
  const categoriesCount = skillCategories.length;

  const stats = [
    { label: "Technologies", value: totalCount, icon: SparklesIcon, color: "var(--color-accent-primary)" },
    { label: "Maîtrisées", value: masteredCount, icon: AwardIcon, color: "var(--color-success)" },
    { label: "Expérimentées", value: experiencedCount, icon: ZapIcon, color: "var(--color-info)" },
    { label: "En apprentissage", value: learningCount, icon: BrainIcon, color: "var(--color-warning)" },
    { label: "Catégories", value: categoriesCount, icon: LayersIcon, color: "var(--color-accent-tertiary)" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10" role="list" aria-label="Résumé des compétences">
      {stats.map((stat, i) => (
        <motion.article
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
          className="p-5 bg-[var(--color-bg-tertiary)] rounded-xl border border-[var(--color-border-primary)] text-center"
          role="listitem"
        >
          <div
            className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${stat.color}20`, color: stat.color }}
          >
            <stat.icon className="w-6 h-6" aria-hidden="true" />
          </div>
          <div className="font-display font-bold text-2xl text-[var(--color-text-primary)] mb-1">
            {stat.value}
          </div>
          <div className="text-sm text-[var(--color-text-muted)] font-medium">
            {stat.label}
          </div>
        </motion.article>
      ))}
    </div>
  );
}

export function SkillsSection() {
  return (
    <Section id="skills" size="lg" background="secondary">
      <Container size="xl" padding="md">
        {/* Header */}
        <motion.header
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12 max-w-3xl mx-auto text-center"
        >
          <motion.div
            variants={categoryVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-accent-primary)]/15 text-[var(--color-accent-primary)] border border-[var(--color-accent-primary)]/30 mb-6"
          >
            <SparklesIcon className="w-4 h-4" aria-hidden="true" />
            <span className="font-medium">Compétences techniques</span>
          </motion.div>
          <motion.h2
            variants={categoryVariants}
            className="font-display font-bold text-[var(--color-text-primary)] tracking-tight mb-4"
          >
            Stack technique & Expertise
          </motion.h2>
          <motion.p
            variants={categoryVariants}
            className="text-[var(--color-text-secondary)] text-lg"
          >
            Une expertise ciblée sur l&apos;écosystème JavaScript/TypeScript moderne et les architectures backend robustes,
            avec une approche pragmatique : choisir le bon outil pour le problème.
          </motion.p>
        </motion.header>

        {/* Stats Summary */}
        <StatsSummary />

        {/* Status Legend */}
        <StatusLegend />

        {/* Skill Categories */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-16"
        >
          {skillCategories.map((category, index) => (
            <SkillCategory key={category.key} category={category} index={index} />
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}

export default SkillsSection;