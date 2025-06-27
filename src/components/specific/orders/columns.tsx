"use client"

import { Order } from "@/interfaces/order-interface";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import OrderDetailDialog from "./detail-dialog";
import SortButton from "@/components/general/sort-button";

// utility to parse date format returned from the server
export function parseDate(rawDate: string): string {
  const match = /\/Date\((\d+)([-+]\d+)?\)\//.exec(rawDate)
  if (!match) return ""
  const date = new Date(Number(match[1])).toDateString()
  return format(date, 'yyyy-MM-dd')
}

export const columns: ColumnDef<Omit<Order, "details">>[] = [
  {
    accessorKey: "id",
    header: () => (
      <SortButton sortBy="id" label="Id" />
    ),
  },
  {
    accessorKey: "customerId",
    header: () => (
      <SortButton sortBy="customerId" label="Customer Id" />
    ),
  },
  {
    accessorKey: "employeeId",
    header: () => (
      <SortButton sortBy="employeeId" label="Employee Id" />
    ),
  },
  {
    accessorKey: "orderDate",
    header: () => (
      <SortButton isDate sortBy="orderDate" label="Order Date" />
    ),
    cell: ({ row }) => (
      <span>{parseDate(row.getValue("orderDate"))}</span>
    )
  },
  {
    accessorKey: "requiredDate",
    header: () => (
      <SortButton isDate sortBy="requiredDate" label="Required Date" />
    ),
    cell: ({ row }) => (
      <span>{parseDate(row.getValue("requiredDate"))}</span>
    )
  },
  {
    accessorKey: "shippedDate",
    header: () => (
      <SortButton isDate sortBy="shippedDate" label="Shipped Date" />
    ),
    cell: ({ row }) => (
      <span>{parseDate(row.getValue("shippedDate"))}</span>
    )
  },
  {
    accessorKey: "shipVia",
    header: () => (
      <SortButton sortBy="shipVia" label="Ship Via" />
    ),
  },
  {
    accessorKey: "freight",
    header: () => (
      <SortButton sortBy="freight" label="Freight" />
    ),
  },
  {
    accessorKey: "shipName",
    header: () => (
      <SortButton sortBy="shipName" label="Ship Name" />
    ),
  },
  {
    accessorKey: "shipAddress",
    header: () => (
      <SortButton sortBy="shipAddress" label="Ship Address" />
    ),
  },
  {
    accessorKey: "shipCity",
    header: () => (
      <SortButton sortBy="shipCity" label="Ship City" />
    ),
  },
  {
    accessorKey: "shipRegion",
    header: () => (
      <SortButton sortBy="shipRegion" label="Ship Region" />
    ),
  },
  {
    accessorKey: "shipPostalCode",
    header: () => (
      <SortButton sortBy="shipPostalCode" label="Ship Postal Code" />
    ),
  },
  {
    accessorKey: "shipCountry",
    header: () => (
      <SortButton sortBy="shipCountry" label="Ship Country" />
    ),
  },
  {
    accessorKey: "action",
    header: "Action",
    enablePinning: true,
    cell: ({ row }) => (
      <OrderDetailDialog customerId={row.original.customerId} orderId={row.original.id} />
    )
  }
];

