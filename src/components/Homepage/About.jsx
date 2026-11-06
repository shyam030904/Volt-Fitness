import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Dumbbell, Users, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Trophy,
    title: 'Championship Training',
    desc: 'Programs designed by elite-level coaches to push your limits.',
  },
  {
    icon: Dumbbell,
    title: 'Premium Equipment',
    desc: 'State-of-the-art machines and free weights from top brands.',
  },
  {
    icon: Users,
    title: 'Expert Community',
    desc: 'Train alongside driven athletes who elevate each other.',
  },
  {
    icon: Clock,
    title: '24/7 Access',
    desc: 'No excuses — the gym is open whenever you are ready.',
  },
];

export default function About() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const cardsRef = useRef([]);
  const quoteRef = useRef(null);
  const accentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(accentRef.current, {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

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

      gsap.from(textRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.9,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });

      gsap.from(cardsRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: 'top 85%',
        },
      });

      gsap.from(quoteRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: quoteRef.current,
          start: 'top 90%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-[#0A0A0A] py-24 md:py-32 overflow-hidden"
    >
      {/* Subtle radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#AAFF00]/[0.03] blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Accent line */}
        <div
          ref={accentRef}
          className="w-16 h-[3px] bg-[#AAFF00] mb-6 rounded-full"
        />

        {/* Heading */}
        <h2
          ref={headingRef}
          className="font-['Oswald',sans-serif] text-5xl sm:text-6xl lg:text-7xl font-bold uppercase leading-[1.05] tracking-tight mb-16"
        >
          <span className="text-white">About</span>
          <br />
          <span className="text-[#AAFF00]">Volt Fitness</span>
        </h2>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left — Description */}
          <div ref={textRef} className="space-y-6">
            <p className="font-['Inter',sans-serif] text-lg sm:text-xl text-neutral-300 leading-relaxed">
              VOLT FITNESS is more than a gym — it's a premium training
              destination engineered for those who refuse to settle. Every
              square foot is designed to fuel performance, from our
              state-of-the-art equipment floor to our dedicated functional
              training zones.
            </p>
            <p className="font-['Inter',sans-serif] text-base text-neutral-400 leading-relaxed">
              Backed by world-class trainers and an unwavering commitment to
              excellence, we deliver a fitness experience that matches your
              ambition. Whether you're chasing a personal record or building
              a lasting habit, VOLT is where transformation begins.
            </p>

            {/* Quote */}
            <blockquote
              ref={quoteRef}
              className="mt-10 border-l-2 border-[#AAFF00] pl-5"
            >
              <p className="font-['Oswald',sans-serif] text-2xl sm:text-3xl text-white/90 uppercase tracking-wide italic">
                "Where strength meets determination"
              </p>
            </blockquote>
          </div>

          {/* Right — Feature grid */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  ref={(el) => (cardsRef.current[i] = el)}
                  className="group bg-[#111111] border border-[#1A1A1A] rounded-2xl p-6 flex flex-col items-start gap-4 transition-all duration-300 hover:border-[#AAFF00]/30 hover:shadow-[0_0_30px_rgba(170,255,0,0.06)] hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#AAFF00]/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-[#AAFF00]/20">
                    <Icon className="w-6 h-6 text-[#AAFF00]" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-['Oswald',sans-serif] text-lg text-white uppercase tracking-wide leading-snug">
                    {feat.title}
                  </h3>
                  <p className="font-['Inter',sans-serif] text-sm text-neutral-500 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
