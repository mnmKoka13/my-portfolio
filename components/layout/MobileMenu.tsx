'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { scrollToSection } from '@/lib/utils';

interface MenuItem {
  label: string;
  href: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
}

export default function MobileMenu({
  isOpen,
  onClose,
  menuItems,
}: MobileMenuProps) {
  const handleMenuClick = (href: string) => {
    scrollToSection(href);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 md:hidden"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-white z-50 md:hidden shadow-2xl"
          >
            {/* Close Button */}
            <div className="flex justify-end p-6">
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center"
                aria-label="メニューを閉じる"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Menu Items */}
            <nav className="px-6">
              <ul className="space-y-2">
                {menuItems.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <button
                      onClick={() => handleMenuClick(item.href)}
                      className="w-full text-left text-2xl font-medium py-3 hover:text-primary transition-colors relative group"
                    >
                      {item.label}
                      {/* 下線アニメーション */}
                      <span className="absolute left-0 bottom-2 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                    </button>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
