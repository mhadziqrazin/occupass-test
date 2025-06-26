"use client"

import { getAllOrders, GetAllOrdersParams } from "@/actions/orders";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { columns } from "../specific/orders/columns";
import { OrderDataTable } from "../specific/orders/data-table";
import { Order } from "@/interfaces/order-interface";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

const OrdersModule = () => {
  const searchParams = useSearchParams()
  const orderBy = searchParams.get("OrderBy")
  const orderByDesc = searchParams.get("OrderByDesc")
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

  const { data, isFetching, error } = useQuery<Order[]>({
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

  // since the API doesn't provide max page, manually check the current length
  // if it's zero it actually exceeds the last page
  // but to handle when the last page is the same length, length < pageLimit isn't used here
  const hasMore = useMemo(() => {
    return !!data && data?.length !== 0
  }, [data])

  if (error) return <p>An error occurred: {error.message}</p>;

  return (
    <div className="flex flex-col gap-4">
      <span className="font-semibold text-3xl">Orders</span>
      <OrderDataTable
        isLoading={isFetching}
        columns={columns}
        data={data ?? []}
        hasMore={hasMore}
      />
    </div>
  );
}

export default OrdersModule
