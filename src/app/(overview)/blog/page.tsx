'use client'

import RecentPosts from '@/components/blog/BlogGridSection'
import BlogHeroBanner from '@/components/blog/BlogHeroBanner'
import BlogSearchSection from '@/components/blog/BlogSearchSection'
import RecommendedBlog from '@/components/blog/RecomendedBlog'
import SearchBar from '@/components/blog/SearchBar'
import React from 'react'



function page() {
  return (
    <div>
        <BlogHeroBanner />
        <SearchBar />
         <BlogSearchSection />
       < RecentPosts />
       <RecommendedBlog />
    </div>
  )
}

export default page