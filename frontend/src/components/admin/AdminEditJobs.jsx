// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "sonner";
// import Navbar from "../shared/Navbar";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";
// import { JOB_API_END_POINT } from "@/utils/constant";

// const AdminEditJobs = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(true);
//   const [job, setJob] = useState({
//     title: "",
//     description: "",
//     salary: "",
//     location: "",
//   });

//   // Fetch job details
//   useEffect(() => {
//     const fetchJob = async () => {
//       try {
//         const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`, {
//           withCredentials: true,
//         });

//         if (res.data?.success && res.data.job) {
//           const j = res.data.job;
//           setJob({
//             title: j.title || "",
//             description: j.description || "",
//             salary: j.salary || "",
//             location: j.location || "",
//           });
//         } else {
//           toast.error("Job not found!");
//           navigate("/admin/jobs");
//         }
//       } catch (err) {
//         console.error("Error fetching job:", err);
//         toast.error("Failed to load job details.");
//         navigate("/admin/jobs");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJob();
//   }, [id, navigate]);

//   // Handle form field changes
//   const handleChange = (e) => {
//     setJob((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value ?? "",
//     }));
//   };

//   // Submit updated job
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.put(`${JOB_API_END_POINT}/update/${id}`, job, {
//         withCredentials: true,
//       });

//       if (res.data?.success) {
//         toast.success("Job updated successfully!");
//         navigate("/admin/jobs");
//       } else {
//         toast.error(res.data?.message || "Update failed. Try again.");
//       }
//     } catch (err) {
//       console.error("Error updating job:", err);
//       toast.error("Something went wrong!");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <div className="max-w-3xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
//         <h1 className="text-2xl font-semibold text-gray-800 mb-6">Edit Job</h1>

//         {loading ? (
//           <p className="text-gray-500">Loading job details...</p>
//         ) : (
//           <form
//             onSubmit={handleSubmit}
//             className="bg-white shadow-md rounded-lg p-6 space-y-5"
//           >
//             {/* Title */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Job Title
//               </label>
//               <Input
//                 type="text"
//                 name="title"
//                 value={job.title || ""}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             {/* Description */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Description
//               </label>
//               <textarea
//                 name="description"
//                 value={job.description || ""}
//                 onChange={handleChange}
//                 required
//                 className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                 rows="4"
//               ></textarea>
//             </div>

//             {/* Salary */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Salary
//               </label>
//               <Input
//                 type="number"
//                 name="salary"
//                 value={job.salary || ""}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             {/* Location */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Location
//               </label>
//               <Input
//                 type="text"
//                 name="location"
//                 value={job.location || ""}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             {/* Buttons */}
//             <div className="flex items-center gap-4">
//               <Button
//                 type="submit"
//                 className="bg-blue-600 hover:bg-blue-700 text-white"
//               >
//                 Save Changes
//               </Button>
//               <Button
//                 type="button"
//                 onClick={() => navigate("/admin/jobs")}
//                 variant="outline"
//               >
//                 Cancel
//               </Button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminEditJobs;
