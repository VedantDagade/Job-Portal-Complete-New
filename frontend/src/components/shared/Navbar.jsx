import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import React from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          Job <span className="text-[#F83002]">Portal</span>
        </h1>

        {/* Navigation + Avatar */}
        <div className="flex items-center gap-12">
          <ul className="flex items-center gap-5 font-medium">
            <li>Home</li>
            <li>Jobs</li>
            <li>Browse</li>
          </ul>

          {/* User Popover */}
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

            <PopoverContent className="w-60 border rounded-2xl p-4 shadow-lg">
              {/* User Info */}
              <div className="flex items-center gap-4 mb-4">
                <Avatar>
                  <AvatarImage
                    className="h-12 w-12 rounded-full"
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </Avatar>
                <div>
                  <h4 className="font-semibold text-gray-900">Vedant Dagade</h4>
                  <p className="text-sm text-muted-foreground">
                    Lorem ipsum dolor sit amet.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="link"
                  className="text-blue-600 hover:underline"
                >
                  View Profile
                </Button>
                <Button variant="link" className="text-red-600 hover:underline">
                  Logout
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
