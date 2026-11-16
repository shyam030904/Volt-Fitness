import { useEffect } from 'react';
import { ArrowLeft, Home } from 'lucide-react';
import FullGallery from '../components/Gallery/FullGallery';

export default function GalleryPage({ onNavigateHome }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Back Link & Breadcrumb Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-12 border-b border-zinc-800/80 pb-6">
          <button
            type="button"
            onClick={onNavigateHome}
            className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-300 hover:text-black bg-zinc-900/90 hover:bg-[#AAFF00] border border-zinc-800 hover:border-[#AAFF00] transition-all duration-300 w-fit cursor-pointer shadow-md hover:shadow-[0_0_15px_rgba(170,255,0,0.4)]"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Main Website</span>
          </button>

          <div className="flex items-center gap-3 text-xs text-zinc-400 uppercase tracking-widest font-mono">
            <span className="text-zinc-500">Volt Fitness</span>
            <span>/</span>
            <span className="text-[#AAFF00] font-bold">Official Gallery</span>
          </div>
        </div>

        {/* Page Hero Header */}
        <div className="mb-10 sm:mb-14">
          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight leading-[0.9]"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            VOLT FITNESS <span style={{ color: '#AAFF00' }}>GALLERY</span>
          </h1>

          <div className="mt-4 w-24 h-1 bg-[#AAFF00]" />

          <div className="mt-5 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              Step inside our world-class training facility. Browse high-resolution photography of our plate-loaded machines, free weights arenas, cardio decks, and luxury recovery amenities.
            </p>
          </div>
        </div>

        {/* The Full Gallery Component */}
        <FullGallery />

        {/* Bottom Back Button & Call to Action */}
        <div className="mt-20 pt-12 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3
              className="text-2xl sm:text-3xl font-bold uppercase text-white tracking-wide"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Ready to Train at <span style={{ color: '#AAFF00' }}>Volt Fitness</span>?
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1">
              Join today or visit our front desk for a complimentary walkthrough.
            </p>
          </div>

          <button
            type="button"
            onClick={onNavigateHome}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm bg-[#AAFF00] text-black hover:bg-[#CCFF44] shadow-[0_0_20px_rgba(170,255,0,0.4)] transition-all duration-300 cursor-pointer transform hover:scale-105"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            <Home className="w-5 h-5 text-black" />
            <span>Return to Homepage</span>
          </button>
        </div>
      </div>

      {/* Floating Back to Home Pill for Mobile */}
      <div className="fixed bottom-6 right-6 z-40 sm:hidden">
        <button
          type="button"
          onClick={onNavigateHome}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-black/90 text-[#AAFF00] border border-[#AAFF00] shadow-[0_0_20px_rgba(170,255,0,0.5)] backdrop-blur-md text-xs font-bold uppercase tracking-wider cursor-pointer"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          <ArrowLeft className="w-4 h-4 text-[#AAFF00]" />
          <span>Home</span>
        </button>
      </div>
    </div>
  );
}
