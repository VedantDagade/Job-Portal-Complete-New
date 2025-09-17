import React, { useState, useEffect } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

const AdmminPostJobs = () => {
  const { jobId } = useParams();
  const isEditMode = Boolean(jobId);
  const navigate = useNavigate();

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: "",
    companyId: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch job if editing
  useEffect(() => {
    if (isEditMode) {
      const fetchJob = async () => {
        try {
          const res = await axios.get(`${JOB_API_END_POINT}/${jobId}`, {
            withCredentials: true,
          });

          if (res.data?.success && res.data.job) {
            const j = res.data.job;
            setInput({
              title: j.title || "",
              description: j.description || "",
              requirements: j.requirements || "",
              salary: j.salary || "",
              location: j.location || "",
              jobType: j.jobType || "",
              experience: j.experience || "",
              position: j.position || "",
              companyId: j.companyId || "",
            });
          } else {
            toast.error("Job not found");
            navigate("/admin/jobs");
          }
        } catch (err) {
          console.error(err);
          toast.error("Failed to fetch job data");
          navigate("/admin/jobs");
        }
      };
      fetchJob();
    }
  }, [jobId, isEditMode, navigate]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value ?? "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios({
        method: isEditMode ? "put" : "post",
        url: isEditMode
          ? `${JOB_API_END_POINT}/${jobId}`
          : `${JOB_API_END_POINT}/post`,
        data: input,
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(
          isEditMode ? "Job updated successfully!" : "Job posted successfully!"
        );
        navigate("/admin/jobs");
      } else {
        toast.error(res.data.message || "Failed to save job.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <form
          onSubmit={handleSubmit}
          className="p-8 max-w-4xl w-full border border-gray-200 shadow-lg rounded-md space-y-4 bg-white"
        >
          <h2 className="text-2xl font-bold mb-4">
            {isEditMode ? "Edit Job" : "Post a New Job"}
          </h2>

          <div className="grid grid-cols-2 gap-4 mt-2">
            {/* Title */}
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                required
              />
            </div>

            {/* Salary */}
            <div>
              <Label htmlFor="salary">Salary</Label>
              <Input
                id="salary"
                type="number"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
              />
            </div>

            {/* Location */}
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>

            {/* Job Type */}
            <div>
              <Label htmlFor="jobType">Job Type</Label>
              <select
                id="jobType"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                className="border rounded-md px-2 py-2 w-full mt-1"
              >
                <option value="">Select Job Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            {/* Experience */}
            <div>
              <Label htmlFor="experience">Experience Level (Years)</Label>
              <Input
                id="experience"
                type="number"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
              />
            </div>

            {/* Positions */}
            <div>
              <Label htmlFor="position">No. of Positions</Label>
              <Input
                id="position"
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
              className="w-full border rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            />
          </div>

          {/* Requirements */}
          <div>
            <Label htmlFor="requirements">Requirements</Label>
            <textarea
              id="requirements"
              name="requirements"
              value={input.requirements}
              onChange={changeEventHandler}
              className="w-full border rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? "Saving..." : isEditMode ? "Update Job" : "Post Job"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/jobs")}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdmminPostJobs;
