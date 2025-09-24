// useGetAllJobs.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  // use the correct selector name
  const { searchQuery } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        // build URL correctly — when searchQuery is present add ?keyword=...
        const base = JOB_API_END_POINT.replace(/\/$/, "");
        const url = searchQuery
          ? `${base}/get?keyword=${encodeURIComponent(searchQuery)}`
          : `${base}/get`;

        const res = await axios.get(url, { withCredentials: true });

        if (res.data?.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchAllJobs();
  }, [dispatch, searchQuery]);
};

export default useGetAllJobs;
