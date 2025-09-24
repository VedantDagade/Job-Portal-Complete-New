import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Jobs = () => {
  const user = useSelector((store) => store.auth.user); // logged-in user
  const { allJobs = [], searchQuery = "" } = useSelector((store) => store.job);

  // initialize filtered jobs state
  const [filterdJobs, setFilterdJobs] = useState(allJobs);

  // ✅ Fetch jobs when component mounts / when searchQuery changes
  useGetAllJobs();

  useEffect(() => {
    const q = (searchQuery || "").trim().toLowerCase();

    if (q) {
      const filtered = allJobs.filter((job) => {
        const title = String(job?.title ?? "").toLowerCase();
        const desc = String(job?.description ?? "").toLowerCase();
        const location = String(job?.location ?? "").toLowerCase();
        const salary = String(job?.salary ?? "").toLowerCase();

        return (
          title.includes(q) ||
          desc.includes(q) ||
          location.includes(q) ||
          salary.includes(q)
        );
      });

      setFilterdJobs(filtered);
    } else {
      // no search query -> show all
      setFilterdJobs(allJobs);
    }
  }, [allJobs, searchQuery]);

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
          {filterdJobs.length === 0 ? (
            <div className="flex-1 text-center text-gray-600 font-bold my-10">
              No jobs available right now.
            </div>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filterdJobs.map((job) => (
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
