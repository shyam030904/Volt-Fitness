import { useRef, useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Web3Forms access key constant
const WEB3FORMS_ACCESS_KEY = '600b2bb2-2a2a-41df-b4fd-0ac5db8092e2';

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
    value: 'voltfitness22@gmail.com.in',
  },
  {
    icon: Clock,
    label: 'Hours',
    value: 'Mon-Sat: 5:00 AM - 12:00 PM\nSunday: 5:30 AM - 11:59 am',
  },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const heading1ScrollRef = useRef(null);
  const heading1EnterRef = useRef(null);
  const heading2ScrollRef = useRef(null);
  const heading2EnterRef = useRef(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [botcheck, setBotcheck] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status.message) {
      setStatus({ type: '', message: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Spam honeypot check
    if (botcheck) {
      setStatus({
        type: 'error',
        message: 'Something went wrong. Please try again or call us at +91 74003 34222.',
      });
      return;
    }

    // Validation
    const trimmedName = form.name.trim();
    const trimmedEmail = form.email.trim();
    const trimmedPhone = form.phone.trim();
    const trimmedMessage = form.message.trim();

    if (!trimmedName) {
      setStatus({
        type: 'error',
        message: 'Please enter your name.',
      });
      return;
    }

    if (!trimmedEmail) {
      setStatus({
        type: 'error',
        message: 'Please enter your email.',
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setStatus({
        type: 'error',
        message: 'Please enter a valid email address.',
      });
      return;
    }

    if (trimmedPhone && !/^[0-9+\-\s]+$/.test(trimmedPhone)) {
      setStatus({
        type: 'error',
        message: 'Please enter a valid phone number (digits, spaces, + and - only).',
      });
      return;
    }

    if (!trimmedMessage) {
      setStatus({
        type: 'error',
        message: 'Please enter your message.',
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: 'New enquiry from Volt Fitness website',
          from_name: 'Volt Fitness Website',
          name: trimmedName,
          email: trimmedEmail,
          phone: trimmedPhone,
          message: trimmedMessage,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({
          type: 'success',
          message: "Thanks! We'll get back to you within 24 hours.",
        });
        setForm({
          name: '',
          email: '',
          phone: '',
          message: '',
        });
        setBotcheck(false);
      } else {
        setStatus({
          type: 'error',
          message: 'Something went wrong. Please try again or call us at +91 74003 34222.',
        });
      }
    } catch {
      setStatus({
        type: 'error',
        message: 'Something went wrong. Please try again or call us at +91 74003 34222.',
      });
    } finally {
      setIsSubmitting(false);
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
      className="relative scroll-mt-24 sm:scroll-mt-28 md:scroll-mt-32 pt-28 sm:pt-36 md:pt-40 pb-20 md:pb-28 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: '#0A0A0A' }}
    >
      {/* Section Heading */}
      <div className="max-w-7xl mx-auto mb-10 md:mb-14 overflow-visible select-none">
        <h2
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase leading-[0.9] tracking-tight"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          <span className="block">
            <span ref={heading1ScrollRef} className="block will-change-transform">
              <span ref={heading1EnterRef} className="block text-white will-change-transform">
                GET IN
              </span>
            </span>
          </span>
          <span className="block mt-1">
            <span ref={heading2ScrollRef} className="block will-change-transform">
              <span ref={heading2EnterRef} className="block will-change-transform" style={{ color: '#AAFF00' }}>
                TOUCH
              </span>
            </span>
          </span>
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
            noValidate
            className="rounded-xl p-6 md:p-8 space-y-5"
            style={{
              backgroundColor: '#111111',
              border: '1px solid #1A1A1A',
            }}
          >
            {/* Honeypot checkbox for spam protection */}
            <input
              type="checkbox"
              name="botcheck"
              checked={botcheck}
              onChange={(e) => setBotcheck(e.target.checked)}
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />

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
              disabled={isSubmitting}
              className={`w-full py-4 rounded-lg font-bold uppercase tracking-[0.15em] text-sm transition-all duration-300 ${
                isSubmitting
                  ? 'opacity-70 cursor-not-allowed'
                  : 'hover:brightness-110 hover:shadow-[0_0_25px_rgba(170,255,0,0.3)] cursor-pointer'
              }`}
              style={{
                backgroundColor: '#AAFF00',
                color: '#000000',
                fontFamily: "'Oswald', sans-serif",
              }}
            >
              {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
            </button>

            {status.message && (
              <p
                role="status"
                aria-live="polite"
                className="text-center text-sm font-medium pt-1"
                style={{
                  color: status.type === 'success' ? '#AAFF00' : '#FF4D4D',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {status.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
