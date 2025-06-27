"use client"

import { getAllOrders, ORDER_PAGE_LIMIT, QueryOrdersAPIResponse } from "@/actions/orders";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { columns } from "../specific/orders/columns";
import { OrderDataTable } from "../specific/orders/data-table";
import { useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RotateCwIcon } from "lucide-react";
import { Button } from "../ui/button";

const OrdersModule = () => {
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

  const page = parseInt(searchParams.get("page") ?? "1")
  const queryClient = useQueryClient()

  const { data, isFetching, error } = useQuery<QueryOrdersAPIResponse>({
    queryKey: ['allOrders', page, getAllParams],
    queryFn: () => getAllOrders(page, getAllParams),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    // prefetch next page
    queryClient.prefetchQuery({
      queryKey: ['allOrders', page + 1, getAllParams],
      queryFn: () => getAllOrders(page + 1, getAllParams),
    })
  }, [page, getAllParams])

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
        <span className="font-semibold text-3xl">Orders</span>
        <Button onClick={handleClearFilters} className="group">
          <RotateCwIcon className="group-hover:rotate-360 transition-transform duration-500" />
          Clear All Filters
        </Button>
      </div>
      <OrderDataTable
        isLoading={isFetching}
        columns={columns}
        data={data?.results ?? []}
        pageCount={Math.ceil((data?.total ?? 0) / ORDER_PAGE_LIMIT)}
      />
    </div>
  );
}

export default OrdersModule
