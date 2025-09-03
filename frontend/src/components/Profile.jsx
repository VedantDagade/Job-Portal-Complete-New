import React, { useState } from "react";
import Navbar from "./shared/Navbar";

import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";

const Profile = () => {
  const { user } = useSelector((store) => store.auth);

  //const isResume = true;
  const isResume = Boolean(user?.profile?.resume);

  const [open, setOpen] = useState(false);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="w-24 h-24 rounded-full">
              <AvatarImage
                className="mt-2"
                src="https://imgs.search.brave.com/Y_hU5wT4IYRa1yUzMC0a8yvx4jxxLEb8rXWL_DYiqZ8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzEyLzg4LzkxLzkx/LzM2MF9GXzEyODg5/MTkxMDZfS3hMRG1U/ZmU3ZkZLRVBKMVQ3/WDFjRnVzRngzUUJF/ZTIuanBn"
                alt="Company Logo"
              />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <h1 className="font-bold text-lg my-2">Contact</h1>
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <hr />

        <div className="my-5">
          <h1 className="font-bold text-lg my-2">Skills</h1>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills && user.profile.skills.length > 0 ? (
              user.profile.skills
                .filter((skill) => skill.trim() !== "") // remove empty strings
                .map((item, index) => (
                  <Badge key={index} className="px-2 py-0.5 rounded-full">
                    {item}
                  </Badge>
                ))
            ) : (
              <span>N/A</span>
            )}
          </div>
        </div>

        <hr className="my-2" />

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="font-bold text-lg my-2">
            {user?.profile?.isResume}
          </Label>
          {isResume ? (
            <a
              target="blank"
              className="text-blue-500 w-full hover:underline cursor-pointer"
              href={`https://docs.google.com/viewer?url=${encodeURIComponent(
                user.profile.resume
              )}&embedded=true`}
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>N/A</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl my-5 p-5">
        <h1 className="font-bold text-lg my-2">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
