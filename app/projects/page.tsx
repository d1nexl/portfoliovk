'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { PROJECTS } from '@/lib/data'
import { useI18n } from '@/lib/i18n'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const ensureHttps = (url: string) =>
  url.startsWith('http') ? url : `https://${url}`

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

export default function ProjectsPage() {
  const { t, lang } = useI18n()
  const [projects, setProjects] = useState<any[]>(PROJECTS)

  useEffect(() => {
    fetch('/api/projects')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setProjects(data) })
      .catch(() => {})
  }, [])

  return (
    <div className="flex min-h-screen">
      <Navbar />

      <main className="flex-1 lg:ml-[220px] pt-16 lg:pt-0">
        {/* Header */}
        <section className="relative py-20 px-8 lg:px-16 overflow-hidden grid-bg">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-600/8 rounded-full blur-[120px]" />
          </div>

          <div className="relative z-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-300 mb-10 transition-colors group"
            >
              <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
              {t.projects.back}
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-2">
                — Portfolio
              </p>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-3">
                {t.projects.title}
              </h1>
              <p className="text-slate-400 text-lg">{t.projects.subtitle}</p>
            </motion.div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16 px-8 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.article
                key={project.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="show"
                whileHover={{ y: -6 }}
                className="group relative glass rounded-2xl overflow-hidden border border-indigo-900/30 hover:border-indigo-500/30 transition-all duration-300 shadow-card hover:shadow-card-hover flex flex-col"
              >
                {/* Colored top bar */}
                <div
                  className="h-1.5 w-full"
                  style={{
                    background: `linear-gradient(90deg, ${project.color}80, ${project.color}30)`,
                  }}
                />

                {/* Preview */}
                <div className="relative h-44 overflow-hidden flex-shrink-0 bg-navy-800">
                  {(project as any).preview ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={(project as any).preview}
                        alt={project.title}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/80 via-transparent to-transparent" />
                    </>
                  ) : (
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ background: `radial-gradient(ellipse at 50% 50%, ${project.color}18 0%, transparent 70%)` }}
                    >
                      <div
                        className="w-20 h-20 rounded-3xl flex items-center justify-center text-3xl font-bold border border-white/10"
                        style={{ background: `${project.color}25`, color: project.color }}
                      >
                        {project.title.charAt(0)}
                      </div>
                    </div>
                  )}
                  {project.featured && (
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-[10px] font-semibold uppercase tracking-wide z-10">
                      Featured
                    </div>
                  )}
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5 z-10"
                    style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}40)` }}
                  />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h2 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {project.title}
                    </h2>
                    <div className="flex gap-1.5 ml-2">
                      {project.url && (
                        <a
                          href={ensureHttps(project.url)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-indigo-500/20 text-slate-400 hover:text-indigo-300 transition-all"
                          title={t.projects.visitSite}
                        >
                          <ExternalLink size={13} />
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={ensureHttps(project.github)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-indigo-500/20 text-slate-400 hover:text-indigo-300 transition-all"
                          title={t.projects.viewCode}
                        >
                          <Github size={13} />
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">
                    {lang === 'uk' ? (project.desc_uk ?? project.descUk) : (project.desc_en ?? project.descEn)}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/5 border border-white/10 text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA buttons */}
                  <div className="flex gap-2 mt-4 pt-4 border-t border-white/5">
                    {project.url ? (
                      <a
                        href={ensureHttps(project.url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-indigo-600/20 border border-indigo-500/25 text-indigo-300 text-xs font-medium hover:bg-indigo-600/30 transition-colors"
                      >
                        <ExternalLink size={12} />
                        {t.projects.visitSite}
                      </a>
                    ) : null}
                    {project.github ? (
                      <a
                        href={ensureHttps(project.github)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs font-medium hover:bg-white/8 transition-colors"
                      >
                        <Github size={12} />
                        {t.projects.viewCode}
                      </a>
                    ) : null}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* GitHub CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-16 text-center"
          >
            <div className="glass inline-flex items-center gap-4 px-8 py-5 rounded-2xl border border-white/8">
              <Github size={22} className="text-slate-400" />
              <div className="text-left">
                <p className="text-sm font-semibold text-white">{t.moreProjects}</p>
                <p className="text-xs text-slate-500">github.com/d1nexl</p>
              </div>
              <a
                href="https://github.com/d1nexl"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
              >
                GitHub →
              </a>
            </div>
          </motion.div>
        </section>

        <Footer />
      </main>
    </div>
  )
}
