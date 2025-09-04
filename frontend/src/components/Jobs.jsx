import React from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import Footer from "./Footer";
import { useSelector } from "react-redux";

const Jobs = () => {
  const user = useSelector((store) => store.auth.user); // get logged-in user
  const { allJobs } = useSelector((store) => store.job);


  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <div>
          <Navbar />
        </div>

        {/* Main content */}
        <div className="flex-1 max-w-7xl mx-auto my-10 text-center text-red-600 font-bold">
          Please log in to view job details.
        </div>

        {/* Footer */}
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-1/5">
            <FilterCard />
          </div>

          {allJobs.length === 0 ? (
            <span>
              <div className="max-w-7xl mx-auto my-5 text-center text-red-600 font-bold">
                Please log in to view job details.
              </div>
            </span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {allJobs.map((job) => (
                  <div key={job?._id}>
                    <Job job={job} />
                  </div>
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
