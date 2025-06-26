"use client"

import { getAllCustomers, GetAllCustomersParams } from "@/actions/customers";
import { useQuery } from "@tanstack/react-query";
import { columns } from "../specific/customers/columns";
import { CustomerDataTable } from "../specific/customers/data-table";
import { Customer } from "@/interfaces/customer-interface";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

const CustomersModule = () => {
  const searchParams = useSearchParams()
  const orderBy = searchParams.get("OrderBy")
  const orderByDesc = searchParams.get("OrderByDesc")
  const params = useMemo(() => {
    const newParams: GetAllCustomersParams = {}
    if (orderBy) {
      newParams.orderBy = orderBy
    }
    if (orderByDesc) {
      newParams.orderByDesc = orderByDesc
    }
    return newParams
  }, [orderBy, orderByDesc])

  const { data, isFetching, error } = useQuery<Customer[]>({
    queryKey: ['allCustomers', params],
    queryFn: () => getAllCustomers(params),
  });

  if (error) return <p>An error occurred: {error.message}</p>;

  return (
    <div className="flex flex-col gap-4">
      <span className="font-semibold text-3xl">Customers</span>
      <CustomerDataTable isLoading={isFetching} columns={columns} data={data ?? []} />
    </div>
  );
}

export default CustomersModule
