'use client';

import { useState } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getCars, getFilters, CarsParams } from '@/lib/api/clientApi';
import { generatePrices } from '@/lib/utils/priceUtils';
import { defaultFilters, useCarsStore } from '@/lib/store/carStore';
import Loader from '@/components/Loader/Loader';
// import CarFilters from '@/components/Filters/Filters';
import CarList from '@/components/CarList/CarList';
import css from './CatalogClient.module.css';
import dynamic from 'next/dynamic';

const CarFilters = dynamic(() => import('@/components/Filters/Filters'), {
  ssr: false,
});

function CatalogClient() {
  const { filters } = useCarsStore();
  const [submittedFilters, setSubmittedFilters] = useState(defaultFilters);

  const { data: filtersData } = useQuery({
    queryKey: ['filters'],
    queryFn: getFilters,
    refetchOnMount: false,
  });

  const brands = filtersData?.brands ?? [];
  const prices = filtersData?.price
  ? generatePrices(filtersData.price.min, filtersData.price.max, 10).map(String)
  : [];

  const {
    data,
    isLoading,
    isFetching,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['cars', submittedFilters],
    queryFn: ({ pageParam = 1 }) => {
            const params: CarsParams = {
        page: pageParam,
        perPage: 12,
      };

      if (submittedFilters.brand) params.brand = submittedFilters.brand;
      if (submittedFilters.rentalPrice) { params.price = Number(submittedFilters.rentalPrice); }
      if (submittedFilters.maxMileage !== undefined) {
      params.maxMileage = submittedFilters.maxMileage;
      params.minMileage = submittedFilters.minMileage ?? 0; 
    } else if (submittedFilters.minMileage !== undefined) {
      params.minMileage = submittedFilters.minMileage;
    }
      // if (submittedFilters.minMileage !== undefined) params.minMileage = submittedFilters.minMileage;
      // if (submittedFilters.maxMileage !== undefined) params.maxMileage = submittedFilters.maxMileage;

      return getCars(params);
    },
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      const currentPage = Number(lastPage.page);
      const totalPages = Number(lastPage.totalPages);

      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    refetchOnMount: false,
  });

  const cars = data?.pages.flatMap(page => page.cars) ?? [];

  const handleSearch = () => {
    setSubmittedFilters(filters);
  };

  return (
    <main>
      <div className="container">

        <CarFilters brands={brands} prices={prices} onSearch={handleSearch} />

        {(isLoading || isFetching) && <Loader />}

        {cars.length > 0 && <CarList cars={cars} />}

        {isError && (
          <p className={css.emptyStateMessage}>
            Something went wrong. Please try again.
          </p>
        )}

        {!isLoading && !isError && cars.length === 0 && (
          <p className={css.emptyStateMessage}>
            No cars found for your search criteria.
          </p>
        )}

        {!isError && hasNextPage && (
          <div className={css.paginationWrapper}>
            <button
              className={css.paginationButton}
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default CatalogClient;