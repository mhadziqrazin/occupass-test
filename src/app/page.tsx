import { redirect } from "next/navigation";

export default function Home() {
  // redirect main pa:e to customers immediately
  redirect("/customers")
}
