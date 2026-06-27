'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useI18n } from '@/lib/i18n'

type Skill = {
  name: string
  icon: string | null
  letter?: string
  letterColor?: string
}

const CATEGORIES: { key: string; label: string; accent: string; skills: Skill[] }[] = [
  {
    key: 'frontend',
    label: 'Frontend',
    accent: '#6366f1',
    skills: [
      { name: 'React', icon: '/react.png' },
      { name: 'Next.js', icon: '/nextjs.png' },
      { name: 'TypeScript', icon: '/typescript.png' },
      { name: 'Tailwind CSS', icon: '/tailwind.png' },
      { name: 'Figma', icon: '/figma.png' },
    ],
  },
  {
    key: 'backend',
    label: 'Backend',
    accent: '#8b5cf6',
    skills: [
      { name: 'Node.js', icon: '/nodejs.png' },
      { name: 'MongoDB', icon: '/mongodb.png' },
      { name: 'SQL', icon: '/sql.png' },
      { name: 'Supabase', icon: null, letter: 'SB', letterColor: '#3ecf8e' },
      { name: 'Express', icon: null, letter: 'Ex', letterColor: '#e2e8f0' },
    ],
  },
  {
    key: 'tools',
    label: 'Tools & Others',
    accent: '#06b6d4',
    skills: [
      { name: 'Git', icon: '/git.png' },
      { name: 'Docker', icon: null, letter: '🐳', letterColor: '#2496ed' },
      { name: 'REST API', icon: null, letter: 'API', letterColor: '#6366f1' },
      { name: 'CI/CD', icon: null, letter: '⟳', letterColor: '#fc6d26' },
    ],
  },
]

function SkillCard({ skill, accent, delay }: { skill: Skill; accent: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 12 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -5, scale: 1.04 }}
      className="group flex flex-col items-center gap-2.5 p-4 rounded-2xl cursor-default transition-all duration-200"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.background = `${accent}12`
        el.style.borderColor = `${accent}35`
        el.style.boxShadow = `0 8px 24px ${accent}18`
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.background = 'rgba(255,255,255,0.03)'
        el.style.borderColor = 'rgba(255,255,255,0.07)'
        el.style.boxShadow = 'none'
      }}
    >
      <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden bg-white/5">
        {skill.icon ? (
          <Image src={skill.icon} alt={skill.name} width={34} height={34} className="object-contain" />
        ) : (
          <span
            className="text-sm font-bold leading-none"
            style={{ color: skill.letterColor ?? '#94a3b8' }}
          >
            {skill.letter}
          </span>
        )}
      </div>
      <span className="text-xs font-medium text-slate-400 group-hover:text-slate-200 transition-colors text-center leading-tight">
        {skill.name}
      </span>
    </motion.div>
  )
}

export default function SkillsSection() {
  const { t } = useI18n()

  return (
    <section id="skills" className="py-20 px-8 lg:px-16">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-14"
      >
        <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-2">— Stack</p>
        <h2 className="text-3xl lg:text-4xl font-bold text-white">{t.skills.title}</h2>
        <p className="text-slate-400 mt-2 text-base">{t.skills.subtitle}</p>
      </motion.div>

      {/* Categories */}
      <div className="space-y-12">
        {CATEGORIES.map((cat, ci) => (
          <motion.div
            key={cat.key}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: ci * 0.12, duration: 0.55 }}
          >
            {/* Category label */}
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: `${cat.accent}20`, border: `1px solid ${cat.accent}40` }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: cat.accent }}
                />
              </div>
              <span className="text-sm font-semibold text-slate-300 uppercase tracking-widest">
                {cat.label}
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-white/8 to-transparent" />
            </div>

            {/* Skills grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
              {cat.skills.map((skill, si) => (
                <SkillCard
                  key={skill.name}
                  skill={skill}
                  accent={cat.accent}
                  delay={ci * 0.06 + si * 0.05}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
