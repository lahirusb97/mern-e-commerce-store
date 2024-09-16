# MERN E-Commerce App

This is a full-stack e-commerce application built with the MERN (MongoDB, Express, React, Node.js) stack. The app supports Stripe for payment processing, Upstash for Redis, and implements role-based authentication using Express.js.

## Features

- **User Authentication**: Role-based authentication with JWT (admin, client).
- **Product Management**: Admins can perform CRUD operations on products.
- **Shopping Cart**: Users can add products to their cart, with logged-in users' carts being persisted.
- **Stripe Payments**: Integration with Stripe for secure payment processing.
- **Redis (Upstash)**: Caching with Upstash Redis for performance optimization.
- **Cloudinary**: Image upload and storage via Cloudinary for product images.
- **Mobile Responsive**: Fully responsive for mobile and desktop views.

## Technologies

- **Frontend**: React.js (with Material-UI for styling)
- **Backend**: Node.js, Express.js, MongoDB
- **Database**: MongoDB (NoSQL database)
- **Payment Gateway**: Stripe
- **Caching**: Redis via Upstash
- **Image Storage**: Cloudinary
- **Authentication**: JWT-based with role-based access control

## Installation

### 1. Clone the repository

```bash
git clone repourl
cd your-repo-name

### .env setup in root
PORT=5000
MONGO_URI=your-mongo-db-uri
REDIS_URL=your-upstash-redis-url
ACCESS_TOKEN_SECRET=your-access-token-secret
REFRESH_TOKEN_SECRET=your-refresh-token-secret
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_SECRET_KEY=your-stripe-secret-key
CLIENT_URL=http://localhost:3000

