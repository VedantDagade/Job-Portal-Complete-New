// useGetAllJobs.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";

const useGetAllJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get`);
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
        // if (res.data.success) {
        //   console.log("✅ Jobs fetched from backend:", res.data.jobs); // debug
        //   dispatch(setAllJobs(res.data.jobs));
        // }

      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchAllJobs();
  }, [dispatch]);
};

export default useGetAllJobs;
