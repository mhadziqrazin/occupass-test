import { Customer } from "@/interfaces/customer-interface"
import api from "@/lib/api"
import { OrderAPIResponse, transformOrderAPIResponse } from "./orders"
import { Order } from "@/interfaces/order-interface"

export async function getAllCustomers(params?: Record<string, string>) {
  try {
    const searchParams = new URLSearchParams()
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value) {
          searchParams.set(key, value);
        }
      }
    }
    const res = await api.get(`/query/customers?${searchParams.toString()}`)
    return res.data?.results as Customer[] ?? []
  } catch (err) {
    console.log('Error fetching data customers', err)
    return []
  }
}

export async function getCustomerDetails(customerId: string) {
  try {
    const res = await api.get(`/customers/${customerId}/orders`)
    const data = res.data?.results as OrderAPIResponse[] ?? [] // take only order details
    const transformedData: Order[] = data.map(transformOrderAPIResponse)
    return transformedData
  } catch (err) {
    console.log('Error fetching data customer details', err)
    return []
  }
}
