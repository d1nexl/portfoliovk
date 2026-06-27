'use client'

import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import { Send, Github, Linkedin, Mail, CheckCircle, Loader2 } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { SOCIAL } from '@/lib/data'

const EMAILJS_SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  ?? ''
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? ''
const EMAILJS_PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  ?? ''

export default function ContactSection() {
  const { t } = useI18n()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
        EMAILJS_PUBLIC_KEY,
      )
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <section id="contact" className="py-20 px-8 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-2">
          — Contact
        </p>
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">{t.contact.title}</h2>
        <p className="text-slate-400 max-w-md mx-auto">{t.contact.subtitle}</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-3 space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                {t.contact.namePlaceholder}
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder={t.contact.namePlaceholder}
                required
                className="w-full px-4 py-3 rounded-xl glass border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500/50 focus:shadow-glow-indigo transition-all bg-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                {t.contact.emailPlaceholder}
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder={t.contact.emailPlaceholder}
                required
                className="w-full px-4 py-3 rounded-xl glass border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500/50 transition-all bg-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              {t.contact.messagePlaceholder}
            </label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder={t.contact.messagePlaceholder}
              required
              rows={5}
              className="w-full px-4 py-3 rounded-xl glass border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500/50 transition-all bg-transparent resize-none"
            />
          </div>

          <motion.button
            type="submit"
            disabled={status === 'sending' || status === 'sent'}
            whileHover={status === 'idle' ? { scale: 1.02, boxShadow: '0 0 25px rgba(99,102,241,0.4)' } : {}}
            whileTap={status === 'idle' ? { scale: 0.98 } : {}}
            className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all ${
              status === 'error'
                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white disabled:opacity-60'
            }`}
          >
            {status === 'sending' && <Loader2 size={17} className="animate-spin" />}
            {status === 'sent'    && <CheckCircle size={17} />}
            {(status === 'idle' || status === 'error') && <Send size={17} />}
            {status === 'sent'    && '✓ Message sent!'}
            {status === 'sending' && 'Sending...'}
            {status === 'idle'    && t.contact.send}
            {status === 'error'   && 'Failed — try again'}
          </motion.button>
        </motion.form>

        {/* Social sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2 flex flex-col justify-center"
        >
          <div className="glass rounded-2xl p-6 border border-white/5 space-y-4">
            <p className="text-sm text-slate-400 font-medium">{t.contact.orReach}</p>

            {[
              { href: `mailto:${SOCIAL.email}`, Icon: Mail,     label: 'Email',    value: SOCIAL.email,       color: 'text-indigo-400' },
              { href: SOCIAL.github,            Icon: Github,   label: 'GitHub',   value: 'github.com/d1nexl', color: 'text-slate-300'  },
              { href: SOCIAL.linkedin,          Icon: Linkedin, label: 'LinkedIn', value: 'Vladyslav Kutsyn', color: 'text-blue-400'   },
              { href: SOCIAL.telegram,          Icon: Send,     label: 'Telegram', value: '@d1nexl',          color: 'text-cyan-400'   },
            ].map(({ href, Icon, label, value, color }) => (
              <motion.a
                key={label}
                href={href}
                target={label !== 'Email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all group"
              >
                <div className={`w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center ${color} group-hover:bg-white/8 transition-colors`}>
                  <Icon size={16} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">{label}</p>
                  <p className="text-sm text-slate-300 font-medium">{value}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
