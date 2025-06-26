import { Customer } from "@/interfaces/customer-interface"
import api from "@/lib/api"
import { OrderAPIResponse, transformOrderAPIResponse } from "./orders"
import { Order } from "@/interfaces/order-interface"

export async function getAllCustomers() {
  try {
    const res = await api.get('/customers')
    return res.data?.results as Customer[] ?? []
  } catch (err) {
    console.log('Error fetching data customers', err)
    return []
  }
}

export async function getCustomerDetails(customerId: number) {
  try {
    const res = await api.get(`/customers/${customerId}`)
    const data = res.data?.orders as OrderAPIResponse[] ?? [] // take only order details
    const transformedData: Order[] = data.map(transformOrderAPIResponse)
    return transformedData
  } catch (err) {
    console.log('Error fetching data customer details', err)
    return []
  }
}
