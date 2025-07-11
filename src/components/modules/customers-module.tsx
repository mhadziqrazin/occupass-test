"use client"

import { getAllCustomers } from "@/actions/customers";
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
  const router = useRouter()

  const getAllParams = useMemo(() => {
    const newParams: any = {}
    for (const [key, value] of searchParams) {
      if (key === "page") continue // skip page params
      newParams[key] = value
    }
    return newParams
  }, [searchParams])

  const { data, isFetching, error } = useQuery<Customer[]>({
    queryKey: ['allCustomers', getAllParams],
    queryFn: () => getAllCustomers(getAllParams),
  });

  const handleClearFilters = () => {
    const newParams = new URLSearchParams()
    const page = searchParams.get("page")
    if (page) {
      newParams.set("page", "1") // reset page
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
