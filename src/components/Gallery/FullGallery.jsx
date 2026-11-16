import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { galleryPhotos, galleryCategories } from '../Homepage/galleryManifest';
import PhotoCard from '../Homepage/gallery/PhotoCard';
import ImageViewerModal from '../Homepage/gallery/ImageViewerModal';

gsap.registerPlugin(ScrollTrigger);

export default function FullGallery() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  const [activeCategory, setActiveCategory] = useState('all');
  const [activeViewerIndex, setActiveViewerIndex] = useState(null);

  // Filtered photos based on active category
  const filteredPhotos = useMemo(() => {
    if (activeCategory === 'all') return galleryPhotos;
    if (activeCategory === 'machines') {
      return galleryPhotos.filter((p) => p.category === 'Machines');
    }
    if (activeCategory === 'free-weights') {
      return galleryPhotos.filter(
        (p) => p.category === 'Free Weights' || p.category === 'Equipment'
      );
    }
    if (activeCategory === 'facility') {
      return galleryPhotos.filter(
        (p) => p.category === 'Facility' || p.category === 'Cardio'
      );
    }
    if (activeCategory === 'amenities') {
      return galleryPhotos.filter((p) => p.category === 'Amenities');
    }
    return galleryPhotos;
  }, [activeCategory]);

  const handleOpenViewer = useCallback((index) => {
    setActiveViewerIndex(index);
  }, []);

  const handleCloseViewer = useCallback(() => {
    setActiveViewerIndex(null);
  }, []);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Staggered reveal for initial photo cards
      if (gridRef.current) {
        const cards = gridRef.current.children;
        gsap.from(cards, {
          opacity: 0,
          y: 30,
          scale: 0.98,
          duration: 0.6,
          ease: 'power3.out',
          stagger: {
            each: 0.05,
            amount: 0.5,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <div ref={sectionRef} className="w-full">
      {/* Category Filter Pills / Media Switcher */}
      <div className="mb-8 sm:mb-10 flex items-center justify-between gap-2 overflow-x-auto pb-3 scrollbar-none no-scrollbar">
        <div className="flex items-center gap-2">
          {galleryCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-[#AAFF00] text-black shadow-[0_0_15px_rgba(170,255,0,0.45)] scale-105'
                    : 'bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                    isActive ? 'bg-black text-[#AAFF00]' : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Responsive Editorial Photo Masonry Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 auto-rows-auto"
      >
        {filteredPhotos.map((photo, index) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            index={index}
            onOpen={handleOpenViewer}
          />
        ))}
      </div>

      {/* Fullscreen Image Viewer Modal */}
      <ImageViewerModal
        photos={filteredPhotos}
        currentIndex={activeViewerIndex ?? 0}
        isOpen={activeViewerIndex !== null}
        onClose={handleCloseViewer}
        onSelectIndex={setActiveViewerIndex}
      />
    </div>
  );
}
