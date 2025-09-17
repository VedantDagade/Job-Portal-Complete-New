import React from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Jobs = () => {
  const user = useSelector((store) => store.auth.user); // logged-in user
  const { allJobs } = useSelector((store) => store.job);

  // ✅ Fetch jobs when component mounts
  useGetAllJobs();

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 max-w-7xl mx-auto my-10 text-center text-red-600 font-bold">
          Please log in to view job details.
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          {/* Filter Section */}
          <div className="w-1/5">
            <FilterCard />
          </div>

          {/* Job List Section */}
          {allJobs.length === 0 ? (
            <div className="flex-1 text-center text-gray-600 font-bold my-10">
              No jobs available right now.
            </div>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {allJobs.map((job) => (
                  <Job key={job?._id} job={job} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Jobs;
