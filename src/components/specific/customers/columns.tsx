import { Customer } from "@/interfaces/customer-interface"
import { ColumnDef } from "@tanstack/react-table"
import CustomerDetailDialog from "./detail-dialog";
import SortButton from "@/components/general/sort-button";

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "id",
    header: () => (
      <SortButton sortBy="id" label="Id" />
    ),
  },
  {
    accessorKey: "companyName",
    header: () => (
      <SortButton sortBy="companyName" label="Company Name" />
    ),
  },
  {
    accessorKey: "contactName",
    header: () => (
      <SortButton sortBy="contactName" label="Contact Name" />
    ),
  },
  {
    accessorKey: "contactTitle",
    header: () => (
      <SortButton sortBy="contactTitle" label="Contact Title" />
    ),
  },
  {
    accessorKey: "address",
    header: () => (
      <SortButton sortBy="address" label="Address" />
    ),
  },
  {
    accessorKey: "city",
    header: () => (
      <SortButton sortBy="city" label="City" />
    ),
  },
  {
    accessorKey: "region",
    header: () => (
      <SortButton sortBy="region" label="Region" />
    ),
  },
  {
    accessorKey: "postalCode",
    header: () => (
      <SortButton sortBy="postalCode" label="Postal Code" />
    ),
  },
  {
    accessorKey: "country",
    header: () => (
      <SortButton sortBy="country" label="Country" />
    ),
  },
  {
    accessorKey: "phone",
    header: () => (
      <SortButton sortBy="phone" label="Phone" />
    ),
  },
  {
    accessorKey: "fax",
    header: () => (
      <SortButton sortBy="fax" label="Fax" />
    ),
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
