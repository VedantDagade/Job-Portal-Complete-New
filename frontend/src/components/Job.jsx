import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

const Job = () => {
  return (
    <div className="flex items-center gap-4">
      <p>2 Days ago</p>
      <Button variant="outline" className="rounded-full" size="icon">
        <Bookmark />
      </Button>
      <Button  variant="outline" size="icon">
        <Avatar className="w-12 h-12 rounded-full">
          <AvatarImage
            src="https://imgs.search.brave.com/W3e7ENketSFhHPpNSOwXwdr-myxvrhIRfI6pWTHdAGk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/LmNvbS9pbWFnZS1j/ZG4vaW1hZ2VzL2t0/czkyOHBkL3Byb2R1/Y3Rpb24vZDlkYTk3/NzliZjNhYjJhZjBi/NTBhMDY1Yjc4Yzg2/OWE0NjA3YWRmNC03/MjB4NzIwLndlYnA_/dz01MTImcT03MiZm/bT13ZWJw"
            alt="Company Logo"
          />
        </Avatar>
      </Button>
    </div>
  );
};

export default Job;
