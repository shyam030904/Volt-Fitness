import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  {
    label: 'STRENGTH ZONE',
    gradient: 'linear-gradient(135deg, #1a1a1a 0%, #0d1a00 50%, #1a1a1a 100%)',
    span: 'sm:row-span-2',
    accent: 'radial-gradient(circle at 30% 70%, rgba(170,255,0,0.15) 0%, transparent 60%)',
  },
  {
    label: 'CARDIO DECK',
    gradient: 'linear-gradient(225deg, #111111 0%, #1a1a0a 60%, #0a0a0a 100%)',
    span: '',
    accent: 'radial-gradient(circle at 80% 20%, rgba(170,255,0,0.12) 0%, transparent 50%)',
  },
  {
    label: 'BOXING RING',
    gradient: 'linear-gradient(180deg, #141414 0%, #0f1a05 100%)',
    span: '',
    accent: 'radial-gradient(circle at 50% 90%, rgba(170,255,0,0.18) 0%, transparent 55%)',
  },
  {
    label: 'YOGA STUDIO',
    gradient: 'linear-gradient(45deg, #0a0a0a 0%, #151510 50%, #111111 100%)',
    span: 'sm:row-span-2',
    accent: 'radial-gradient(circle at 70% 40%, rgba(170,255,0,0.1) 0%, transparent 50%)',
  },
  {
    label: 'RECOVERY SUITE',
    gradient: 'linear-gradient(315deg, #1a1a1a 0%, #0a1a00 100%)',
    span: '',
    accent: 'radial-gradient(circle at 20% 30%, rgba(170,255,0,0.14) 0%, transparent 45%)',
  },
  {
    label: 'FREE WEIGHTS',
    gradient: 'linear-gradient(160deg, #111111 0%, #1a1a0d 40%, #0a0a0a 100%)',
    span: 'sm:row-span-2',
    accent: 'radial-gradient(circle at 60% 80%, rgba(170,255,0,0.16) 0%, transparent 50%)',
  },
  {
    label: 'TRAINING FLOOR',
    gradient: 'linear-gradient(200deg, #0a0a0a 0%, #121a08 60%, #141414 100%)',
    span: '',
    accent: 'radial-gradient(circle at 40% 50%, rgba(170,255,0,0.12) 0%, transparent 55%)',
  },
  {
    label: 'COMPETITION AREA',
    gradient: 'linear-gradient(90deg, #141414 0%, #0d1a00 50%, #1a1a1a 100%)',
    span: '',
    accent: 'radial-gradient(circle at 50% 20%, rgba(170,255,0,0.2) 0%, transparent 50%)',
  },
];

export default function Gallery() {
  const sectionRef = useRef(null);
  const heading1ScrollRef = useRef(null);
  const heading1EnterRef = useRef(null);
  const heading2ScrollRef = useRef(null);
  const heading2EnterRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading entrance from corners
      gsap.from(heading1EnterRef.current, {
        x: -240,
        y: -80,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      });
      gsap.from(heading2EnterRef.current, {
        x: 240,
        y: 80,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      });

      // Heading scroll exit & return
      const headingScrollConfig = {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom 40%',
        scrub: 1,
      };
      gsap.to(heading1ScrollRef.current, {
        x: -280,
        y: -60,
        opacity: 0,
        ease: 'none',
        scrollTrigger: headingScrollConfig,
      });
      gsap.to(heading2ScrollRef.current, {
        x: 280,
        y: 60,
        opacity: 0,
        ease: 'none',
        scrollTrigger: headingScrollConfig,
      });

      const cards = cardsRef.current.filter(Boolean);
      gsap.from(cards, {
        opacity: 0,
        y: 60,
        scale: 0.95,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative scroll-mt-24 sm:scroll-mt-28 md:scroll-mt-32 py-20 md:py-28 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: '#0A0A0A' }}
    >
      {/* Section Heading */}
      <div className="max-w-7xl mx-auto mb-14 md:mb-20 overflow-visible select-none">
        <h2
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase leading-[0.9] tracking-tight"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          <span className="block">
            <span ref={heading1ScrollRef} className="block will-change-transform">
              <span ref={heading1EnterRef} className="block text-white will-change-transform">
                OUR
              </span>
            </span>
          </span>
          <span className="block mt-1">
            <span ref={heading2ScrollRef} className="block will-change-transform">
              <span ref={heading2EnterRef} className="block will-change-transform" style={{ color: '#AAFF00' }}>
                GALLERY
              </span>
            </span>
          </span>
        </h2>
        <div
          className="mt-4 w-20 h-1"
          style={{ backgroundColor: '#AAFF00' }}
        />
      </div>

      {/* Masonry Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[160px] sm:auto-rows-[200px] md:auto-rows-[220px] gap-3 md:gap-4">
        {galleryItems.map((item, i) => (
          <div
            key={item.label}
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
            className={`group relative overflow-hidden rounded-lg cursor-pointer ${item.span}`}
            style={{
              background: item.gradient,
              border: '1px solid #1A1A1A',
            }}
          >
            {/* Accent glow */}
            <div
              className="absolute inset-0 transition-opacity duration-500 opacity-60 group-hover:opacity-100"
              style={{ background: item.accent }}
            />

            {/* Grid pattern overlay */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(170,255,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(170,255,0,0.3) 1px, transparent 1px)',
                backgroundSize: '30px 30px',
              }}
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/50 transition-all duration-500 group-hover:bg-black/20" />

            {/* Corner accents */}
            <div
              className="absolute top-0 left-0 w-8 h-[2px] transition-all duration-500 group-hover:w-12"
              style={{ backgroundColor: '#AAFF00' }}
            />
            <div
              className="absolute top-0 left-0 w-[2px] h-8 transition-all duration-500 group-hover:h-12"
              style={{ backgroundColor: '#AAFF00' }}
            />
            <div
              className="absolute bottom-0 right-0 w-8 h-[2px] transition-all duration-500 group-hover:w-12"
              style={{ backgroundColor: '#AAFF00' }}
            />
            <div
              className="absolute bottom-0 right-0 w-[2px] h-8 transition-all duration-500 group-hover:h-12"
              style={{ backgroundColor: '#AAFF00' }}
            />

            {/* Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
              <span
                className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-bold uppercase tracking-[0.15em] opacity-90 sm:opacity-0 translate-y-0 sm:translate-y-4 transition-all duration-500 sm:group-hover:opacity-100 sm:group-hover:translate-y-0"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                {item.label}
              </span>
              <div
                className="mt-2 w-0 h-[2px] transition-all duration-700 group-hover:w-12"
                style={{ backgroundColor: '#AAFF00' }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
