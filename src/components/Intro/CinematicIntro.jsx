import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'

const CinematicIntro = ({ onComplete }) => {
  const containerRef = useRef(null)
  const addressBarRef = useRef(null)
  const cursorRef = useRef(null)
  const [typedText, setTypedText] = useState('')
  const isSkippedRef = useRef(false)
  const timelineRef = useRef(null)

  // Skip immediately on any user action
  const handleComplete = useCallback(() => {
    if (isSkippedRef.current) return
    isSkippedRef.current = true

    if (timelineRef.current) {
      timelineRef.current.kill()
    }

    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 1.05,
      duration: 0.35,
      ease: 'power2.inOut',
      onComplete: () => onComplete && onComplete(),
    })
  }, [onComplete])

  useEffect(() => {
    const tl = gsap.timeline()
    timelineRef.current = tl

    const targetUrl = 'voltfitness.in'

    // 1. Address bar appears
    tl.fromTo(
      addressBarRef.current,
      { opacity: 0, y: -20, scale: 0.92 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.35,
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

    // 2. Fast type "voltfitness.in" into search bar
    const typeStart = 0.4
    targetUrl.split('').forEach((char, index) => {
      tl.call(
        () => setTypedText((prev) => prev + char),
        null,
        typeStart + index * 0.045
      )
    })

    const typeEnd = typeStart + targetUrl.length * 0.045

    // 3. Address bar glows neon-green on search completion
    tl.to(
      addressBarRef.current,
      {
        borderColor: '#AAFF00',
        boxShadow: '0 0 35px rgba(170, 255, 0, 0.9), inset 0 0 15px rgba(170, 255, 0, 0.3)',
        scale: 1.02,
        duration: 0.2,
        ease: 'power2.out',
      },
      typeEnd + 0.1
    )

    // 4. Brief hold to view the entered search, then transition directly to site
    tl.call(() => {
      handleComplete()
    }, null, typeEnd + 0.45)

    // Safety fallback
    const safetyTimer = setTimeout(() => {
      handleComplete()
    }, 2500)

    // Global listener: ANY key skips intro
    const handleKeyDown = () => {
      handleComplete()
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      clearTimeout(safetyTimer)
      tl.kill()
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleComplete])

  return (
    <div
      ref={containerRef}
      onClick={handleComplete}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black select-none cursor-pointer"
      title="Click or press any key to enter immediately"
    >
      {/* Cinematic dark radial background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(18, 30, 20, 0.6) 0%, rgba(10, 10, 10, 0.95) 70%, #000000 100%)',
        }}
      />

      {/* Ambient neon pulse behind search bar */}
      <div className="absolute w-96 h-48 rounded-full bg-[#AAFF00]/10 blur-3xl pointer-events-none" />

      {/* Capsule Search / Address Bar */}
      <div
        ref={addressBarRef}
        className="relative z-50 flex items-center gap-2.5 sm:gap-3 px-4 sm:px-6 py-3 sm:py-3.5 rounded-full bg-[#121212]/95 border border-[#AAFF00]/40 shadow-[0_0_25px_rgba(170,255,0,0.25)] backdrop-blur-md w-[92vw] max-w-[440px] sm:w-auto sm:min-w-[440px]"
      >
        <div className="flex gap-2 mr-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
        </div>
        <div className="flex items-center text-xs text-neutral-400 font-mono tracking-wider flex-1">
          <span className="text-neutral-500 mr-1.5">https://</span>
          <span className="text-[#AAFF00] font-semibold text-sm sm:text-base tracking-wide">
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
