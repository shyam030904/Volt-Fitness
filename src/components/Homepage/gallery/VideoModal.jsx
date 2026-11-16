import { useEffect, useRef } from 'react';
import { X, Film, ExternalLink } from 'lucide-react';

export default function VideoModal({ video, isOpen, onClose }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !video) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Video Player: ${video.title}`}
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-black/95 backdrop-blur-2xl animate-fade-in select-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Top Bar */}
      <header className="relative z-20 flex items-center justify-between px-4 sm:px-6 py-4 bg-gradient-to-b from-black/90 to-transparent">
        <div className="flex items-center gap-2">
          <Film className="w-5 h-5 text-[#AAFF00]" />
          <span
            className="text-sm sm:text-base font-bold uppercase tracking-wider text-white"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            VOLT CINEMA THEATER
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#AAFF00]/10 text-[#AAFF00] border border-[#AAFF00]/30 ml-2">
            {video.badge || 'HD'}
          </span>
        </div>

        <button
          type="button"
          aria-label="Close cinema player"
          onClick={onClose}
          className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-zinc-900/90 hover:bg-[#AAFF00] text-white hover:text-black border border-zinc-700/70 hover:border-[#AAFF00] shadow-lg hover:shadow-[0_0_15px_rgba(170,255,0,0.5)] transition-all duration-200 cursor-pointer"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </header>

      {/* Main Video Screen */}
      <div
        className="relative flex-1 flex items-center justify-center p-3 sm:p-8 md:p-12"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <div className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden bg-black border border-zinc-800 shadow-[0_0_50px_rgba(0,0,0,0.9)]">
          <video
            ref={videoRef}
            src={video.src}
            controls
            autoPlay
            playsInline
            className="w-full h-full object-contain bg-black"
          >
            <source src={video.src} type={video.mimeType} />
            {video.mimeType !== 'video/mp4' && (
              <source src={video.src} type="video/mp4" />
            )}
            Your browser does not support HTML5 video playback.
          </video>
        </div>
      </div>

      {/* Bottom Info Bar */}
      <footer className="relative z-20 px-4 sm:px-6 py-4 bg-gradient-to-t from-black/95 to-transparent">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <h3
              className="text-white text-base sm:text-lg font-bold uppercase tracking-wide"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              {video.title}
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              {video.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={video.src}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-[#AAFF00] border border-zinc-800 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Direct File</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
