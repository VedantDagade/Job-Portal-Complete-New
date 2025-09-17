import React, { useEffect, useState, useRef } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { Eye, Edit2 } from "lucide-react"; // Shadcn UI icons
import { MoreVertical } from "lucide-react"; // Shadcn UI icon


const AdminJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const dropdownRef = useRef(null);

  // Fetch jobs once on mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
          withCredentials: true,
        });
        if (res.data?.success && Array.isArray(res.data.jobs)) {
          setJobs(res.data.jobs);
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

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter jobs by search
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
        {/* Search & New Job Button */}
        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 mb-6">
          <Input
            className="w-full sm:w-64"
            placeholder="Filter by Job Title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
          >
            New Job
          </Button>
        </div>

        {/* Jobs Table */}
        {loading ? (
          <p className="text-center text-gray-500">Loading jobs...</p>
        ) : filteredJobs.length === 0 ? (
          <p className="text-center text-gray-500">No jobs found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 bg-white rounded-lg shadow-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left border-b">Title</th>
                  <th className="p-3 text-left border-b">Description</th>
                  <th className="p-3 text-left border-b">Salary</th>
                  <th className="p-3 text-left border-b">Location</th>
                  <th className="p-3 text-center border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.map((job) => (
                  <tr
                    key={job._id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="p-3 border-b">{job.title}</td>
                    <td className="p-3 border-b">{job.description}</td>
                    <td className="p-3 border-b">{job.salary}</td>
                    <td className="p-3 border-b">{job.location}</td>

                    <td className="p-3 border-b text-center relative">
                      {/* Actions Button */}
                      <Button
                        onClick={() =>
                          setOpenDropdownId(
                            openDropdownId === job._id ? null : job._id
                          )
                        }
                        className="bg-gray-700 hover:bg-gray-800 text-white px-2 py-2 rounded-md"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </Button>

                      {/* Dropdown */}
                      {openDropdownId === job._id && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-md z-20 p-1">
                          <Button
                            variant="ghost"
                            onClick={() =>
                              navigate(`/admin/jobs/edit/${job._id}`)
                            }
                            className="w-full flex items-center gap-2 justify-start px-3 py-2 text-gray-800 hover:bg-gray-100"
                          >
                            <Edit2 className="w-4 h-4" />
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={() =>
                              navigate(`/admin/jobs/${job._id}/applicants`)
                            }
                            className="w-full flex items-center gap-2 justify-start px-3 py-2 text-gray-800 hover:bg-gray-100"
                          >
                            <Eye className="w-4 h-4" />
                            Applicants
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminJobs;
