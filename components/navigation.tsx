'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Moon, Sun, Menu, X } from 'lucide-react';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
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

  const scrollToSection = (href: string, name: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
    setActiveItem(name);
  };

  // ── Design tokens per theme ────────────────────────────────────────────────
  const tk = {
    navBg:         isDark ? 'rgba(5,5,10,0.88)'         : 'rgba(248,250,255,0.9)',
    navBorder:     isDark ? 'rgba(255,255,255,0.05)'     : 'rgba(79,70,229,0.1)',
    topBar:        isDark
      ? 'linear-gradient(90deg,transparent,#e2ff5d,#00e5ff,#ff6b9d,transparent)'
      : 'linear-gradient(90deg,transparent,#4f46e5,#0284c7,#059669,transparent)',
    scanline:      isDark ? 'rgba(255,255,255,0.15)'     : 'rgba(79,70,229,0.07)',
    // logo
    logoBorder:    isDark ? 'rgba(255,255,255,0.1)'      : 'rgba(79,70,229,0.18)',
    logoBg:        isDark ? 'rgba(255,255,255,0.03)'     : 'rgba(79,70,229,0.04)',
    logoRing:      isDark ? '#e2ff5d44'                  : '#4f46e544',
    logoDot:       isDark ? '#e2ff5d'                    : '#4f46e5',
    logoDotShadow: isDark ? '0 0 6px 2px #e2ff5d88'     : '0 0 6px 2px #4f46e566',
    logoGrad:      isDark
      ? 'linear-gradient(135deg,#e2ff5d 0%,#00e5ff 50%,#ff6b9d 100%)'
      : 'linear-gradient(135deg,#1e1b4b 0%,#4f46e5 40%,#0284c7 70%,#059669 100%)',
    logoVer:       isDark ? 'rgba(255,255,255,0.18)'     : 'rgba(30,30,80,0.28)',
    // items
    numDefault:    isDark ? 'rgba(255,255,255,0.2)'      : 'rgba(30,30,80,0.3)',
    numHover:      isDark ? 'rgba(226,255,93,0.45)'      : 'rgba(79,70,229,0.55)',
    labelDefault:  isDark ? 'rgba(255,255,255,0.55)'     : 'rgba(30,30,80,0.55)',
    labelActive:   isDark ? '#e2ff5d'                    : '#4f46e5',
    hoverBg:       isDark ? 'rgba(226,255,93,0.05)'      : 'rgba(79,70,229,0.05)',
    hoverBd:       isDark ? 'rgba(226,255,93,0.12)'      : 'rgba(79,70,229,0.14)',
    underline:     isDark
      ? 'linear-gradient(90deg,#e2ff5d,#00e5ff)'
      : 'linear-gradient(90deg,#4f46e5,#0284c7)',
    activeDot:     isDark ? '#e2ff5d'                    : '#4f46e5',
    activeShadow:  isDark ? '0 0 6px 2px #e2ff5d88'     : '0 0 6px 2px #4f46e566',
    divider:       isDark ? 'rgba(255,255,255,0.1)'      : 'rgba(30,30,80,0.1)',
    // controls
    ctrlBorder:    isDark ? 'rgba(255,255,255,0.1)'      : 'rgba(30,30,80,0.1)',
    ctrlBg:        isDark ? 'rgba(255,255,255,0.03)'     : 'rgba(30,30,80,0.03)',
    ctrlColor:     isDark ? 'rgba(255,255,255,0.5)'      : 'rgba(30,30,80,0.5)',
    // CTA
    ctaBg:         isDark ? '#e2ff5d'                    : 'linear-gradient(135deg,#4f46e5,#7c3aed)',
    ctaColor:      isDark ? '#050510'                    : '#ffffff',
    ctaShadow:     isDark ? 'none'                       : '0 4px 16px rgba(79,70,229,0.35)',
    // mobile
    mobileBg:      isDark ? 'rgba(5,5,10,0.97)'          : 'rgba(248,250,255,0.97)',
    mobileBd:      isDark ? 'rgba(255,255,255,0.06)'     : 'rgba(79,70,229,0.08)',
    mobileGrid:    isDark ? 'rgba(255,255,255,0.4)'      : 'rgba(79,70,229,0.35)',
    mobileNum:     isDark ? 'rgba(255,255,255,0.2)'      : 'rgba(30,30,80,0.28)',
    mobileLabelD:  isDark ? 'rgba(255,255,255,0.65)'     : 'rgba(30,30,80,0.6)',
    mobileLabelA:  isDark ? '#e2ff5d'                    : '#4f46e5',
    mobileDash:    isDark ? 'rgba(255,255,255,0.18)'     : 'rgba(30,30,80,0.14)',
    mobileCtaBg:   isDark ? '#e2ff5d'                    : 'linear-gradient(135deg,#4f46e5,#7c3aed)',
    mobileCtaC:    isDark ? '#050510'                    : '#ffffff',
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
              style={{ x: springX, y: springY }}
              onMouseMove={e => {
                const r = e.currentTarget.getBoundingClientRect();
                logoX.set((e.clientX - r.left - r.width / 2) * 0.3);
                logoY.set((e.clientY - r.top - r.height / 2) * 0.3);
              }}
              onMouseLeave={() => { logoX.set(0); logoY.set(0); }}
              whileTap={{ scale: 0.92 }}
              className="relative cursor-pointer select-none"
            >
              <div className="absolute inset-0 rounded-sm" style={{
                animation: 'pulseRing 2.5s ease-out infinite',
                border: `1px solid ${tk.logoRing}`,
              }} />
              <div className="relative flex items-center gap-2 px-3 py-1.5 rounded-sm"
                style={{ border: `1px solid ${tk.logoBorder}`, background: tk.logoBg }}>
                <div className="w-1.5 h-1.5 rounded-full"
                  style={{ background: tk.logoDot, boxShadow: tk.logoDotShadow }} />
                <span className="logo-shimmer text-xl font-extrabold tracking-widest"
                  style={{ background: tk.logoGrad }}>MS</span>
                <span className="mono-font text-[9px] tracking-wider self-end mb-0.5"
                  style={{ color: tk.logoVer }}>v2.0</span>
              </div>
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
                  {/* Dynamic underline colour */}
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

              {/* Theme toggle */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
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
                transition={{ delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
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

                <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.35 }} className="pt-4">
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