import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  useGetAllJobs(); // triggers fetching jobs from backend

  const { user } = useSelector((store) => store.auth);
  // Get all jobs from Redux
  const jobs = useSelector((store) => store.job.allJobs); // note: 'job' matches slice name

  
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, [user, navigate]);

  return (
    <div id="home">
      <Navbar />
      <HeroSection />
      <CategoryCarousel jobs={jobs} />
      <LatestJobs />
      <Footer />
    </div>
  );
};

export default Home;
