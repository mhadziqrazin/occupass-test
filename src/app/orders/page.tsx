import { getAllOrders } from "@/actions/orders"
import { columns } from "@/components/specific/orders/columns"
import { OrderDataTable } from "@/components/specific/orders/data-table"

export default async function OrdersPage() {
  const orders = await getAllOrders()

  return (
    <div className="flex flex-col gap-4">
      <span className="font-semibold text-3xl">Orders</span>
      <OrderDataTable columns={columns} data={orders} />
    </div>
  )
}
