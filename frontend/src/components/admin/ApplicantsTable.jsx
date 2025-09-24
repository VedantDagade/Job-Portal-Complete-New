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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";

const shortListingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  //get all applicants here from applicants.jsx
  const { applicants } = useSelector((store) => store?.application);

  //accept reject handler
  const statusHandler = async (status, id) => {
    if (!id) {
      toast.error("Invalid application id");
      return;
    }

    try {
      const base = APPLICATION_API_END_POINT.replace(/\/$/, "");
      // <-- adjust here if your backend expects a different path:
      const url = `${base}/status/${id}/update`;
      console.debug("Updating application status — URL:", url, "payload:", {
        status,
      });

      const res = await axios.put(
        url,
        { status },
        { withCredentials: true } // include cookies if backend needs them
      );

      if (res?.data?.success) {
        toast.success(res.data.message ?? "Status updated");
        // optionally refresh list or update Redux here
      } else {
        toast.error(res?.data?.message ?? "Failed to update status");
      }
    } catch (err) {
      // safe error handling
      const msg =
        err?.response?.data?.message ||
        err?.response?.data ||
        err?.message ||
        "Server error";
      console.error("statusHandler error:", err);
      toast.error(msg);
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of Your recent applied User.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="float-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants?.application?.map((item, index) => (
              <TableRow key={item?._id ?? index}>
                <TableCell>{item?.applicant?.fullname}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell className="text-blue-600 cursor-pointer">
                  {item?.applicant?.profile?.resume ? (
                    <a
                      href={item.applicant.profile.resume}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.applicant.profile.resumeOriginalName}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>

                <TableCell>
                  {item?.applicant?.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {shortListingStatus.map((status, index) => {
                        const isAccepted = status === "Accepted";
                        return (
                          <div
                            onClick={() => statusHandler(status, item?._id)}
                            key={index}
                            className={`flex w-full justify-center items-center my-1 px-2 py-1 rounded-md font-medium cursor-pointer transition 
           ${
             isAccepted
               ? "bg-green-500 text-white hover:bg-green-600"
               : "bg-red-500 text-white hover:bg-red-600"
           }`}
                          >
                            <span>{status}</span>
                          </div>
                        );
                      })}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
