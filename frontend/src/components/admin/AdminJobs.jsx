import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";

const AdminJobs = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]); // local state for jobs
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
          withCredentials: true, // send cookies
        });

        if (res.data?.success && Array.isArray(res.data.jobs)) {
          setJobs(res.data.jobs); // safe assignment
        } else {
          console.warn("Unexpected response:", res.data);
        }
      } catch (err) {
        console.error("Error fetching admin jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filtered jobs by search
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 my-5">
          <Input
            className="w-full sm:w-64"
            placeholder="Filter by Job Title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className="w-full sm:w-auto"
          >
            New Jobs
          </Button>
        </div>

        {loading ? (
          <p>Loading jobs...</p>
        ) : filteredJobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border p-2">Title</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Salary</th>
                <th className="border p-2">Location</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((job) => (
                <tr key={job._id}>
                  <td className="border p-2">{job.title}</td>
                  <td className="border p-2">{job.description}</td>
                  <td className="border p-2">{job.salary}</td>
                  <td className="border p-2">{job.location}</td>
                  <td className="border p-2">
                    <Button onClick={() => navigate(`/admin/jobs/${job._id}`)}>
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminJobs;
