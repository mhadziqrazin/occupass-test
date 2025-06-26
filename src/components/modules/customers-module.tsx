"use client"

import { getAllCustomers } from "@/actions/customers";
import { useQuery } from "@tanstack/react-query";
import { columns } from "../specific/customers/columns";
import { CustomerDataTable } from "../specific/customers/data-table";
import { Customer } from "@/interfaces/customer-interface";

const CustomersModule = () => {
  const { data, isPending, error } = useQuery<Customer[]>({
    queryKey: ['allCustomers'],
    queryFn: getAllCustomers,
  });

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>An error occurred: {error.message}</p>;

  return (
    <div className="flex flex-col gap-4">
      <span className="font-semibold text-3xl">Customers</span>
      <CustomerDataTable columns={columns} data={data} />
    </div>
  );
}

export default CustomersModule
