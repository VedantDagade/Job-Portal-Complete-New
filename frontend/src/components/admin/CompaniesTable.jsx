import { Table } from 'lucide-react';
import React from 'react'
import { TableCaption, TableHeader } from '../ui/table';

const CompaniesTable = () => {
  return (
    <div>
      <Table>
        <TableCaption>A List of your recent Registerd Companies</TableCaption>
        <TableHeader>
          
        </TableHeader>
      </Table>
    </div>
  )
}

export default CompaniesTable;