import { api } from './api';
import { Car, CarsResponse } from '@/types/car';

export interface CarsParams {
  brand?: string;
  price?: number;
  minMileage?: number;
  maxMileage?: number;
  perPage?: number;
  page?: number;
}
export async function getCars(params: CarsParams = {}): Promise<CarsResponse> {
  const { data } = await api.get<CarsResponse>('/cars', { params });
  return data;
}

export async function getCarById(id: string): Promise<Car> {
  const { data } = await api.get<Car>(`/cars/${id}`);
  return data;
}

export interface FiltersResponse {
  brands: string[];
  price: {
    min: number;
    max: number;
  };
}

export async function getFilters(): Promise<FiltersResponse> {
  const { data } = await api.get<FiltersResponse>('/cars/filters');
  return data;
}

export interface BookingRequestPayload {
  name: string;
  email: string;
  comment: string;
  // dateFrom: string;
  // dateTo: string;
}

export async function createBookingRequest(
  carId: string,
  payload: BookingRequestPayload
): Promise<void> {
  await api.post(`/cars/${carId}/booking-requests`, payload);
}