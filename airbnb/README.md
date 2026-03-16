airbnb-clone/
│
├── client/ # Frontend (React)
│ ├── package.json
│ ├── public/
│ │ └── index.html
│ └── src/
│ ├── App.jsx
│ ├── main.jsx
│ ├── pages/
│ │ ├── Home.jsx
│ │ ├── ListingDetails.jsx
│ │ └── Login.jsx
│ └── components/
│ ├── Navbar.jsx
│ └── ListingCard.jsx

├── server/ # Backend (Node + Express)
│ ├── package.json
│ ├── server.js
│ ├── .env # DB URI + JWT secret
│ ├── routes.js # Combine all routes
│ └── models/
│ ├── User.js
│ └── Listing.js
│
└── README.md

✅ Minimal Features to Implement First

1. Frontend
   Display a list of listings (Home page)
   View details of a listing (ListingDetails page)
   Simple login page (Login page)
   Navbar component

2. Backend
   Express server
   API routes:
   GET /listings → get all listings
   POST /login → login user
   POST /listings → add a new listing (optional for first version)
   MongoDB models: User, Listing

3. .env (backend)
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/airbnb
   JWT_SECRET=mysecretkey
