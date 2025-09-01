import React from "react";
import Navbar from "./shared/Navbar";

import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";

const skills = [
  "html",
  "css",
  "js",
  "Nodejs",
  "MongoDb",
  "Reactjs",
  "Tailwind",
];

const Profile = () => {
  const { user } = useSelector((store) => store.auth);

  const isResume = true;

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
              <h1 className="font-medium text-xl">{user.fullname}</h1>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Explicabo, ea.
              </p>
            </div>
          </div>
          <Button className="text-right" variant="outline">
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <h1 className="font-bold text-lg my-2">Contact</h1>
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user.phoneNumber}</span>
          </div>
        </div>

        <hr />

        <div className="my-5">
          <h1 className="font-bold text-lg my-2">Skills</h1>
          <div className="flex items-center gap-1">
            {skills.length != 0 ? (
              skills.map((item, index) => <Badge key={index}>{item}</Badge>)
            ) : (
              <span>N/A</span>
            )}
          </div>
        </div>

        <hr className="my-2" />

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="font-bold text-lg my-2">Resume</Label>
          {isResume ? (
            <a
              target="blank"
              className="text-blue-500 w-full hover:underline cursor-pointer"
              href="https://youtube.com"
            >
              Resume Link
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
    </div>
  );
};

export default Profile;
