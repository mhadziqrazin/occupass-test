import { columns } from "./columns"
import { OrderDataTable } from "./data-table"
import { getAllOrders } from "@/actions/orders"

const OrdersPage = async () => {
  const orders = await getAllOrders()

  return (
    <OrderDataTable columns={columns} data={orders} />
  )
}

export default OrdersPage
