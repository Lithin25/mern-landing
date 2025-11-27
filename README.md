# MERN Product Landing Page

This is a product landing page built using the MERN stack (MongoDB, Express, React, Node.js). It includes product listing, live search with suggestions, filtering by category, and MongoDB integration. The backend provides product data from MongoDB Atlas and the frontend consumes it using Axios.

---

## Features

- Product listing grid
- Category filter
- Search bar with real-time suggestions
- Search + category filtering together
- MongoDB Atlas database integration using Mongoose
- REST APIs for products and search
- React + Vite frontend with Axios
- Placeholder product images & star ratings
- Responsive clean UI

---

## Tech Stack

**Frontend:** React, Vite, Axios, CSS  
**Backend:** Node.js, Express, Mongoose  
**Database:** MongoDB Atlas

---

## Project Structure

mern-landing/
  ├── backend/
  │   ├── server.js
  │   ├── seed.js
  │   ├── products.json
  │   └── package.json
  ├── frontend/
  │   ├── src/
  │   ├── vite.config.js
  │   └── package.json
  └── README.md

---

## MongoDB Setup

This project uses MongoDB Atlas.

Example connection string format:
mongodb+srv://mernUser:<password>@merncluster.wehcjha.mongodb.net/mern_assignment?retryWrites=true&w=majority&appName=MernCluster

Replace `<password>` with the actual password created in Atlas.

---

## Running the Project Locally

### 1️ Clone repo
git clone <repo-url>
cd mern-landing

---

### 2️ Backend Setup
cd backend
npm install

Set environment variable (PowerShell example):
$env:MONGO_URI = "mongodb+srv://mernUser:<password>@merncluster.wehcjha.mongodb.net/mern_assignment?retryWrites=true&w=majority&appName=MernCluster"

Seed database:
node seed.js
# Expected: Seeded products: 20

Start backend:
node server.js
# Expected: Connected to MongoDB / Server listening on 5000

Backend URL:
http://localhost:5000

---

### 3 Frontend Setup
cd ../frontend
npm install
npm run dev

Frontend URL:
http://localhost:3000

---

##  API Endpoints

GET /products  
returns all products

GET /search?q=<term>  
returns suggestions matching product name

Example:
http://localhost:5000/products  
http://localhost:5000/search?q=phone

---

##  Testing

- Products display in a grid cards
- Search suggestions appear as typing
- Clicking suggestion filters product grid
- Category filter updates grid
- Search + category combined filtering
- MongoDB products contain `_id` field

---

##  Notes

- node_modules are ignored via .gitignore
- placeholder images from via.placeholder.com
- Fully functional with MongoDB Atlas connection
- Clean MERN architecture

---

##  Conclusion

This MERN application implements all required features per the assignment:
- MERN architecture with MongoDB Atlas
- REST APIs
- Live search suggestions
- Product listing with category filtering
- React + Vite frontend
- Full documentation and setup guide

## Screenshots

### Landing Page
[Landing Page](./screenshots/landing-page.png)

### Search Suggestions
[Search Suggestions](./screenshots/search-suggestions.png)

### Category Filter Example
[Category Filter](./screenshots/filter-example.png)

### Products API Output
[Products API](./screenshots/products-api.png)

### Terminal – MongoDB Connection
[Mongo Connected](./screenshots/connected-to-mongo.png)
