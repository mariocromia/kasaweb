import { ThemeProvider } from './contexts/ThemeContext';
import { ContactModalProvider } from './contexts/ContactModalContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ValueProposition from './components/ValueProposition';
import Services from './components/Services';
import TechStack from './components/TechStack';
import Differentials from './components/Differentials';
import Projects from './components/Projects';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import PaymentBanner from './components/PaymentBanner';
import CTA from './components/CTA';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ContactModal from './components/ContactModal';

export default function App() {
  return (
    <ThemeProvider>
      <ContactModalProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-[#050505] text-gray-900 dark:text-white selection:bg-brand-500/30 selection:text-brand-900 dark:selection:text-brand-200 transition-colors duration-300">
          <Navbar />
          <main>
            <Hero />
            <ValueProposition />
            <Services />
            <TechStack />
            <Differentials />
            <Projects />
            <Process />
            <Testimonials />
            <FAQ />
            <PaymentBanner />
            <CTA />
          </main>
          <Footer />
          <WhatsAppButton />
          <ContactModal />
        </div>
      </ContactModalProvider>
    </ThemeProvider>
  );
}
