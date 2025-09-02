import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const JobDescription = () => {
  const isApplied = false;

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl ">Fullstack Developer</h1>
          <div className="flex gap-2 flex-wrap mt-4">
            <Badge className="bg-blue-50 text-blue-700 font-bold">
              12 Positions
            </Badge>
            <Badge className="bg-red-50 text-red-700 font-bold">
              Part Time
            </Badge>
            <Badge className="bg-purple-50 text-purple-700 font-bold">
              45 LPA
            </Badge>
          </div>
        </div>
        <Button
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied
              ? `bg-gray-600 cursor-not-allowed`
              : `bg-[#7209b7] hover:bg-[#5f32ad] cursor-pointer`
          }`}
        >
          {isApplied ? `Already Applied` : `Apply Now`}
        </Button>
      </div>
      <h1 className="border-b-2 border-b-gray-300 py-4 font-bold">Job Description</h1>
      <div className="my-4">
        <h1 className="font-bold my-1"> Role: <span className="pl-4 font-normal text-gray-800">Frontend Developer</span></h1>
        <h1 className="font-bold my-1"> Location: <span className="pl-4 font-normal text-gray-800">Pune</span></h1>
        <h1 className="font-bold my-1"> Description: <span className="pl-4 font-normal text-gray-800">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</span></h1>
        <h1 className="font-bold my-1"> Experience: <span className="pl-4 my-4 font-normal text-gray-800">2 years</span></h1>
        <h1 className="font-bold my-1"> salary: <span className="pl-4 font-normal text-gray-800">45 LPA</span></h1>
        <h1 className="font-bold my-1"> Total Applicants: <span className="pl-4 font-normal text-gray-800">4</span></h1>
        <h1 className="font-bold my-1"> Posted Date: <span className="pl-4 font-normal text-gray-800">17-07-2024</span></h1>
        
      </div>
    </div>
  );
};

export default JobDescription;
