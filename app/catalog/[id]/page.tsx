import CarDetails from '@/components/CarDetails/CarDetails';
import { getCarById } from '@/lib/api/clientApi';

interface CarDetailsProps {
  params: Promise<{ id: string }>;
}

async function CarDetailsPage({ params }: CarDetailsProps) {
  const { id } = await params;

  const car = await getCarById(id);
  return (
    <div>
      <CarDetails car={car} />
    </div>
  );
}

export default CarDetailsPage;
