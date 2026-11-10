import { useRef, useEffect } from 'react';
import { Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: 'STARTER',
    price: '1,999',
    popular: false,
    features: [
      'Gym Access',
      'Basic Equipment',
      'Locker Facility',
      '1 Group Class/Week',
    ],
  },
  {
    name: 'PRO',
    price: '3,499',
    popular: true,
    features: [
      'Everything in Starter',
      'All Group Classes',
      'Personal Training 2x/Month',
      'Nutrition Consultation',
      'Sauna Access',
    ],
  },
  {
    name: 'ELITE',
    price: '5,999',
    popular: false,
    features: [
      'Everything in Pro',
      'Unlimited Personal Training',
      'Priority Booking',
      'VIP Locker',
      'Recovery Suite',
      'Guest Passes',
    ],
  },
];

export default function Membership() {
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

      gsap.from(cardsRef.current, {
        y: 80,
        opacity: 0,
        scale: 0.95,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="membership"
      ref={sectionRef}
      className="relative scroll-mt-24 sm:scroll-mt-28 md:scroll-mt-32 bg-[#0A0A0A] py-20 md:py-28 lg:py-32 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#AAFF00]/[0.03] rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-14 md:mb-20 overflow-visible select-none">
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-tight"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            <span className="block">
              <span ref={heading1ScrollRef} className="block will-change-transform">
                <span ref={heading1EnterRef} className="block text-white will-change-transform">
                  MEMBERSHIP
                </span>
              </span>
            </span>
            <span className="block mt-1">
              <span ref={heading2ScrollRef} className="block will-change-transform">
                <span ref={heading2EnterRef} className="block text-[#AAFF00] will-change-transform">
                  PLANS
                </span>
              </span>
            </span>
          </h2>
          <div className="mt-4 mx-auto w-16 h-1 bg-[#AAFF00]/60 rounded-full" />
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              ref={(el) => (cardsRef.current[i] = el)}
              className={`relative rounded-2xl overflow-hidden transition-all duration-500 ${
                plan.popular
                  ? 'bg-[#111111] border-2 border-[#AAFF00] shadow-[0_0_40px_rgba(170,255,0,0.12)] md:scale-105 md:-my-4 z-10'
                  : 'bg-[#111111] border border-[#1A1A1A] hover:border-[#AAFF00]/30'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="bg-[#AAFF00] text-[#0A0A0A] text-xs font-bold tracking-widest uppercase text-center py-2.5 px-4"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  MOST POPULAR
                </div>
              )}

              <div className="p-6 sm:p-8">
                {/* Plan Name */}
                <h3
                  className="text-2xl font-bold text-white uppercase tracking-wider"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="mt-4 mb-6 pb-6 border-b border-[#1A1A1A]">
                  <div className="flex items-baseline gap-1">
                    <span
                      className={`text-4xl sm:text-5xl font-bold ${
                        plan.popular ? 'text-[#AAFF00]' : 'text-white'
                      }`}
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      ₹{plan.price}
                    </span>
                    <span
                      className="text-white/40 text-sm ml-1"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      /month
                    </span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3.5 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                          plan.popular
                            ? 'bg-[#AAFF00]/15 text-[#AAFF00]'
                            : 'bg-white/5 text-white/60'
                        }`}
                      >
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span
                        className="text-white/70 text-sm"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={`w-full py-3.5 rounded-xl font-bold text-sm uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                    plan.popular
                      ? 'bg-[#AAFF00] text-[#0A0A0A] hover:bg-[#c5ff4d] hover:shadow-[0_0_25px_rgba(170,255,0,0.3)]'
                      : 'bg-transparent border border-[#AAFF00]/40 text-[#AAFF00] hover:bg-[#AAFF00]/10 hover:border-[#AAFF00]'
                  }`}
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
