import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Hero } from '@/sections/Hero';
import { Services } from '@/sections/Services';
import { ValueProp } from '@/sections/ValueProp';
import { LMMShowcase } from '@/sections/LMMShowcase';
import { Blog } from '@/sections/Blog';
import { Contact } from '@/sections/Contact';
import { useLanguage } from '@/hooks/useLanguage';
import './App.css';

function App() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <Navigation language={language} toggleLanguage={toggleLanguage} />

      {/* Main Content */}
      <main>
        <Hero language={language} />
        <Services language={language} />
        <ValueProp language={language} />
        <LMMShowcase language={language} />
        <Blog language={language} />
        <Contact language={language} />
      </main>

      {/* Footer */}
      <Footer language={language} />
    </div>
  );
}

export default App;
