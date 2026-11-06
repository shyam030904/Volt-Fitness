import { useRef, useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: MapPin,
    label: 'Address',
    value: 'Volt Fitness,Dee Kay Estate, Lake Rd, near Bhandup, Police Station, Mumbai, Maharashtra 400078',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 74003 34222',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@voltfitness.in',
  },
  {
    icon: Clock,
    label: 'Hours',
    value: 'Mon-Sat: 5:00 AM - 12:00 PM\nSunday: 6:00 AM - 12:00 PM',
  },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const headingRef = useRef(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from(leftRef.current, {
        opacity: 0,
        x: -60,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: leftRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from(rightRef.current, {
        opacity: 0,
        x: 60,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: rightRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const inputClasses =
    'w-full px-4 py-3.5 rounded-lg text-white text-sm placeholder-gray-500 outline-none transition-all duration-300 border focus:border-[#AAFF00] focus:shadow-[0_0_0_1px_#AAFF00]';

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: '#0A0A0A' }}
    >
      {/* Section Heading */}
      <div ref={headingRef} className="max-w-7xl mx-auto mb-14 md:mb-20">
        <h2
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase leading-[0.9] tracking-tight"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          <span className="text-white">GET IN</span>
          <br />
          <span style={{ color: '#AAFF00' }}>TOUCH</span>
        </h2>
        <div
          className="mt-4 w-20 h-1"
          style={{ backgroundColor: '#AAFF00' }}
        />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Left - Contact Info */}
        <div ref={leftRef} className="space-y-8">
          <p
            className="text-gray-400 text-base md:text-lg leading-relaxed max-w-md"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Ready to transform your fitness journey? Reach out to us and our
            team will get back to you within 24 hours.
          </p>

          <div className="space-y-6">
            {contactInfo.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-start gap-4 group">
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-300 group-hover:bg-[#AAFF00]/10"
                    style={{
                      backgroundColor: '#111111',
                      border: '1px solid #1A1A1A',
                    }}
                  >
                    <Icon
                      size={20}
                      className="transition-colors duration-300"
                      style={{ color: '#AAFF00' }}
                    />
                  </div>
                  <div>
                    <h4
                      className="text-white text-sm font-semibold uppercase tracking-wider mb-1"
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      {item.label}
                    </h4>
                    <p
                      className="text-gray-400 text-sm leading-relaxed whitespace-pre-line"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {item.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right - Contact Form */}
        <div ref={rightRef}>
          <form
            onSubmit={handleSubmit}
            className="rounded-xl p-6 md:p-8 space-y-5"
            style={{
              backgroundColor: '#111111',
              border: '1px solid #1A1A1A',
            }}
          >
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className={inputClasses}
                style={{
                  backgroundColor: '#0A0A0A',
                  borderColor: '#1A1A1A',
                  fontFamily: "'Inter', sans-serif",
                }}
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className={inputClasses}
                style={{
                  backgroundColor: '#0A0A0A',
                  borderColor: '#1A1A1A',
                  fontFamily: "'Inter', sans-serif",
                }}
              />
            </div>

            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone"
                value={form.phone}
                onChange={handleChange}
                className={inputClasses}
                style={{
                  backgroundColor: '#0A0A0A',
                  borderColor: '#1A1A1A',
                  fontFamily: "'Inter', sans-serif",
                }}
              />
            </div>

            <div>
              <textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                className={`${inputClasses} resize-none`}
                style={{
                  backgroundColor: '#0A0A0A',
                  borderColor: '#1A1A1A',
                  fontFamily: "'Inter', sans-serif",
                }}
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-lg text-black font-bold uppercase tracking-[0.15em] text-sm transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_25px_rgba(170,255,0,0.3)]"
              style={{
                backgroundColor: '#AAFF00',
                fontFamily: "'Oswald', sans-serif",
              }}
            >
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
