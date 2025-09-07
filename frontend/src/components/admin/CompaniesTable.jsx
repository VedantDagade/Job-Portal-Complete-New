import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"; // Importing Table components (reusable UI components)
import { Avatar, AvatarImage } from "../ui/avatar"; // Avatar component for displaying company logo
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"; // Popover for dropdown actions
import { Edit2, MoreHorizontal } from "lucide-react"; // Icons for actions
import { useSelector } from "react-redux"; // Hook to access Redux store

const CompaniesTable = () => {
  // Step 1: Access the Redux store for 'company' slice
  // Using optional chaining and default to empty array to avoid runtime errors
  const companies = useSelector((store) => store.company?.companies ?? []);

  return (
    <div>
      {/* Step 2: Render the table */}
      <Table>
        {/* Step 2a: Table Caption */}
        <TableCaption>A List of your recent Registered Companies</TableCaption>

        {/* Step 2b: Table Header */}
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead> {/* Company logo */}
            <TableHead>Name</TableHead> {/* Company name */}
            <TableHead>Date</TableHead> {/* Registration date */}
            <TableHead className="text-right">Action</TableHead>{" "}
            {/* Actions (edit/delete) */}
          </TableRow>
        </TableHeader>

        {/* Step 3: Table Body */}
        <TableBody>
          {/* Step 3a: Conditional rendering if no companies */}
          {companies.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500">
                Companies Not Found... or You Haven't Registered Any Company
                Yet.
              </TableCell>
            </TableRow>
          ) : (
            /* Step 3b: Map over companies array to render each row */
            companies.map((company) => (
              <TableRow key={company._id}>
                {/* Step 3b-i: Company Logo */}
                <TableCell>
                  <Avatar className="w-10 h-10 rounded-full">
                    <AvatarImage
                      // Replace with actual company logo URL if available
                      src={company.logo}
                      alt="Company Logo"
                    />
                  </Avatar>
                </TableCell>

                {/* Step 3b-ii: Company Name */}
                <TableCell>{company.name}</TableCell>

                {/* Step 3b-iii: Registration Date */}
                <TableCell>{company.createdAt.split("T")[0]}</TableCell>

                {/* Step 3b-iv: Actions (Edit/Delete) using Popover */}
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    {/* Trigger icon for popover */}
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>

                    {/* Popover content (edit button) */}
                    <PopoverContent className="w-32">
                      <div className="flex items-center gap-2 w-fit cursor-pointer">
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
