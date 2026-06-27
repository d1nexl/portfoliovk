'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Mail, Code2, Sparkles } from 'lucide-react'
import { useI18n } from '@/lib/i18n'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

export default function Hero() {
  const { t } = useI18n()

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden grid-bg"
    >
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="orb absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-600/8 rounded-full blur-[120px]" />
        <div className="orb-delay absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-purple-600/8 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[140px] translate-x-1/3" />
      </div>

      <div className="relative z-10 flex items-center w-full px-8 lg:px-16 gap-12">
        {/* Left — Text */}
        <div className="flex-1 max-w-xl">
          {/* Status badge */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 mb-6"
          >
            <span className="status-dot w-2 h-2 rounded-full bg-emerald-400 inline-block" />
            <span className="text-xs font-medium text-indigo-300">{t.hero.available}</span>
          </motion.div>

          {/* Greeting */}
          <motion.p
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-lg text-slate-400 mb-1"
          >
            {t.hero.greeting}
          </motion.p>

          {/* Name */}
          <motion.h1
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-5xl xl:text-6xl font-extrabold leading-tight mb-2"
          >
            <span className="text-white">Vladyslav</span>{' '}
            <span className="gradient-text">Kutsyn</span>
          </motion.h1>

          {/* Role */}
          <motion.h2
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-2xl font-semibold gradient-text mb-5"
          >
            {t.hero.role}
          </motion.h2>

          {/* Description */}
          <motion.p
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-slate-400 leading-relaxed text-base mb-8 max-w-md"
          >
            {t.hero.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex flex-wrap gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(99,102,241,0.5)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo('projects')}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-glow-indigo transition-all"
            >
              {t.hero.viewWork}
              <ArrowRight size={17} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo('contact')}
              className="flex items-center gap-2 px-6 py-3 border border-indigo-500/40 text-slate-200 font-semibold rounded-xl hover:bg-indigo-500/10 hover:border-indigo-400/60 transition-all"
            >
              {t.hero.contactMe}
              <Mail size={17} />
            </motion.button>
          </motion.div>
        </div>

        {/* Right — Photo + cards */}
        <div className="hidden lg:flex flex-1 justify-end items-center relative">
          {/* Photo container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: 60 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            {/* Glow behind photo */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/30 to-purple-600/30 blur-2xl scale-105" />

            {/* Photo */}
            <div className="relative w-[360px] h-[420px] rounded-3xl overflow-hidden border border-indigo-500/20 shadow-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hero-man.png"
                alt="Vladyslav Kutsyn"
                className="w-full h-full object-cover object-top"
              />
              {/* Overlay gradient at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-navy-900/80 to-transparent" />
            </div>

            {/* Floating card — Solutions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute -bottom-5 -left-10 glass px-4 py-3 rounded-2xl border border-indigo-500/20 shadow-card min-w-[200px]"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
                  <Code2 size={16} className="text-indigo-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white leading-tight">{t.hero.buildingSolutions}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="status-dot w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                    <span className="text-[10px] text-emerald-400">{t.hero.available}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating card — Sparkles */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -top-4 -right-8 glass px-3 py-2 rounded-xl border border-purple-500/20"
            >
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-purple-400" />
                <span className="text-xs text-slate-300 font-medium">Full Stack</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border-2 border-indigo-500/40 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-indigo-400" />
        </motion.div>
      </motion.div>
    </section>
  )
}
