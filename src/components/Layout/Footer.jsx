import { MapPin, Phone, Mail } from 'lucide-react';

const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const TwitterIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const YoutubeIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
    <polygon points="10 15 15 12 10 9 10 15"/>
  </svg>
);

const socialLinks = [
  { icon: InstagramIcon, label: 'Instagram' },
  { icon: FacebookIcon, label: 'Facebook' },
  { icon: TwitterIcon, label: 'Twitter' },
  { icon: YoutubeIcon, label: 'Youtube' },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#050505' }}>
      {/* Top border */}
      <div className="w-full h-[2px]" style={{ backgroundColor: '#AAFF00' }} />

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start justify-between">
          {/* Column 1 - Brand */}
          <div className="max-w-md">
            <div className="flex items-center gap-1 mb-3">
              <span className="text-xl">⚡</span>
              <h3
                className="text-xl font-bold uppercase tracking-wider text-white"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                VOLT{' '}
                <span style={{ color: '#AAFF00' }}>FITNESS</span>
              </h3>
            </div>
            <p
              className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-4"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Unleash your potential with cutting-edge equipment, expert
              trainers, and an electrifying atmosphere designed to push your
              limits.
            </p>
            <div className="flex items-center gap-2.5">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href="https://www.instagram.com/voltfitness_bhandup?utm_source=ig_web_button_share_sheet&obrf=ZDNlZDc0MzIxNw=="
                    aria-label={social.label}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 transition-all duration-300 hover:text-[#AAFF00] hover:bg-[#AAFF00]/10"
                    style={{
                      backgroundColor: '#111111',
                      border: '1px solid #1A1A1A',
                    }}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2 - Contact */}
          <div className="md:justify-self-end">
            <h4
              className="text-white text-xs sm:text-sm font-bold uppercase tracking-[0.2em] mb-3"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Contact
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin
                  size={15}
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: '#AAFF00' }}
                />
                <span
                  className="text-gray-500 leading-relaxed max-w-sm"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Volt Fitness, Dee Kay Estate, Lake Rd, near Bhandup Police Station, Mumbai, Maharashtra 400078
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone
                  size={15}
                  className="flex-shrink-0"
                  style={{ color: '#AAFF00' }}
                />
                <span
                  className="text-gray-500"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  +91 74003 34222
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail
                  size={15}
                  className="flex-shrink-0"
                  style={{ color: '#AAFF00' }}
                />
                <span
                  className="text-gray-500"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  voltfitness22@gmail.com
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="border-t px-4 sm:px-6 lg:px-8"
        style={{
          borderColor: '#1A1A1A',
          backgroundColor: '#0A0A0A',
        }}
      >
        <div className="max-w-7xl mx-auto py-3.5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p
            className="text-gray-600 text-xs"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            © 2024 VOLT FITNESS. All rights reserved.
          </p>
          <p
            className="text-gray-600 text-xs"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Designed with ⚡
          </p>
        </div>
      </div>
    </footer>
  );
}
