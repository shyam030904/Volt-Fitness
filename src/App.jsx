import { useState } from 'react'
import CinematicIntro from './components/Intro/CinematicIntro'
import Navbar from './components/Layout/Navbar'
import Hero from './components/Homepage/Hero'
import About from './components/Homepage/About'
import Programs from './components/Homepage/Programs'
import Trainers from './components/Homepage/Trainers'
import Membership from './components/Homepage/Membership'
import Gallery from './components/Homepage/Gallery'
import Contact from './components/Homepage/Contact'
import Footer from './components/Layout/Footer'
import WhatsAppButton from './components/Layout/WhatsAppButton'

function App() {
  const [introComplete, setIntroComplete] = useState(false)

  return (
    <>
      {!introComplete && (
        <CinematicIntro onComplete={() => setIntroComplete(true)} />
      )}

      <div
        style={{
          opacity: introComplete ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
          pointerEvents: introComplete ? 'auto' : 'none',
        }}
      >
        <Navbar />
        <main>
          <Hero />
          <About />
          <Programs />
          <Trainers />
          <Membership />
          <Gallery />
          <Contact />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  )
}

export default App
