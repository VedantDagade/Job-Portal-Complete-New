import React from "react";
import { Badge } from "@/components/ui/badge";

const LatestJobCards = () => {
  return (
    <div className="p-5 bg-white border border-gray-100 rounded-lg shadow-sm space-y-3 cursor-pointer">
      <div>
        <h1 className="text-lg font-semibold">Company Name</h1>
        <p className="text-gray-500">India</p>
      </div>

      <div>
        <h1 className="text-lg font-bold my-2">Job Title</h1>
        <p className="text-sm text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, quaerat!
        </p>
      </div>

      <div className="flex gap-2 flex-wrap mt-4">
        <Badge className="bg-blue-50 text-blue-700 font-bold">
          12 Positions
        </Badge>
        <Badge className="bg-red-50 text-red-700 font-bold">Part Time</Badge>
        <Badge className="bg-purple-50 text-purple-700 font-bold">
          45 LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
