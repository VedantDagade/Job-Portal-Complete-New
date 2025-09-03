import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const { user } = useSelector((store) => store.auth);

  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.map((skill) => skill) || "",
    file: user?.profile?.resume || null,
  });

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    const { id, value, files } = e.target;
    setInput((prev) => ({
      ...prev,
      [id]: files ? files[0] : value,
    }));
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      const res = await axios.put(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false); // close only after success
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md w-full p-6 rounded-2xl shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            Update Profile
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500 text-center">
            Update your personal information and upload a resume.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submitHandler} className="space-y-4">
          {/* Name */}
          <div className="grid gap-1">
            <Label htmlFor="fullname">Name</Label>
            <Input
              id="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
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
              onChange={changeEventHandler}
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
              onChange={changeEventHandler}
              placeholder="Enter your number"
            />
          </div>

          {/* Bio */}
          <div className="grid gap-1">
            <Label htmlFor="bio">Bio</Label>
            <Input
              id="bio"
              value={input.bio}
              onChange={changeEventHandler}
              placeholder="Write a short bio..."
            />
          </div>

          {/* Skills */}
          <div className="grid gap-1">
            <Label htmlFor="skills">Skills</Label>
            <Input
              id="skills"
              value={input.skills}
              onChange={changeEventHandler}
              placeholder="e.g. React, Node.js, MongoDB"
            />
          </div>

          {/* Resume */}
          <div className="grid gap-1">
            <Label htmlFor="file">Resume</Label>
            <Input id="file" type="file" onChange={fileChangeHandler} />
          </div>

          {/* Update Button */}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
