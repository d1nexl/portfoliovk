'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useI18n } from '@/lib/i18n'

const TECH = {
  frontend: [
    { name: 'React', icon: '/react.png' },
    { name: 'Next.js', icon: '/nextjs.png' },
    { name: 'TypeScript', icon: '/typescript.png' },
    { name: 'Tailwind', icon: '/tailwind.png' },
    { name: 'Figma', icon: '/figma.png' },
  ],
  backend: [
    { name: 'Node.js', icon: '/nodejs.png' },
    { name: 'Express', icon: null, letter: 'Ex' },
    { name: 'Supabase', icon: null, letter: 'SB' },
    { name: 'PostgreSQL', icon: null, letter: 'PG' },
    { name: 'MongoDB', icon: '/mongodb.png' },
  ],
  tools: [
    { name: 'Git', icon: '/git.png' },
    { name: 'Docker', icon: null, letter: '🐳' },
    { name: 'SQL', icon: '/sql.png' },
    { name: 'Figma', icon: '/figma.png' },
    { name: 'CI/CD', icon: null, letter: '⟳' },
  ],
}

function TechIcon({ name, icon, letter }: { name: string; icon: string | null; letter?: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.1, y: -4 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="flex flex-col items-center gap-2.5 p-3 rounded-2xl glass border border-white/5 hover:border-indigo-500/25 transition-colors cursor-default group"
    >
      <div className="w-11 h-11 rounded-xl flex items-center justify-center overflow-hidden bg-white/5 group-hover:bg-white/8 transition-colors">
        {icon ? (
          <Image src={icon} alt={name} width={36} height={36} className="object-contain" />
        ) : (
          <span className="text-sm font-bold text-slate-300">{letter}</span>
        )}
      </div>
      <span className="text-[11px] text-slate-400 font-medium text-center leading-tight group-hover:text-slate-300 transition-colors">
        {name}
      </span>
    </motion.div>
  )
}

export default function TechStack() {
  const { t } = useI18n()

  const categories = [
    { key: 'frontend', label: t.techStack.frontend, items: TECH.frontend },
    { key: 'backend', label: t.techStack.backend, items: TECH.backend },
    { key: 'tools', label: t.techStack.tools, items: TECH.tools },
  ]

  return (
    <section className="py-16 px-8 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-2">— Stack</p>
        <h2 className="text-3xl lg:text-4xl font-bold text-white">{t.techStack.title}</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((cat, ci) => (
          <motion.div
            key={cat.key}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: ci * 0.12, duration: 0.6 }}
          >
            <p className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 inline-block rounded-full" />
              {cat.label}
            </p>
            <div className="grid grid-cols-3 gap-3">
              {cat.items.map((tech, i) => (
                <motion.div
                  key={tech.name + i}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: ci * 0.08 + i * 0.05, duration: 0.4 }}
                >
                  <TechIcon name={tech.name} icon={tech.icon} letter={(tech as any).letter} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
