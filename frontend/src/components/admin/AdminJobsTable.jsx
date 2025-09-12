import React, { useEffect, useState } from "react";
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
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  // Safe selectors: get companies array and current search string from Redux store
  const companies = useSelector((state) => state.company?.companies ?? []);
  const searchCompanyByText = useSelector(
    (state) => state.company?.searchCompanyByText ?? ""
  );

  // Local state for the filtered list shown in UI
  const [filteredCompany, setFilterCompany] = useState(companies);

  useEffect(() => {
    // Normalize query and filter defensively (handles null/undefined names)
    const query = (searchCompanyByText || "").toLowerCase().trim();

    const filtered = !query
      ? companies
      : companies.filter((company) =>
          (company?.name ?? "").toLowerCase().includes(query)
        );

    setFilterCompany(filtered);
  }, [companies, searchCompanyByText]);

  const navigate = useNavigate();

  return (
    <div>
      <Table>
        <TableCaption>List of recently registered companies</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredCompany.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500">
                Companies not found or you haven't registered any company yet.
              </TableCell>
            </TableRow>
          ) : (
            filteredCompany.map((company) => (
              <TableRow key={company._id}>
                <TableCell>
                  <Avatar className="w-10 h-10 rounded-full">
                    <AvatarImage
                      src={company?.logo || undefined}
                      alt={company?.name || "Company Logo"}
                    />
                  </Avatar>
                </TableCell>

                <TableCell>{company?.name ?? "-"}</TableCell>

                <TableCell>
                  {company?.createdAt
                    ? String(company.createdAt).split("T")[0]
                    : "-"}
                </TableCell>

                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>

                    <PopoverContent className="w-32">
                      <div
                        onClick={() =>
                          navigate(`/admin/companies/${company._id}`)
                        }
                        className="flex items-center gap-2 w-fit cursor-pointer"
                      >
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

export default AdminJobsTable;

/*
Filter logic (summary):
- We read the Redux values safely: companies (array) and searchCompanyByText (string).
- In useEffect (runs when companies or search text change):
  1. Normalize the search string: lowercased and trimmed.
  2. If the normalized query is empty, show the full companies array.
  3. Otherwise filter companies where company.name (defensively handled) includes the query.
- The filtered list is stored in local state `filteredCompany` and rendered in the table.
*/
