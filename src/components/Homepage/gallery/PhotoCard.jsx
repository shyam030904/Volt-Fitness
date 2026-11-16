import { useState, useRef, memo } from 'react';
import { ZoomIn, Sparkles } from 'lucide-react';

const PhotoCard = memo(function PhotoCard({ photo, index, onOpen }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const cardRef = useRef(null);

  // Category badge colors/accents
  const getCategoryBadge = (cat) => {
    switch (cat) {
      case 'Machines':
        return 'EQUIPMENT';
      case 'Free Weights':
        return 'FREE WEIGHTS';
      case 'Facility':
        return 'FACILITY';
      case 'Amenities':
        return 'RECOVERY';
      case 'Cardio':
        return 'CARDIO';
      default:
        return 'VOLT GYM';
    }
  };

  return (
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      aria-label={`View full image: ${photo.title}`}
      onClick={() => onOpen(index)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen(index);
        }
      }}
      className={`group relative overflow-hidden rounded-xl bg-[#111111] cursor-pointer select-none border border-zinc-800/80 hover:border-[#AAFF00]/80 transition-all duration-500 shadow-lg hover:shadow-[0_0_25px_rgba(170,255,0,0.18)] ${
        photo.featured ? 'col-span-1 sm:col-span-2 row-span-1 sm:row-span-2' : ''
      }`}
      style={{
        aspectRatio: photo.featured ? '16/10' : photo.orientation === 'portrait' ? '3/4' : '4/3',
      }}
    >
      {/* Loading Skeleton Shimmer */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#AAFF00]/20 border-t-[#AAFF00] animate-spin" />
        </div>
      )}

      {/* Error Fallback */}
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-zinc-900 text-center">
          <span className="text-xs uppercase text-zinc-400 font-semibold mb-1">Volt Asset</span>
          <p className="text-sm text-zinc-300 font-bold">{photo.title}</p>
        </div>
      ) : (
        <img
          src={photo.src}
          alt={photo.title}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Subtle Ambient Vignette & Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none" />

      {/* Neon Corner Brackets */}
      <div
        className="absolute top-2.5 left-2.5 w-4 h-[2px] transition-all duration-300 group-hover:w-8 group-hover:shadow-[0_0_8px_#AAFF00]"
        style={{ backgroundColor: '#AAFF00' }}
      />
      <div
        className="absolute top-2.5 left-2.5 w-[2px] h-4 transition-all duration-300 group-hover:h-8 group-hover:shadow-[0_0_8px_#AAFF00]"
        style={{ backgroundColor: '#AAFF00' }}
      />
      <div
        className="absolute bottom-2.5 right-2.5 w-4 h-[2px] transition-all duration-300 group-hover:w-8 group-hover:shadow-[0_0_8px_#AAFF00]"
        style={{ backgroundColor: '#AAFF00' }}
      />
      <div
        className="absolute bottom-2.5 right-2.5 w-[2px] h-4 transition-all duration-300 group-hover:h-8 group-hover:shadow-[0_0_8px_#AAFF00]"
        style={{ backgroundColor: '#AAFF00' }}
      />

      {/* Top Floating Badge */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
        {photo.featured && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#AAFF00] text-black shadow-[0_0_10px_rgba(170,255,0,0.5)]">
            <Sparkles className="w-2.5 h-2.5 fill-black" />
            SHOWCASE
          </span>
        )}
        <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-black/60 backdrop-blur-md text-zinc-300 border border-zinc-700/60">
          {getCategoryBadge(photo.category)}
        </span>
      </div>

      {/* Hover / Tap Zoom Action Pill (Center on hover) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-[#AAFF00]/60 text-white text-xs font-semibold tracking-wider uppercase transform scale-90 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_15px_rgba(170,255,0,0.3)]">
          <ZoomIn className="w-3.5 h-3.5 text-[#AAFF00]" />
          <span>Tap to Expand</span>
        </div>
      </div>

      {/* Bottom Content Bar */}
      <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 z-10 flex flex-col justify-end pointer-events-none">
        <div className="flex items-center gap-1.5 mb-1 sm:hidden">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#AAFF00]" />
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#AAFF00]">
            {getCategoryBadge(photo.category)}
          </span>
        </div>
        <h3
          className="text-white text-sm sm:text-base md:text-lg font-bold uppercase tracking-wide leading-tight drop-shadow-md line-clamp-1 group-hover:text-[#AAFF00] transition-colors duration-300"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          {photo.title}
        </h3>
        <p className="text-[11px] text-zinc-400 tracking-wider uppercase mt-0.5 font-medium hidden sm:block">
          Volt Training Ground
        </p>
      </div>
    </div>
  );
});

export default PhotoCard;
