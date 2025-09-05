import React from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";



const Companies = () => {

  const navigate =useNavigate();


  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 my-5">
          <Input className="w-full sm:w-64" placeholder="Filter by Name" />
          <Button onClick={() => navigate("/admin/companies/create")} className="w-full sm:w-auto">New Company</Button>
        </div>
        <CompaniesTable/>
      </div>
    </div>
  );
};

export default Companies;
