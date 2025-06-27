import { getOrderDetails } from "@/actions/orders"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { OrderDetails } from "@/interfaces/order-interface"
import { cn } from "@/lib/utils"
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
                    {data && data.length > 0 && data?.map((detail) => {
                      const total = detail.unitPrice * detail.quantity
                      const discountAmount = total * detail.discount
                      const totalAfterDiscount = total - discountAmount
                      return (
                      <React.Fragment key={`${detail.orderId}-${detail.productId}`}>
                        <Accordion type="multiple">
                          <AccordionItem value="item-1">
                            <AccordionTrigger className="cursor-pointer">
                              <div className="flex w-full justify-between">
                                <div className="flex flex-col">
                                  <span className="text-muted-foreground font-normal text-xs">Product Id</span>
                                  <span>{detail.productId}</span>
                                </div>
                                <div className="flex flex-col items-end">
                                  <span className="text-muted-foreground font-normal text-xs">Total</span>
                                    <div className="flex gap-1 items-end">
                                      {discountAmount > 0 && (
                                        <span className="line-through text-xs text-muted-foreground/60">${total.toLocaleString()}</span>
                                      )}
                                      <span>${totalAfterDiscount.toLocaleString()}</span>
                                    </div>
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col">
                              <span>
                                <span className="text-muted-foreground">Unit Price:</span> ${detail.unitPrice.toLocaleString()}
                              </span>
                              <span>
                                <span className="text-muted-foreground">Quantity:</span> {detail.quantity}
                              </span>
                              <span>
                                <span className="text-muted-foreground">Total:</span> ${total.toLocaleString()}
                              </span>
                              <span className="flex">
                                <span className="text-muted-foreground">Discount:&nbsp;</span>
                                  <span className="flex items-center gap-1">
                                    ${discountAmount.toLocaleString()}
                                    <Badge
                                      variant={discountAmount > 0 ? 'default': 'outline'}
                                      className={cn(discountAmount > 0 && "text-red-500 bg-red-100")}
                                    >
                                      {detail.discount*100}%
                                    </Badge>
                                  </span>
                              </span>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                        <hr className="last:hidden" />
                      </React.Fragment>
                    )})}
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
