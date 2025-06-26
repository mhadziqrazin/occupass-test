import { Customer } from "@/interfaces/customer-interface"
import { ColumnDef } from "@tanstack/react-table"
import CustomerDetailDialog from "./detail-dialog";

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "companyName",
    header: "Company Name",
  },
  {
    accessorKey: "contactName",
    header: "Contact Name",
  },
  {
    accessorKey: "contactTitle",
    header: "Contact Title",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "region",
    header: "Region",
  },
  {
    accessorKey: "postalCode",
    header: "Postal Code",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "fax",
    header: "Fax",
  },
  {
    accessorKey: "action",
    enablePinning: true,
    header: "Action",
    cell: ({ row }) => (
      <CustomerDetailDialog customerId={row.getValue("id")} />
    )
  }
];
