import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import HeroSection from '@/components/landing/HeroSection'
import FeaturesSection from '@/components/landing/FeaturesSection'
import HowItWorksSection from '@/components/landing/HowItWorksSection'
import EventTypesSection from '@/components/landing/EventTypesSection'
import WhyUsSection from '@/components/landing/WhyUsSection'
import FaqSection from '@/components/landing/FaqSection'
import ContactSection from '@/components/landing/ContactSection'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <EventTypesSection />
      <WhyUsSection />
      <FaqSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
