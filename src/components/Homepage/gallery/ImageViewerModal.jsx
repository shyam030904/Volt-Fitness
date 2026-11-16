import { useEffect, useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';

export default function ImageViewerModal({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onSelectIndex,
}) {
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });
  const [touchOffset, setTouchOffset] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const total = photos.length;
  const safeIndex = total > 0 ? Math.min(Math.max(0, currentIndex), total - 1) : 0;
  const currentPhoto = photos[safeIndex];

  const handleNext = useCallback(() => {
    if (total === 0) return;
    setIsImageLoaded(false);
    setIsZoomed(false);
    onSelectIndex((safeIndex + 1) % total);
  }, [safeIndex, total, onSelectIndex]);

  const handlePrev = useCallback(() => {
    if (total === 0) return;
    setIsImageLoaded(false);
    setIsZoomed(false);
    onSelectIndex((safeIndex - 1 + total) % total);
  }, [safeIndex, total, onSelectIndex]);

  // Lock background scroll when open & calculate scrollbar compensation
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose]);

  // Touch swipe handling for mobile
  const onTouchStart = (e) => {
    if (isZoomed) return;
    const touch = e.targetTouches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
    setTouchEnd({ x: touch.clientX, y: touch.clientY });
    setIsSwiping(true);
    setTouchOffset(0);
  };

  const onTouchMove = (e) => {
    if (!isSwiping || isZoomed) return;
    const touch = e.targetTouches[0];
    setTouchEnd({ x: touch.clientX, y: touch.clientY });
    const diffX = touch.clientX - touchStart.x;
    // Dampen touch drag effect
    setTouchOffset(diffX);
  };

  const onTouchEnd = () => {
    if (!isSwiping || isZoomed) return;
    setIsSwiping(false);
    const diffX = touchEnd.x - touchStart.x;
    const diffY = touchEnd.y - touchStart.y;
    const absDiffX = Math.abs(diffX);
    const absDiffY = Math.abs(diffY);

    // Swipe horizontal threshold
    if (absDiffX > 45 && absDiffX > absDiffY) {
      if (diffX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    } else if (diffY > 90 && absDiffY > absDiffX) {
      // Swipe down to dismiss on mobile
      onClose();
    }
    setTouchOffset(0);
  };

  if (!isOpen || !currentPhoto) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Gym Image Viewer"
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-black/95 backdrop-blur-xl animate-fade-in select-none"
      onClick={(e) => {
        // Close if clicked directly on modal background
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Top Header Bar */}
      <header className="relative z-20 flex items-center justify-between px-4 sm:px-6 py-4 bg-gradient-to-b from-black/90 via-black/60 to-transparent">
        {/* Counter Badge */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#AAFF00] shadow-[0_0_8px_#AAFF00] animate-pulse" />
          <span
            className="text-xs sm:text-sm font-bold tracking-widest uppercase text-white"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            {safeIndex + 1} <span className="text-zinc-500">/</span> {total}
          </span>
          <span className="hidden sm:inline-block text-xs uppercase tracking-wider text-zinc-400 border-l border-zinc-800 pl-2 ml-1">
            {currentPhoto.category || 'Gym Floor'}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Zoom Toggle */}
          <button
            type="button"
            aria-label={isZoomed ? 'Reset zoom' : 'Zoom in'}
            onClick={() => setIsZoomed(!isZoomed)}
            className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-[#AAFF00] border border-zinc-700/60 transition-all duration-200"
          >
            {isZoomed ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Close Button */}
          <button
            type="button"
            aria-label="Close fullscreen viewer"
            onClick={onClose}
            className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-zinc-900/90 hover:bg-[#AAFF00] text-white hover:text-black border border-zinc-700/70 hover:border-[#AAFF00] shadow-lg hover:shadow-[0_0_15px_rgba(170,255,0,0.5)] transition-all duration-200 cursor-pointer"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </header>

      {/* Main Image Stage */}
      <div
        className="relative flex-1 flex items-center justify-center px-2 sm:px-14 md:px-20 overflow-hidden cursor-default"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        {/* Loading Spinner for high-res photo */}
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-[#AAFF00]/20 border-t-[#AAFF00] animate-spin" />
              <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">
                Loading High-Res...
              </span>
            </div>
          </div>
        )}

        {/* Active Fullscreen Image Container */}
        <div
          className={`relative max-w-full max-h-full flex items-center justify-center transition-transform duration-200 ease-out will-change-transform ${
            isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-pointer'
          }`}
          style={{
            transform: isSwiping ? `translateX(${touchOffset * 0.6}px)` : undefined,
          }}
          onClick={() => {
            if (!isSwiping && Math.abs(touchOffset) < 5) {
              setIsZoomed(!isZoomed);
            }
          }}
        >
          <img
            key={currentPhoto.id}
            src={currentPhoto.src}
            alt={currentPhoto.title}
            decoding="async"
            onLoad={() => setIsImageLoaded(true)}
            className={`max-w-full max-h-[75vh] sm:max-h-[80vh] object-contain rounded-lg shadow-2xl transition-opacity duration-300 ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>

        {/* Navigation Floating Arrow: Previous */}
        <button
          type="button"
          aria-label="Previous photo"
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 hover:bg-[#AAFF00] text-white hover:text-black border border-zinc-700/80 hover:border-[#AAFF00] backdrop-blur-md shadow-xl hover:shadow-[0_0_20px_rgba(170,255,0,0.5)] transition-all duration-300 group cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 transition-transform group-hover:-translate-x-0.5" />
        </button>

        {/* Navigation Floating Arrow: Next */}
        <button
          type="button"
          aria-label="Next photo"
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 hover:bg-[#AAFF00] text-white hover:text-black border border-zinc-700/80 hover:border-[#AAFF00] backdrop-blur-md shadow-xl hover:shadow-[0_0_20px_rgba(170,255,0,0.5)] transition-all duration-300 group cursor-pointer"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Bottom Footer Info Bar */}
      <footer className="relative z-20 px-4 sm:px-6 py-4 bg-gradient-to-t from-black/95 via-black/80 to-transparent">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-center sm:text-left">
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#AAFF00]" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#AAFF00]">
                {currentPhoto.category || 'Volt Fitness Equipment'}
              </span>
            </div>
            <h2
              className="text-white text-base sm:text-xl font-bold uppercase tracking-wide"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              {currentPhoto.title}
            </h2>
          </div>

          <div className="flex items-center justify-center sm:justify-end gap-3 text-[11px] text-zinc-400 uppercase tracking-widest">
            <span className="sm:hidden">Swipe left/right to navigate</span>
            <span className="hidden sm:inline-block">Use Arrow Keys ← →</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
