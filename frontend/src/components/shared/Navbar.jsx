import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import React from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = false;
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        {/* Logo */}
        <nav>
          <h1 className="text-2xl font-bold">
            <Link to="/" className="hover:opacity-80 transition">
              Job <span className="text-[#F83002]">Portal</span>
            </Link>
          </h1>
        </nav>

        {/* Navigation + Avatar */}
        <div className="flex items-center gap-12">
          <ul className="flex items-center gap-5 font-medium">
            <li>Home</li>
            <li>Jobs</li>
            <li>Browse</li>
          </ul>

          {!user ? (
            <div className="flex items-center gap-2">
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
                    src="https://github.com/shadcn.png"
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
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Vedant Dagade
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
                      View Profile
                    </span>
                  </button>

                  {/* Logout */}
                  <button className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-gray-100 transition">
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
