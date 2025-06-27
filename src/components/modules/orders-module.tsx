"use client"

import { getAllOrders, GetAllOrdersParams, ORDER_PAGE_LIMIT, QueryOrdersAPIResponse } from "@/actions/orders";
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
  const orderBy = searchParams.get("orderBy")
  const orderByDesc = searchParams.get("orderByDesc")
  const params = useMemo(() => {
    const newParams: GetAllOrdersParams = {}
    if (orderBy) {
      newParams.orderBy = orderBy
    }
    if (orderByDesc) {
      newParams.orderByDesc = orderByDesc
    }
    return newParams
  }, [orderBy, orderByDesc])

  const page = parseInt(searchParams.get("page") ?? "1")
  const queryClient = useQueryClient()

  const { data, isFetching, error } = useQuery<QueryOrdersAPIResponse>({
    queryKey: ['allOrders', page, params],
    queryFn: () => getAllOrders(page, params),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    // prefetch next page
    queryClient.prefetchQuery({
      queryKey: ['allOrders', page + 1, params],
      queryFn: () => getAllOrders(page + 1, params),
    })
  }, [page, params])

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
