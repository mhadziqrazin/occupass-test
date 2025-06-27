import { getOrderDetails } from "@/actions/orders"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { OrderDetails } from "@/interfaces/order-interface"
import { useQuery } from "@tanstack/react-query"
import { InfoIcon } from "lucide-react"
import React, { useState } from "react"
import { PulseLoader } from "react-spinners"

interface OrderDetailDialogProps {
  customerId: string
  orderId: number
}

const OrderDetailDialog: React.FC<OrderDetailDialogProps> = ({ customerId, orderId }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { data, isPending, error } = useQuery<OrderDetails[]>({
    queryKey: ['orderDetails', customerId, orderId],
    queryFn: () => getOrderDetails(customerId, orderId),
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
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>
        {error ? (
          <span>An error occurred: {error.message}</span>
        ) : (
          <>
              {isPending ? (
                <div className="w-full flex justify-center">
                  <PulseLoader size={12} color="var(--color-muted-foreground)" />
                </div>
              ) : (
                  <div className="max-h-[400px] overflow-auto">
                    {data && data.length > 0 && data?.map((detail) => (
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
                    {data && data.length === 0 && (
                      <span>No details available</span>
                    )}
                  </div>
                )}
            </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default OrderDetailDialog
