import { Order, OrderDetails } from "@/interfaces/order-interface"
import api from "@/lib/api"

export interface OrderAPIResponse {
  order: Omit<Order, 'details'>;
  orderDetails: OrderDetails[];
}

export const transformOrderAPIResponse = (order: OrderAPIResponse): Order => ({
  ...order.order,
  details: order.orderDetails,
})

export async function getAllOrders(page?: number) {
  try {
    const res = await api.get(`/orders/page/${page ?? 1}`) // default to page 1
    const data = res.data?.results as OrderAPIResponse[] ?? []
    const transformedData: Order[] = data.map(transformOrderAPIResponse)
    return transformedData
  } catch (err) {
    console.log('Error fetching data orders', err)
    return []
  }
}
