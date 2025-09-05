import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";

const CompaniesTable = () => {
  return (
    <div>
      <Table>
        <TableCaption>A List of your recent Registerd Companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <Avatar className="w-11 h-11 rounded-full">
                <AvatarImage
                  src="https://imgs.search.brave.com/Y_hU5wT4IYRa1yUzMC0a8yvx4jxxLEb8rXWL_DYiqZ8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzEyLzg4LzkxLzkx/LzM2MF9GXzEyODg5/MTkxMDZfS3hMRG1U/ZmU3ZkZLRVBKMVQ3/WDFjRnVzRngzUUJF/ZTIuanBn"
                  alt="Company Logo"
                />
              </Avatar>
            </TableCell>
            <TableCell>Company Name</TableCell>
            <TableCell>5/08/2025</TableCell>
            <TableCell className="text-right cursor-pointer">
              <Popover>
                <PopoverTrigger>
                  <MoreHorizontal />
                </PopoverTrigger>
                <PopoverContent className="w-32">
                  <div className="flex items-center gap-2 w-fit cursor-pointer">
                    <Edit2 className="w-4" />
                    <span>Edit To</span>
                  </div>
                </PopoverContent>
              </Popover>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
