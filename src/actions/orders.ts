import { Order, OrderDetails } from "@/interfaces/order-interface"
import api from "@/lib/api"

export interface GetAllOrdersParams {
  orderBy?: string
  orderByDesc?: string
}

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

export async function getAllOrders(page?: number, params?: GetAllOrdersParams) {
  try {
    const searcParams = new URLSearchParams()
    searcParams.set("Skip", (((page ?? 1) - 1) * ORDER_PAGE_LIMIT)?.toString()) // default page to 1, 0 based
    searcParams.set("Take", ORDER_PAGE_LIMIT.toString()) // default page size to 10
    searcParams.set("Include", "total") // get the page count
    if (params) {
      if (params.orderBy) {
        searcParams.set("OrderBy", params.orderBy)
      }
      if (params.orderByDesc) {
        searcParams.set("OrderByDesc", params.orderByDesc)
      }
    }
    const res = await api.get(`/query/orders?${searcParams.toString()}`)
    return res.data as QueryOrdersAPIResponse
  } catch (err) {
    console.log('Error fetching data orders', err)
    return {
      results: [],
      total: 0,
    } as QueryOrdersAPIResponse
  }
}
