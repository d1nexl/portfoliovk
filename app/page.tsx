import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import AboutSection from '@/components/AboutSection'
import SkillsSection from '@/components/SkillsSection'
import FeaturedProjects from '@/components/FeaturedProjects'
import ExperienceSection from '@/components/ExperienceSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Navbar />
      <main className="flex-1 lg:ml-[220px] pt-16 lg:pt-0">
        <Hero />
        <AboutSection />
        <SkillsSection />
        <FeaturedProjects />
        <ExperienceSection />
        <ContactSection />
        <Footer />
      </main>
    </div>
  )
}
