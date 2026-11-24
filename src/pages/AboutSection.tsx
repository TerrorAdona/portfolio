import { motion } from "framer-motion";
import { Section } from "../components/layout/Section";
import { Container } from "../components/layout/Container";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { profile } from "../data/profile";
import { education, certifications } from "../data/education";
import { formatDateRange, formatMonthYear } from "../lib/utils";
import { CodeIcon, DatabaseIcon, AwardIcon, SparklesIcon, ZapIcon, GraduationCapIcon, CalendarIcon, MapPinIcon, BriefcaseIcon, GlobeIcon, CloudIcon } from "../components/ui/BrandIcons";

/**
 * About Section - Editorial layout with personal story, education, certifications
 * Text content on left, graphic/visual elements on right
 */

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.34, 1.56, 0.64, 1] as const,
    },
  },
};

function AboutSection() {
  const about = profile.about;
  const personalInfo = profile.personalInfo;
  const interests = profile.interests;

  return (
    <Section id="about" size="lg" background="secondary">
      <Container size="xl" padding="md">
        {/* Header */}
        <motion.header
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="section-heading mb-16 max-w-3xl mx-auto text-center"
        >
          <motion.div
            variants={itemVariants}
            className="section-eyebrow inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-accent-primary)]/15 text-[var(--color-accent-primary)] border border-[var(--color-accent-primary)]/30 mb-6"
          >
            <CodeIcon className="w-4 h-4" aria-hidden="true" />
            <span className="font-medium">À propos</span>
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="font-display font-bold text-[var(--color-text-primary)] tracking-tight mb-4"
          >
            {profile.name}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-[var(--color-text-secondary)] text-lg"
          >
            {profile.title} — {profile.location} — {profile.availability === "open" ? "Disponible" : "Indisponible"}
          </motion.p>
        </motion.header>

        {/* Main Content - Editorial Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        >
          {/* Left Column - Text Content (8/12) */}
          <motion.article
            variants={itemVariants}
            className="lg:col-span-8 space-y-10"
          >
            {/* Introduction */}
            <section aria-labelledby="intro-title">
              <motion.h3
                variants={itemVariants}
                id="intro-title"
                className="font-display font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2"
              >
                <SparklesIcon className="w-6 h-6 text-[var(--color-accent-primary)]" aria-hidden="true" />
                Qui je suis
              </motion.h3>
              <motion.div
                variants={itemVariants}
                className="prose prose-invert max-w-none text-[var(--color-text-secondary)] leading-relaxed space-y-4 text-lg"
              >
                <p>{about.introduction}</p>
                <p>{about.passion}</p>
              </motion.div>
            </section>

            {/* Full Stack & Architecture */}
            <section aria-labelledby="fullstack-title">
              <motion.h3
                variants={itemVariants}
                id="fullstack-title"
                className="font-display font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2"
              >
                <CodeIcon className="w-6 h-6 text-[var(--color-accent-primary)]" aria-hidden="true" />
                Développement Full Stack & Architecture
              </motion.h3>
              <motion.div
                variants={itemVariants}
                className="prose prose-invert max-w-none text-[var(--color-text-secondary)] leading-relaxed space-y-4"
              >
                <p>{about.fullstack}</p>
                <p>{about.architecture}</p>
              </motion.div>
            </section>

            {/* Philosophy */}
            <section aria-labelledby="philosophy-title">
              <motion.h3
                variants={itemVariants}
                id="philosophy-title"
                className="font-display font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2"
              >
                <AwardIcon className="w-6 h-6 text-[var(--color-accent-primary)]" aria-hidden="true" />
                Philosophie & Objectifs
              </motion.h3>
              <motion.div
                variants={itemVariants}
                className="prose prose-invert max-w-none text-[var(--color-text-secondary)] leading-relaxed space-y-4"
              >
                <p>{about.useful}</p>
                <p>{about.learning}</p>
              </motion.div>
            </section>

            {/* Professional Interests */}
            <section aria-labelledby="interests-title">
              <motion.h3
                variants={itemVariants}
                id="interests-title"
                className="font-display font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2"
              >
                <ZapIcon className="w-6 h-6 text-[var(--color-accent-primary)]" aria-hidden="true" />
                Centres d'intérêt professionnels
              </motion.h3>
              <motion.ul
                variants={itemVariants}
                className="grid sm:grid-cols-2 gap-3" role="list"
              >
                {interests.map((interest, i) => (
                  <motion.li
                    key={interest}
                    custom={i}
                    variants={iconVariants}
                    className="flex items-center gap-3 p-3 bg-[var(--color-bg-tertiary)] rounded-lg border border-[var(--color-border-primary)] transition-all hover:border-[var(--color-border-secondary)] hover:shadow-[var(--shadow-sm)]"
                  >
                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[var(--color-accent-primary)]" aria-hidden="true" />
                    <span className="text-[var(--color-text-secondary)]">{interest}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </section>
          </motion.article>

          {/* Right Column - Visual/Personal Info (4/12) */}
          <motion.aside
            variants={itemVariants}
            className="lg:col-span-4 space-y-6"
          >
            {/* Profile Card - Visual */}
            <Card variant="glass" padding="lg" className="text-center sticky top-24">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as const }}
                className="w-28 h-28 mx-auto mb-5 rounded-full bg-gradient-to-br from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] flex items-center justify-center text-4xl font-display font-bold text-white shadow-[var(--shadow-glow-md)]"
              >
                {profile.name.split(" ").map((n) => n[0]).join("")}
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="font-display font-semibold text-[var(--color-text-primary)] mb-1"
              >
                {profile.name}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.4 }}
                className="text-sm text-[var(--color-text-secondary)] mb-2"
              >
                {profile.title}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="text-xs text-[var(--color-text-muted)] mb-4 flex items-center justify-center gap-1"
              >
                <MapPinIcon className="w-3.5 h-3.5" aria-hidden="true" />
                {profile.location}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.4 }}
                className="flex items-center justify-center gap-4" role="list"
              >
                <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="group text-[var(--color-text-muted)] hover:text-[var(--color-accent-primary)] transition-colors" aria-label="GitHub">
                  <motion.span whileHover={{ scale: 1.15 }}><CodeIcon className="w-5 h-5" aria-hidden="true" /></motion.span>
                  <span className="sr-only">GitHub</span>
                </a>
                <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="group text-[var(--color-text-muted)] hover:text-[var(--color-info)] transition-colors" aria-label="LinkedIn">
                  <motion.span whileHover={{ scale: 1.15 }}><DatabaseIcon className="w-5 h-5" aria-hidden="true" /></motion.span>
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a href={profile.social.twitter} target="_blank" rel="noopener noreferrer" className="group text-[var(--color-text-muted)] hover:text-[var(--color-accent-tertiary)] transition-colors" aria-label="Twitter">
                  <motion.span whileHover={{ scale: 1.15 }}><CloudIcon className="w-5 h-5" aria-hidden="true" /></motion.span>
                  <span className="sr-only">Twitter</span>
                </a>
                <a href={profile.social.email} className="group text-[var(--color-text-muted)] hover:text-[var(--color-warning)] transition-colors" aria-label="Email">
                  <motion.span whileHover={{ scale: 1.15 }}><SparklesIcon className="w-5 h-5" aria-hidden="true" /></motion.span>
                  <span className="sr-only">Email</span>
                </a>
              </motion.div>
            </Card>

            {/* Personal Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="space-y-3"
            >
              {personalInfo.map((info, i) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
                  className="p-4 bg-[var(--color-bg-tertiary)] rounded-lg border border-[var(--color-border-primary)] transition-all hover:border-[var(--color-border-secondary)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[var(--color-accent-primary)]/15 flex items-center justify-center text-[var(--color-accent-primary)]">
                      {info.icon === "map-pin" && <MapPinIcon className="w-4.5 h-4.5" aria-hidden="true" />}
                      {info.icon === "briefcase" && <BriefcaseIcon className="w-4.5 h-4.5" aria-hidden="true" />}
                      {info.icon === "graduation-cap" && <GraduationCapIcon className="w-4.5 h-4.5" aria-hidden="true" />}
                      {info.icon === "code" && <CodeIcon className="w-4.5 h-4.5" aria-hidden="true" />}
                      {info.icon === "globe" && <GlobeIcon className="w-4.5 h-4.5" aria-hidden="true" />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-[var(--color-text-muted)] font-medium uppercase tracking-wide">{info.label}</p>
                      <p className="text-sm text-[var(--color-text-primary)] truncate">{info.value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Quick Stats */}
            <Card variant="default" padding="md">
              <motion.h4
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="font-medium text-[var(--color-text-primary)] mb-4 flex items-center gap-2"
              >
                <AwardIcon className="w-5 h-5 text-[var(--color-accent-primary)]" aria-hidden="true" />
                En chiffres
              </motion.h4>
              <dl className="space-y-3" role="list">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.75, duration: 0.4 }}
                  className="flex justify-between items-center"
                >
                  <dt className="text-[var(--color-text-secondary)]">Années d'expérience</dt>
                  <dd className="font-display font-bold text-[var(--color-accent-primary)]">{profile.yearsExperience}+</dd>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                  className="flex justify-between items-center"
                >
                  <dt className="text-[var(--color-text-secondary)]">Projets réalisés</dt>
                  <dd className="font-display font-bold text-[var(--color-accent-primary)]">{profile.projectsCompleted}+</dd>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.85, duration: 0.4 }}
                  className="flex justify-between items-center"
                >
                  <dt className="text-[var(--color-text-secondary)]">Technologies maîtrisées</dt>
                  <dd className="font-display font-bold text-[var(--color-accent-primary)]">{profile.technologiesCount}+</dd>
                </motion.div>
              </dl>
            </Card>
          </motion.aside>
        </motion.div>

        {/* Education & Certifications */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-16 grid lg:grid-cols-2 gap-8"
        >
          {/* Education */}
          <section aria-labelledby="education-title">
            <motion.header
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-6 flex items-center gap-3"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-md bg-[var(--color-bg-tertiary)] text-[var(--color-accent-primary)]">
                <GraduationCapIcon className="w-5 h-5" aria-hidden="true" />
              </div>
              <motion.h3
                id="education-title"
                className="font-display font-semibold text-[var(--color-text-primary)]"
              >
                Formation
              </motion.h3>
            </motion.header>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="space-y-4"
            >
              {education.map((edu) => (
                <motion.article
                  key={edu.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="p-5 bg-[var(--color-bg-tertiary)] rounded-xl border border-[var(--color-border-primary)] transition-all hover:border-[var(--color-border-secondary)] hover:shadow-[var(--shadow-sm)]"
                >
                  <header className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h4 className="font-medium text-[var(--color-text-primary)]">{edu.degree}</h4>
                      <p className="text-sm text-[var(--color-text-secondary)]">{edu.field}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-[var(--color-text-muted)] flex-shrink-0">
                      <CalendarIcon className="w-3 h-3" aria-hidden="true" />
                      <span>{formatDateRange(edu.startDate, edu.endDate, edu.current)}</span>
                    </div>
                  </header>
                  <p className="text-sm text-[var(--color-text-muted)] mb-2">{edu.institution}, {edu.location}</p>
                  {edu.grade && (
                    <p className="text-sm text-[var(--color-text-muted)]">
                      <span className="font-medium">Mention : </span>{edu.grade}
                    </p>
                  )}
                  {edu.achievements && edu.achievements.length > 0 && (
                    <ul className="mt-3 space-y-1.5" role="list">
                      {edu.achievements.map((ach, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * i, duration: 0.3 }}
                          className="flex items-start gap-2 text-xs text-[var(--color-text-muted)]"
                        >
                          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--color-border-secondary)] mt-1" aria-hidden="true" />
                          <span>{ach}</span>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </motion.article>
              ))}
            </motion.div>
          </section>

          {/* Certifications */}
          <section aria-labelledby="certifications-title">
            <motion.header
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-6 flex items-center gap-3"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-md bg-[var(--color-bg-tertiary)] text-[var(--color-warning)]">
                <AwardIcon className="w-5 h-5" aria-hidden="true" />
              </div>
              <motion.h3
                id="certifications-title"
                className="font-display font-semibold text-[var(--color-text-primary)]"
              >
                Certifications
              </motion.h3>
            </motion.header>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="space-y-4"
            >
              {certifications.map((cert) => (
                <motion.article
                  key={cert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="p-5 bg-[var(--color-bg-tertiary)] rounded-xl border border-[var(--color-border-primary)] transition-all hover:border-[var(--color-border-secondary)] hover:shadow-[var(--shadow-sm)]"
                >
                  <header className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h4 className="font-medium text-[var(--color-text-primary)]">{cert.name}</h4>
                      <p className="text-sm text-[var(--color-text-secondary)]">{cert.issuer}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-[var(--color-text-muted)] flex-shrink-0">
                      <CalendarIcon className="w-3 h-3" aria-hidden="true" />
                      <span>{formatMonthYear(cert.date)}</span>
                    </div>
                  </header>
                  {cert.skills && cert.skills.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.3 }}
                      className="flex flex-wrap gap-1.5" role="list"
                    >
                      {cert.skills.map((skill) => (
                        <Badge key={skill} variant="outline" size="sm" role="listitem">{skill}</Badge>
                      ))}
                    </motion.div>
                  )}
                  {cert.verificationUrl && (
                    <motion.a
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[var(--color-accent-primary)] hover:text-[var(--color-accent-secondary)] transition-colors mt-3"
                    >
                      Vérifier <span aria-hidden="true">→</span>
                    </motion.a>
                  )}
                </motion.article>
              ))}
            </motion.div>
          </section>
        </motion.div>
      </Container>
    </Section>
  );
}

export default AboutSection;
