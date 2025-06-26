import { Customer } from "@/interfaces/customer-interface"
import api from "@/lib/api"
import { OrderAPIResponse, transformOrderAPIResponse } from "./orders"
import { Order } from "@/interfaces/order-interface"

export interface GetAllCustomersParams {
  orderBy?: string
  orderByDesc?: string
}

export async function getAllCustomers(params?: GetAllCustomersParams) {
  try {
    const searcParams = new URLSearchParams()
    if (params) {
      if (params.orderBy) {
        searcParams.set("OrderBy", params.orderBy)
      }
      if (params.orderByDesc) {
        searcParams.set("OrderByDesc", params.orderByDesc)
      }
    }
    const res = await api.get(`/query/customers?${searcParams.toString()}`)
    return res.data?.results as Customer[] ?? []
  } catch (err) {
    console.log('Error fetching data customers', err)
    return []
  }
}

export async function getCustomerDetails(customerId: number) {
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
