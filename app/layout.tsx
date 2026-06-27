import type { Metadata } from 'next'
import './globals.css'
import { I18nProvider } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Vladyslav Kutsyn — Full Stack Developer',
  description:
    'Full Stack Developer specialising in React, Next.js, TypeScript and Node.js. Building modern, performant web applications.',
  keywords: ['Full Stack Developer', 'React', 'Next.js', 'TypeScript', 'Node.js', 'Web Developer'],
  authors: [{ name: 'Vladyslav Kutsyn' }],
  openGraph: {
    title: 'Vladyslav Kutsyn — Full Stack Developer',
    description: 'Building modern, performant web applications with React & Next.js.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-navy-900 text-slate-100 antialiased noise">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  )
}
