import css from './CarDetails.module.css';
import { Car } from '@/types/car';
import Image from 'next/image';
import BookingForm from '../BookingForm/BookingForm'
// import { extractIdFromImageUrl } from '@/lib/utils/extractId';

interface CarDetailsProps {
  car: Car;
}

function CarDetails({ car }: CarDetailsProps) {
  // const shortId = extractIdFromImageUrl(car.img);
  const { city, country } = car.location;
  const mileage = car.mileage.toLocaleString('uk-UA');

 return (
    <section className={css.section}>
      <div className="container">
        <div className={css.wrapper}>
          <div className={css.left}>
            <div className={css.imageWrapper}>
              <Image
                className={css.img}
                src={car.img}
                alt={`${car.brand} ${car.model}`}
                width={640}
                height={512}
                priority
              />
            </div>
            <BookingForm carId={car.id}/>
          </div>
          <div className={css.right}>
           <div className={css.head}>
              <span className={css.id}>Article: {car.stockNumber}</span>
              <h1 className={css.title}>
                {car.brand} {car.model} ({car.year})
             </h1>
              <div className={css.meta}>
                <p className={css.metaItem}>
                  <svg className={css.metaIcon} aria-hidden="true">
                    <use href="/sprite.svg#icon-location" />
                  </svg>
                  {city}, {country}
                </p>
              </div>
              <p className={css.price}>${car.rentalPrice}</p>
              <p className={css.description}>{car.description}</p>
            </div>

            <div className={css.block}>
              <h2 className={css.subtitle}>Rental Conditions:</h2>
              <ul className={css.list}>
                {car.rentalConditions.map(condition => (
                  <li key={condition} className={css.item}>
                    <svg className={css.icon} aria-hidden="true">
                      <use href="/sprite.svg#icon-check-circle" />
                    </svg>
                    {condition}
                  </li>
                ))}
              </ul>
           </div>
           
           <div className={css.divider}></div>

            <div className={css.block}>
              <h2 className={css.subtitle}>Car Specifications:</h2>
              <ul className={css.list}>
                <li className={css.item}>
                  <svg className={css.icon} aria-hidden="true">
                    <use href="/sprite.svg#icon-calendar" />
                  </svg>
                  Year: {car.year}
                </li>
                <li className={css.item}>
                  <svg className={css.icon} aria-hidden="true">
                    <use href="/sprite.svg#icon-car" />
                  </svg>
                  Type: {car.type}
                </li>
                <li className={css.item}>
                  <svg className={css.icon} aria-hidden="true">
                    <use href="/sprite.svg#icon-fuel-pump" />
                  </svg>
                  Fuel Consumption: {car.fuelConsumption}
                </li>
                <li className={css.item}>
                  <svg className={css.icon} aria-hidden="true">
                    <use href="/sprite.svg#icon-gear" />
                  </svg>
                  Engine: {car.engine}
                </li>
                <li className={css.item}>
                  <svg className={css.icon} aria-hidden="true">
                    <use href="/sprite.svg#icon-road" />
                  </svg>
                  Mileage: {mileage} km
                </li>
              </ul>
           </div>
           
           <div className={css.divider}></div>

            <div className={css.block}>
              <h2 className={css.subtitle}>Features:</h2>
              <ul className={css.list}>
                {car.features.map(item => (
                  <li key={item} className={css.item}>
                    <svg className={css.icon} aria-hidden="true">
                      <use href="/sprite.svg#icon-check-circle" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CarDetails;