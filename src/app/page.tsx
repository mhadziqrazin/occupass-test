import { getAllCustomers } from "@/actions/customers";

export default async function Home() {
  const customers = await getAllCustomers()

  return (
    <div>
      Halo
    </div>
  );
}
