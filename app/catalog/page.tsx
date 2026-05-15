import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getFilters, getCars } from '@/lib/api/clientApi';
import { defaultFilters } from '@/lib/store/carStore';
import CatalogClient from './CatalogClient';

export default async function CatalogPage() {
  const queryClient = new QueryClient();
  const initialPage = 1;
  const limit = 12;

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['filters'],
      queryFn: getFilters,
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: ['cars', defaultFilters],
      queryFn: ({ pageParam = initialPage }) =>
        getCars({
          ...defaultFilters,
          page: pageParam,
          perPage: limit,
          brand: defaultFilters.brand || undefined,
          price: defaultFilters.rentalPrice
            ? Number(defaultFilters.rentalPrice)
            : undefined,
          minMileage: defaultFilters.minMileage,
          maxMileage: defaultFilters.maxMileage,
        }),
          initialPageParam: initialPage,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogClient />
    </HydrationBoundary>
  );
}