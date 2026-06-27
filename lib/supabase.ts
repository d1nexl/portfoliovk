import { createClient } from '@supabase/supabase-js'

export type Project = {
  id: string
  title: string
  desc_en: string
  desc_uk: string
  tags: string[]
  url: string | null
  github: string | null
  preview: string | null
  color: string
  featured: boolean
  created_at: string
}

export function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}

export function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )
}
