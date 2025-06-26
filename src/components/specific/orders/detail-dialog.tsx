import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { OrderDetails } from "@/interfaces/order-interface"
import { InfoIcon } from "lucide-react"
import React from "react"

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
        <div className="max-h-[400px] overflow-auto">
          {details.length > 0 && details?.map((detail) => (
            <React.Fragment key={`${detail.orderId}-${detail.productId}`}>
              <Accordion type="multiple">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="cursor-pointer">
                    <span>
                      {detail.productId}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col">
                    <span>Unit Price: ${detail.unitPrice}</span>
                    <span>Quantity: {detail.quantity}</span>
                    <span>Discount: {detail.discount*100}%</span>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <hr className="last:hidden" />
            </React.Fragment>
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
