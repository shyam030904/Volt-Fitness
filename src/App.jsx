import { useState, useEffect, useCallback } from 'react'
import CinematicIntro from './components/Intro/CinematicIntro'
import Navbar from './components/Layout/Navbar'
import Hero from './components/Homepage/Hero'
import About from './components/Homepage/About'
import Programs from './components/Homepage/Programs'
import Trainers from './components/Homepage/Trainers'
// import Membership from './components/Homepage/Membership'
import Gallery from './components/Homepage/Gallery'
import Contact from './components/Homepage/Contact'
import Footer from './components/Layout/Footer'
import WhatsAppButton from './components/Layout/WhatsAppButton'
import GalleryPage from './pages/GalleryPage'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

function App() {
  const [introComplete, setIntroComplete] = useState(false)
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase()
      const path = window.location.pathname.toLowerCase()
      if (path === '/gallery' || hash === '#/gallery' || hash === '#gallery-page') {
        return 'gallery'
      }
    }
    return 'home'
  })

  const navigateTo = useCallback((page, targetHash = '') => {
    setCurrentPage(page)
    if (page === 'gallery') {
      window.history.pushState(null, '', '#/gallery')
      window.scrollTo({ top: 0, behavior: 'instant' })
    } else {
      const cleanHash = targetHash ? (targetHash.startsWith('#') ? targetHash : `#${targetHash}`) : ''
      window.history.pushState(null, '', cleanHash || window.location.pathname)
      if (cleanHash) {
        setTimeout(() => {
          const el = document.querySelector(cleanHash)
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
          }
        }, 80)
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' })
      }
    }
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 150)
  }, [])

  // Listen for browser Back/Forward navigation
  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash.toLowerCase()
      const path = window.location.pathname.toLowerCase()
      if (path === '/gallery' || hash === '#/gallery' || hash === '#gallery-page') {
        setCurrentPage('gallery')
      } else {
        setCurrentPage('home')
      }
      setTimeout(() => ScrollTrigger.refresh(), 100)
    }

    window.addEventListener('popstate', handleLocationChange)
    window.addEventListener('hashchange', handleLocationChange)
    return () => {
      window.removeEventListener('popstate', handleLocationChange)
      window.removeEventListener('hashchange', handleLocationChange)
    }
  }, [])

  const handleIntroComplete = () => {
    setIntroComplete(true)
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 150)
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 600)
  }

  useEffect(() => {
    const handleLoad = () => {
      ScrollTrigger.refresh()
    }
    window.addEventListener('load', handleLoad)
    return () => window.removeEventListener('load', handleLoad)
  }, [])

  return (
    <>
      {!introComplete && (
        <CinematicIntro onComplete={handleIntroComplete} />
      )}

      <div
        className="overflow-x-hidden w-full max-w-full"
        style={{
          opacity: introComplete ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
          pointerEvents: introComplete ? 'auto' : 'none',
        }}
      >
        <Navbar currentPage={currentPage} onNavigate={navigateTo} />
        <main className="overflow-x-hidden w-full max-w-full">
          {currentPage === 'gallery' ? (
            <GalleryPage onNavigateHome={() => navigateTo('home')} />
          ) : (
            <>
              <Hero />
              <About />
              <Programs />
              <Trainers />
              {/* Membership section hidden */}
              <Gallery onExplore={() => navigateTo('gallery')} />
              <Contact />
            </>
          )}
        </main>
        <Footer onNavigate={navigateTo} />
        <WhatsAppButton />
      </div>
    </>
  )
}

export default App
