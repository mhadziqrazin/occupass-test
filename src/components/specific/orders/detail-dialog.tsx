import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { OrderDetails } from "@/interfaces/order-interface"
import { InfoIcon } from "lucide-react"

interface OrderDetailDialogProps {
  details: OrderDetails[]
}

const OrderDetailDialog: React.FC<OrderDetailDialogProps> = ({ details }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'ghost'}>
          <InfoIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 max-h-[400px] overflow-auto">
          {details.length > 0 && details?.map((detail) => (
            <div key={`${detail.orderId}-${detail.productId}`}>
              {detail.productId}
            </div>
          ))}
          {details.length === 0 && (
            <span>No details available</span>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default OrderDetailDialog
