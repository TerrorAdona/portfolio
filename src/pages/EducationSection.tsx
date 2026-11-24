"use client";

import { motion } from "framer-motion";
import { Section } from "../components/layout/Section";
import { Container } from "../components/layout/Container";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { education, academicProjects, professionalExperiences, certifications, getEducationStats } from "../data/education";
import { formatDateRange } from "../lib/utils";
import { CodeIcon, DatabaseIcon, CloudIcon, ServerIcon, AwardIcon, SparklesIcon, ZapIcon, GraduationCapIcon, CalendarIcon, MapPinIcon, BriefcaseIcon, GlobeIcon, BookOpenIcon, ShieldIcon, CheckCircleIcon, StarIcon, UsersIcon, ClockIcon, Building2Icon } from "../components/ui/BrandIcons";
import { cn } from "../lib/utils";

/**
 * Education & Journey Section - Vertical Timeline
 * Presents academic background, projects, experiences, certifications
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

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

const statsVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.1 + i * 0.08,
      duration: 0.4,
      ease: [0.34, 1.56, 0.64, 1] as const,
    },
  }),
};

const categoryIcons = {
  education: GraduationCapIcon,
  project: BookOpenIcon,
  experience: BriefcaseIcon,
  certification: AwardIcon,
};

const typeColors = {
  education: "var(--color-accent-primary)",
  project: "var(--color-info)",
  experience: "var(--color-success)",
  certification: "var(--color-warning)",
};

type TimelineType = "education" | "project" | "experience" | "certification";

interface TimelineItemProps {
  type: TimelineType;
  index: number;
  children: React.ReactNode;
  date: string;
  title: string;
  subtitle?: string;
  location?: string;
  description?: string;
  technologies?: string[];
  achievements?: string[];
  links?: Array<{ label: string; href: string; icon?: React.ReactNode; external?: boolean }>;
}

function TimelineConnector() {
  return (
    <motion.div
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      transition={{ duration: 1, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="absolute left-[22px] top-0 bottom-0 w-px bg-gradient-to-b from-[var(--color-border-primary)] via-[var(--color-accent-primary)]/30 to-[var(--color-border-primary)]"
      style={{ transformOrigin: "top center" }}
    />
  );
}

function TimelineDot({ type, index }: { type: TimelineType; index: number }) {
  const color = typeColors[type];
  const IconComponent = categoryIcons[type];

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.3 + index * 0.1, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] as const }}
      className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-4"
      style={{
        backgroundColor: "var(--color-bg-primary)",
        borderColor: color,
        boxShadow: `0 0 0 4px var(--color-bg-primary), 0 0 20px -5px ${color}40`,
      }}
    >
      <IconComponent className="w-5 h-5" style={{ color }} aria-hidden="true" />
    </motion.div>
  );
}

function TimelineCard({
  type,
  index,
  children,
  date,
  title,
  subtitle,
  location,
  description,
  technologies,
  achievements,
  links,
}: TimelineItemProps) {
  const color = typeColors[type];

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.1 + index * 0.08 }}
      className="relative pl-10 lg:pl-14"
    >
      {/* Timeline connector & dot */}
      <div className="absolute left-0 top-3 lg:left-[16px]">
        <TimelineConnector />
        <TimelineDot type={type} index={index} />
      </div>

      {/* Card content */}
      <Card variant="default" padding="lg" className="relative">
        {/* Date & Type badge */}
        <div className="flex items-center gap-3 mb-4">
          <Badge variant="outline" size="sm" className="flex items-center gap-1.5" style={{ borderColor: color, color }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} aria-hidden="true" />
            {type === "education" ? "Formation" : type === "project" ? "Projet académique" : type === "experience" ? "Expérience" : "Certification"}
          </Badge>
          <span className="text-sm text-[var(--color-text-muted)] font-medium">{date}</span>
        </div>

        {/* Title & Subtitle */}
        <h3 className="font-display font-semibold text-[var(--color-text-primary)] mb-1" style={{ color }}>
          {title}
        </h3>
        {subtitle && (
          <p className="text-[var(--color-text-secondary)] mb-2">{subtitle}</p>
        )}
        {location && (
          <p className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] mb-4">
            <MapPinIcon className="w-3.5 h-3.5" aria-hidden="true" />
            {location}
          </p>
        )}

        {/* Description */}
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="text-[var(--color-text-secondary)] leading-relaxed mb-4"
          >
            {description}
          </motion.p>
        )}

        {/* Technologies */}
        {technologies && technologies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.3 }}
            className="flex flex-wrap gap-2 mb-4" role="list"
          >
            {technologies.slice(0, 6).map((tech, i) => (
              <Badge key={tech} variant="outline" size="sm" role="listitem" className="text-xs" style={{ borderColor: color }}>
                {tech}
              </Badge>
            ))}
            {technologies.length > 6 && (
              <Badge variant="outline" size="sm" className="text-xs">+{technologies.length - 6}</Badge>
            )}
          </motion.div>
        )}

        {/* Achievements */}
        {achievements && achievements.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="space-y-2 mb-4"
          >
            <h4 className="font-medium text-[var(--color-text-primary)] flex items-center gap-2">
              <CheckCircleIcon className="w-4 h-4 text-[var(--color-success)]" aria-hidden="true" />
              Points clés
            </h4>
            <ul className="space-y-1.5 ml-6" role="list">
              {achievements.map((achievement, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.05, duration: 0.3 }}
                  className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]"
                >
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--color-border-secondary)] mt-1.5" aria-hidden="true" />
                  <span>{achievement}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Links */}
        {links && links.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.3 }}
            className="flex flex-wrap gap-3 pt-4 border-t border-[var(--color-border-primary)]"
          >
            {links.map((link, i) => (
              <Button
                key={i}
                asAnchor
                href={link.href}
                variant="ghost"
                size="sm"
                external={link.external}
                leftIcon={link.icon}
                className="transition-colors"
              >
                {link.label}
              </Button>
            ))}
          </motion.div>
        )}
      </Card>
    </motion.article>
  );
}

function StatsSummary() {
  const stats = getEducationStats();

  const statItems = [
    { label: "Années d'études", value: `${stats.totalYears}+`, icon: CalendarIcon, color: "var(--color-accent-primary)" },
    { label: "Diplômes", value: stats.diplomasCount, icon: GraduationCapIcon, color: "var(--color-accent-primary)" },
    { label: "Projets académiques", value: stats.projectsCount, icon: BookOpenIcon, color: "var(--color-info)" },
    { label: "Expériences pro", value: stats.experiencesCount, icon: BriefcaseIcon, color: "var(--color-success)" },
    { label: "Certifications", value: stats.certificationsCount, icon: AwardIcon, color: "var(--color-warning)" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-12"
      role="list"
      aria-label="Résumé du parcours"
    >
      {statItems.map((stat, i) => (
        <motion.article
          key={stat.label}
          variants={statsVariants(i)}
          initial="hidden"
          animate="visible"
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
    </motion.div>
  );
}

export function EducationSection() {
  // Combine all timeline items and sort by date (most recent first)
  const timelineItems = [
    ...education.map((edu, i) => ({
      type: "education" as TimelineType,
      index: i,
      date: formatDateRange(edu.startDate, edu.endDate, edu.current),
      title: edu.degree,
      subtitle: `${edu.field} — ${edu.institution}`,
      location: edu.location,
      description: edu.description,
      technologies: undefined,
      achievements: edu.achievements,
      children: (
        <>
          {edu.repository && (
            <Button
              asAnchor
              href={edu.repository}
              variant="ghost"
              size="sm"
              external
              leftIcon={<span>📁</span>}
              className="transition-colors"
            >
              Repository
            </Button>
          )}
        </>
      ),
    })),
    ...academicProjects.map((proj, i) => ({
      type: "project" as TimelineType,
      index: i,
      date: proj.period,
      title: proj.title,
      subtitle: proj.institution,
      location: undefined,
      description: proj.description,
      technologies: proj.technologies,
      achievements: proj.achievements,
      links: [
        proj.repository && { label: "Code", href: proj.repository, icon: <span>📁</span>, external: true },
        proj.demo && { label: "Démo", href: proj.demo, icon: <span>🔗</span>, external: true },
      ].filter(Boolean) as Array<{ label: string; href: string; icon?: React.ReactNode; external?: boolean }>,
    })),
    ...professionalExperiences.map((exp, i) => ({
      type: "experience" as TimelineType,
      index: i,
      date: formatDateRange(exp.startDate, exp.endDate, exp.current),
      title: exp.role,
      subtitle: exp.company,
      location: exp.location,
      description: exp.description,
      technologies: exp.technologies,
      achievements: exp.achievements,
      links: exp.website ? [{ label: "Site web", href: exp.website, icon: <GlobeIcon className="w-4 h-4" />, external: true }] : undefined,
    })),
    ...certifications.map((cert, i) => ({
      type: "certification" as TimelineType,
      index: i,
      date: cert.date,
      title: cert.name,
      subtitle: cert.issuer,
      location: undefined,
      description: undefined,
      technologies: cert.skills,
      achievements: undefined,
      links: cert.verificationUrl ? [{ label: "Vérifier", href: cert.verificationUrl, icon: <ShieldIcon className="w-4 h-4" />, external: true }] : undefined,
    })),
  ].sort((a, b) => {
    // Sort by date (most recent first)
    const dateA = a.date.split(" → ")[1] || a.date.split(" → ")[0];
    const dateB = b.date.split(" → ")[1] || b.date.split(" → ")[0];
    return dateB.localeCompare(dateA);
  });

  return (
    <Section id="journey" size="lg" background="secondary">
      <Container size="xl" padding="md">
        {/* Header */}
        <motion.header
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="section-heading mb-12 max-w-3xl mx-auto text-center"
        >
          <motion.div
            variants={itemVariants}
            className="section-eyebrow inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-accent-primary)]/15 text-[var(--color-accent-primary)] border border-[var(--color-accent-primary)]/30 mb-6"
          >
            <SparklesIcon className="w-4 h-4" aria-hidden="true" />
            <span className="font-medium">Parcours & Formation</span>
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="font-display font-bold text-[var(--color-text-primary)] tracking-tight mb-4"
          >
            Mon parcours académique & professionnel
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-[var(--color-text-secondary)] text-lg"
          >
            Un parcours alliant formation académique solide, projets concrets, expériences professionnelles et veille technologique continue.
          </motion.p>
        </motion.header>

        {/* Stats Summary */}
        <StatsSummary />

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative"
        >
          {/* Timeline vertical line */}
          <div className="hidden lg:block absolute left-[22px] top-0 bottom-0 w-px bg-gradient-to-b from-[var(--color-border-primary)] via-[var(--color-accent-primary)]/20 to-[var(--color-border-primary)]" aria-hidden="true" />

          <div className="space-y-8">
            {timelineItems.map((item, index) => (
              <TimelineCard key={`${item.type}-${index}`} {...item} index={index} />
            ))}
          </div>

          {/* End marker */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + timelineItems.length * 0.08, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] as const }}
            className="relative lg:pl-14 mt-8 flex items-center justify-center"
          >
            <div className="absolute left-0 lg:left-[16px] top-0 w-10 h-10 rounded-full border-4 flex items-center justify-center" style={{ backgroundColor: "var(--color-bg-primary)", borderColor: "var(--color-accent-primary)" }}>
              <StarIcon className="w-5 h-5" style={{ color: "var(--color-accent-primary)" }} aria-hidden="true" />
            </div>
            <div className="ml-14 lg:ml-0 text-center">
              <p className="font-medium text-[var(--color-text-primary)]">Parcours en constante évolution</p>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">Nouvelles formations, projets et certifications à venir</p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}

export default EducationSection;
