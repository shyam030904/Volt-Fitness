import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Volume2, VolumeX, ArrowRight, Sparkles, Camera } from 'lucide-react';
import { reelVideo } from './galleryManifest';

gsap.registerPlugin(ScrollTrigger);

export default function Gallery({ onExplore }) {
  const sectionRef = useRef(null);
  const heading1ScrollRef = useRef(null);
  const heading1EnterRef = useRef(null);
  const heading2ScrollRef = useRef(null);
  const heading2EnterRef = useRef(null);
  const videoRef = useRef(null);
  const videoCardRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.warn('Video play interrupted:', err));
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Heading entrance from corners
      gsap.from(heading1EnterRef.current, {
        x: -240,
        y: -80,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      });
      gsap.from(heading2EnterRef.current, {
        x: 240,
        y: 80,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      });

      // Heading scroll exit & return
      const headingScrollConfig = {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom 40%',
        scrub: 1,
      };
      gsap.to(heading1ScrollRef.current, {
        x: -280,
        y: -60,
        opacity: 0,
        ease: 'none',
        scrollTrigger: headingScrollConfig,
      });
      gsap.to(heading2ScrollRef.current, {
        x: 280,
        y: 60,
        opacity: 0,
        ease: 'none',
        scrollTrigger: headingScrollConfig,
      });

      // Video card entrance
      if (videoCardRef.current) {
        gsap.from(videoCardRef.current, {
          opacity: 0,
          y: 40,
          scale: 0.98,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: videoCardRef.current,
            start: 'top 85%',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative scroll-mt-24 sm:scroll-mt-28 md:scroll-mt-32 py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ backgroundColor: '#0A0A0A' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header with Title and "Explore more" Button Next to Gallery */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12 select-none">
          <div>
            <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
              <h2
                className="text-4xl sm:text-6xl md:text-7xl font-bold uppercase leading-[0.9] tracking-tight"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                <span className="block">
                  <span ref={heading1ScrollRef} className="block will-change-transform">
                    <span ref={heading1EnterRef} className="block text-white will-change-transform">
                      OUR
                    </span>
                  </span>
                </span>
                <span className="block mt-1">
                  <span ref={heading2ScrollRef} className="block will-change-transform">
                    <span
                      ref={heading2EnterRef}
                      className="block will-change-transform"
                      style={{ color: '#AAFF00' }}
                    >
                      GALLERY
                    </span>
                  </span>
                </span>
              </h2>

              {/* Small "Explore more" Button Next to Gallery */}
              <button
                type="button"
                onClick={onExplore}
                aria-label="Explore more gym photos on gallery page"
                className="group inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-transparent hover:bg-[#AAFF00] text-[#AAFF00] hover:text-black border-1.5 border-[#AAFF00] shadow-[0_0_15px_rgba(170,255,0,0.25)] hover:shadow-[0_0_25px_rgba(170,255,0,0.6)] transition-all duration-300 cursor-pointer self-center sm:self-end mb-1"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                <Camera className="w-4 h-4 text-current" />
                <span>Explore more</span>
                <ArrowRight className="w-4 h-4 text-current transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            <div className="mt-3 w-16 h-1" style={{ backgroundColor: '#AAFF00' }} />
          </div>

          
        </div>

        {/* Highlight Reel Video Card */}
        <div
          ref={videoCardRef}
          className="relative rounded-2xl overflow-hidden bg-black border-2 border-zinc-800/80 hover:border-[#AAFF00]/60 transition-all duration-500 shadow-[0_0_40px_rgba(0,0,0,0.8)]"
        >
          <div className="relative aspect-video md:aspect-[21/9] w-full bg-black overflow-hidden flex items-center justify-center">
            {/* Native Video Element */}
            <video
              ref={videoRef}
              src={reelVideo.src}
              playsInline
              preload="metadata"
              muted={isMuted}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full h-full object-cover bg-black"
            >
              <source src={reelVideo.src} type={reelVideo.mimeType} />
              Your browser does not support HTML5 video playback.
            </video>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent pointer-events-none" />

            {/* Play/Pause Center Trigger if paused */}
            {!isPlaying && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer group select-none"
                onClick={togglePlay}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/80 border-2 border-[#AAFF00] text-[#AAFF00] shadow-[0_0_30px_rgba(170,255,0,0.5)] group-hover:scale-110 group-hover:bg-[#AAFF00] group-hover:text-black transition-all duration-300">
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1" />
                  </div>
                  <span
                    className="text-white text-xs sm:text-sm font-bold uppercase tracking-widest bg-black/60 px-3.5 py-1 rounded-full border border-zinc-700 backdrop-blur-md"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    Watch 
                  </span>
                </div>
              </div>
            )}

            {/* Neon Corner Brackets */}
            <div
              className="absolute top-3 left-3 w-5 h-[2px]"
              style={{ backgroundColor: '#AAFF00' }}
            />
            <div
              className="absolute top-3 left-3 w-[2px] h-5"
              style={{ backgroundColor: '#AAFF00' }}
            />
            <div
              className="absolute bottom-3 right-3 w-5 h-[2px]"
              style={{ backgroundColor: '#AAFF00' }}
            />
            <div
              className="absolute bottom-3 right-3 w-[2px] h-5"
              style={{ backgroundColor: '#AAFF00' }}
            />

            {/* Video Controls Bar */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 flex items-center justify-between pointer-events-none z-10">
              <div className="pointer-events-auto">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#AAFF00] text-black shadow-[0_0_16px_rgba(170,255,0,0.55)] mb-2">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-black" />
                  {reelVideo.badge}
                </span>
                <h3
                  className="text-white text-base sm:text-2xl md:text-3xl font-bold uppercase tracking-tight drop-shadow-md"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  {reelVideo.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 pointer-events-auto">
                {/* Audio Mute/Unmute Button */}
                <button
                  type="button"
                  aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
                  onClick={toggleMute}
                  className="flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/75 hover:bg-[#AAFF00] text-white hover:text-black border border-zinc-700 hover:border-[#AAFF00] backdrop-blur-md transition-all duration-200 cursor-pointer shadow-lg"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Reel Card Footer with Link to Full Image Gallery */}
          <div className="p-4 sm:p-5 bg-[#121212] border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              <p className="text-xs sm:text-sm text-zinc-300 font-medium">
                Want to inspect our machines, free weights, and facility in high definition?
              </p>
              <p className="text-[11px] text-zinc-500 uppercase tracking-wider mt-0.5">
                 Professional Interior & Equipment Photos Available
              </p>
            </div>

            <button
              type="button"
              onClick={onExplore}
              className="group inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#AAFF00] hover:text-[#CCFF44] cursor-pointer"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              <span>Explore More</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
