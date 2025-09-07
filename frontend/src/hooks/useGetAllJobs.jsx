// useGetAllJobs.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";

const useGetAllJobs = (token) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) return; // Don't run if no token yet

    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) dispatch(setAllJobs(res.data.jobs));
      } catch (error) {
        console.error("Error fetching jobs:", error.response || error);
      }
    };

    fetchAllJobs();
  }, [dispatch, token]);
};

export default useGetAllJobs;
