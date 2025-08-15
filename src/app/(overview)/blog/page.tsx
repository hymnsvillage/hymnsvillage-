'use client'
import BlogHeroBanner from '@/components/blog/BlogHeroBanner'
import DiscoverInsights from '@/components/blog/DiscoveInsight'
import RecentPosts from '@/components/blog/RecentPost'
import RecommendedBlog from '@/components/blog/RecomendedBlog'
import SearchBar from '@/components/blog/SearchBar'
import React from 'react'


function Blogpage() {
  return (
    <div>
        <BlogHeroBanner />
        <SearchBar />
        <DiscoverInsights />
       < RecentPosts />
       <RecommendedBlog />
    </div>
  );
}

export default Blogpage

