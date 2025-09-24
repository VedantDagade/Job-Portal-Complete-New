// JobDescription.jsx (final)
import React, { useEffect, useState, useRef } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./shared/Navbar";
import Footer from "./Footer";
import { toast } from "sonner";

const JobDescription = () => {
  const user = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();
  const { singleJob } = useSelector((store) => store.job);
  const { id: jobId } = useParams(); // route: /jobs/:id

  const [isApplied, setIsApplied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(null);

  // guard to prevent duplicate fetch calls in dev StrictMode
  const fetchedRef = useRef(false);
 const isDev = import.meta.env.MODE === "development";

  // update applied state when job or user changes
  useEffect(() => {
    if (singleJob && user) {
      const alreadyApplied = singleJob?.application?.some(
        (app) => app?.applicant?._id === user._id
      );
      setIsApplied(Boolean(alreadyApplied));
    } else {
      setIsApplied(false);
    }
  }, [singleJob, user]);

  // Core fetch: tries a preferred endpoint first then fallback
  const fetchAndStoreJob = async (
    skipLoading = false,
    preferEndpoint = "default"
  ) => {
    if (!skipLoading) setLoading(true);
    setError(null);
    setNotFound(false);

    // Prevent duplicate fetch in StrictMode dev
    if (fetchedRef.current) {
      if (isDev) console.debug("fetchAndStoreJob: already fetched, skipping.");
      if (!skipLoading) setLoading(false);
      return null;
    }
    fetchedRef.current = true;

    const base = JOB_API_END_POINT.replace(/\/$/, "");
    // REORDER this array to match your backend. The first URL is tried first.
    // If your backend's working endpoint is `${base}/get/:id`, put that first.
    const candidates =
      preferEndpoint === "get-first"
        ? [`${base}/get/${jobId}`, `${base}/${jobId}`]
        : [`${base}/${jobId}`, `${base}/get/${jobId}`];

    for (let i = 0; i < candidates.length; i++) {
      const url = candidates[i];
      try {
        if (isDev) console.debug("Trying job URL:", url);
        const res = await axios.get(url, { withCredentials: true });
        // normalize response shape
        const jobData =
          res.data?.job ??
          res.data?.data ??
          (res.data?.success ? res.data : res.data);
        if (jobData) {
          dispatch(setSingleJob(jobData));
          if (!skipLoading) setLoading(false);
          return jobData;
        } else {
          // Unexpected shape but store raw
          dispatch(setSingleJob(res.data));
          if (!skipLoading) setLoading(false);
          return res.data;
        }
      } catch (err) {
        // For 404, try next candidate quietly. For others, surface error.
        const status = err?.response?.status;
        if (status === 404) {
          if (isDev)
            console.debug(
              `Request to ${url} failed: 404. Trying next candidate if available.`
            );
          if (i === candidates.length - 1) {
            setNotFound(true);
            if (!skipLoading) setLoading(false);
            return null;
          }
          // else continue
        } else if (status === 401 || status === 403) {
          setError("You are not authorized to view this job.");
          if (!skipLoading) setLoading(false);
          return null;
        } else {
          setError("Failed to fetch job. Check console/network for details.");
          if (isDev) console.error("Fetch job error:", err);
          if (!skipLoading) setLoading(false);
          return null;
        }
      }
    }
  };

  // initial fetch — reset guard when jobId changes
  useEffect(() => {
    fetchedRef.current = false;
    if (!jobId) {
      setLoading(false);
      setError("No job id provided in URL.");
      return;
    }
    // If you know the working endpoint is /get/:id, pass "get-first"
    fetchAndStoreJob(false /*skipLoading*/, "default" /*or "get-first"*/);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobId]);

  const applyHandler = async () => {
    if (!user) {
      toast.error("Please login to apply.");
      return;
    }
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT.replace(/\/$/, "")}/apply/${jobId}`,
        {},
        { withCredentials: true }
      );
      if (res.data?.success) {
        setIsApplied(true);
        toast.success("✅ Applied successfully!");

        // Reset guard so refresh runs
        fetchedRef.current = false;
        await fetchAndStoreJob(true /*skipLoading*/);
      } else {
        toast.error(res.data?.message ?? "Failed to apply");
      }
    } catch (err) {
      console.error("Apply error:", err);
      toast.error(err.response?.data?.message ?? "⚠️ Failed to apply.");
    }
  };

  // If user not logged in — show login prompt
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
      <div className="max-w-7xl mx-auto my-8">
        {loading && (
          <div className="p-6 bg-white rounded shadow">Loading job...</div>
        )}

        {!loading && notFound && (
          <div className="p-6 bg-yellow-50 rounded shadow">
            <h2 className="font-semibold text-lg">Job not found</h2>
            <p className="text-sm text-gray-600 mt-2">
              The job may have been removed or the link is invalid.
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="p-6 bg-red-50 rounded shadow text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && singleJob && (
          <>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-bold text-xl ">
                  {singleJob?.title ?? "Untitled"}
                </h1>
                <div className="flex gap-2 flex-wrap mt-4">
                  <Badge className="bg-blue-50 text-blue-700 font-bold">
                    {singleJob?.position ?? "0"} Positions
                  </Badge>
                  <Badge className="bg-red-50 text-red-700 font-bold">
                    {singleJob?.jobType ?? "Not specified"}
                  </Badge>
                  <Badge className="bg-purple-50 text-purple-700 font-bold">
                    {singleJob?.salary
                      ? `${singleJob.salary} LPA`
                      : "Salary N/A"}
                  </Badge>
                </div>
              </div>
              <Button
                onClick={applyHandler}
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
                Role:{" "}
                <span className="pl-4 font-normal text-gray-800">
                  {singleJob?.title ?? "—"}
                </span>
              </h1>
              <h1 className="font-bold my-1">
                Location:{" "}
                <span className="pl-4 font-normal text-gray-800">
                  {singleJob?.location ?? "—"}
                </span>
              </h1>
              <h1 className="font-bold my-1">
                Description:{" "}
                <span className="pl-4 font-normal text-gray-800">
                  {singleJob?.description ?? "No description provided."}
                </span>
              </h1>
              <h1 className="font-bold my-1">
                Experience:{" "}
                <span className="pl-4 my-4 font-normal text-gray-800">
                  {singleJob?.experienceLevel ?? "0"} Years
                </span>
              </h1>
              <h1 className="font-bold my-1">
                Salary:{" "}
                <span className="pl-4 font-normal text-gray-800">
                  {singleJob?.salary
                    ? `${singleJob.salary} LPA`
                    : "Not specified"}
                </span>
              </h1>
              <h1 className="font-bold my-1">
                Total Applicants:{" "}
                <span className="pl-4 font-normal text-gray-800">
                  {Array.isArray(singleJob?.application)
                    ? singleJob.application.length
                    : 0}
                </span>
              </h1>
              <h1 className="font-bold my-1">
                Posted Date:{" "}
                <span className="pl-4 font-normal text-gray-800">
                  {singleJob?.createdAt
                    ? singleJob.createdAt.split("T")[0]
                    : "—"}
                </span>
              </h1>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default JobDescription;
