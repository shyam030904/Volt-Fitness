import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Flame, Target, UserCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const programs = [
  {
    icon: Zap,
    title: 'Strength Training',
    desc: 'Build raw power with structured progressive overload programs and premium free-weight stations.',
    duration: '60 min',
    sessions: '5x / week',
  },
  {
    icon: Flame,
    title: 'HIIT Cardio',
    desc: 'Torch calories and boost endurance with high-intensity interval circuits designed for max burn.',
    duration: '45 min',
    sessions: '4x / week',
  },
  {
    icon: Target,
    title: 'CrossFit',
    desc: 'Functional fitness at its peak — varied, high-intensity movements that build total-body athleticism.',
    duration: '50 min',
    sessions: '5x / week',
  },
  {
    icon: UserCheck,
    title: 'Personal Training',
    desc: 'One-on-one coaching tailored to your goals, body, and schedule — results guaranteed.',
    duration: 'Custom',
    sessions: 'Flexible',
  },
];

const programsList = [...programs, ...programs, ...programs, ...programs];

export default function Programs() {
  const sectionRef = useRef(null);
  const heading1ScrollRef = useRef(null);
  const heading1EnterRef = useRef(null);
  const heading2ScrollRef = useRef(null);
  const heading2EnterRef = useRef(null);
  const trackRef = useRef(null);
  const ctaRef = useRef(null);

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

      gsap.from(ctaRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 92%',
        },
      });
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
      id="programs"
      ref={sectionRef}
      className="relative scroll-mt-24 sm:scroll-mt-28 md:scroll-mt-32 bg-[#0A0A0A] py-24 md:py-32 overflow-hidden"
    >
      {/* Decorative glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#AAFF00]/[0.03] blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Heading */}
        <div className="mb-14 text-center overflow-visible select-none">
          <h2 className="font-['Oswald',sans-serif] text-5xl sm:text-6xl lg:text-7xl font-bold uppercase leading-[1.05] tracking-tight">
            <span className="block">
              <span ref={heading1ScrollRef} className="block will-change-transform">
                <span ref={heading1EnterRef} className="block text-white will-change-transform">
                  Training
                </span>
              </span>
            </span>
            <span className="block mt-1">
              <span ref={heading2ScrollRef} className="block will-change-transform">
                <span ref={heading2EnterRef} className="block text-[#AAFF00] will-change-transform">
                  Programs
                </span>
              </span>
            </span>
          </h2>
          <p className="mt-5 max-w-xl mx-auto font-['Inter',sans-serif] text-neutral-400 text-base sm:text-lg leading-relaxed">
            Signature training programs built by elite coaches to match every goal,
            every level, every ambition.
          </p>
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
          className="flex gap-5 sm:gap-6 w-max will-change-transform px-4"
        >
          {programsList.map((prog, i) => {
            const Icon = prog.icon;
            return (
              <div
                key={`${prog.title}-${i}`}
                className="w-[280px] sm:w-[340px] md:w-[380px] shrink-0 group relative bg-gradient-to-b from-[#141414] to-[#111111] border border-[#1A1A1A] rounded-2xl p-6 sm:p-7 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_40px_rgba(170,255,0,0.07)] hover:border-[#AAFF00]/30 overflow-hidden"
              >
                {/* Hover top accent bar */}
                <span className="absolute top-0 left-0 w-full h-[3px] bg-[#AAFF00] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-[#AAFF00]/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-[#AAFF00]/20">
                  <Icon className="w-6 h-6 text-[#AAFF00]" strokeWidth={1.8} />
                </div>

                {/* Title */}
                <h3 className="font-['Oswald',sans-serif] text-xl text-white uppercase tracking-wide">
                  {prog.title}
                </h3>

                {/* Description */}
                <p className="font-['Inter',sans-serif] text-sm text-neutral-400 leading-relaxed flex-1">
                  {prog.desc}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs font-['Inter',sans-serif] text-neutral-500 border-t border-[#1A1A1A] pt-4 mt-auto">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#AAFF00]" />
                    {prog.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#AAFF00]/60" />
                    {prog.sessions}
                  </span>
                </div>

                {/* Learn More */}
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1 font-['Inter',sans-serif] text-sm text-[#AAFF00] font-medium tracking-wide transition-all duration-200 group-hover:gap-2 mt-1"
                >
                  Learn More
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </a>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Bottom CTA */}
        <div
          ref={ctaRef}
          className="mt-14 text-center flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <p className="font-['Inter',sans-serif] text-neutral-400 text-base">
            Can&apos;t find what you&apos;re looking for?{' '}
            <span className="text-neutral-300">Talk to our trainers.</span>
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-[#AAFF00] text-[#0A0A0A] font-['Oswald',sans-serif] text-sm font-semibold uppercase tracking-widest px-7 py-3.5 rounded-full transition-all duration-300 hover:shadow-[0_0_24px_rgba(170,255,0,0.35)] hover:scale-105"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
}
