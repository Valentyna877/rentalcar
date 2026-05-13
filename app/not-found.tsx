import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="notFoundWrapper">
      <h1>404</h1>

      <p>The page you are looking for does not exist.</p>

      <Link href="/" className="notFoundLink">
        Go back home
      </Link>
    </div>
  );
}