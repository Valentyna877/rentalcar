import { Car } from "@/types/car";
import CarCard from "../CarCard/CarCard";
import css from "./CarList.module.css";

type Props = {
  cars: Car[];
};

function CarList({ cars }: Props) {
  // if (!cars.length) {
  //   return <p className={css.empty}>No cars found</p>;
  // }
  return (
    <ul className={css.list}>
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </ul>
  );
}

export default CarList;