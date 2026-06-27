'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Send, Heart } from 'lucide-react'
import { SOCIAL } from '@/lib/data'
import { useI18n } from '@/lib/i18n'

export default function Footer() {
  const { t } = useI18n()
  const year = new Date().getFullYear()

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="border-t border-white/5 py-8 px-8 lg:px-16"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span>© {year} Vladyslav Kutsyn</span>
          <span className="text-slate-700">·</span>
          <span className="flex items-center gap-1">
            Made with <Heart size={12} className="text-indigo-500 fill-indigo-500 mx-0.5" /> in Next.js
          </span>
        </div>

        <div className="flex items-center gap-3">
          {[
            { href: SOCIAL.github, Icon: Github },
            { href: SOCIAL.linkedin, Icon: Linkedin },
            { href: SOCIAL.telegram, Icon: Send },
            { href: `mailto:${SOCIAL.email}`, Icon: Mail },
          ].map(({ href, Icon }, i) => (
            <motion.a
              key={i}
              href={href}
              target={i < 3 ? '_blank' : undefined}
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -2 }}
              className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-500 hover:text-indigo-400 hover:bg-indigo-500/10 transition-all"
            >
              <Icon size={15} />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.footer>
  )
}
