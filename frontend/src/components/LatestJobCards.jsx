import React from "react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-5 bg-white border border-gray-100 rounded-lg shadow-sm space-y-3 cursor-pointer"
    >
      <div>
        <h1 className="text-lg font-semibold">{job?.company?.name}</h1>
        <p className="text-gray-500">India</p>
      </div>

      <div>
        <h1 className="text-lg font-bold my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>

      <div className="flex gap-2 flex-wrap mt-4">
        <Badge className="bg-blue-50 text-blue-700 font-bold">
          {job?.position} Positions
        </Badge>
        <Badge className="bg-red-50 text-red-700 font-bold">
          {job?.jobType}
        </Badge>
        <Badge className="bg-purple-50 text-purple-700 font-bold">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
