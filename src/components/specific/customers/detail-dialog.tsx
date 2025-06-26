import { getCustomerDetails } from "@/actions/customers"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Order } from "@/interfaces/order-interface"
import { useQuery } from "@tanstack/react-query"
import { InfoIcon } from "lucide-react"
import { useState } from "react"

interface CustomerDetailDialogProps {
  customerId: number
}

const CustomerDetailDialog: React.FC<CustomerDetailDialogProps> = ({ customerId }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { data, isPending, error } = useQuery<Order[]>({
    queryKey: ['customerDetails', customerId],
    queryFn: () => getCustomerDetails(customerId),
    enabled: isOpen, // only fetch when opens
  });


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={'ghost'}>
          <InfoIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Customer Details</DialogTitle>
          <DialogDescription>Order history</DialogDescription>
        </DialogHeader>
        {error ? (
          <span>An error occurred: {error.message}</span>
        ) : (
            <>
              {isPending ? (
                <p>Loading...</p>
              ) : (
                  <div className="grid gap-4 max-h-[400px] overflow-auto">
                    {data.length > 0 && data?.map((order) => (
                      <div key={order.id}>
                        {order.id}
                      </div>
                    ))}
                    {data.length === 0 && (
                      <span>Customer hasn&apos;t purchase anything yet</span>
                    )}
                  </div>
                )}
            </>
          )}
      </DialogContent>
    </Dialog>
  )
}

export default CustomerDetailDialog
