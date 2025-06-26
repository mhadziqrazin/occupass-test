export interface Order {
  id: number;
  customerId: string;
  employeeId: number;
  orderDate?: string;
  requiredDate?: string;
  shippedDate?: string;
  shipVia?: number;
  freight: number;
  shipName: string;
  shipAddress: string;
  shipCity: string;
  shipRegion: string;
  shipPostalCode: string;
  shipCountry: string;
  details: OrderDetails[]
}

export interface OrderDetails {
  orderId: number;
  productId: number;
  unitPrice: number;
  quantity: number;
  discount: number;
}
