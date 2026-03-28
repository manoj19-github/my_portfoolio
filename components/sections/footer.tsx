'use client';

import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Heart } from 'lucide-react';

export function Footer() {
  const socialLinks = [
    {
      icon: Mail,
      href: 'mailto:santramanoj1997@gmail.com',
      label: 'Email',
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/in/manoj-santra-38ab181ba',
      label: 'LinkedIn',
    },
    {
      icon: Github,
      href: 'https://github.com/manoj19-github',
      label: 'GitHub',
    },
  ];

  return (
    <footer className="py-12 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="flex items-center space-x-6">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center hover:shadow-lg transition-shadow"
                aria-label={link.label}
              >
                <link.icon className="h-5 w-5 text-white" />
              </motion.a>
            ))}
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
              Made with <Heart className="h-4 w-4 text-red-500 fill-current" />{' '}
              by Manoj Santra
            </p>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
