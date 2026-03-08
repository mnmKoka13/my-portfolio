'use client';

import { useState, useEffect } from 'react';
import { scrollToSection } from '@/lib/utils';
import MobileMenu from './MobileMenu';

const menuItems = [
  { label: 'TOP', href: 'top' },
  { label: 'About', href: 'about' },
  { label: 'Works', href: 'works' },
  { label: 'Profile', href: 'profile' },
  { label: 'Skills', href: 'skills' },
  { label: 'Contact', href: 'contact' },
  { label: 'Availability', href: 'availability' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('top');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // アクティブセクションの検出
      const sections = menuItems.map(item => item.href);
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuClick = (href: string) => {
    scrollToSection(href);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-primary-light/30 shadow-sm'
            : 'bg-white/80 backdrop-blur-sm border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <button
              onClick={() => handleMenuClick('top')}
              className="text-xl md:text-2xl font-bold hover:opacity-70 transition-opacity"
            >
              portfolio
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex items-center gap-8">
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <button
                      onClick={() => handleMenuClick(item.href)}
                      className={`relative text-sm transition-all group ${
                        activeSection === item.href
                          ? 'font-bold text-primary'
                          : 'font-medium text-foreground hover:text-primary'
                      }`}
                    >
                      {item.label}
                      {/* 下線アニメーション */}
                      <span
                        className={`absolute left-0 bottom-0 h-0.5 bg-primary transition-all duration-300 ${
                          activeSection === item.href
                            ? 'w-full'
                            : 'w-0 group-hover:w-full'
                        }`}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              aria-label="メニューを開く"
            >
              <span className="w-6 h-0.5 bg-foreground transition-all" />
              <span className="w-6 h-0.5 bg-foreground transition-all" />
              <span className="w-6 h-0.5 bg-foreground transition-all" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        menuItems={menuItems}
      />
    </>
  );
}
