import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setsearchCompanyByText } from "@/redux/companySlice";
import AdminJobsTable from "./AdminJobsTable";

const AdminJobs = () => {

  const navigate = useNavigate();

  //for filter in company table
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setsearchCompanyByText(input));
  }, [input, dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 my-5">
          <Input
            className="w-full sm:w-64"
            placeholder="Filter by Name"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className="w-full sm:w-auto"
          >
            New Jobs
          </Button>
        </div>
        <AdminJobsTable/>
      </div>
    </div>
  );
};

export default AdminJobs;
