import React from 'react';
import Link from 'next/link';
import { Brand } from './Brand';

const footerLinks = [
  {
    title: 'Platform',
    links: [
      { name: 'Shop', href: '/shop' },
      { name: 'Community', href: '/community' },
      { name: 'Consultation', href: '/consultation' },
      { name: 'Dashboard', href: '/dashboard' },
    ],
  },
  {
    title: 'Services',
    links: [
      { name: '3D Printing', href: '/services?type=3d-printing' },
      { name: 'Laser Cutting', href: '/services?type=laser-cutting' },
      { name: 'PCB Fab', href: '/services?type=pcb-fabrication' },
      { name: 'Expert Consultation', href: '/consultation' },
    ],
  },
  {
    title: 'Support',
    links: [
      { name: 'Order Status', href: '/dashboard' },
      { name: 'Messages', href: '/chat' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="bg-[var(--footer-bg)] pt-16 sm:pt-20 pb-8 sm:pb-10 border-t border-[var(--border-primary)]">
      <div className="store-container">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12 mb-12 sm:mb-16">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 sm:mb-6">
              <Brand footer />
            </Link>
            <p className="text-zinc-500 max-w-sm mb-6 sm:mb-8 text-sm">
              Electronics, custom fabrication, and technical support for engineering projects.
            </p>

          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-4 sm:mb-6 text-sm">{section.title}</h3>
              <ul className="flex flex-col gap-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-zinc-500 hover:text-safety-orange transition-colors text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          <p className="text-zinc-600 text-xs sm:text-sm text-center sm:text-left">
            &copy; {new Date().getFullYear()} XTS Mechatronics.
          </p>
          <div className="flex gap-4 sm:gap-8 text-xs sm:text-sm text-zinc-600">
            <Link href="/privacy" className="hover:text-zinc-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-zinc-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
