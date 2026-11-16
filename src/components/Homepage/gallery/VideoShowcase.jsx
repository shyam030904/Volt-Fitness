import { useState, useRef } from 'react';
import { Play, Volume2, VolumeX, Sparkles, Maximize2 } from 'lucide-react';
import VideoCard from './VideoCard';
import VideoModal from './VideoModal';

export default function VideoShowcase({ videos }) {
  const [activeTheaterVideo, setActiveTheaterVideo] = useState(null);
  const [isFeaturedPlaying, setIsFeaturedPlaying] = useState(false);
  const [isFeaturedMuted, setIsFeaturedMuted] = useState(true);
  const featuredVideoRef = useRef(null);

  // The first video is the featured reel
  const featuredVideo = videos.find((v) => v.featured) || videos[0];
  const otherVideos = videos.filter((v) => v.id !== featuredVideo?.id);

  const toggleFeaturedPlay = () => {
    if (!featuredVideoRef.current) return;
    if (featuredVideoRef.current.paused) {
      featuredVideoRef.current.play().then(() => setIsFeaturedPlaying(true));
    } else {
      featuredVideoRef.current.pause();
      setIsFeaturedPlaying(false);
    }
  };

  const toggleFeaturedMute = () => {
    if (!featuredVideoRef.current) return;
    featuredVideoRef.current.muted = !featuredVideoRef.current.muted;
    setIsFeaturedMuted(featuredVideoRef.current.muted);
  };

  return (
    <div className="mt-20 md:mt-28">
      {/* Video Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 border-b border-zinc-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#AAFF00] shadow-[0_0_10px_#AAFF00] animate-pulse" />
            <span className="text-xs uppercase font-bold tracking-widest text-[#AAFF00]">
              Motion Showcase
            </span>
          </div>
          <h3
            className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-white tracking-tight"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            VOLT CINEMA <span style={{ color: '#AAFF00' }}>& REELS</span>
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm mt-2 max-w-xl">
            Live motion from inside Volt Fitness. Watch our state-of-the-art machinery, training decks, and gym floor atmosphere in action.
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-zinc-900 border border-zinc-800 text-zinc-300">
            {videos.length} Authentic Videos
          </span>
        </div>
      </div>

      {/* Featured Main Video Screen */}
      {featuredVideo && (
        <div className="relative mb-12 rounded-2xl overflow-hidden bg-black border-2 border-zinc-800/80 hover:border-[#AAFF00]/60 transition-all duration-500 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden bg-black flex items-center justify-center">
            <video
              ref={featuredVideoRef}
              src={featuredVideo.src}
              playsInline
              muted={isFeaturedMuted}
              preload="metadata"
              onPlay={() => setIsFeaturedPlaying(true)}
              onPause={() => setIsFeaturedPlaying(false)}
              className="w-full h-full object-cover"
            >
              <source src={featuredVideo.src} type={featuredVideo.mimeType} />
              Your browser does not support HTML5 video playback.
            </video>

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />

            {/* Play/Pause Center Trigger if paused */}
            {!isFeaturedPlaying && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer group"
                onClick={toggleFeaturedPlay}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/80 border-2 border-[#AAFF00] text-[#AAFF00] shadow-[0_0_30px_rgba(170,255,0,0.5)] group-hover:scale-110 group-hover:bg-[#AAFF00] group-hover:text-black transition-all duration-300">
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1" />
                  </div>
                  <span
                    className="text-white text-xs sm:text-sm font-bold uppercase tracking-widest bg-black/60 px-3 py-1 rounded-full border border-zinc-700 backdrop-blur-md"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    Play 4K Reel
                  </span>
                </div>
              </div>
            )}

            {/* Controls Bar over video */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 flex items-center justify-between pointer-events-none z-10">
              <div className="pointer-events-auto">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#AAFF00] text-black shadow-[0_0_12px_rgba(170,255,0,0.5)] mb-1.5">
                  <Sparkles className="w-3 h-3 fill-black" />
                  FEATURED CINEMATIC 
                </span>
                <h4
                  className="text-white text-base sm:text-2xl md:text-3xl font-bold uppercase tracking-tight drop-shadow-md"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  {featuredVideo.title}
                </h4>
              </div>

              <div className="flex items-center gap-2 pointer-events-auto">
                {/* Mute / Unmute Toggle */}
                <button
                  type="button"
                  aria-label={isFeaturedMuted ? 'Unmute video' : 'Mute video'}
                  onClick={toggleFeaturedMute}
                  className="flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/70 hover:bg-[#AAFF00] text-white hover:text-black border border-zinc-700 hover:border-[#AAFF00] backdrop-blur-md transition-all duration-200 cursor-pointer shadow-lg"
                >
                  {isFeaturedMuted ? (
                    <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>

                {/* Theater Mode Modal Button */}
                <button
                  type="button"
                  aria-label="Open theater view"
                  onClick={() => setActiveTheaterVideo(featuredVideo)}
                  className="flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/70 hover:bg-[#AAFF00] text-white hover:text-black border border-zinc-700 hover:border-[#AAFF00] backdrop-blur-md transition-all duration-200 cursor-pointer shadow-lg"
                >
                  <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Other Gym Videos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {otherVideos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            onOpenTheater={(v) => setActiveTheaterVideo(v)}
          />
        ))}
      </div>

      {/* Fullscreen Video Cinema Modal */}
      <VideoModal
        video={activeTheaterVideo}
        isOpen={Boolean(activeTheaterVideo)}
        onClose={() => setActiveTheaterVideo(null)}
      />
    </div>
  );
}
