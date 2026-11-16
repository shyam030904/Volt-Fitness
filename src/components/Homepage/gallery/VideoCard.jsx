import { useState, useRef } from 'react';
import { Play, Film, Maximize2, AlertCircle } from 'lucide-react';

export default function VideoCard({ video, onOpenTheater }) {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef(null);

  const handlePlayToggle = () => {
    if (!videoRef.current) return;

    if (!hasStarted) {
      setHasStarted(true);
      videoRef.current.play().catch((err) => {
        console.warn('Playback error or interrupted:', err);
        setHasError(true);
      });
      return;
    }

    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => setHasError(true));
    } else {
      videoRef.current.pause();
    }
  };

  return (
    <div className="group relative flex flex-col rounded-xl overflow-hidden bg-[#111111] border border-zinc-800/80 hover:border-[#AAFF00]/70 transition-all duration-300 shadow-xl">
      {/* Video Container (16:9 widescreen) */}
      <div className="relative aspect-video w-full bg-black overflow-hidden">
        {/* Actual Video Element */}
        <video
          ref={videoRef}
          preload="none"
          playsInline
          controls={hasStarted}
          onError={() => setHasError(true)}
          className="w-full h-full object-cover bg-black"
        >
          <source src={video.src} type={video.mimeType} />
          {video.mimeType !== 'video/mp4' && (
            <source src={video.src} type="video/mp4" />
          )}
        </video>

        {/* Video Card Poster Overlay when not yet started */}
        {!hasStarted && !hasError && (
          <div
            className="absolute inset-0 bg-gradient-to-t from-black via-zinc-950/80 to-zinc-900/60 flex items-center justify-center cursor-pointer transition-transform duration-500 group-hover:scale-105"
            onClick={handlePlayToggle}
          >
            {/* Grid Pattern Accent */}
            <div
              className="absolute inset-0 opacity-[0.06] pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(170,255,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(170,255,0,0.4) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            {/* Pulsing Play Button */}
            <div className="relative z-10 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black/80 border-2 border-[#AAFF00] text-[#AAFF00] shadow-[0_0_20px_rgba(170,255,0,0.4)] group-hover:bg-[#AAFF00] group-hover:text-black group-hover:scale-110 transition-all duration-300">
              <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-0.5" />
            </div>

            {/* Neon Accent Corner Brackets */}
            <div
              className="absolute top-2.5 left-2.5 w-4 h-[2px] transition-all duration-300 group-hover:w-8 group-hover:shadow-[0_0_8px_#AAFF00]"
              style={{ backgroundColor: '#AAFF00' }}
            />
            <div
              className="absolute top-2.5 left-2.5 w-[2px] h-4 transition-all duration-300 group-hover:h-8 group-hover:shadow-[0_0_8px_#AAFF00]"
              style={{ backgroundColor: '#AAFF00' }}
            />
          </div>
        )}

        {/* Fallback if format is unsupported by user's specific browser */}
        {hasError && (
          <div className="absolute inset-0 bg-zinc-950 flex flex-col items-center justify-center p-4 text-center">
            <AlertCircle className="w-8 h-8 text-[#AAFF00] mb-2" />
            <p className="text-xs text-zinc-300 font-semibold mb-2">
              Playback format requires direct file view
            </p>
            <a
              href={video.src}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 rounded bg-[#AAFF00] text-black text-xs font-bold uppercase tracking-wider hover:bg-[#CCFF44]"
            >
              Open Video File
            </a>
          </div>
        )}

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none z-10">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-black/80 backdrop-blur-md text-[#AAFF00] border border-[#AAFF00]/40">
            {video.badge}
          </span>
        </div>

        {/* Floating Cinema Mode Trigger */}
        <button
          type="button"
          aria-label="Open cinema theater view"
          onClick={() => onOpenTheater(video)}
          className="absolute top-3 right-3 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-black/70 hover:bg-[#AAFF00] text-zinc-300 hover:text-black border border-zinc-700 hover:border-[#AAFF00] transition-colors duration-200 cursor-pointer shadow-md"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Video Details Card Footer */}
      <div className="p-4 flex flex-col justify-between flex-1 bg-[#121212]">
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <Film className="w-3.5 h-3.5 text-[#AAFF00]" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#AAFF00]">
              Volt Footage
            </span>
          </div>
          <h4
            className="text-white text-base font-bold uppercase tracking-wide leading-tight group-hover:text-[#AAFF00] transition-colors duration-300"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            {video.title}
          </h4>
          <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
            {video.subtitle}
          </p>
        </div>

        <div className="mt-3 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500">
          <span className="uppercase font-medium tracking-wider">
            {video.filename.endsWith('.MOV') ? 'QuickTime 4K' : 'Cinema MP4'}
          </span>
          <button
            type="button"
            onClick={() => onOpenTheater(video)}
            className="text-xs font-semibold text-[#AAFF00] hover:underline uppercase tracking-wider flex items-center gap-1 cursor-pointer"
          >
            Theater Mode &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
