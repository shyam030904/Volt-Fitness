import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'

const CinematicIntro = ({ onComplete }) => {
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const addressBarRef = useRef(null)
  const cursorRef = useRef(null)
  const [typedText, setTypedText] = useState('')
  const [videoStarted, setVideoStarted] = useState(false)
  const isSkippedRef = useRef(false)
  const timelineRef = useRef(null)

  // Skip immediately on any user action
  const handleSkip = useCallback(() => {
    if (isSkippedRef.current) return
    isSkippedRef.current = true

    if (timelineRef.current) {
      timelineRef.current.kill()
    }
    if (videoRef.current) {
      videoRef.current.pause()
    }

    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 1.05,
      duration: 0.35,
      ease: 'power2.inOut',
      onComplete: () => onComplete && onComplete(),
    })
  }, [onComplete])

  // Play video with audio at 50% volume
  const playVideo = useCallback(() => {
    setVideoStarted(true)
    const vid = videoRef.current
    if (!vid) return

    vid.volume = 0.5
    vid.muted = false

    const playPromise = vid.play()
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('Audio policy catch:', err)
        const resumeOnClick = () => {
          if (videoRef.current && !isSkippedRef.current) {
            videoRef.current.volume = 0.5
            videoRef.current.muted = false
            videoRef.current.play().catch(() => {})
          }
          window.removeEventListener('click', resumeOnClick)
        }
        window.addEventListener('click', resumeOnClick, { once: true })
      })
    }
  }, [])

  useEffect(() => {
    const tl = gsap.timeline()
    timelineRef.current = tl

    const targetUrl = 'voltfitness.in'

    // 1. Address bar appears
    tl.fromTo(
      addressBarRef.current,
      { opacity: 0, y: -30, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: 'power3.out',
      },
      0.05
    )

    // Cursor blink
    tl.to(
      cursorRef.current,
      {
        opacity: 0,
        duration: 0.25,
        repeat: -1,
        yoyo: true,
        ease: 'steps(1)',
      },
      0.1
    )

    // 2. Fast type "voltfitness.in"
    const typeStart = 0.35
    targetUrl.split('').forEach((char, index) => {
      tl.call(
        () => setTypedText((prev) => prev + char),
        null,
        typeStart + index * 0.045
      )
    })

    const typeEnd = typeStart + targetUrl.length * 0.045

    // 3. Address bar glows neon-green
    tl.to(
      addressBarRef.current,
      {
        borderColor: '#AAFF00',
        boxShadow: '0 0 35px rgba(170, 255, 0, 0.9), inset 0 0 15px #AAFF00',
        duration: 0.15,
        ease: 'power2.in',
      },
      typeEnd + 0.05
    )

    // 4. Address bar dissolves
    tl.to(
      addressBarRef.current,
      {
        opacity: 0,
        scale: 0.85,
        y: -25,
        filter: 'blur(8px)',
        duration: 0.25,
        ease: 'power2.in',
      },
      typeEnd + 0.2
    )

    // 5. Trigger video immediately
    tl.call(() => playVideo(), null, typeEnd + 0.15)

    // Video is cut at 6.2s, so after 7.5s maximum, automatically guarantee transition
    const safetyTimer = setTimeout(() => {
      handleSkip()
    }, 7800)

    // Global listener: ANY key skips intro
    const handleKeyDown = () => {
      handleSkip()
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      clearTimeout(safetyTimer)
      tl.kill()
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleSkip, playVideo])

  return (
    <div
      ref={containerRef}
      onClick={handleSkip}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black select-none cursor-pointer"
      title="Click or press any key to skip intro"
    >
      {/* Dynamic 6s Action Video (zero freezing, smooth fadeout, 50% volume AAC audio) */}
      <video
        ref={videoRef}
        src="/intro-clean.mp4"
        playsInline
        preload="auto"
        onEnded={handleSkip}
        onError={() => handleSkip()}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          videoStarted ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Cinematic dark vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 65%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      {/* Capsule Address Bar */}
      <div
        ref={addressBarRef}
        className="absolute top-[32%] z-50 flex items-center gap-3 px-6 py-3 rounded-full bg-[#121212]/95 border border-[#AAFF00]/40 shadow-[0_0_25px_rgba(170,255,0,0.25)] backdrop-blur-md min-w-[300px] sm:min-w-[420px]"
      >
        <div className="flex gap-2 mr-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
        </div>
        <div className="flex items-center text-xs text-neutral-400 font-mono tracking-wider flex-1">
          <span className="text-neutral-500 mr-1.5">https://</span>
          <span className="text-[#AAFF00] font-semibold text-sm tracking-wide">
            {typedText}
          </span>
          <span
            ref={cursorRef}
            className="inline-block w-[2px] h-4 bg-[#AAFF00] ml-1 shadow-[0_0_8px_#AAFF00]"
          />
        </div>
      </div>

      {/* Subdued helper text */}
      <div className="absolute bottom-6 z-50 text-[10px] font-mono tracking-widest text-neutral-500/60 uppercase pointer-events-none">
        Press any key or click to skip
      </div>
    </div>
  )
}

export default CinematicIntro
