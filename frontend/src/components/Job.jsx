import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Badge } from "./ui/badge";

const Job = () => {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">2 Days ago</p>
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
          <h1 className="font-medium text-lg">Company Name</h1>
          <p className="text-sm text-gray-600">India</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">Title</h1>
        <p className="text-sm text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat in
          consequuntur mollitia quod obcaecati? Eius dolorum laborum veritatis
          beatae saepe.
        </p>
      </div>

      <div className="flex gap-2 flex-wrap mt-4">
        <Badge className="bg-blue-50 text-blue-700 font-bold">
          12 Positions
        </Badge>
        <Badge className="bg-red-50 text-red-700 font-bold">Part Time</Badge>
        <Badge className="bg-purple-50 text-purple-700 font-bold">45 LPA</Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button variant="outline">Details</Button>
        <Button className="bg-[#7209b7]">Save For Later</Button>
      </div>
    </div>
  );
};

export default Job;
