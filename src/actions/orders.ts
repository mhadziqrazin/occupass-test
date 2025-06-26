import { Order, OrderDetails } from "@/interfaces/order-interface"
import api from "@/lib/api"

interface OrderAPIResponse {
  order: Omit<Order, 'details'>;
  orderDetails: OrderDetails[];
}

export async function getAllOrders(page?: number) {
  console.log("HALO")
  try {
    const res = await api.get(`/orders/page/${page ?? 1}`) // default to page 1
    const data = res.data?.results as OrderAPIResponse[] ?? []
    const transformedData: Order[] = data.map((o) => ({
      ...o.order,
      details: o.orderDetails
    }))
    return transformedData
  } catch (err) {
    console.log('Error fetching data orders', err)
    return []
  }
}
