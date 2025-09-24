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
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const { allAppliedJobs = [] } = useSelector((store) => store.job);

  return (
    <div>
      <Table>
        <TableCaption>List of Your Applied Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4}>
                You haven't applied to any jobs yet.
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJob) => {
              // adapt field access to your actual payload shape:
              const date =
                appliedJob?.createdAt ?? appliedJob?.appliedAt ?? null;
              const role =
                appliedJob?.job?.title ??
                appliedJob?.jobTitle ??
                "Role not specified";
              const company =
                appliedJob?.job?.company?.name ??
                appliedJob?.company?.name ??
                "Company not specified";
              const status = appliedJob?.status ?? "Pending";

              return (
                <TableRow key={appliedJob._id ?? appliedJob.id}>
                  <TableCell>
                    {date ? new Date(date).toLocaleDateString() : "—"}
                  </TableCell>
                  <TableCell>{role}</TableCell>
                  <TableCell>{company}</TableCell>
                  <TableCell className="text-right">
                    <Badge>{status}</Badge>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
