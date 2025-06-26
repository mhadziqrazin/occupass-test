import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { InfoIcon } from "lucide-react"

const OrderDetailDialog = () => {
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
        <div className="grid gap-4">
          halo
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default OrderDetailDialog
