import { useRef, useEffect, useState } from 'react';
// Inline SVG Social Icons
const InstagramIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const TwitterIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const trainers = [
  {
    name: 'Alex "Thunder" Reeves',
    initials: 'AR',
    title: 'Head Strength Coach',
    experience: '12 Years Experience',
    gradient: 'from-[#AAFF00]/20 via-[#0A0A0A] to-[#111111]',
  },
  {
    name: 'Priya Sharma',
    initials: 'PS',
    title: 'Yoga & Wellness Director',
    experience: '8 Years Experience',
    gradient: 'from-[#AAFF00]/15 via-[#141414] to-[#111111]',
  },
  {
    name: 'Marcus "Iron" Johnson',
    initials: 'MJ',
    title: 'CrossFit Lead',
    experience: '10 Years Experience',
    gradient: 'from-[#AAFF00]/20 via-[#0A0A0A] to-[#111111]',
  },
  {
    name: 'Sophia Chen',
    initials: 'SC',
    title: 'HIIT & Cardio Specialist',
    experience: '6 Years Experience',
    gradient: 'from-[#AAFF00]/15 via-[#141414] to-[#111111]',
  },
];

const trainersList = [...trainers, ...trainers, ...trainers];

export default function Trainers() {
  const sectionRef = useRef(null);
  const heading1ScrollRef = useRef(null);
  const heading1EnterRef = useRef(null);
  const heading2ScrollRef = useRef(null);
  const heading2EnterRef = useRef(null);
  const trackRef = useRef(null);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const dragOffset = useRef(0);
  const hasMoved = useRef(false);
  const scrollProgress = useRef({ val: -35 });
  const [cursorGrabbing, setCursorGrabbing] = useState(false);

  const updateTransform = () => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(calc(${scrollProgress.current.val}% + ${dragOffset.current}px), 0, 0)`;
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading entrance from corners
      gsap.from(heading1EnterRef.current, {
        x: -240, y: -80, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      });
      gsap.from(heading2EnterRef.current, {
        x: 240, y: 80, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      });

      // Heading scroll exit & return
      const headingScrollConfig = {
        trigger: sectionRef.current, start: 'top top', end: 'bottom 40%', scrub: 1,
      };
      gsap.to(heading1ScrollRef.current, {
        x: -280, y: -60, opacity: 0, ease: 'none', scrollTrigger: headingScrollConfig,
      });
      gsap.to(heading2ScrollRef.current, {
        x: 280, y: 60, opacity: 0, ease: 'none', scrollTrigger: headingScrollConfig,
      });

      // Horizontal scrub: moves left-to-right as the user scrolls down
      gsap.fromTo(
        scrollProgress.current,
        { val: -35 },
        {
          val: 5,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
            invalidateOnRefresh: true,
            onUpdate: () => {
              updateTransform();
            },
          },
        }
      );
    }, sectionRef);

    updateTransform();

    return () => ctx.revert();
  }, []);

  const handleDragStart = (clientX) => {
    isDragging.current = true;
    startX.current = clientX;
    hasMoved.current = false;
    setCursorGrabbing(true);
  };

  const handleDragMove = (clientX) => {
    if (!isDragging.current) return;
    const diff = clientX - startX.current;
    if (Math.abs(diff) > 4) {
      hasMoved.current = true;
    }
    dragOffset.current += diff;
    startX.current = clientX;
    updateTransform();
  };

  const handleDragEnd = () => {
    isDragging.current = false;
    setCursorGrabbing(false);
  };

  const handleClickCapture = (e) => {
    if (hasMoved.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <section
      id="trainers"
      ref={sectionRef}
      className="relative scroll-mt-24 sm:scroll-mt-28 md:scroll-mt-32 bg-[#0A0A0A] py-20 md:py-28 lg:py-32 overflow-hidden"
    >
      {/* Subtle background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#AAFF00]/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-14 md:mb-16 overflow-visible select-none">
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-tight"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            <span className="block">
              <span ref={heading1ScrollRef} className="block will-change-transform">
                <span ref={heading1EnterRef} className="block text-white will-change-transform">
                  OUR EXPERT
                </span>
              </span>
            </span>
            <span className="block mt-1">
              <span ref={heading2ScrollRef} className="block will-change-transform">
                <span ref={heading2EnterRef} className="block text-[#AAFF00] will-change-transform">
                  TRAINERS
                </span>
              </span>
            </span>
          </h2>
          <div className="mt-4 mx-auto w-16 h-1 bg-[#AAFF00]/60 rounded-full" />
        </div>
      </div>

      {/* Horizontal Moving Cards Track (Left to Right on Scroll & Draggable with Cursor) */}
      <div
        className={`relative w-full overflow-hidden py-4 select-none ${
          cursorGrabbing ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => handleDragMove(e.clientX)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
        onTouchEnd={handleDragEnd}
        onClickCapture={handleClickCapture}
      >
        {/* Left & Right Edge Vignette Fades */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10" />

        <div
          ref={trackRef}
          className="flex gap-6 lg:gap-8 w-max will-change-transform px-4"
        >
          {trainersList.map((trainer, i) => (
            <div
              key={`${trainer.name}-${i}`}
              className="w-[280px] sm:w-[320px] shrink-0 group relative bg-[#111111] border border-[#1A1A1A] rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:border-[#AAFF00]/50 hover:shadow-[0_0_30px_rgba(170,255,0,0.1)]"
            >
              {/* Trainer Image Placeholder */}
              <div
                className={`relative h-72 sm:h-80 bg-gradient-to-b ${trainer.gradient} flex items-center justify-center overflow-hidden`}
              >
                {/* Decorative pattern overlay */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 2px 2px, #AAFF00 1px, transparent 0)',
                    backgroundSize: '24px 24px',
                  }}
                />

                {/* Initials */}
                <span
                  className="relative text-6xl sm:text-7xl font-bold text-[#AAFF00]/30 group-hover:text-[#AAFF00]/50 transition-colors duration-500 select-none"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  {trainer.initials}
                </span>

                {/* Bottom fade */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#111111] to-transparent" />
              </div>

              {/* Card Content */}
              <div className="p-5 pt-2">
                <h3
                  className="text-lg font-bold text-white uppercase tracking-wide truncate"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  {trainer.name}
                </h3>
                <p
                  className="text-[#AAFF00] text-sm font-medium mt-1"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {trainer.title}
                </p>
                <p
                  className="text-white/40 text-xs mt-1 uppercase tracking-wider"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {trainer.experience}
                </p>

                {/* Social Icons */}
                <div className="flex gap-3 mt-4 pt-4 border-t border-[#1A1A1A]">
                  <a
                    href="#"
                    aria-label={`${trainer.name} Instagram`}
                    className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-[#AAFF00]/10 hover:text-[#AAFF00] transition-all duration-300"
                  >
                    <InstagramIcon size={16} />
                  </a>
                  <a
                    href="#"
                    aria-label={`${trainer.name} Twitter`}
                    className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-[#AAFF00]/10 hover:text-[#AAFF00] transition-all duration-300"
                  >
                    <TwitterIcon size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
