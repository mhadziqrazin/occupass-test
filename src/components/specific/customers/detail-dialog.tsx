import { getCustomerDetails } from "@/actions/customers"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Order } from "@/interfaces/order-interface"
import { useQuery } from "@tanstack/react-query"
import { InfoIcon } from "lucide-react"
import React, { useState } from "react"
import { parseDate } from "../orders/columns"
import OrderDetailDialog from "../orders/detail-dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PulseLoader } from "react-spinners"

interface CustomerDetailDialogProps {
  customerId: string
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
                <div className="w-full flex justify-center">
                  <PulseLoader size={12} color="var(--color-muted-foreground)" />
                </div>
              ) : (
                  <div className="max-h-[400px] overflow-auto">
                    {data.length > 0 && [...data].reverse().map((order) => (
                      <React.Fragment key={order.id}>
                        <Accordion type="multiple">
                          <AccordionItem value="item-1">
                            <AccordionTrigger className="cursor-pointer">
                              <div className="flex w-full justify-between">
                                <div className="flex flex-col">
                                  <span className="text-muted-foreground font-normal text-xs">Order Id</span>
                                  <span>{order.id}</span>
                                </div>
                                <div className="flex flex-col items-end">
                                  <span className="text-muted-foreground font-normal text-xs">Order Date</span>
                                  <span>
                                    {parseDate(order.orderDate ?? '')}
                                  </span>
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col">
                              <span>
                                <span className="text-muted-foreground">Country:</span> {order.shipCountry}
                              </span>
                              <span>
                                <span className="text-muted-foreground">City:</span> {order.shipCity}
                              </span>
                              <span>
                                <span className="text-muted-foreground">Address:</span> {order.shipAddress}
                              </span>
                              <span>
                                <span className="text-muted-foreground">Postal Code:</span> {order.shipPostalCode}
                              </span>
                              {order.shipRegion && (
                                <span>
                                  <span className="text-muted-foreground">Region:</span> {order.shipRegion}
                                </span>
                              )}
                              <span>
                                <span className="text-muted-foreground">Arrival:</span> {parseDate(order.shippedDate ?? '')}
                              </span>
                              <span>
                                <span className="text-muted-foreground">Freight:</span> {order.freight}
                              </span>
                              <span>
                                <span className="text-muted-foreground">Employee Id:</span> {order.employeeId}
                              </span>
                              <span className="flex items-center">
                                <span className="text-muted-foreground">Order Details:</span> <OrderDetailDialog customerId={customerId} orderId={order.id} />
                              </span>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                        <hr className="last:hidden" />
                      </React.Fragment>
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
