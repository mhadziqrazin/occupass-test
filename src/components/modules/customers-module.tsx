"use client"

import { getAllCustomers, GetAllCustomersParams } from "@/actions/customers";
import { useQuery } from "@tanstack/react-query";
import { columns } from "../specific/customers/columns";
import { CustomerDataTable } from "../specific/customers/data-table";
import { Customer } from "@/interfaces/customer-interface";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Input } from "../ui/input";

// for search performance
let debounce: NodeJS.Timeout | undefined;

const CustomersModule = () => {
  const searchParams = useSearchParams()
  const orderBy = searchParams.get("orderBy")
  const orderByDesc = searchParams.get("orderByDesc")
  const countryStartsWith = searchParams.get("countryStartsWith")
  const [search, setSearch] = useState("")
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

  const handleSearchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
    clearTimeout(debounce)
    debounce = setTimeout(() => {
      const newParams = new URLSearchParams(searchParams)
      newParams.set("countryStartsWith", value)
      router.replace(
        `${window.location.pathname}?${newParams.toString()}`,
        { scroll: false }
      )
    }, 250)
  }

  if (error) return <p>An error occurred: {error.message}</p>;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <span className="font-semibold text-3xl">Customers</span>
        <label htmlFor="search-country" className="ssr" />
        <Input id="search-country" className="w-[200px] m-2" value={search} onChange={handleSearchOnChange} placeholder="Country starts with..." />
      </div>
      <CustomerDataTable isLoading={isFetching} columns={columns} data={data ?? []} />
    </div>
  );
}

export default CustomersModule
