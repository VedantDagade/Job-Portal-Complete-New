import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Browse = () => {
  const { allJobs, searchQuery } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  useGetAllJobs();

  useEffect(() => {
    return () => {
      dispatch(setSearchQuery("")); // cleanup
    };
  }, [dispatch]);

  const normalizedQuery = (searchQuery || "").trim().toLowerCase();

  // 🔹 filter jobs by title (case-insensitive)
  const filteredJobs = normalizedQuery
    ? allJobs.filter((job) =>
        (job.title || "").toLowerCase().includes(normalizedQuery)
      )
    : allJobs;

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">
          Search Results ({filteredJobs.length})
        </h1>
        <div className="grid grid-cols-3 gap-4">
          {filteredJobs.map((job) => (
            <Job job={job} key={job._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;
