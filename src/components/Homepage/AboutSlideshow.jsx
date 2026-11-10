import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const SLIDES = [
  {
    src: '/Red/FullGymView-web.webp',
    fallbackSrc: '/Red/FullGymView.JPG.jpeg',
    title: 'Main Training Floor',
    subtitle: 'Comprehensive training environment with cutting-edge stations',
    tag: 'ARENA VIEW',
  },
  {
    src: '/Red/DumbellArea-web.webp',
    fallbackSrc: '/Red/DumbellArea.JPG.jpeg',
    title: 'Free Weights & Dumbbell Zone',
    subtitle: 'Heavy dumbbells, custom benches, and dedicated lifting floor',
    tag: 'FREE WEIGHTS',
  },
  {
    src: '/Red/LegsArea-web.webp',
    fallbackSrc: '/Red/LegsArea.JPG.jpeg',
    title: 'Leg Power & Machine Deck',
    subtitle: 'Hammer Strength & plate-loaded lower body stations',
    tag: 'LEG ZONE',
  },
  {
    src: '/Red/Legs1-web.webp',
    fallbackSrc: '/Red/Legs1.JPG.jpeg',
    title: 'Specialized Leg Machines',
    subtitle: 'Biomechanically tuned extension, curl, and press units',
    tag: 'STRENGTH',
  },
  {
    src: '/Red/LegsArea2-web.webp',
    fallbackSrc: '/Red/LegsArea2.JPG.jpeg',
    title: 'Lower Body Strength Arena',
    subtitle: 'Squat racks, hack squats, and high-performance machines',
    tag: 'PERFORMANCE',
  },
  {
    src: '/Red/FullView3-web.webp',
    fallbackSrc: '/Red/FullView3.JPG.jpeg',
    title: 'Panoramic Facility View',
    subtitle: 'Spacious high-energy interior built for maximum focus',
    tag: 'GYM TOUR',
  },
];

const AUTO_PLAY_INTERVAL = 3000;

export default function AboutSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const timerRef = useRef(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  const goToSlide = (idx) => {
    setCurrentIndex(idx);
  };

  // Click on slideshow: opens bigger view and stops auto-play
  const handleSlideshowClick = () => {
    setIsPlaying(false);
    setIsLightboxOpen(true);
  };

  // Auto-play timer
  useEffect(() => {
    if (!isPlaying || isLightboxOpen) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(nextSlide, AUTO_PLAY_INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isLightboxOpen, nextSlide, currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'Escape' && isLightboxOpen) {
        setIsLightboxOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, isLightboxOpen]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  const activeSlide = SLIDES[currentIndex];

  return (
    <>
      <div
        onClick={handleSlideshowClick}
        className="group relative w-full h-[450px] sm:h-[520px] lg:h-[580px] xl:h-[620px] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#111111] border border-[#222222] shadow-[0_15px_45px_rgba(0,0,0,0.6)] transition-all duration-500 hover:border-[#AAFF00]/50 hover:shadow-[0_0_45px_rgba(170,255,0,0.15)] select-none cursor-pointer"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Subtle Ambient Glow behind corners */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#AAFF00]/5 blur-3xl rounded-full pointer-events-none" />

        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-10 h-[2px] bg-[#AAFF00] z-20" />
        <div className="absolute top-0 left-0 w-[2px] h-10 bg-[#AAFF00] z-20" />
        <div className="absolute bottom-0 right-0 w-10 h-[2px] bg-[#AAFF00] z-20" />
        <div className="absolute bottom-0 right-0 w-[2px] h-10 bg-[#AAFF00] z-20" />

        {/* Slide Images */}
        <div className="relative w-full h-full">
          {SLIDES.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <div
                key={slide.src}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <img
                  src={slide.src}
                  alt={slide.title}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  onError={(e) => {
                    if (e.target.src !== slide.fallbackSrc) {
                      e.target.src = slide.fallbackSrc;
                    }
                  }}
                  className={`w-full h-full object-cover object-[center_35%] transition-transform duration-1000 ease-out ${
                    isActive ? 'scale-100 group-hover:scale-105' : 'scale-105'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Dark Vignette / Gradient Overlays */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black/90 via-black/30 to-black/30" />

        {/* Top Bar Overlay - Clean, no playback buttons, no zoom, no 06/06 counter */}
        <div className="absolute top-4 sm:top-5 left-4 sm:left-5 z-20 flex items-center pointer-events-none">
          {/* Tag badge */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-semibold tracking-wider uppercase text-white shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#AAFF00] animate-pulse" />
            <span className="font-['Oswald',sans-serif] text-[#AAFF00] tracking-widest text-xs sm:text-sm">
              {activeSlide.tag}
            </span>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          aria-label="Previous Slide"
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/70 hover:bg-[#AAFF00] text-white hover:text-black backdrop-blur-md border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-xl group-hover:opacity-100 sm:opacity-90 cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          aria-label="Next Slide"
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/70 hover:bg-[#AAFF00] text-white hover:text-black backdrop-blur-md border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-xl group-hover:opacity-100 sm:opacity-90 cursor-pointer"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Bottom Content & Indicator Bar */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-5 sm:p-7 flex flex-col gap-3">
          {/* Title & Description with larger font */}
          <div>
            <h3 className="font-['Oswald',sans-serif] text-2xl sm:text-3xl lg:text-4xl font-bold uppercase text-white tracking-wide leading-tight drop-shadow-md">
              {activeSlide.title}
            </h3>
            <p className="font-['Inter',sans-serif] text-xs sm:text-base text-neutral-300 line-clamp-1 mt-1 max-w-lg">
              {activeSlide.subtitle}
            </p>
          </div>

          {/* Dots / Thumbnail Indicators */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              {SLIDES.map((_, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      goToSlide(idx);
                    }}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`relative h-2.5 rounded-full transition-all duration-300 overflow-hidden cursor-pointer ${
                      isActive
                        ? 'w-10 sm:w-12 bg-[#AAFF00]'
                        : 'w-2.5 sm:w-3 bg-white/30 hover:bg-white/60'
                    }`}
                  >
                    {/* Animated progress line for active slide when playing */}
                    {isActive && isPlaying && (
                      <span
                        key={currentIndex}
                        className="absolute inset-0 bg-white/50 animate-slide-progress"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quick label */}
            
          </div>
        </div>
      </div>

      {/* Enlarged Modal View on Click with much bigger font */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-between p-4 sm:p-8 animate-modal-fade"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Header */}
          <div className="w-full max-w-6xl flex items-center justify-between z-50 pt-2 pb-3">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#AAFF00] animate-pulse" />
              <span className="font-['Oswald',sans-serif] text-sm sm:text-base font-bold text-[#AAFF00] tracking-widest uppercase">
                {activeSlide.tag}
              </span>
            </div>

            <button
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Close fullscreen"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-[#AAFF00] text-white hover:text-black flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main enlarged image container */}
          <div
            className="relative max-w-6xl w-full flex-1 flex flex-col items-center justify-center min-h-0 py-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[62vh] sm:max-h-[68vh] flex items-center justify-center">
              <img
                src={activeSlide.fallbackSrc}
                alt={activeSlide.title}
                className="max-w-full max-h-[62vh] sm:max-h-[68vh] object-contain rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.85)]"
              />

              {/* Navigation arrows in enlarged view */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide();
                }}
                aria-label="Previous Slide"
                className="absolute left-2 sm:-left-16 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/75 hover:bg-[#AAFF00] text-white hover:text-black border border-white/10 flex items-center justify-center transition-all duration-300 shadow-2xl cursor-pointer"
              >
                <ChevronLeft className="w-7 h-7 sm:w-8 sm:h-8" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                }}
                aria-label="Next Slide"
                className="absolute right-2 sm:-right-16 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/75 hover:bg-[#AAFF00] text-white hover:text-black border border-white/10 flex items-center justify-center transition-all duration-300 shadow-2xl cursor-pointer"
              >
                <ChevronRight className="w-7 h-7 sm:w-8 sm:h-8" />
              </button>
            </div>

            {/* Much bigger font for title & caption */}
            <div className="text-center mt-4 sm:mt-5 max-w-4xl px-4">
              <h2 className="font-['Oswald',sans-serif] text-3xl sm:text-5xl lg:text-6xl font-bold uppercase text-white tracking-wide leading-tight">
                {activeSlide.title}
              </h2>
              <p className="font-['Inter',sans-serif] text-sm sm:text-xl text-neutral-300 mt-2 max-w-2xl mx-auto">
                {activeSlide.subtitle}
              </p>
            </div>
          </div>

          {/* Lightbox Thumbnail Strip */}
          <div
            className="flex items-center gap-2 max-w-xl overflow-x-auto p-2 bg-black/60 rounded-xl border border-white/10 backdrop-blur-md z-40 mt-1"
            onClick={(e) => e.stopPropagation()}
          >
            {SLIDES.map((slide, idx) => (
              <button
                key={slide.src}
                onClick={() => goToSlide(idx)}
                className={`relative w-16 h-11 sm:w-20 sm:h-13 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                  idx === currentIndex
                    ? 'border-[#AAFF00] scale-105 shadow-[0_0_15px_rgba(170,255,0,0.4)]'
                    : 'border-transparent opacity-50 hover:opacity-100'
                }`}
              >
                <img
                  src={slide.src}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
