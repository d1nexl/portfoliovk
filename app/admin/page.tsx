'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus, Pencil, Trash2, ExternalLink, Github, LogOut,
  Loader2, X, Check, ImagePlus, Star, StarOff,
} from 'lucide-react'
import type { Project } from '@/lib/supabase'

const COLORS = ['#6366f1', '#8b5cf6', '#06b6d4', '#3b82f6', '#10b981', '#f59e0b', '#ef4444']

const empty = {
  title: '', desc_en: '', desc_uk: '', tags: '',
  url: '', github: '', color: '#6366f1', featured: false, preview: '',
}

export default function AdminPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<'add' | 'edit' | null>(null)
  const [form, setForm] = useState({ ...empty, tags: '' })
  const [editId, setEditId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const load = async () => {
    setLoading(true)
    const res = await fetch('/api/admin/projects')
    const data = await res.json()
    setProjects(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const openAdd = () => {
    setForm({ ...empty, tags: '' })
    setEditId(null)
    setModal('add')
  }

  const openEdit = (p: Project) => {
    setForm({
      title: p.title,
      desc_en: p.desc_en ?? '',
      desc_uk: p.desc_uk ?? '',
      tags: (p.tags ?? []).join(', '),
      url: p.url ?? '',
      github: p.github ?? '',
      color: p.color ?? '#6366f1',
      featured: p.featured ?? false,
      preview: p.preview ?? '',
    })
    setEditId(p.id)
    setModal('edit')
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    const data = await res.json()
    if (data.url) setForm(f => ({ ...f, preview: data.url }))
    setUploading(false)
  }

  const handleSave = async () => {
    setSaving(true)
    const payload = {
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      url: form.url || null,
      github: form.github || null,
      preview: form.preview || null,
    }
    if (modal === 'add') {
      await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    } else {
      await fetch(`/api/admin/projects/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    }
    setSaving(false)
    setModal(null)
    load()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return
    setDeleting(id)
    await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' })
    setDeleting(null)
    load()
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  const F = (k: keyof typeof form, v: string | boolean) =>
    setForm(f => ({ ...f, [k]: v }))

  return (
    <div className="min-h-screen bg-[#050b1a] text-slate-100">
      {/* Header */}
      <header className="border-b border-white/5 px-6 py-4 flex items-center justify-between sticky top-0 bg-[#050b1a]/90 backdrop-blur-sm z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">VK</div>
          <div>
            <p className="text-sm font-semibold text-white">Admin Panel</p>
            <p className="text-[11px] text-slate-500">Portfolio Manager</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" target="_blank" className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors">
            <ExternalLink size={13} /> View Site
          </a>
          <button onClick={handleLogout} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-red-400 transition-colors">
            <LogOut size={13} /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Projects</h1>
            <p className="text-slate-400 text-sm mt-0.5">{projects.length} total</p>
          </div>
          <motion.button
            onClick={openAdd}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.3)]"
          >
            <Plus size={16} /> Add Project
          </motion.button>
        </div>

        {/* Projects list */}
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 size={28} className="animate-spin text-indigo-400" /></div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            <p className="text-lg mb-2">No projects yet</p>
            <p className="text-sm">Click "Add Project" to create your first one</p>
          </div>
        ) : (
          <div className="space-y-3">
            {projects.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/3 border border-white/6 hover:border-white/10 transition-all group"
              >
                {/* Preview */}
                <div className="w-16 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-white/5 flex items-center justify-center"
                  style={{ background: `${p.color}15` }}>
                  {p.preview
                    ? <img src={p.preview} alt={p.title} className="w-full h-full object-cover" />
                    : <span className="text-lg font-bold" style={{ color: p.color }}>{p.title.charAt(0)}</span>
                  }
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-semibold text-white text-sm">{p.title}</span>
                    {p.featured && <Star size={12} className="text-amber-400 fill-amber-400" />}
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: p.color }} />
                  </div>
                  <p className="text-slate-500 text-xs truncate">{p.desc_en}</p>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {(p.tags ?? []).slice(0, 4).map(t => (
                      <span key={t} className="px-2 py-0.5 rounded-full text-[10px] bg-white/5 border border-white/8 text-slate-400">{t}</span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {p.url && <a href={p.url} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg hover:bg-white/8 text-slate-500 hover:text-indigo-400 transition-all"><ExternalLink size={13} /></a>}
                  {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg hover:bg-white/8 text-slate-500 hover:text-slate-300 transition-all"><Github size={13} /></a>}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button onClick={() => openEdit(p)} className="p-2 rounded-lg hover:bg-indigo-500/15 text-slate-500 hover:text-indigo-400 transition-all">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => handleDelete(p.id)} disabled={deleting === p.id} className="p-2 rounded-lg hover:bg-red-500/15 text-slate-500 hover:text-red-400 transition-all">
                    {deleting === p.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="bg-[#0a1628] border border-white/8 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              {/* Modal header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/6">
                <h2 className="text-lg font-bold text-white">
                  {modal === 'add' ? 'Add Project' : 'Edit Project'}
                </h2>
                <button onClick={() => setModal(null)} className="p-1.5 rounded-lg hover:bg-white/8 text-slate-400 hover:text-white transition-all">
                  <X size={18} />
                </button>
              </div>

              {/* Form */}
              <div className="px-6 py-5 space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-xs text-slate-400 font-medium mb-1.5">Title *</label>
                  <input value={form.title} onChange={e => F('title', e.target.value)} placeholder="Project name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 transition-all" />
                </div>

                {/* Desc EN */}
                <div>
                  <label className="block text-xs text-slate-400 font-medium mb-1.5">Description (EN)</label>
                  <textarea value={form.desc_en} onChange={e => F('desc_en', e.target.value)} placeholder="English description" rows={3}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 transition-all resize-none" />
                </div>

                {/* Desc UK */}
                <div>
                  <label className="block text-xs text-slate-400 font-medium mb-1.5">Опис (UK)</label>
                  <textarea value={form.desc_uk} onChange={e => F('desc_uk', e.target.value)} placeholder="Опис українською" rows={3}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 transition-all resize-none" />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-xs text-slate-400 font-medium mb-1.5">Tags (comma separated)</label>
                  <input value={form.tags} onChange={e => F('tags', e.target.value)} placeholder="Next.js, TypeScript, Supabase"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 transition-all" />
                </div>

                {/* URL + GitHub */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-400 font-medium mb-1.5">Site URL</label>
                    <input value={form.url} onChange={e => F('url', e.target.value)} placeholder="https://..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 font-medium mb-1.5">GitHub URL</label>
                    <input value={form.github} onChange={e => F('github', e.target.value)} placeholder="https://github.com/..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 transition-all" />
                  </div>
                </div>

                {/* Color + Featured */}
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-xs text-slate-400 font-medium mb-2">Color</label>
                    <div className="flex gap-2">
                      {COLORS.map(c => (
                        <button key={c} onClick={() => F('color', c)} type="button"
                          className="w-6 h-6 rounded-full border-2 transition-all"
                          style={{ background: c, borderColor: form.color === c ? '#fff' : 'transparent' }} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 font-medium mb-2">Featured</label>
                    <button onClick={() => F('featured', !form.featured)} type="button"
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${form.featured ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300' : 'bg-white/5 border border-white/10 text-slate-400'}`}>
                      {form.featured ? <Star size={13} className="fill-amber-400 text-amber-400" /> : <StarOff size={13} />}
                      {form.featured ? 'Featured' : 'Not featured'}
                    </button>
                  </div>
                </div>

                {/* Image upload */}
                <div>
                  <label className="block text-xs text-slate-400 font-medium mb-2">Preview Image</label>
                  <div className="flex gap-3 items-start">
                    {form.preview && (
                      <div className="w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                        <img src={form.preview} alt="preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1 space-y-2">
                      <button onClick={() => fileRef.current?.click()} type="button" disabled={uploading}
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-white/15 text-slate-400 hover:border-indigo-500/40 hover:text-indigo-400 transition-all text-sm">
                        {uploading ? <Loader2 size={15} className="animate-spin" /> : <ImagePlus size={15} />}
                        {uploading ? 'Uploading...' : 'Upload image'}
                      </button>
                      <input value={form.preview} onChange={e => F('preview', e.target.value)} placeholder="or paste image URL"
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 transition-all" />
                    </div>
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-white/6 flex gap-3">
                <button onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-sm font-medium hover:bg-white/8 transition-all">
                  Cancel
                </button>
                <motion.button
                  onClick={handleSave}
                  disabled={saving || !form.title}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {saving ? <Loader2 size={15} className="animate-spin" /> : <Check size={15} />}
                  {saving ? 'Saving...' : 'Save'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
