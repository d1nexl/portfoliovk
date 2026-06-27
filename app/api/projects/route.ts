import { NextResponse } from 'next/server'
import { PROJECTS } from '@/lib/data'

export async function GET() {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const { getSupabaseAdmin } = await import('@/lib/supabase')
      const db = getSupabaseAdmin()
      const { data, error } = await db
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
      if (!error && data && data.length > 0) return NextResponse.json(data)
    } catch {}
  }
  return NextResponse.json(PROJECTS)
}
