import { useEffect, useState } from 'react';

const navLinks = [
  ['Home', 'home'],
  ['About', 'about'],
  ['Skills', 'skills'],
  ['Process', 'services'],
  ['Projects', 'projects'],
  ['Contact', 'contact'],
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 28);

      const current = navLinks.findLast(([, id]) => {
        const section = document.getElementById(id);
        return section && section.getBoundingClientRect().top <= 140;
      });

      if (current) setActiveSection(current[1]);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 px-3 md:px-6 transition-all duration-500 ${isScrolled ? 'py-3' : 'py-5'}`}>
      <div className={`premium-nav max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center ${isScrolled ? 'premium-nav-scrolled' : ''}`}>
        <a href="#home" className="text-white text-base sm:text-xl md:text-2xl font-black tracking-tight">
          Deepak Web Developer<span className="text-red-500">.</span>
        </a>

        <div className="hidden lg:flex items-center gap-2">
          {navLinks.map(([label, id]) => (
            <a key={id} href={`#${id}`} className={`nav-link ${activeSection === id ? 'nav-link-active' : ''}`}>
              {label}
            </a>
          ))}
        </div>

        <a href="#contact" className="premium-cta hidden lg:inline-flex">
          Hire Me
        </a>

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="mobile-menu-button lg:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <div className={`lg:hidden mx-3 md:mx-6 mt-3 transition-all duration-500 overflow-hidden ${isOpen ? 'max-h-[520px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="mobile-menu-panel">
          {navLinks.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setIsOpen(false)}
              className={activeSection === id ? 'mobile-link-active' : ''}
            >
              {label}
            </a>
          ))}
          <a href="#contact" onClick={() => setIsOpen(false)} className="premium-cta justify-center">
            Hire Me
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
