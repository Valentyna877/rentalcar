🚗 RentalCar – Car Rental Platform
Live Demo: https://rentalcar-theta.vercel.app

📖 Description
RentalCar is a modern frontend web application for a car rental company. It provides users with a seamless experience to browse available vehicles, apply advanced filters, and view detailed specifications before booking.

The project is built with Next.js (App Router) and TypeScript, focusing on performance, SEO, and smooth user experience.

✨ Main Features
Home Page: Engaging hero section with a clear call-to-action.

Interactive Catalog: Dynamic list of cars fetched from a REST API.

Advanced Filtering: Filter cars by:

Brand (single selection)

Price (single selection)

Mileage (min/max values)

"Load More" Pagination: Efficient data fetching with TanStack Query’s useInfiniteQuery.

Dynamic Car Details: Dedicated pages /catalog/[carId] with high-quality images, specifications, rental conditions, and booking form.

SEO Optimization: Dynamically generated metadata and OpenGraph tags for each car page.

🛠️ Tech Stack
Framework: Next.js (App Router)

Language: TypeScript

State Management / Data Fetching: TanStack Query (React Query)

Styling: CSS Modules

Icons: SVG Sprite

🚀 Installation and Usage
Prerequisites
Make sure you have Node.js installed.

Steps
Clone the repository:

bash
git clone https://github.com/<your-username>/rental-car.git
Navigate to the project directory:

bash
cd rental-car
Install dependencies:

bash
npm install

# or

yarn install
Create a .env file in the root and add your API endpoint:

Код
NEXT_PUBLIC_API_URL=https://car-rental-api.goit.study
Start the development server:

bash
npm run dev

# or

yarn dev
Open http://localhost:3000 in your browser.

👤 Author
Valentyna

GitHub: [@Valentyna877](https://github.com/Valentyna877)

LinkedIn: [Valentyna Shpakivska-Aydemir] (https://www.linkedin.com/in/valentyna-shpakivska-aydemir/)
