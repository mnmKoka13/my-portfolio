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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-md'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <button
              onClick={() => handleMenuClick('top')}
              className="text-xl md:text-2xl font-bold hover:opacity-70 transition-opacity"
            >
              Portfolio
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex items-center gap-8">
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <button
                      onClick={() => handleMenuClick(item.href)}
                      className="text-sm font-medium hover:text-primary transition-colors"
                    >
                      {item.label}
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
