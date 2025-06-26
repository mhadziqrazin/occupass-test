"use client"

import { getAllOrders } from "@/actions/orders";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { columns } from "../specific/orders/columns";
import { OrderDataTable } from "../specific/orders/data-table";
import { Order } from "@/interfaces/order-interface";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

const OrdersModule = () => {
  const searchParams = useSearchParams()
  const pageParams = searchParams.get("page")

  const queryClient = useQueryClient()
  const [page, setPage] = useState(parseInt(pageParams ?? "1"))

  const { data, isFetching, error } = useQuery<Order[]>({
    queryKey: ['allOrders', page],
    queryFn: () => getAllOrders(page),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    // prefetch next page
    queryClient.prefetchQuery({
      queryKey: ['allOrders', page + 1],
      queryFn: () => getAllOrders(page + 1),
    })
  }, [page])

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
        onPageChange={(newPage) => setPage(newPage)} page={page}
        hasMore={hasMore}
      />
    </div>
  );
}

export default OrdersModule
