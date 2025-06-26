import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getAllCustomers } from '@/actions/customers';
import CustomersModule from '@/components/modules/customers-module';
import { Suspense } from 'react';

export default async function CustomersPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['allCustomers'],
    queryFn: () => getAllCustomers(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense>
        <CustomersModule />
      </Suspense>
    </HydrationBoundary>
  );
}

