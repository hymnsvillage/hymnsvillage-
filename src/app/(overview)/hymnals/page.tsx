'use client';

import HymnalPage from '@/components/Hymnals'
import RecentHymns from '@/components/RecentHymns'
import React from 'react'

function Hymnals() {
  return (
    <div className='mx-auto'>
        <HymnalPage />
        <RecentHymns />
    </div>
  )
}

export default Hymnals

