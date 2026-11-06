import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Flame, Target, Leaf, Swords, UserCheck } from 'lucide-react';

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
    icon: Leaf,
    title: 'Yoga & Flexibility',
    desc: 'Restore balance and mobility with guided flows that enhance recovery and mental clarity.',
    duration: '60 min',
    sessions: '3x / week',
  },
  {
    icon: Swords,
    title: 'Boxing',
    desc: 'Sharpen reflexes and unleash power with coached boxing sessions on heavy bags and pads.',
    duration: '45 min',
    sessions: '4x / week',
  },
  {
    icon: UserCheck,
    title: 'Personal Training',
    desc: 'One-on-one coaching tailored to your goals, body, and schedule — results guaranteed.',
    duration: 'Custom',
    sessions: 'Flexible',
  },
];

export default function Programs() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      gsap.from(cardsRef.current, {
        y: 70,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: 'top 85%',
        },
      });

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

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="programs"
      ref={sectionRef}
      className="relative bg-[#0A0A0A] py-24 md:py-32 overflow-hidden"
    >
      {/* Decorative glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#AAFF00]/[0.03] blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Heading */}
        <div ref={headingRef} className="mb-16 text-center">
          <h2 className="font-['Oswald',sans-serif] text-5xl sm:text-6xl lg:text-7xl font-bold uppercase leading-[1.05] tracking-tight">
            <span className="text-white">Training</span>
            <br />
            <span className="text-[#AAFF00]">Programs</span>
          </h2>
          <p className="mt-5 max-w-xl mx-auto font-['Inter',sans-serif] text-neutral-400 text-base sm:text-lg leading-relaxed">
            Six signature programs built by elite coaches to match every goal,
            every level, every ambition.
          </p>
        </div>

        {/* Program Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {programs.map((prog, i) => {
            const Icon = prog.icon;
            return (
              <div
                key={prog.title}
                ref={(el) => (cardsRef.current[i] = el)}
                className="group relative bg-gradient-to-b from-[#141414] to-[#111111] border border-[#1A1A1A] rounded-2xl p-7 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_40px_rgba(170,255,0,0.07)] hover:border-[#AAFF00]/30 overflow-hidden"
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
                  href="#"
                  className="inline-flex items-center gap-1 font-['Inter',sans-serif] text-sm text-[#AAFF00] font-medium tracking-wide transition-all duration-200 group-hover:gap-2 mt-1"
                >
                  Learn More
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </a>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div
          ref={ctaRef}
          className="mt-16 text-center flex flex-col sm:flex-row items-center justify-center gap-5"
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
