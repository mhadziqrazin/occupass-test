import { getAllCustomers } from "@/actions/customers";
import { columns } from "@/components/specific/customers/columns";
import { DataTable } from "@/components/specific/customers/data-table";

export default async function Home() {
  const customers = await getAllCustomers()

  return (
    <div className="px-4 py-10 flex overflow-x-auto items-center justify-center">
      <div className="w-full max-w-[1200px] overflow-x-auto">
        <DataTable columns={columns} data={customers} />
      </div>
    </div>
  );
}
