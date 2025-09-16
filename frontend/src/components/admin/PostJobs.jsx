import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const PostJobs = () => {
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

  const { companies } = useSelector((state) => state.company);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("Job posted successfully!");
        navigate("/admin/jobs");
        setInput({
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
      } else {
        toast.error(res.data.message || "Failed to post job.");
      }
    } catch (err) {
      console.error("Error posting job:", err);
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
          className="p-8 max-w-4xl w-full border border-gray-200 shadow-lg rounded-md space-y-4"
        >
          <h2 className="text-2xl font-bold mb-4">Post a New Job</h2>

          <div className="grid grid-cols-2 gap-4 mt-2">
            {/* Title */}
            <div>
              <Label>Title</Label>
              <Input
                className="mt-2"
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                required
              />
            </div>
            {/* Description */}
            <div>
              <Label>Description</Label>
              <Input
                className="mt-2"
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                required
              />
            </div>
            {/* Requirements */}
            <div>
              <Label>Requirements (comma separated)</Label>
              <Input
                className="mt-2"
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
              />
            </div>
            {/* Salary */}
            <div>
              <Label>Salary</Label>
              <Input
                className="mt-2"
                type="number"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                required
              />
            </div>
            {/* Location */}
            <div>
              <Label>Location</Label>
              <Input
                className="mt-2"
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                required
              />
            </div>
            {/* Job Type */}
            <div>
              <Label>Job Type</Label>
              <select
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                className="border rounded-md px-2 py-1 w-full mt-2"
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
              <Label>Experience Level (years)</Label>
              <Input
                className="mt-2"
                type="number"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                required
              />
            </div>
            {/* Positions */}
            <div>
              <Label>No. of Positions</Label>
              <Input
                className="mt-2"
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                required
              />
            </div>
            {/* Company for recruiter */}
            {user?.role === "recruiter" && (
              <div className="col-span-2">
                <Label>Company</Label>
                {companies.length > 0 ? (
                  <select
                    name="companyId"
                    value={input.companyId}
                    onChange={changeEventHandler}
                    className="border rounded-md px-2 py-1 w-full mt-2"
                  >
                    <option value="">Select Company</option>
                    {companies.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="text-xs text-red-600 font-bold my-1">
                    Please register a company first before posting jobs
                  </p>
                )}
              </div>
            )}
          </div>

          <Button type="submit" className="w-full mt-4" disabled={loading}>
            {loading ? "Posting..." : "Post New Job"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PostJobs;
