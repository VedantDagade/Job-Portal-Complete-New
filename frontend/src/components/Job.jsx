import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDiffrence = currentTime - createdAt;
    return Math.floor(timeDiffrence/ (1000*24*60*60))
  };

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{daysAgoFunction(job?.createdAt) == 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button variant="outline" size="icon">
          <Avatar className="w-12 h-12 rounded-full">
            <AvatarImage
              className="mt-2"
              src="https://imgs.search.brave.com/Y_hU5wT4IYRa1yUzMC0a8yvx4jxxLEb8rXWL_DYiqZ8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzEyLzg4LzkxLzkx/LzM2MF9GXzEyODg5/MTkxMDZfS3hMRG1U/ZmU3ZkZLRVBKMVQ3/WDFjRnVzRngzUUJF/ZTIuanBn"
              alt="Company Logo"
            />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-600">India</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
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
      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="cursor-pointer"
        >
          Details
        </Button>
        <Button className="bg-[#7209b7] cursor-pointer">Save For Later</Button>
      </div>
    </div>
  );
};

export default Job;
