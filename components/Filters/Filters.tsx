'use client';
import { useEffect } from 'react';
import { useCarsStore } from '@/lib/store/carStore';
import { generatePrices } from '@/lib/utils/priceUtils';
import Select from '../Select/Select';
import css from './Filters.module.css';
import { getFilters, FiltersResponse } from '@/lib/api/clientApi';

interface FiltersProps {
  brands: string[];
  prices: string[];
  onSearch: () => void;
}

function formatMileage(value: number | undefined) {
  return value?.toLocaleString('en-US') ?? '';
}

export default function CarFilters({ brands, prices, onSearch }: FiltersProps) {
  const { filters, setFilter, resetFilters, setBrands, setPrices } =
    useCarsStore();

  useEffect(() => {
    async function fetchFilters() {
      try {
        const data: FiltersResponse = await getFilters();
        setBrands(data?.brands ?? []);
        if (data?.price) {
        const generatedPrices = generatePrices(data.price.min, data.price.max, 10).map(String);
        setPrices(generatedPrices);
      } else {
        setPrices([]);
      }
      } catch (error) {
        console.error('Failed to fetch filters', error);
      }
    }
    fetchFilters();
  }, [setBrands, setPrices]);

  const brandOptions = brands.map((brand) => ({
    value: brand,
    label: brand,
  }));

  const priceOptions = prices.map((price) => ({
    value: String(price),
    label: String(price),
  }));

  const handleMileageChange = (name: 'minMileage' | 'maxMileage', value: string) => {
    const normalizedValue = Number(value.replace(/[^\d]/g, ''));
    setFilter(name, normalizedValue);
  };

  const handleReset = () => {
    resetFilters();
    onSearch();
  };

  return (
    <form
      className={css.form}
      onSubmit={(e) => {
        e.preventDefault();
        onSearch();
      }}
    >
      <div className={`${css.filterGroup} ${css.filterBrand}`}>
        <label className={css.label} htmlFor="brand">
          Car brand
        </label>

        <Select
          id="brand"
          inputId="brand" 
          aria-label="Select car brand"
          value={filters.brand}
          placeholder="Choose a brand"
          options={brandOptions}
          onChange={(value) => setFilter('brand', value)}
        />
      </div>

      <div className={`${css.filterGroup} ${css.filterPrice}`}>
        <label className={css.label} htmlFor="price">
          Price / 1 hour
        </label>

        <Select
          id="price"
          inputId="price"
          aria-label="Select rental price per hour"
          value={filters.rentalPrice ?? ''}
          placeholder="Choose a price"
          options={priceOptions}
          onChange={(value) => setFilter('rentalPrice', value)}
          formatOptionLabel={(option, { context }) =>
            context === 'menu'
              ? option.label
              : `To $${option.label}`
          }
        />
      </div>

      <div className={`${css.filterGroup} ${css.filterMileage}`}>
        <label className={css.label}>Car mileage / km</label>

        <div className={css.mileageWrap}>
          <label className={`${css.mileageInput} ${css.mileageInputFrom}`}>
            <span className={css.inputPrefix}>From</span>
            <input
              className={css.input}
              type="text"
              value={formatMileage(filters.minMileage)}
              onChange={(e) => handleMileageChange('minMileage', e.target.value)}
              aria-label="Minimum mileage"
            />
          </label>

          <label className={`${css.mileageInput} ${css.mileageInputTo}`}>
            <span className={css.inputPrefix}>To</span>
            <input
              className={css.input}
              type="text"
              value={formatMileage(filters.maxMileage)}
              onChange={(e) => handleMileageChange('maxMileage', e.target.value)}
              aria-label="Maximum mileage"
            />
          </label>
        </div>
      </div>

      <div className={css.actions}>
        <button className={css.searchBtn} type="submit" aria-label="Search cars">
          Search
        </button>

        <button className={css.resetBtn} onClick={handleReset} aria-label="Clear filters" >
          Reset
        </button>
      </div>
    </form>
  );
}