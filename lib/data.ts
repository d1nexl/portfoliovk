export const PROJECTS = [
  {
    id: 'robota-cz',
    title: 'Robota-CZ',
    descEn:
      'A bilingual job platform helping Ukrainian and Czech job seekers find employment in the Czech Republic, while enabling employers to post vacancies and manage applications.',
    descUk:
      'Двомовна платформа для пошуку роботи, яка допомагає українським та чеським шукачам знайти роботу в Чехії, а роботодавцям — публікувати вакансії та керувати заявками.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Supabase'],
    url: 'https://robota-cz.cz',
    github: 'https://github.com/d1nexl/cz-robota',
    featured: true,
    color: '#3b82f6',
    gradient: 'from-blue-600/20 to-cyan-600/20',
    preview: '/robota-cz.png',
  },
  {
    id: 'zarplata-tracker',
    title: 'Zarplata Tracker',
    descEn:
      'A personal finance and salary tracking app that lets you log income, track expenses, set budgets, and visualize how much you actually earn each month.',
    descUk:
      'Додаток для відстеження зарплати та особистих фінансів: логування доходів, контроль витрат, бюджетування та візуалізація реального заробітку за місяць.',
    tags: ['React', 'Node.js', 'MongoDB', 'Chart.js', 'Tailwind CSS'],
    url: 'https://www.zarplata-cz.cz/',
    github: 'https://github.com/d1nexl/ZarplataTracker',
    featured: true,
    color: '#8b5cf6',
    gradient: 'from-purple-600/20 to-indigo-600/20',
    preview: '/zarplata-cz.png',
  },
  {
    id: 'dolkadflow',
    title: 'DolkadFlow',
    descEn:
      'A workflow automation tool for accountants — manage documents, automate recurring reports, track deadlines, and collaborate with clients in one clean dashboard.',
    descUk:
      'Інструмент автоматизації для бухгалтерів — управління документами, автоматизація звітів, відстеження дедлайнів та взаємодія з клієнтами в одному зручному дашборді.',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'SQL', 'Tailwind CSS'],
    url: 'https://dokladflow.vercel.app/',
    github: 'https://github.com/d1nexl/dokladflow',
    featured: true,
    color: '#06b6d4',
    gradient: 'from-cyan-600/20 to-teal-600/20',
    preview: '/doklad-flow.png',
  },
]

export const SKILLS = {
  frontend: [
    { name: 'React', level: 90, icon: '⚛️' },
    { name: 'Next.js', level: 88, icon: '▲' },
    { name: 'TypeScript', level: 82, icon: 'TS' },
    { name: 'Tailwind CSS', level: 92, icon: '🎨' },
    { name: 'Figma', level: 75, icon: '🖌️' },
  ],
  backend: [
    { name: 'Node.js', level: 85, icon: '🟢' },
    { name: 'Express.js', level: 80, icon: '🚀' },
    { name: 'PostgreSQL', level: 78, icon: '🐘' },
    { name: 'MongoDB', level: 82, icon: '🍃' },
    { name: 'Supabase', level: 80, icon: '⚡' },
  ],
  tools: [
    { name: 'Git', level: 88, icon: '🔧' },
    { name: 'Docker', level: 65, icon: '🐳' },
    { name: 'SQL', level: 78, icon: '🗄️' },
    { name: 'REST API', level: 90, icon: '🌐' },
  ],
}

export const TECH_STACK = {
  frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Figma'],
  backend: ['Node.js', 'Express.js', 'Supabase', 'PostgreSQL', 'MongoDB'],
  tools: ['Git', 'Docker', 'SQL', 'Figma', 'CI/CD'],
}

export const EXPERIENCE = [
  {
    titleEn: 'Full Stack Developer',
    titleUk: 'Full Stack розробник',
    companyEn: 'Freelance',
    companyUk: 'Фрілансер',
    period: '2026 — Present',
    periodUk: '2026 — Зараз',
    descEn:
      'Building full-stack web applications for clients across Europe. Specialising in React/Next.js frontends with Node.js/Supabase backends. Delivered 5+ projects on time and within budget.',
    descUk:
      'Розробка повнофункціональних веб-додатків для клієнтів по всій Європі. Спеціалізація на React/Next.js фронтенді з Node.js/Supabase бекендом. Здав 5+ проектів вчасно і в рамках бюджету.',
    tags: ['React', 'Next.js', 'Node.js', 'TypeScript', 'Supabase'],
    current: true,
  },
]

export const SOCIAL = {
  github: 'https://github.com/d1nexl',
  linkedin: 'https://www.linkedin.com/in/%D0%B2%D0%BB%D0%B0%D0%B4%D0%B8%D1%81%D0%BB%D0%B0%D0%B2-%D0%BA%D1%83%D1%86%D0%B8%D0%BD-758925412/',
  telegram: 'https://t.me/d1nexl',
  email: 'vladislavkucncz@gmail.com',
}
