import { getAllCustomers } from "@/actions/customers"
import { columns } from "@/components/specific/customers/columns"
import { CustomerDataTable } from "@/components/specific/customers/data-table"

export default async function CustomersPage() {
  const customers = await getAllCustomers()

  return (
    <div className="flex flex-col gap-4">
      <span className="font-semibold text-3xl">Customers</span>
      <CustomerDataTable columns={columns} data={customers} />
    </div>
  )
}
