# Wanderlust - Full-Stack Travel Listing App (Airbnb Clone)

**Live Demo**: [Wanderlust - Full-Stack Travel Listing App](https://project-1-v8jl.onrender.com/listing)

## Project Overview

Wanderlust is a full-stack web application that replicates the functionality of Airbnb, allowing users to explore, list, and book travel accommodations. This app features a variety of destinations and accommodation types, enabling users to view listings, leave reviews, and interact with hosts. The app implements key features found in Airbnb, including user authentication, map integration, and image uploads.

This project follows the **Model-View-Controller (MVC)** architecture, ensuring proper code separation and maintainability. The design and functionality are inspired by Airbnb's core features.

## Key Features

- **User Authentication**: Secure user authentication and management with Passport.js and local strategy, including login, registration, and logout.
- **Accommodation Listings**: Users can create, view, and edit travel accommodation listings with details such as title, description, location, price, category, and images.
- **Reviews and Ratings**: Users can leave reviews and rate accommodations based on their experience.
- **Geolocation and Map Integration**: Integrated Mapbox to display travel locations on a map, allowing users to view listings by location.
- **Image Uploads**: Cloudinary for image storage, allowing users to upload pictures for each listing.
- **Sessions & Flash Messages**: Express-session for user session management, and connect-flash for showing feedback messages (success/error).
- **Responsive Design**: Built with responsive layouts to ensure accessibility across all devices (desktop, tablet, mobile).

## Tech Stack

- **Frontend**:
  - EJS templating engine for rendering dynamic HTML views.
  - CSS/Bootstrap for styling and responsiveness.
  - Mapbox for interactive maps and geolocation.
- **Backend**:
  - Node.js with Express.js for server-side functionality.
  - MongoDB with Mongoose for data storage and retrieval.
  - Passport.js for handling user authentication.
  - Cloudinary for image uploads and management.
- **Deployment**:
  - Hosted on Render for cloud deployment.
  - MongoDB Atlas for cloud database management.

## Project Structure

- **Models**: 
  - `Listing.js`: Defines the schema for travel listings, including title, description, price, location, category, and images.
  - `Review.js`: Defines the schema for reviews, including rating and comments from users.
  - `User.js`: Defines the user schema, used for authentication with Passport.js.
  
- **Controllers**: 
  - Handles CRUD operations for listings and reviews.

- **Routes**:
  - Handles routes for user authentication, listing creation/editing, viewing listings, and review management.

- **Views**:
  - EJS templates for rendering views like the homepage, listing pages, login, registration, etc.

---
