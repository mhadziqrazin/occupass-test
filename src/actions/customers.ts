import { Customer } from "@/interfaces/customer-interfaces"
import api from "@/lib/api"

export async function getAllCustomers() {
  try {
    const res = await api.get('/customers')
    return res.data?.results as Customer[]
  } catch (err) {
    console.log('Error fetching data customers', err)
    return []
  }
}
