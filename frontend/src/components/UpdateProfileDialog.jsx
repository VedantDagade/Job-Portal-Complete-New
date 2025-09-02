import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { useState } from "react";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.map((skill) => skill) || "",
    file: user?.profile?.resume || null,
  });

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    setInput((prev) => ({
      ...prev,
      [id]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile Data:", input); // 🔗 send to backend with axios/fetch
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md w-full p-6 rounded-2xl shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            Update Profile
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="grid gap-1">
            <Label htmlFor="fullname">Name</Label>
            <Input
              id="fullname"
              value={input.fullname}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div className="grid gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={input.email}
              onChange={handleChange}
              placeholder="example@email.com"
            />
          </div>

          {/* Phone Number */}
          <div className="grid gap-1">
            <Label htmlFor="phoneNumber">Number</Label>
            <Input
              id="phoneNumber"
              type="tel"
              value={input.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your number"
            />
          </div>

          {/* Bio */}
          <div className="grid gap-1">
            <Label htmlFor="bio">Bio</Label>
            <Input
              id="bio"
              value={input.bio}
              onChange={handleChange}
              placeholder="Write a short bio..."
            />
          </div>

          {/* Skills */}
          <div className="grid gap-1">
            <Label htmlFor="skills">Skills</Label>
            <Input
              id="skills"
              value={input.skills}
              onChange={handleChange}
              placeholder="e.g. React, Node.js, MongoDB"
            />
          </div>

          {/* Resume */}
          <div className="grid gap-1">
            <Label htmlFor="file">Resume</Label>
            <Input id="file" type="file" onChange={handleChange} />
          </div>

          {/* Update Button */}
          <Button type="submit" className="w-full">
            Update
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
