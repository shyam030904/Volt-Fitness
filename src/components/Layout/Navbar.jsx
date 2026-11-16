import { useState, useEffect } from 'react';
import { Home, Zap, Dumbbell, Image as ImageIcon, Calendar, MapPin, ArrowRight, Menu, X } from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Home', href: '#home', icon: Home },
  { id: 'programs', label: 'Programs', href: '#programs', icon: Zap },
  { id: 'trainers', label: 'Trainers', href: '#trainers', icon: Dumbbell },
  { id: 'gallery', label: 'Gallery', href: '#gallery', icon: ImageIcon },
  { id: 'events', label: 'Events', href: '#events', icon: Calendar },
];

export default function Navbar({ currentPage = 'home', onNavigate }) {
  const [activeTab, setActiveTab] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const effectiveActiveTab = currentPage === 'gallery' ? 'gallery' : activeTab;

  // Sync active section based on scroll position (only on home page)
  useEffect(() => {
    if (currentPage === 'gallery') return;
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const section = document.querySelector(navItems[i].href);
        if (section && section.offsetTop <= scrollPos) {
          setActiveTab(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const handleNavClick = (item, e) => {
    if (item.id === 'gallery') {
      if (e) e.preventDefault();
      onNavigate?.('gallery');
      setActiveTab('gallery');
      setIsMobileMenuOpen(false);
      return;
    }

    if (currentPage === 'gallery') {
      if (e) e.preventDefault();
      onNavigate?.('home', item.href);
      setActiveTab(item.id);
      setIsMobileMenuOpen(false);
      return;
    }

    setActiveTab(item.id);
    setIsMobileMenuOpen(false);
  };

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="fixed top-3 sm:top-4 left-0 right-0 z-50 flex justify-center items-center pointer-events-none px-3 sm:px-6">
        <nav
          aria-label="Volt Fitness Navigation"
          className="volt-glass-capsule pointer-events-auto relative w-full max-w-[1340px] h-[60px] sm:h-[72px] rounded-full flex items-center justify-between select-none px-4 sm:px-8 lg:px-[52px]"
        >
          {/* Laser neon arcs at left & right ends */}
          <div aria-hidden="true" className="capsule-laser-rim-left" />
          <div aria-hidden="true" className="capsule-laser-rim-right" />

          {/* ================= LOGO ================= */}
          <div className="flex items-center shrink-0 pl-1 sm:pl-0" style={{ zIndex: 2 }}>
            <a
              href="#home"
              onClick={(e) => {
                if (currentPage === 'gallery') {
                  e.preventDefault();
                  onNavigate?.('home', '#home');
                  setActiveTab('home');
                }
              }}
              aria-label="Volt Fitness Home"
              className="flex items-center group focus:outline-none select-none"
            >
              <img
                src="/images/volt-brand-exact.png"
                alt="Volt Fitness Logo"
                className="w-auto h-8 sm:h-12 max-w-[125px] sm:max-w-[185px] object-contain transition-transform duration-300 group-hover:scale-105"
                style={{
                  mixBlendMode: 'screen',
                  filter: 'drop-shadow(0 0 8px rgba(57, 255, 20, 0.4))',
                }}
              />
            </a>
          </div>

          {/* Divider 1 */}
          <div
            aria-hidden="true"
            className="hidden lg:block shrink-0"
            style={{
              width: '1px',
              height: '40px',
              background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.25) 40%, rgba(255,255,255,0.25) 60%, transparent 100%)',
              marginLeft: '24px',
              marginRight: '24px',
            }}
          />

          {/* ================= NAV LINKS ================= */}
          <ul
            className="hidden lg:flex items-center shrink-0"
            style={{
              gap: '8px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '15px',
            }}
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = effectiveActiveTab === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(item, e)}
                    className={`nav-tab-link flex items-center rounded-full select-none whitespace-nowrap ${
                      isActive
                        ? 'active-nav-glow'
                        : 'text-[#cfcfcf] hover:text-[#39FF14]'
                    }`}
                    style={{
                      paddingLeft: '18px',
                      paddingRight: '18px',
                      paddingTop: '9px',
                      paddingBottom: '9px',
                      gap: '8px',
                      fontWeight: 500,
                      letterSpacing: '0.025em',
                    }}
                  >
                    <Icon
                      className="shrink-0"
                      style={{
                        width: '20px',
                        height: '20px',
                        strokeWidth: 1.5,
                      }}
                    />
                    <span>{item.label}</span>
                  </a>
                </li>
              );
            })}
            <li>
              <a
                href="https://maps.app.goo.gl/tV6vhNM8EXDfP2hi6"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-tab-link flex items-center rounded-full select-none whitespace-nowrap text-[#cfcfcf] hover:text-[#39FF14]"
                style={{
                  paddingLeft: '18px',
                  paddingRight: '18px',
                  paddingTop: '9px',
                  paddingBottom: '9px',
                  gap: '8px',
                  fontWeight: 500,
                  letterSpacing: '0.025em',
                }}
              >
                <MapPin
                  className="shrink-0"
                  style={{
                    width: '20px',
                    height: '20px',
                    strokeWidth: 1.5,
                  }}
                />
                <span>Location</span>
              </a>
            </li>
          </ul>

          {/* Divider 2 */}
          <div
            aria-hidden="true"
            className="hidden lg:block shrink-0"
            style={{
              width: '1px',
              height: '40px',
              background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.25) 40%, rgba(255,255,255,0.25) 60%, transparent 100%)',
              marginLeft: '24px',
              marginRight: '24px',
            }}
          />

          {/* ================= JOIN NOW CTA & MOBILE TRIGGER ================= */}
          <div className="flex items-center gap-3 shrink-0" style={{ zIndex: 2 }}>
            <a
              href="#contact"
              className="cta-neon-capsule group rounded-full hidden sm:flex items-center cursor-pointer select-none"
              style={{
                paddingLeft: '28px',
                paddingRight: '24px',
                paddingTop: '11px',
                paddingBottom: '11px',
                gap: '10px',
                fontFamily: "'Inter', sans-serif",
                fontSize: '15px',
                fontWeight: 600,
                letterSpacing: '0.04em',
              }}
            >
              <span>Join Now</span>
              <ArrowRight
                className="transition-transform duration-200 group-hover:translate-x-1.5"
                style={{
                  width: '18px',
                  height: '18px',
                  strokeWidth: 2.2,
                }}
              />
            </a>

            {/* Mobile Menu Hamburger */}
            <button
              className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center text-neutral-200 hover:text-[#39FF14] bg-white/5 hover:bg-[#39FF14]/15 border border-white/10 hover:border-[#39FF14]/40 transition-all duration-200 focus:outline-none cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* ================= RIGHT-SIDE MOBILE DRAWER ================= */}
      {/* Backdrop overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-[60] bg-black/75 backdrop-blur-sm transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Slide-in drawer on the right side of the phone */}
      <aside
        aria-label="Mobile Navigation Drawer"
        className={`lg:hidden fixed top-0 right-0 bottom-0 z-[70] w-[82vw] max-w-[320px] sm:max-w-[360px] bg-[#0A120C]/95 backdrop-blur-2xl border-l border-[#39FF14]/30 shadow-[-12px_0_40px_rgba(0,0,0,0.85),-2px_0_20px_rgba(57,255,20,0.18)] flex flex-col justify-between transition-transform duration-300 ease-out select-none ${
          isMobileMenuOpen ? 'translate-x-0 pointer-events-auto' : 'translate-x-full pointer-events-none'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <a
            href="#home"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center"
          >
            <img
              src="/images/volt-brand-exact.png"
              alt="Volt Fitness Logo"
              className="w-auto h-7 object-contain"
              style={{
                mixBlendMode: 'screen',
                filter: 'drop-shadow(0 0 6px rgba(57, 255, 20, 0.4))',
              }}
            />
          </a>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-[#39FF14] hover:bg-[#39FF14]/10 hover:border-[#39FF14]/40 transition-all duration-200 cursor-pointer"
            aria-label="Close navigation menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Links List */}
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-2">
          <div className="text-[11px] font-mono tracking-widest text-neutral-500 uppercase px-3 pb-2">
            Menu
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = effectiveActiveTab === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(item, e)}
                className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-medium tracking-wide transition-all duration-200 ${
                  isActive
                    ? 'bg-[#39FF14]/15 text-[#39FF14] border border-[#39FF14]/40 shadow-[0_0_15px_rgba(57,255,20,0.2)]'
                    : 'text-neutral-300 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <Icon
                  size={19}
                  className={isActive ? 'text-[#39FF14]' : 'text-neutral-400'}
                />
                <span>{item.label}</span>
              </a>
            );
          })}

          <div className="pt-2">
            <a
              href="https://maps.app.goo.gl/tV6vhNM8EXDfP2hi6"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-medium tracking-wide text-neutral-300 hover:text-white hover:bg-white/5 border border-transparent transition-all duration-200"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <MapPin size={19} className="text-neutral-400" />
              <span>Location</span>
            </a>
          </div>
        </div>

        {/* Drawer Footer CTA */}
        <div className="p-5 border-t border-white/10 bg-black/40 space-y-3">
          <a
            href="#contact"
            onClick={(e) => {
              setIsMobileMenuOpen(false);
              if (currentPage === 'gallery') {
                e.preventDefault();
                onNavigate?.('home', '#contact');
              }
            }}
            className="cta-neon-capsule flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl text-sm font-bold tracking-widest uppercase text-center cursor-pointer"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            <span>Join Now</span>
            <ArrowRight size={16} />
          </a>

          <p className="text-[10px] text-center text-neutral-500 font-mono tracking-wider uppercase">
            Volt Fitness • 20/7 Access
          </p>
        </div>
      </aside>
    </>
  );
}
