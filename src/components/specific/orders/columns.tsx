"use client"

import { Order } from "@/interfaces/order-interface";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import OrderDetailDialog from "./detail-dialog";

// utility to parse date format returned from the server
function parseDate(rawDate: string): string {
  const match = /\/Date\((\d+)([-+]\d+)?\)\//.exec(rawDate)
  if (!match) return ""
  const date = new Date(Number(match[1])).toDateString()
  return format(date, 'yyyy-MM-dd')
}

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "customerId",
    header: "Customer Id",
  },
  {
    accessorKey: "employeeId",
    header: "Employee Id",
  },
  {
    accessorKey: "orderDate",
    header: "Order Date",
    cell: ({ row }) => (
      <span>{parseDate(row.getValue("orderDate"))}</span>
    )
  },
  {
    accessorKey: "requiredDate",
    header: "Required Date",
    cell: ({ row }) => (
      <span>{parseDate(row.getValue("requiredDate"))}</span>
    )
  },
  {
    accessorKey: "shippedDate",
    header: "Shipped Date",
    cell: ({ row }) => (
      <span>{parseDate(row.getValue("shippedDate"))}</span>
    )
  },
  {
    accessorKey: "shipVia",
    header: "Ship Via",
  },
  {
    accessorKey: "freight",
    header: "Freight",
  },
  {
    accessorKey: "shipName",
    header: "Ship Name",
  },
  {
    accessorKey: "shipAddress",
    header: "Ship Address",
  },
  {
    accessorKey: "shipCity",
    header: "Ship City",
  },
  {
    accessorKey: "shipRegion",
    header: "Ship Region",
  },
  {
    accessorKey: "shipPostalCode",
    header: "Ship Postal Code",
  },
  {
    accessorKey: "shipCountry",
    header: "Ship Country",
  },
  {
    accessorKey: "action",
    enablePinning: true,
    header: "Action",
    cell: () => (
      <OrderDetailDialog />
    )
  }
];

