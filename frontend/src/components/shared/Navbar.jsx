import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import React from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-white shadow-sm">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <nav>
          <h1 className="text-2xl font-bold">
            <Link to="/" className="hover:opacity-80 transition">
              Job <span className="text-[#F83002]">Portal</span>
            </Link>
          </h1>
        </nav>

        {/* Navigation + Avatar */}
        <div className="flex items-center gap-4 md:gap-12">
          {/* Navigation Links */}
          <ul className="flex flex-wrap md:flex-nowrap items-center gap-3 md:gap-5 font-medium text-gray-700">
            <li>
              <Link to="/" className="hover:text-[#F83002] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-[#F83002] transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/jobs"
                className="hover:text-[#F83002] transition-colors"
              >
                Jobs
              </Link>
            </li>
            <li>
              <Link
                to="/browse"
                className="hover:text-[#F83002] transition-colors"
              >
                Browse
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-[#F83002] transition-colors"
              >
                Contact Us
              </Link>
            </li>
          </ul>

          {!user ? (
            <div className="flex items-center gap-2 md:gap-4">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#4906be]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    className="h-12 w-12 rounded-full"
                    src={
                      user?.profile?.profilePhoto ||
                      "https://github.com/shadcn.png"
                    }
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-64 border rounded-2xl p-4 shadow-lg bg-white">
                {/* User Info */}
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      className="rounded-full"
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {user.fullname}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Lorem ipsum dolor sit amet.
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-1 text-gray-700">
                  {/* Profile */}
                  <button className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-gray-100 transition">
                    <User2 className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-600">
                      <Link to="/profile">View Profile</Link>
                    </span>
                  </button>

                  {/* Logout */}
                  <button
                    className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-gray-100 transition"
                    onClick={logoutHandler}
                  >
                    <LogOut className="w-5 h-5 text-red-600" />
                    <span className="text-sm font-medium text-red-600">
                      Logout
                    </span>
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
