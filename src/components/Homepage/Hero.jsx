import { useEffect, useRef } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '1000+', label: 'Members' },
  { value: '10+', label: 'Expert Trainers' },
  { value: '4+', label: 'Years' },
  { value: '20/7', label: 'Access' },
];

export default function Hero() {
  const sectionRef = useRef(null);
  const unleashScrollRef = useRef(null);
  const unleashEnterRef = useRef(null);
  const yourScrollRef = useRef(null);
  const yourEnterRef = useRef(null);
  const powerScrollRef = useRef(null);
  const powerEnterRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef([]);
  const statsRef = useRef([]);
  const scrollIndicatorRef = useRef(null);
  const shapesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial entrance: each word transitions in from corners, then subtitle, buttons, stats
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        delay: 0.2,
      });

      // UNLEASH comes from top-left corner
      tl.from(unleashEnterRef.current, {
        x: -300,
        y: -150,
        opacity: 0,
        duration: 1,
      })
        // YOUR comes from top-right corner
        .from(
          yourEnterRef.current,
          {
            x: 300,
            y: -150,
            opacity: 0,
            duration: 1,
          },
          '-=0.8'
        )
        // POWER comes from bottom-right corner
        .from(
          powerEnterRef.current,
          {
            x: 300,
            y: 150,
            opacity: 0,
            duration: 1,
          },
          '-=0.8'
        )
        // Subtitle fades up
        .from(
          subtitleRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
          },
          '-=0.5'
        )
        // Buttons stagger in
        .from(
          buttonsRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.15,
          },
          '-=0.3'
        )
        // Stats slide up
        .from(
          statsRef.current,
          {
            y: 40,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
          },
          '-=0.2'
        )
        // Scroll indicator
        .from(
          scrollIndicatorRef.current,
          {
            opacity: 0,
            duration: 0.5,
          },
          '-=0.2'
        );

      // 2. Scroll exit & return (vice versa):
      // When scrolling down, words move aside towards corners.
      // When scrolling back up, words return into their exact place.
      const scrollTriggerConfig = {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom 40%',
        scrub: 1,
      };

      gsap.to(unleashScrollRef.current, {
        x: -350,
        y: -120,
        opacity: 0,
        ease: 'none',
        scrollTrigger: scrollTriggerConfig,
      });

      gsap.to(yourScrollRef.current, {
        x: 300,
        y: -120,
        opacity: 0,
        ease: 'none',
        scrollTrigger: scrollTriggerConfig,
      });

      gsap.to(powerScrollRef.current, {
        x: 350,
        y: 120,
        opacity: 0,
        ease: 'none',
        scrollTrigger: scrollTriggerConfig,
      });

      // Floating geometric shapes continuous animation
      shapesRef.current.forEach((shape, i) => {
        if (!shape) return;
        gsap.fromTo(
          shape,
          { opacity: 0, scale: 0.5 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            delay: 0.5 + i * 0.2,
            ease: 'power2.out',
          }
        );
        gsap.to(shape, {
          y: `random(-20, 20)`,
          x: `random(-10, 10)`,
          rotation: `random(-15, 15)`,
          duration: `random(3, 5)`,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.3,
        });
      });

      // Bouncing scroll indicator
      gsap.to(scrollIndicatorRef.current, {
        y: 8,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A]"
    >
      {/* === Background Layers === */}

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(170,255,0,0.06)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(170,255,0,0.03)_0%,transparent_50%)]" />

      {/* Top vignette */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/60 to-transparent" />
      {/* Bottom vignette */}
      <div className="absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-t from-black/80 to-transparent" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(170,255,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(170,255,0,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Diagonal lines accent */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, transparent, transparent 80px, rgba(170,255,0,0.2) 80px, rgba(170,255,0,0.2) 81px)',
        }}
      />

      {/* === Floating Geometric Shapes === */}
      {/* Shape 1 — large outlined square */}
      <div
        ref={(el) => (shapesRef.current[0] = el)}
        className="absolute top-[15%] right-[10%] w-24 h-24 md:w-36 md:h-36 border border-[#AAFF00]/10 rotate-45 pointer-events-none"
      />
      {/* Shape 2 — small filled square */}
      <div
        ref={(el) => (shapesRef.current[1] = el)}
        className="absolute top-[25%] left-[8%] w-6 h-6 md:w-8 md:h-8 bg-[#AAFF00]/10 rotate-12 pointer-events-none"
      />
      {/* Shape 3 — circle */}
      <div
        ref={(el) => (shapesRef.current[2] = el)}
        className="absolute bottom-[30%] right-[15%] w-16 h-16 md:w-20 md:h-20 rounded-full border border-[#AAFF00]/8 pointer-events-none"
      />
      {/* Shape 4 — triangle via border trick */}
      <div
        ref={(el) => (shapesRef.current[3] = el)}
        className="absolute top-[60%] left-[12%] w-0 h-0 pointer-events-none"
        style={{
          borderLeft: '15px solid transparent',
          borderRight: '15px solid transparent',
          borderBottom: '26px solid rgba(170,255,0,0.07)',
        }}
      />
      {/* Shape 5 — dashed ring */}
      <div
        ref={(el) => (shapesRef.current[4] = el)}
        className="absolute top-[10%] left-[40%] w-14 h-14 md:w-20 md:h-20 rounded-full border border-dashed border-[#AAFF00]/5 pointer-events-none"
      />
      {/* Shape 6 — horizontal line */}
      <div
        ref={(el) => (shapesRef.current[5] = el)}
        className="absolute bottom-[45%] left-[5%] w-20 md:w-32 h-px bg-gradient-to-r from-transparent via-[#AAFF00]/15 to-transparent pointer-events-none"
      />

      {/* === Main Content === */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 md:pt-40 pb-16 flex flex-col items-center text-center">
        {/* Heading with words flying in from corners */}
        <h1 className="leading-[0.9] mb-6 overflow-visible select-none" style={{ fontFamily: "'Oswald', sans-serif" }}>
          <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white tracking-tight">
            <span ref={unleashScrollRef} className="block will-change-transform">
              <span ref={unleashEnterRef} className="block will-change-transform">
                UNLEASH
              </span>
            </span>
          </span>
          <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight">
            <span ref={yourScrollRef} className="inline-block mr-3 sm:mr-6 will-change-transform">
              <span ref={yourEnterRef} className="inline-block text-white will-change-transform">
                YOUR
              </span>
            </span>
            <span ref={powerScrollRef} className="inline-block will-change-transform">
              <span
                ref={powerEnterRef}
                className="inline-block text-[#AAFF00] drop-shadow-[0_0_30px_rgba(170,255,0,0.3)] will-change-transform"
              >
                POWER
              </span>
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="max-w-xl text-sm sm:text-base md:text-lg text-gray-400 mb-8 sm:mb-10 leading-relaxed tracking-wide px-2"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Transform your body. Elevate your mind. Dominate your goals.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-14 md:mb-20 w-full sm:w-auto max-w-xs sm:max-w-none">
          <a
            ref={(el) => (buttonsRef.current[0] = el)}
            href="#membership"
            className="w-full sm:w-auto justify-center group flex items-center gap-2 px-8 py-3.5 bg-[#AAFF00] text-black text-sm font-bold tracking-wider uppercase rounded-sm hover:bg-[#c4ff4d] hover:shadow-[0_0_30px_rgba(170,255,0,0.35)] transition-all duration-300"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            START YOUR JOURNEY
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
          <a
            ref={(el) => (buttonsRef.current[1] = el)}
            href="#programs"
            className="w-full sm:w-auto justify-center group flex items-center gap-2 px-8 py-3.5 border border-white/20 text-white text-sm font-bold tracking-wider uppercase rounded-sm hover:border-[#AAFF00]/50 hover:text-[#AAFF00] transition-all duration-300"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            EXPLORE PROGRAMS
            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </a>
        </div>

        {/* Stats Bar */}
        <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              ref={(el) => (statsRef.current[i] = el)}
              className={`flex flex-col items-center py-5 md:py-6 ${
                i < stats.length - 1 ? 'md:border-r md:border-[#1A1A1A]' : ''
              }`}
            >
              <span
                className="text-3xl md:text-4xl font-bold text-[#AAFF00] mb-1"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                {stat.value}
              </span>
              <span
                className="text-xs md:text-sm text-gray-500 tracking-wider uppercase"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-10"
      >
        <span
          className="text-[10px] tracking-[0.25em] uppercase text-gray-600"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Scroll
        </span>
        <ChevronDown className="w-5 h-5 text-[#AAFF00]/60" />
      </div>
    </section>
  );
}
