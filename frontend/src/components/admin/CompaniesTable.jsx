import { Table } from 'lucide-react';
import React from 'react'
import { TableCaption, TableHead, TableHeader, TableRow } from '../ui/table';

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
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    </div>
  )
}

export default CompaniesTable;