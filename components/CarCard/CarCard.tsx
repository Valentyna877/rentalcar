'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Car } from '@/types/car';
import css from './CarCard.module.css';
import { useCarsStore } from '@/lib/store/carStore';

interface Props {
  car: Car;
}

function CarCard({ car }: Props) {
  const { favorites, toggleFavorite } = useCarsStore();
  const isFavorite = favorites.includes(String(car.id));

  const { city, country } = car.location;
  const mileage = car.mileage.toLocaleString('uk-UA');

  return (
    <li className={css.card}>
      <div className={css.imageWrapper}>
        <Image
          className={css.carImage}
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          width={276}
          height={268}
        />
        <button
          onClick={() => toggleFavorite(String(car.id))}
          className={css.favoriteBtn}
          type="button"
        >
          <svg className={`${css.iconFavorite} ${isFavorite ? css.activeFavorite : ''}`}>
            <use href={isFavorite ? '/sprite.svg#icon-active-heart' : '/sprite.svg#icon-default-heart'} />
          </svg>
        </button>
      </div>
      <div className={css.content}>
        <div className={css.topRow}>
          <h3 className={css.title}>
            {car.brand} <span className={css.model}>{car.model}</span>,{''}
            {car.year}
          </h3>

          <p className={css.price}>${car.rentalPrice}</p>
        </div>

        <p className={css.meta}>
          {city} | {country} | {car.rentalCompany} |
        </p>

        <p className={css.meta}>
          {car.type} | {mileage} km
        </p>
      </div>
      <Link
        href={`/catalog/${car.id}`}
        className={css.button}
        target="_blank"
        rel="noopener noreferrer">
        Read more
      </Link>
    </li>
  );
}

export default CarCard;