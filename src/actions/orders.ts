import { Order, OrderDetails } from "@/interfaces/order-interface"
import api from "@/lib/api"
import { getCustomerDetails } from "./customers"

export interface QueryOrdersAPIResponse {
  results: Omit<Order, 'details'>[]
  total: number;
}

export interface OrderAPIResponse {
  order: Omit<Order, 'details'>
  orderDetails: OrderDetails[]
}

export const transformOrderAPIResponse = (order: OrderAPIResponse): Order => ({
  ...order.order,
  details: order.orderDetails,
})

export const ORDER_PAGE_LIMIT = 10

export async function getAllOrders(page?: number, params?: Record<string, string>) {
  try {
    const searchParams = new URLSearchParams()
    searchParams.set("Skip", (((page ?? 1) - 1) * ORDER_PAGE_LIMIT)?.toString()) // default page to 1, 0 based
    searchParams.set("Take", ORDER_PAGE_LIMIT.toString()) // default page size to 10
    searchParams.set("Include", "total") // get the page count
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value) {
          searchParams.set(key, value);
        }
      }
    }

    const res = await api.get(`/query/orders?${searchParams.toString()}`)
    return res.data as QueryOrdersAPIResponse
  } catch (err) {
    console.log('Error fetching data orders', err)
    return {
      results: [],
      total: 0,
    } as QueryOrdersAPIResponse
  }
}

export async function getOrderDetails(customerId: string, orderId: number) {
  try {
    const res = await getCustomerDetails(customerId)
    return res.find((order) => order.id === orderId)?.details ?? []
  } catch (err) {
    console.log('Error fetching data order details', err)
    return []
  }
}
