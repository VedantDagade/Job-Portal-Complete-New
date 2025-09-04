import React, { useEffect } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";

import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./shared/Navbar";
import Footer from "./Footer";

const JobDescription = () => {
  const user = useSelector((store) => store.auth.user); // get logged-in user
  const isApplied = false;
  const dispatch = useDispatch();
  const { singleJob } = useSelector((store) => store.job);

  const params = useParams();
  const jobId = params.id;

  useEffect(() => {
    if (!jobId) return; // prevent fetch if jobId is undefined

    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          // Ideally, use setSingleJob, not setAllJobs
          dispatch(setSingleJob(res.data.job)); // wrap in array if your store expects array
        }
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };

    fetchSingleJob();
  }, [dispatch, jobId]); // ✅ include jobId

  // If user is not logged in, show a message
  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar />

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
      <div className="max-w-7xl mx-auto my-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-xl ">{singleJob?.title}</h1>
            <div className="flex gap-2 flex-wrap mt-4">
              <Badge className="bg-blue-50 text-blue-700 font-bold">
                {singleJob?.position} Positions
              </Badge>
              <Badge className="bg-red-50 text-red-700 font-bold">
                {singleJob?.jobType}
              </Badge>
              <Badge className="bg-purple-50 text-purple-700 font-bold">
                {singleJob?.salary} LPA
              </Badge>
            </div>
          </div>
          <Button
            disabled={isApplied}
            className={`rounded-lg ${
              isApplied
                ? `bg-gray-600 cursor-not-allowed`
                : `bg-[#7209b7] hover:bg-[#5f32ad] cursor-pointer`
            }`}
          >
            {isApplied ? `Already Applied` : `Apply Now`}
          </Button>
        </div>
        <h1 className="border-b-2 border-b-gray-300 py-4 font-bold text-lg text-gray-600">
          Job Description
        </h1>
        <div className="my-4">
          <h1 className="font-bold my-1">
            {" "}
            Role:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.title}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            {" "}
            Location:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.location}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            {" "}
            Description:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.description}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            {" "}
            Experience:{" "}
            <span className="pl-4 my-4 font-normal text-gray-800">
              {singleJob?.experienceLevel} Years
            </span>
          </h1>
          <h1 className="font-bold my-1">
            {" "}
            salary:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.salary} LPA
            </span>
          </h1>
          <h1 className="font-bold my-1">
            {" "}
            Total Applicants:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.application?.length}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            {" "}
            Posted Date:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.createdAt?.split("T")[0]}
            </span>
          </h1>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default JobDescription;
