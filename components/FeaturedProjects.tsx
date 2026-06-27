'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useI18n } from '@/lib/i18n'
import { PROJECTS } from '@/lib/data'
import Link from 'next/link'

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

export default function FeaturedProjects() {
  const { t, lang } = useI18n()
  const [allProjects, setAllProjects] = useState<any[]>(PROJECTS)

  useEffect(() => {
    fetch('/api/projects')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setAllProjects(data) })
      .catch(() => {})
  }, [])

  const featured = allProjects.filter((p) => p.featured)

  return (
    <section id="projects" className="py-20 px-8 lg:px-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between mb-12"
      >
        <div>
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-2">
            — Portfolio
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            {t.featured.title}
          </h2>
        </div>
        <Link
          href="/projects"
          className="hidden sm:flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors group"
        >
          {t.featured.viewAll}
          <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {featured.map((project, i) => (
          <motion.div
            key={project.id}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="group relative glass rounded-2xl overflow-hidden border border-indigo-900/30 hover:border-indigo-500/30 transition-all duration-300 shadow-card hover:shadow-card-hover cursor-default flex flex-col"
          >
            {/* Preview image */}
            <div className="relative h-44 overflow-hidden flex-shrink-0 bg-navy-800">
              {project.preview ? (
                <>
                  {project.preview.startsWith('http') ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.preview}
                      alt={project.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <Image
                      src={project.preview}
                      alt={project.title}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/80 via-transparent to-transparent" />
                </>
              ) : (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ background: `radial-gradient(ellipse at 60% 40%, ${project.color}15 0%, transparent 70%)` }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold border border-white/10"
                    style={{ background: `${project.color}20`, color: project.color }}
                  >
                    {project.title.charAt(0)}
                  </div>
                </div>
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/40 backdrop-blur-[2px]">
                {project.url && (
                  <a href={project.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-colors">
                    <ExternalLink size={14} /> Visit
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-colors">
                    <Github size={14} /> Code
                  </a>
                )}
              </div>

              <div className="absolute top-0 left-0 right-0 h-0.5"
                style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}40)` }} />
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {project.title}
                </h3>
                <div className="flex gap-1.5 ml-2 flex-shrink-0">
                  {project.url && (
                    <a href={project.url} target="_blank" rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-indigo-500/20 text-slate-400 hover:text-indigo-300 transition-all">
                      <ExternalLink size={13} />
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-indigo-500/20 text-slate-400 hover:text-indigo-300 transition-all">
                      <Github size={13} />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                {lang === 'uk' ? (project.desc_uk ?? project.descUk) : (project.desc_en ?? project.descEn)}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {(project.tags ?? []).map((tag: string) => (
                  <span key={tag}
                    className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/5 border border-white/10 text-slate-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="mt-8 text-center sm:hidden">
        <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 font-medium">
          {t.featured.viewAll} <ArrowRight size={14} />
        </Link>
      </motion.div>
    </section>
  )
}
