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
                    {data.length > 0 && data?.map((order) => (
                      <React.Fragment key={order.id}>
                        <Accordion type="multiple">
                          <AccordionItem value="item-1">
                            <AccordionTrigger className="cursor-pointer">
                              <div className="flex w-full justify-between">
                                <span>
                                  {order.id}
                                </span>
                                <span className="text-muted-foreground">
                                  {parseDate(order.orderDate ?? '')}
                                </span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col">
                              <span>Country: {order.shipCountry}</span>
                              <span>City: {order.shipCity}</span>
                              <span>Address: {order.shipAddress}</span>
                              <span>Postal Code: {order.shipPostalCode}</span>
                              {order.shipRegion && (
                                <span>Region: {order.shipRegion}</span>
                              )}
                              <span>Arrival: {parseDate(order.shippedDate ?? '')}</span>
                              <span>Freight: {order.freight}</span>
                              <span>Employee Id: {order.employeeId}</span>
                              <span className="flex items-center">
                                Order Details: <OrderDetailDialog customerId={customerId} orderId={order.id} />
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
