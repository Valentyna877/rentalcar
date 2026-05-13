import Link from 'next/link';
import css from "./page.module.css";

function Home() {
  return (
    <main className={css.main}>
      <div className="container">
        <div className={css.content}>
          <h1 className={css.title}>
            Find your perfect rental car
          </h1>
          <p className={css.subtitle}>
            Reliable and budget-friendly rentals for any journey
          </p>
        </div>
        <Link href="/catalog" className={css.button}>
          View Catalog
        </Link>
      </div>
    </main>
  );
}
export default Home;