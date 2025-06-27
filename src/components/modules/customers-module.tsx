"use client"

import { getAllCustomers, GetAllCustomersParams } from "@/actions/customers";
import { useQuery } from "@tanstack/react-query";
import { columns } from "../specific/customers/columns";
import { CustomerDataTable } from "../specific/customers/data-table";
import { Customer } from "@/interfaces/customer-interface";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { Button } from "../ui/button";
import { RotateCwIcon } from "lucide-react";

const CustomersModule = () => {
  const searchParams = useSearchParams()
  const orderBy = searchParams.get("orderBy")
  const orderByDesc = searchParams.get("orderByDesc")
  const countryStartsWith = searchParams.get("countryStartsWith")
  const router = useRouter()

  const params = useMemo(() => {
    const newParams: GetAllCustomersParams = {}
    if (orderBy) {
      newParams.orderBy = orderBy + ",id"
    }
    if (orderByDesc) {
      newParams.orderByDesc = orderByDesc
    }
    if (countryStartsWith) {
      newParams.countryStartsWith = countryStartsWith
    }
    return newParams
  }, [orderBy, orderByDesc, countryStartsWith])

  const { data, isFetching, error } = useQuery<Customer[]>({
    queryKey: ['allCustomers', params],
    queryFn: () => getAllCustomers(params),
  });

  const handleClearFilters = () => {
    const newParams = new URLSearchParams()
    const page = searchParams.get("page")
    if (page) {
      // preserves page params
      newParams.set("page", page)
    }
    router.replace(
      `${window.location.pathname}?${newParams.toString()}`,
      { scroll: false }
    )
  }

  if (error) return <p>An error occurred: {error.message}</p>;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <span className="font-semibold text-3xl">Customers</span>
        <Button onClick={handleClearFilters} className="group">
          <RotateCwIcon className="group-hover:rotate-360 transition-transform duration-500" />
          Clear All Filters
        </Button>
      </div>
      <CustomerDataTable isLoading={isFetching} columns={columns} data={data ?? []} />
    </div>
  );
}

export default CustomersModule
