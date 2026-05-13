'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="errorWrapper">
      <h2>Something went wrong</h2>

      <p>{error.message}</p>

      <button onClick={() => reset()} className="errorBtn">
        Try again
      </button>
    </div>
  );
}