import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setAllAdminJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      if (!user || user.role !== "recruiter") return;

      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
          withCredentials: true,
        });

        console.log("Admin jobs API response:", res.data);

        if (res.data?.success && Array.isArray(res.data.jobs)) {
          dispatch(setAllAdminJobs(res.data.jobs));
        } else {
          console.warn("Unexpected response:", res.data);
        }
      } catch (error) {
        console.error("Error fetching admin jobs:", error);
      }
    };

    fetchAllAdminJobs();
  }, [dispatch, user]);
};

export default useGetAllAdminJobs;
