import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getAllOrders } from '@/actions/orders';
import OrdersModule from '@/components/modules/orders-module';

export default async function OrdersPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['allOrders', 1],
    queryFn: () => getAllOrders(1),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OrdersModule />
    </HydrationBoundary>
  );
}

