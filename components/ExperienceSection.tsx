'use client'

import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import { EXPERIENCE } from '@/lib/data'
import { Briefcase } from 'lucide-react'

export default function ExperienceSection() {
  const { t, lang } = useI18n()

  return (
    <section id="experience" className="py-20 px-8 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-2">
          — Journey
        </p>
        <h2 className="text-3xl lg:text-4xl font-bold text-white">{t.experience.title}</h2>
        <p className="text-slate-400 mt-2">{t.experience.subtitle}</p>
      </motion.div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/60 via-purple-500/40 to-transparent hidden sm:block" />

        <div className="space-y-8">
          {EXPERIENCE.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="relative sm:pl-16"
            >
              {/* Timeline dot */}
              <div className="hidden sm:flex absolute left-0 top-4 w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 items-center justify-center shadow-glow-indigo">
                <Briefcase size={18} className="text-indigo-400" />
              </div>

              {/* Card */}
              <div className="glass rounded-2xl p-6 border border-white/5 hover:border-indigo-500/20 transition-all duration-300">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {lang === 'uk' ? exp.titleUk : exp.titleEn}
                    </h3>
                    <p className="text-indigo-400 text-sm font-medium mt-0.5">
                      {lang === 'uk' ? exp.companyUk : exp.companyEn}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {exp.current && (
                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-medium">
                        <span className="status-dot w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                        {t.experience.present}
                      </span>
                    )}
                    <span className="text-xs text-slate-500 bg-white/5 px-3 py-1 rounded-full border border-white/8">
                      {lang === 'uk' ? exp.periodUk : exp.period}
                    </span>
                  </div>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {lang === 'uk' ? exp.descUk : exp.descEn}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-indigo-500/10 border border-indigo-500/20 text-indigo-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
