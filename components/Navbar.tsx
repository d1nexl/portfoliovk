'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home, User, Zap, Briefcase, Clock, Mail,
  Download, Github, Linkedin, Menu, X, Send,
} from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { SOCIAL } from '@/lib/data'
import { cn } from '@/lib/cn'

const navItems = [
  { key: 'home', href: '#home', Icon: Home },
  { key: 'about', href: '#about', Icon: User },
  { key: 'skills', href: '#skills', Icon: Zap },
  { key: 'projects', href: '#projects', Icon: Briefcase },
  { key: 'experience', href: '#experience', Icon: Clock },
  { key: 'contact', href: '#contact', Icon: Mail },
]

export default function Navbar() {
  const { t, lang, setLang } = useI18n()
  const [active, setActive] = useState('home')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = navItems.map((n) => n.key)
      for (const sec of [...sections].reverse()) {
        const el = document.getElementById(sec)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sec)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNav = (href: string, key: string) => {
    setActive(key)
    setMobileOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="hidden lg:flex fixed left-0 top-0 h-full w-[220px] z-50 flex-col"
      >
        <div className="flex flex-col h-full glass border-r border-indigo-900/30 py-8 px-5">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="mb-10 cursor-pointer"
            onClick={() => handleNav('#home', 'home')}
          >
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white text-sm shadow-glow-indigo">
                VK
              </div>
              <div className="leading-tight">
                <p className="text-xs font-semibold text-white">Vladyslav</p>
                <p className="text-[10px] text-indigo-400">Kutsyn</p>
              </div>
            </div>
          </motion.div>

          {/* Nav Links */}
          <nav className="flex-1 space-y-1">
            {navItems.map(({ key, href, Icon }, i) => {
              const label = t.nav[key as keyof typeof t.nav]
              const isActive = active === key
              return (
                <motion.button
                  key={key}
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.07 + 0.2 }}
                  onClick={() => handleNav(href, key)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group',
                    isActive
                      ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-glow-indigo'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  )}
                >
                  <Icon
                    size={16}
                    className={cn(
                      'transition-colors',
                      isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-indigo-400'
                    )}
                  />
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400"
                    />
                  )}
                </motion.button>
              )
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="space-y-3 mt-6">
            <motion.a
              href="/cv.pdf"
              download
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Download size={14} />
              {t.downloadCV}
            </motion.a>

            {/* Social */}
            <div className="flex items-center gap-2 pt-1">
              <p className="text-[10px] text-slate-500 flex-1">{t.contact.letsConnect}</p>
              <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer">
                <Github size={15} className="text-slate-400 hover:text-white transition-colors" />
              </a>
              <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin size={15} className="text-slate-400 hover:text-indigo-400 transition-colors" />
              </a>
              <a href={SOCIAL.telegram} target="_blank" rel="noopener noreferrer">
                <Send size={15} className="text-slate-400 hover:text-indigo-400 transition-colors" />
              </a>
            </div>

            {/* Language Toggle */}
            <div className="flex items-center gap-1 p-1 bg-white/5 rounded-lg">
              {(['en', 'uk'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={cn(
                    'flex-1 py-1 rounded-md text-xs font-medium transition-all',
                    lang === l
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  )}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Mobile Header */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={cn(
          'lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 h-16 transition-all duration-300',
          scrolled ? 'glass border-b border-indigo-900/30' : 'bg-transparent'
        )}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white text-xs">
            VK
          </div>
          <span className="font-semibold text-white text-sm">Vladyslav Kutsyn</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 p-0.5 bg-white/5 rounded-lg">
            {(['en', 'uk'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={cn(
                  'px-2 py-1 rounded text-xs font-medium transition-all',
                  lang === l ? 'bg-indigo-600 text-white' : 'text-slate-400'
                )}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors text-slate-300"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="lg:hidden fixed inset-0 z-40 flex"
          >
            <div className="w-72 glass border-r border-indigo-900/30 pt-20 pb-8 px-5 flex flex-col">
              <nav className="space-y-1 flex-1">
                {navItems.map(({ key, href, Icon }) => {
                  const label = t.nav[key as keyof typeof t.nav]
                  const isActive = active === key
                  return (
                    <button
                      key={key}
                      onClick={() => handleNav(href, key)}
                      className={cn(
                        'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                        isActive
                          ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      )}
                    >
                      <Icon size={17} />
                      {label}
                    </button>
                  )
                })}
              </nav>
              <a
                href="/cv.pdf"
                download
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium"
              >
                <Download size={15} />
                {t.downloadCV}
              </a>
            </div>
            <div
              className="flex-1 bg-black/50 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
