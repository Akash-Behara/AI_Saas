import React from 'react'

import LandingHero from '@/components/LandingHero'
import { LandingNavbar } from '@/components/LandingNavbar'
import LandingContent from '@/components/LandingContent'

const LandingPage = () => {
  return (
    <div className='h-full'>
      <LandingNavbar />
      <LandingHero />
      <LandingContent />
    </div>
  )
}

export default LandingPage