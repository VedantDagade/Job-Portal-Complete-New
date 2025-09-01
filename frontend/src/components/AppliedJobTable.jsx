import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";


const AppliedJobTable = () => {
  return (
    <div>
      <Table>
        <TableCaption>List of Your Applied Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Roll</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2, 3, 4, 5].map((item, index) => (
            <TableRow key={index}>
              <TableCell>17/07/2004</TableCell>
              <TableCell>Frontend Developer</TableCell>
              <TableCell>Google</TableCell>
              <TableCell className="text-right">
                <Badge>Selected</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
