import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Filters {
  brand: string;
  rentalPrice: string;
  minMileage?: number;
  maxMileage?: number;
}

interface CarsStore {
  filters: Filters;
  favorites: string[];
  brands: string[];
  prices: string[];

  setFilter: (name: keyof Filters, value: string | number) => void;
  resetFilters: () => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;

  setBrands: (brands: string[]) => void;
  setPrices: (prices: string[]) => void;
}

export const defaultFilters: Filters = {
  brand: '',
  rentalPrice: '',
  minMileage: undefined,
  maxMileage: undefined,
};

export const useCarsStore = create<CarsStore>()(
  persist(
    (set, get) => ({
      filters: defaultFilters,
      favorites: [],
      brands: [],
      prices: [],

      setFilter: (name, value) =>
        set(state => ({
          filters: {
            ...state.filters,
            [name]: value,
          },
        })),

      resetFilters: () => set({ filters: defaultFilters }),

      toggleFavorite: id =>
        set(state => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter(item => item !== id)
            : [...state.favorites, id],
        })),

      isFavorite: id => get().favorites.includes(id),

      setBrands: (brands) => set({ brands }),
      setPrices: (prices) => set({ prices }),
    }),
    {
      name: 'cars-store',
      partialize: state => ({
        favorites: state.favorites,
      }),
    }
  )
);
