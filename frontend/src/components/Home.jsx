import React from 'react'
import Navbar from './shared/Navbar';
import HeroSection from './HeroSection';
import CategoryCarousel from './CategoryCarousel';
import LatestJobs from './LatestJobs';
import Footer from './Footer';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Home = () => {

  useGetAllJobs();
  
  return (
    <div id='home'>
      <Navbar />
      <HeroSection />
      <CategoryCarousel/>
      <LatestJobs/>
      <Footer/>
    </div>
  );
}

export default Home;