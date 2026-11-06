import { useState, useEffect } from 'react';
import { Home, Dumbbell, Crown, Image as ImageIcon, Mail, MapPin, ArrowRight, Menu, X } from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Home', href: '#home', icon: Home },
  { id: 'trainers', label: 'Trainers', href: '#trainers', icon: Dumbbell },
  { id: 'membership', label: 'Membership', href: '#membership', icon: Crown },
  { id: 'gallery', label: 'Gallery', href: '#gallery', icon: ImageIcon },
  { id: 'contact', label: 'Contact', href: '#contact', icon: Mail },
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sync active section based on scroll position
  useEffect(() => {
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
  }, []);

  const handleNavClick = (item) => {
    setActiveTab(item.id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center items-center pointer-events-none px-4 sm:px-6">
      <nav
        aria-label="Volt Fitness Navigation"
        className="volt-glass-capsule pointer-events-auto relative w-full max-w-[1340px] h-[72px] rounded-full flex items-center justify-between select-none"
        style={{ paddingLeft: '52px', paddingRight: '52px' }}
      >
        {/* Laser neon arcs at left & right ends */}
        <div aria-hidden="true" className="capsule-laser-rim-left" />
        <div aria-hidden="true" className="capsule-laser-rim-right" />

        {/* ================= LOGO ================= */}
        <div className="flex items-center shrink-0" style={{ zIndex: 2 }}>
          <a
            href="#home"
            aria-label="Volt Fitness Home"
            className="flex items-center group focus:outline-none select-none"
          >
            <img
              src="/images/volt-brand-exact.png"
              alt="Volt Fitness Logo"
              className="w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              style={{
                height: '48px',
                maxWidth: '185px',
                mixBlendMode: 'screen',
                filter: 'drop-shadow(0 0 8px rgba(57, 255, 20, 0.4))',
              }}
            />
          </a>
        </div>

        {/* Divider 1 */}
        <div
          aria-hidden="true"
          className="hidden md:block shrink-0"
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
            const isActive = activeTab === item.id;
            return (
              <li key={item.id}>
                <a
                  href={item.href}
                  onClick={() => handleNavClick(item)}
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
          className="hidden md:block shrink-0"
          style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.25) 40%, rgba(255,255,255,0.25) 60%, transparent 100%)',
            marginLeft: '24px',
            marginRight: '24px',
          }}
        />

        {/* ================= JOIN NOW CTA ================= */}
        <div className="flex items-center shrink-0" style={{ zIndex: 2 }}>
          <a
            href="#membership"
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
            className="lg:hidden text-neutral-300 hover:text-[#39FF14] focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            style={{ padding: '8px' }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden pointer-events-auto fixed left-4 right-4 rounded-3xl flex flex-col z-50 volt-glass-capsule"
          style={{
            top: '100px',
            padding: '24px',
            gap: '12px',
            background: 'rgba(10, 18, 12, 0.96)',
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={() => handleNavClick(item)}
                className={`flex items-center rounded-full text-base font-medium transition-colors ${
                  isActive
                    ? 'active-nav-glow'
                    : 'text-neutral-300 hover:text-white'
                }`}
                style={{
                  padding: '12px 20px',
                  gap: '14px',
                }}
              >
                <Icon
                  size={20}
                  className={isActive ? 'text-[#39FF14]' : 'text-neutral-400'}
                />
                <span>{item.label}</span>
              </a>
            );
          })}

          <a
            href="https://maps.app.goo.gl/tV6vhNM8EXDfP2hi6"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center rounded-full text-base font-medium transition-colors text-neutral-300 hover:text-white"
            style={{
              padding: '12px 20px',
              gap: '14px',
            }}
          >
            <MapPin
              size={20}
              className="text-neutral-400"
            />
            <span>Location</span>
          </a>

          <a
            href="#membership"
            onClick={() => setIsMobileMenuOpen(false)}
            className="cta-neon-capsule flex items-center justify-center rounded-full text-base font-semibold tracking-wide"
            style={{
              marginTop: '8px',
              padding: '14px 24px',
              gap: '10px',
            }}
          >
            <span>Join Now</span>
            <ArrowRight size={18} />
          </a>
        </div>
      )}
    </header>
  );
}
