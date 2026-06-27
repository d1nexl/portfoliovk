export const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      experience: 'Experience',
      contact: 'Contact',
    },
    hero: {
      greeting: "Hi, I'm",
      name: 'Vladyslav Kutsyn',
      role: 'Full Stack Developer',
      description:
        'I build modern, performant and user-friendly web applications from the ground up. Passionate about clean code, great UX and solving real-world problems.',
      viewWork: 'View My Work',
      contactMe: 'Contact Me',
      available: 'Available for work',
      buildingSolutions: 'Building solutions with code and creativity',
    },
    featured: {
      title: 'Featured Projects',
      viewAll: 'View all projects',
    },
    techStack: {
      title: 'Tech Stack',
      frontend: 'Frontend',
      backend: 'Backend',
      tools: 'Tools & Others',
    },
    about: {
      title: 'About Me',
      description:
        "I'm a Full Stack Developer with experience building scalable web applications. I enjoy turning ideas into products and constantly learning new technologies.",
      experienceLabel: 'Year Experience',
      projectsLabel: 'Projects Completed',
      satisfactionLabel: 'Client Satisfaction',
    },
    skills: {
      title: 'My Skills',
      subtitle: 'Technologies I work with every day',
    },
    experience: {
      title: 'Experience',
      subtitle: 'My professional journey',
      present: 'Present',
    },
    contact: {
      title: "Let's Work Together",
      subtitle: "Have a project in mind? Let's discuss it and build something amazing.",
      namePlaceholder: 'Your Name',
      emailPlaceholder: 'Your Email',
      messagePlaceholder: 'Tell me about your project...',
      send: 'Send Message',
      letsConnect: "Let's connect",
      orReach: 'Or reach me directly:',
    },
    projects: {
      title: 'All Projects',
      subtitle: "Everything I've built",
      visitSite: 'Visit Site',
      viewCode: 'View Code',
      back: '← Back to Home',
    },
    downloadCV: 'Download CV',
    status: 'Full Stack Developer',
    moreProjects: 'More projects on GitHub',
  },
  uk: {
    nav: {
      home: 'Головна',
      about: 'Про мене',
      skills: 'Навички',
      projects: 'Проекти',
      experience: 'Досвід',
      contact: 'Контакти',
    },
    hero: {
      greeting: 'Привіт, я',
      name: 'Владислав Куцин',
      role: 'Full Stack розробник',
      description:
        'Я створюю сучасні, продуктивні та зручні веб-додатки з нуля. Захоплений чистим кодом, чудовим UX та вирішенням реальних проблем.',
      viewWork: 'Мої роботи',
      contactMe: "Зв'язатись",
      available: 'Відкритий до роботи',
      buildingSolutions: 'Створюю рішення з кодом і творчістю',
    },
    featured: {
      title: 'Вибрані проекти',
      viewAll: 'Всі проекти',
    },
    techStack: {
      title: 'Технології',
      frontend: 'Frontend',
      backend: 'Backend',
      tools: 'Інструменти',
    },
    about: {
      title: 'Про мене',
      description:
        'Я Full Stack розробник з досвідом створення масштабованих веб-додатків. Перетворюю ідеї на продукти та постійно вивчаю нові технології.',
      experienceLabel: 'Рік досвіду',
      projectsLabel: 'Завершених проектів',
      satisfactionLabel: 'Задоволених клієнтів',
    },
    skills: {
      title: 'Мої навички',
      subtitle: 'Технології з якими я працюю щодня',
    },
    experience: {
      title: 'Досвід',
      subtitle: 'Мій професійний шлях',
      present: 'Зараз',
    },
    contact: {
      title: 'Давайте працювати разом',
      subtitle: 'Маєте проект? Давайте обговоримо і побудуємо щось чудове.',
      namePlaceholder: "Ваше ім'я",
      emailPlaceholder: 'Ваш email',
      messagePlaceholder: 'Розкажіть про ваш проект...',
      send: 'Надіслати',
      letsConnect: "Зв'язатися",
      orReach: 'Або напишіть напряму:',
    },
    projects: {
      title: 'Всі проекти',
      subtitle: 'Все що я побудував',
      visitSite: 'Відкрити сайт',
      viewCode: 'Код',
      back: '← На головну',
    },
    downloadCV: 'Завантажити CV',
    status: 'Full Stack розробник',
    moreProjects: 'Більше проектів на GitHub',
  },
}

export type Language = 'en' | 'uk'
export type T = typeof translations.en
