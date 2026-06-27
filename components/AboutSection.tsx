'use client'

import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import { Github, Linkedin, Mail, Send } from 'lucide-react'
import { SOCIAL } from '@/lib/data'
import CountUp from './ui/CountUp'

export default function AboutSection() {
  const { t } = useI18n()

  const stats = [
    { value: 1, suffix: '+', label: t.about.experienceLabel, color: 'text-indigo-400' },
    { value: 5, suffix: '+', label: t.about.projectsLabel, color: 'text-purple-400' },
    { value: 100, suffix: '%', label: t.about.satisfactionLabel, color: 'text-cyan-400' },
  ]

  return (
    <section id="about" className="py-20 px-8 lg:px-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left — Stats */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-2">
            — About
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">{t.about.title}</h2>
          <p className="text-slate-400 leading-relaxed mb-8 text-base">{t.about.description}</p>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
                className="glass rounded-2xl p-4 border border-white/5 text-center"
              >
                <div className={`text-3xl font-extrabold mb-1 ${stat.color}`}>
                  <CountUp to={stat.value} />
                  {stat.suffix}
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {[
              { href: SOCIAL.github, Icon: Github, label: 'GitHub' },
              { href: SOCIAL.linkedin, Icon: Linkedin, label: 'LinkedIn' },
              { href: SOCIAL.telegram, Icon: Send, label: 'Telegram' },
              { href: `mailto:${SOCIAL.email}`, Icon: Mail, label: 'Email' },
            ].map(({ href, Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target={label !== 'Email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-indigo-300 hover:border-indigo-500/30 transition-all"
                title={label}
              >
                <Icon size={17} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right — Visual card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <div className="glass rounded-3xl p-6 border border-indigo-900/30 relative overflow-hidden">
            {/* Gradient blob */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-600/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl" />

            {/* Avatar */}
            <div className="relative flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xl font-bold text-white flex-shrink-0 shadow-glow-indigo">
                VK
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Vladyslav Kutsyn</h3>
                <p className="text-indigo-400 text-sm font-medium">{t.hero.role}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="status-dot w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  <span className="text-[11px] text-emerald-400">{t.hero.available}</span>
                </div>
              </div>
            </div>

            {/* Info rows */}
            <div className="space-y-3">
              {[
                { label: 'Email', value: SOCIAL.email },
                { label: 'GitHub', value: 'github.com/d1nexl' },
                { label: 'Telegram', value: '@d1nexl' },
                { label: 'Location', value: 'Czech Republic 🇨🇿' },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <span className="text-xs text-slate-500 font-medium w-20">{label}</span>
                  <span className="text-xs text-slate-300">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
