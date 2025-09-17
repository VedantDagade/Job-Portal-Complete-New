import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  useGetAllJobs();

  return (
    <div id="jobs" className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-[#6A38C2]">Latest & Top Job Opening </span> Job
        Openings
      </h1>
      {/* <div className="grid grid-cols-3 gap-4 my-5">
        {allJobs.length >= 0 ?allJobs.slice(0, 3).map((job) => (
          <LatestJobCards key={job._id} job={job} />
        )) : <span>Job Not Found</span>}
      </div> */}
      <div className="grid grid-cols-3 gap-4 my-5">
        {allJobs.length > 0 ? (
          [...allJobs]
            .sort(() => 0.5 - Math.random()) // shuffle the array randomly
            .slice(0, 3) // take first 3 jobs
            .map((job) => <LatestJobCards key={job._id} job={job} />)
        ) : (
          <span>Job Not Found</span>
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
