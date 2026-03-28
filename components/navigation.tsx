'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Moon, Sun, Menu, X } from 'lucide-react';

// Inline SVG icons — no extra dependencies needed
const GitHubIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedInIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const navRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 80], [0, 1]);

  const logoX = useMotionValue(0);
  const logoY = useMotionValue(0);
  const springX = useSpring(logoX, { stiffness: 300, damping: 20 });
  const springY = useSpring(logoY, { stiffness: 300, damping: 20 });

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDark = mounted ? theme === 'dark' : true;

  const navItems = [
    { name: 'Home',     href: '#home',     number: '01' },
    { name: 'About',    href: '#about',    number: '02' },
    { name: 'Skills',   href: '#skills',   number: '03' },
    { name: 'Projects', href: '#projects', number: '04' },
    { name: 'Contact',  href: '#contact',  number: '05' },
  ];

  // 🔗 Replace with your real profile URLs
  const socialLinks = {
    github:   'https://github.com/manoj19-github',
    linkedin: 'https://www.linkedin.com/in/manoj-santra-38ab181ba/',
  };

  const scrollToSection = (href: string, name: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
    setActiveItem(name);
  };

  // ── Design tokens per theme ────────────────────────────────────────────────
  const tk = isDark ? {
    navBg:              'rgba(5,5,10,0.88)',
    navBorder:          'rgba(255,255,255,0.05)',
    topBar:             'linear-gradient(90deg,transparent,#e2ff5d,#00e5ff,#ff6b9d,transparent)',
    scanline:           'rgba(255,255,255,0.15)',
    logoBorder:         'rgba(255,255,255,0.1)',
    logoBg:             'rgba(255,255,255,0.03)',
    logoRing:           '#e2ff5d44',
    logoDot:            '#e2ff5d',
    logoDotShadow:      '0 0 6px 2px #e2ff5d88',
    logoGrad:           'linear-gradient(135deg,#e2ff5d 0%,#00e5ff 50%,#ff6b9d 100%)',
    logoVer:            'rgba(255,255,255,0.18)',
    numDefault:         'rgba(255,255,255,0.2)',
    numHover:           'rgba(226,255,93,0.45)',
    labelDefault:       'rgba(255,255,255,0.55)',
    labelActive:        '#e2ff5d',
    hoverBg:            'rgba(226,255,93,0.05)',
    hoverBd:            'rgba(226,255,93,0.12)',
    underline:          'linear-gradient(90deg,#e2ff5d,#00e5ff)',
    activeDot:          '#e2ff5d',
    activeShadow:       '0 0 6px 2px #e2ff5d88',
    divider:            'rgba(255,255,255,0.1)',
    ctrlBorder:         'rgba(255,255,255,0.1)',
    ctrlBg:             'rgba(255,255,255,0.03)',
    ctrlColor:          'rgba(255,255,255,0.5)',
    // social
    socialBorder:       'rgba(255,255,255,0.1)',
    socialBg:           'rgba(255,255,255,0.03)',
    socialColor:        'rgba(255,255,255,0.4)',
    ghHoverBorder:      'rgba(226,255,93,0.3)',
    ghHoverBg:          'rgba(226,255,93,0.07)',
    ghHoverColor:       '#e2ff5d',
    ghHoverShadow:      '0 0 12px rgba(226,255,93,0.2)',
    liHoverBorder:      'rgba(0,229,255,0.3)',
    liHoverBg:          'rgba(0,229,255,0.07)',
    liHoverColor:       '#00e5ff',
    liHoverShadow:      '0 0 12px rgba(0,229,255,0.2)',
    ctaBg:              '#e2ff5d',
    ctaColor:           '#050510',
    ctaShadow:          'none',
    mobileBg:           'rgba(5,5,10,0.97)',
    mobileBd:           'rgba(255,255,255,0.06)',
    mobileGrid:         'rgba(255,255,255,0.4)',
    mobileNum:          'rgba(255,255,255,0.2)',
    mobileLabelD:       'rgba(255,255,255,0.65)',
    mobileLabelA:       '#e2ff5d',
    mobileDash:         'rgba(255,255,255,0.18)',
    mobileSocialBorder: 'rgba(255,255,255,0.1)',
    mobileSocialBg:     'rgba(255,255,255,0.04)',
    mobileSocialColor:  'rgba(255,255,255,0.5)',
    mobileCtaBg:        '#e2ff5d',
    mobileCtaC:         '#050510',
  } : {
    navBg:              'rgba(255,255,255,0.92)',
    navBorder:          'rgba(79,70,229,0.15)',
    topBar:             'linear-gradient(90deg,transparent,#4f46e5,#7c3aed,#0284c7,transparent)',
    scanline:           'rgba(79,70,229,0.08)',
    logoBorder:         'rgba(79,70,229,0.35)',
    logoBg:             'rgba(79,70,229,0.07)',
    logoRing:           'rgba(79,70,229,0.25)',
    logoDot:            '#4f46e5',
    logoDotShadow:      '0 0 6px 2px rgba(79,70,229,0.45)',
    logoGrad:           'linear-gradient(135deg,#1e1b4b 0%,#4f46e5 45%,#7c3aed 75%,#0284c7 100%)',
    logoVer:            'rgba(30,27,75,0.45)',
    numDefault:         'rgba(30,27,75,0.4)',
    numHover:           '#4f46e5',
    labelDefault:       'rgba(30,27,75,0.7)',
    labelActive:        '#4f46e5',
    hoverBg:            'rgba(79,70,229,0.07)',
    hoverBd:            'rgba(79,70,229,0.2)',
    underline:          'linear-gradient(90deg,#4f46e5,#7c3aed)',
    activeDot:          '#4f46e5',
    activeShadow:       '0 0 6px 2px rgba(79,70,229,0.45)',
    divider:            'rgba(30,27,75,0.12)',
    ctrlBorder:         'rgba(79,70,229,0.25)',
    ctrlBg:             'rgba(79,70,229,0.06)',
    ctrlColor:          '#4f46e5',
    // social
    socialBorder:       'rgba(79,70,229,0.22)',
    socialBg:           'rgba(79,70,229,0.05)',
    socialColor:        'rgba(30,27,75,0.45)',
    ghHoverBorder:      'rgba(30,27,75,0.4)',
    ghHoverBg:          'rgba(30,27,75,0.07)',
    ghHoverColor:       '#1e1b4b',
    ghHoverShadow:      '0 0 12px rgba(30,27,75,0.15)',
    liHoverBorder:      'rgba(2,132,199,0.35)',
    liHoverBg:          'rgba(2,132,199,0.07)',
    liHoverColor:       '#0284c7',
    liHoverShadow:      '0 0 12px rgba(2,132,199,0.2)',
    ctaBg:              'linear-gradient(135deg,#4f46e5,#7c3aed)',
    ctaColor:           '#ffffff',
    ctaShadow:          '0 4px 18px rgba(79,70,229,0.4)',
    mobileBg:           'rgba(255,255,255,0.98)',
    mobileBd:           'rgba(79,70,229,0.12)',
    mobileGrid:         'rgba(79,70,229,0.5)',
    mobileNum:          'rgba(30,27,75,0.35)',
    mobileLabelD:       'rgba(30,27,75,0.7)',
    mobileLabelA:       '#4f46e5',
    mobileDash:         'rgba(79,70,229,0.2)',
    mobileSocialBorder: 'rgba(79,70,229,0.22)',
    mobileSocialBg:     'rgba(79,70,229,0.05)',
    mobileSocialColor:  'rgba(30,27,75,0.55)',
    mobileCtaBg:        'linear-gradient(135deg,#4f46e5,#7c3aed)',
    mobileCtaC:         '#ffffff',
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@300;400;500;700&display=swap');
        .nav-font  { font-family:'Syne',sans-serif; }
        .mono-font { font-family:'JetBrains Mono',monospace; }

        @keyframes shimmerLogo {
          0%   { background-position:-200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulseRing {
          0%   { transform:scale(0.8); opacity:1; }
          100% { transform:scale(2);   opacity:0; }
        }
        @keyframes scanline {
          0%   { transform:translateY(-100%); }
          100% { transform:translateY(400%);  }
        }
        .logo-shimmer {
          background-size:200% auto;
          -webkit-background-clip:text; background-clip:text;
          -webkit-text-fill-color:transparent;
          animation:shimmerLogo 4s linear infinite;
        }
        .nav-ul::before {
          content:''; position:absolute; bottom:-2px; left:0;
          width:0; height:1px; transition:width .3s ease;
        }
        .nav-ul:hover::before { width:100%; }
        .mob-ul::after {
          content:''; position:absolute; left:0; bottom:0;
          width:0; height:1px; transition:width .4s ease;
        }
        .mob-ul:hover::after { width:100%; }
      `}</style>

      <motion.nav
        ref={navRef}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="nav-font fixed top-0 left-0 right-0 z-50"
      >
        {/* Glass background on scroll */}
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: navOpacity,
            background: tk.navBg,
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            borderBottom: `1px solid ${tk.navBorder}`,
          }}
        />

        {/* Top accent bar */}
        <motion.div
          className="absolute top-0 left-0 h-[1.5px]"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }}
          style={{ background: tk.topBar }}
        />

        {/* Scanline */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.04]">
          <div className="absolute w-full h-8" style={{
            background: `linear-gradient(transparent,${tk.scanline},transparent)`,
            animation: 'scanline 6s linear infinite',
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">

            {/* Logo */}
         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"
          >
            MS
          </motion.div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, y: -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  onHoverStart={() => setHoveredItem(item.name)}
                  onHoverEnd={() => setHoveredItem(null)}
                  onClick={() => scrollToSection(item.href, item.name)}
                  className="nav-ul relative px-4 py-2 group"
                >
                  <style>{`.nav-ul::before{background:${tk.underline}}`}</style>

                  <AnimatePresence>
                    {hoveredItem === item.name && (
                      <motion.div
                        layoutId="nav-hover-bg"
                        className="absolute inset-0 rounded-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ background: tk.hoverBg, border: `1px solid ${tk.hoverBd}` }}
                        transition={{ duration: 0.15 }}
                      />
                    )}
                  </AnimatePresence>

                  <div className="relative flex flex-col items-start">
                    <span className="mono-font text-[9px] tracking-widest mb-0.5 transition-colors duration-200"
                      style={{ color: hoveredItem === item.name ? tk.numHover : tk.numDefault }}>
                      {item.number}
                    </span>
                    <span className="text-[13px] font-semibold tracking-wider transition-colors duration-200"
                      style={{ color: activeItem === item.name ? tk.labelActive : tk.labelDefault }}>
                      {item.name}
                    </span>
                  </div>

                  {activeItem === item.name && (
                    <motion.div
                      layoutId="active-indicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ background: tk.activeDot, boxShadow: tk.activeShadow }}
                    />
                  )}
                </motion.button>
              ))}

              <div className="w-px h-6 mx-2" style={{ background: tk.divider }} />

              {/* ── GitHub button ── */}
              <motion.a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.9 }}
                onHoverStart={() => setHoveredSocial('github')}
                onHoverEnd={() => setHoveredSocial(null)}
                className="w-9 h-9 flex items-center justify-center rounded-sm transition-all duration-200 cursor-pointer"
                style={{
                  border: `1px solid ${hoveredSocial === 'github' ? tk.ghHoverBorder : tk.socialBorder}`,
                  background: hoveredSocial === 'github' ? tk.ghHoverBg : tk.socialBg,
                  color:      hoveredSocial === 'github' ? tk.ghHoverColor : tk.socialColor,
                  boxShadow:  hoveredSocial === 'github' ? tk.ghHoverShadow : 'none',
                }}
              >
                <GitHubIcon size={15} />
              </motion.a>

              {/* ── LinkedIn button ── */}
              <motion.a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.9 }}
                onHoverStart={() => setHoveredSocial('linkedin')}
                onHoverEnd={() => setHoveredSocial(null)}
                className="w-9 h-9 flex items-center justify-center rounded-sm transition-all duration-200 cursor-pointer"
                style={{
                  border: `1px solid ${hoveredSocial === 'linkedin' ? tk.liHoverBorder : tk.socialBorder}`,
                  background: hoveredSocial === 'linkedin' ? tk.liHoverBg : tk.socialBg,
                  color:      hoveredSocial === 'linkedin' ? tk.liHoverColor : tk.socialColor,
                  boxShadow:  hoveredSocial === 'linkedin' ? tk.liHoverShadow : 'none',
                }}
              >
                <LinkedInIcon size={15} />
              </motion.a>

              <div className="w-px h-6 mx-2" style={{ background: tk.divider }} />

              {/* Theme toggle */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.65 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className="w-9 h-9 flex items-center justify-center rounded-sm transition-all duration-200"
                style={{ border: `1px solid ${tk.ctrlBorder}`, background: tk.ctrlBg, color: tk.ctrlColor }}
              >
                <AnimatePresence mode="wait">
                  {isDark ? (
                    <motion.div key="sun" initial={{ rotate:-90,opacity:0 }} animate={{ rotate:0,opacity:1 }} exit={{ rotate:90,opacity:0 }} transition={{ duration:0.2 }}>
                      <Sun className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <motion.div key="moon" initial={{ rotate:90,opacity:0 }} animate={{ rotate:0,opacity:1 }} exit={{ rotate:-90,opacity:0 }} transition={{ duration:0.2 }}>
                      <Moon className="h-4 w-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Hire Me CTA */}
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => scrollToSection('#contact', 'Contact')}
                className="mono-font ml-2 px-5 py-2 text-[11px] tracking-widest font-bold rounded-sm relative overflow-hidden transition-all duration-200"
                style={{ background: tk.ctaBg, color: tk.ctaColor, boxShadow: tk.ctaShadow }}
              >
                <span className="relative z-10">HIRE ME</span>
                <motion.div className="absolute inset-0 bg-white/15"
                  initial={{ x:'-100%' }} whileHover={{ x:'100%' }} transition={{ duration:0.4 }} />
              </motion.button>
            </div>

            {/* Mobile controls */}
            <div className="md:hidden flex items-center gap-2">
              <motion.button whileTap={{ scale:0.9 }}
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className="w-9 h-9 flex items-center justify-center rounded-sm"
                style={{ border:`1px solid ${tk.ctrlBorder}`, background:tk.ctrlBg, color:tk.ctrlColor }}>
                <AnimatePresence mode="wait">
                  {isDark ? (
                    <motion.div key="sun" initial={{ rotate:-90,opacity:0 }} animate={{ rotate:0,opacity:1 }} exit={{ rotate:90,opacity:0 }}><Sun className="h-4 w-4" /></motion.div>
                  ) : (
                    <motion.div key="moon" initial={{ rotate:90,opacity:0 }} animate={{ rotate:0,opacity:1 }} exit={{ rotate:-90,opacity:0 }}><Moon className="h-4 w-4" /></motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              <motion.button whileTap={{ scale:0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-9 h-9 flex items-center justify-center rounded-sm"
                style={{ border:`1px solid ${tk.ctrlBorder}`, background:tk.ctrlBg, color:tk.ctrlColor }}>
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div key="x" initial={{ rotate:-90,opacity:0 }} animate={{ rotate:0,opacity:1 }} exit={{ rotate:90,opacity:0 }} transition={{ duration:0.2 }}><X className="h-4 w-4" /></motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate:90,opacity:0 }} animate={{ rotate:0,opacity:1 }} exit={{ rotate:-90,opacity:0 }} transition={{ duration:0.2 }}><Menu className="h-4 w-4" /></motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity:0, height:0 }}
              animate={{ opacity:1, height:'auto' }}
              exit={{ opacity:0, height:0 }}
              transition={{ duration:0.4, ease:[0.16,1,0.3,1] }}
              className="md:hidden relative overflow-hidden"
              style={{ background: tk.mobileBg, borderTop: `1px solid ${tk.mobileBd}` }}
            >
              <div className="absolute inset-0 opacity-[0.025]" style={{
                backgroundImage: `linear-gradient(${tk.mobileGrid} 1px,transparent 1px),linear-gradient(90deg,${tk.mobileGrid} 1px,transparent 1px)`,
                backgroundSize: '40px 40px',
              }} />
              <div className="relative px-4 py-6 space-y-1">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    initial={{ opacity:0, x:-24 }}
                    animate={{ opacity:1, x:0 }}
                    transition={{ delay:index*0.06, ease:[0.16,1,0.3,1] }}
                    onClick={() => scrollToSection(item.href, item.name)}
                    className="mob-ul relative w-full flex items-center justify-between px-3 py-3.5 group"
                  >
                    <style>{`.mob-ul::after{background:linear-gradient(90deg,${tk.mobileLabelA},transparent)}`}</style>
                    <div className="flex items-center gap-4">
                      <span className="mono-font text-[10px] tracking-widest" style={{ color: tk.mobileNum }}>{item.number}</span>
                      <span className="text-base font-semibold tracking-wider transition-colors duration-200"
                        style={{ color: activeItem === item.name ? tk.mobileLabelA : tk.mobileLabelD }}>
                        {item.name}
                      </span>
                    </div>
                    <div className="w-4 h-px" style={{ background: tk.mobileDash }} />
                  </motion.button>
                ))}

                {/* Mobile social row */}
                <motion.div
                  initial={{ opacity:0, y:8 }}
                  animate={{ opacity:1, y:0 }}
                  transition={{ delay:0.3 }}
                  className="flex items-center gap-3 px-3 pt-4 pb-1"
                >
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 flex-1 py-2.5 rounded-sm transition-all duration-200"
                    style={{
                      border: `1px solid ${tk.mobileSocialBorder}`,
                      background: tk.mobileSocialBg,
                      color: tk.mobileSocialColor,
                    }}
                  >
                    <GitHubIcon size={14} />
                    <span className="mono-font text-[10px] tracking-widest font-medium">GITHUB</span>
                  </a>
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 flex-1 py-2.5 rounded-sm transition-all duration-200"
                    style={{
                      border: `1px solid ${tk.mobileSocialBorder}`,
                      background: tk.mobileSocialBg,
                      color: tk.mobileSocialColor,
                    }}
                  >
                    <LinkedInIcon size={14} />
                    <span className="mono-font text-[10px] tracking-widest font-medium">LINKEDIN</span>
                  </a>
                </motion.div>

                <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.38 }} className="pt-3">
                  <button
                    onClick={() => scrollToSection('#contact','Contact')}
                    className="mono-font w-full py-3 text-[11px] tracking-widest font-bold rounded-sm"
                    style={{ background: tk.mobileCtaBg, color: tk.mobileCtaC }}
                  >
                    HIRE ME →
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}