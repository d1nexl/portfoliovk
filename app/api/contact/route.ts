import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: [process.env.CONTACT_EMAIL ?? 'vladislavkucncz@gmail.com'],
      replyTo: email,
      subject: `New message from ${name} — Portfolio`,
      html: `
        <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; background: #0a1628; color: #e2e8f0; border-radius: 16px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 32px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; color: white;">New Contact Message</h1>
            <p style="margin: 8px 0 0; color: rgba(255,255,255,0.8); font-size: 14px;">From your portfolio website</p>
          </div>
          <div style="padding: 32px;">
            <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(99,102,241,0.2); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
              <p style="margin: 0 0 4px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #6366f1;">From</p>
              <p style="margin: 0; font-size: 18px; font-weight: 600; color: white;">${name}</p>
              <p style="margin: 4px 0 0; color: #94a3b8;">${email}</p>
            </div>
            <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(99,102,241,0.2); border-radius: 12px; padding: 20px;">
              <p style="margin: 0 0 12px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #6366f1;">Message</p>
              <p style="margin: 0; line-height: 1.7; color: #cbd5e1; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          <div style="padding: 20px 32px; border-top: 1px solid rgba(255,255,255,0.05); text-align: center;">
            <p style="margin: 0; font-size: 12px; color: #475569;">Vladyslav Kutsyn — Portfolio</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email send error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
