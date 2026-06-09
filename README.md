# BookMyRoom - Hotel Management System

A full-stack hotel booking and management system built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js).

## Features

### User Features
- User registration and login with JWT authentication
- Browse rooms with search and filter (by type, price, availability)
- View detailed room information with amenities
- Book rooms with date selection and price calculation
- Manage bookings (view, cancel)
- User profile management

### Admin Features
- Secure admin login
- Dashboard with statistics (total rooms, bookings, users, revenue)
- Room management (CRUD operations)
- Booking management (status control: Pending → Confirmed → Completed)
- User management (view, delete)

### Room Types
- Single Room
- Double Room  
- Deluxe Room
- AC Room
- Non-AC Room

## Tech Stack

**Frontend:**
- React 18 + Vite
- React Router v6
- Tailwind CSS
- Context API for state management
- Axios for API calls
- React Hot Toast for notifications
- React Icons

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt password hashing
- MVC architecture

## Project Structure

```
BookMyRoom/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── middlewares/      # Auth & error middlewares
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express routes
│   ├── utils/           # Utility functions
│   ├── server.js        # Entry point
│   ├── seed.js          # Database seeder
│   └── .env             # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── context/     # AuthContext (state management)
│   │   ├── pages/       # All pages
│   │   ├── App.jsx      # Router setup
│   │   ├── main.jsx     # Entry point
│   │   └── index.css    # Tailwind styles
│   ├── index.html
│   ├── vite.config.js
│   └── tailwind.config.js
├── package.json         # Root with dev script
└── README.md
```

## Installation

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account (or local MongoDB)

### 1. Clone & Install Dependencies

```bash
cd BookMyRoom
npm install
cd backend && npm install
cd ../frontend && npm install
cd ..
```

### 2. Configure Environment Variables

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.xxxxx.mongodb.net/bookmyroom?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

Replace `MONGO_URI` with your MongoDB Atlas connection string.

### 3. Seed Database (Optional - creates sample data)

```bash
cd backend
npm run seed
```

This creates:
- **Admin account**: `admin@bookmyroom.com` / `admin123`
- **10 sample rooms** across all room types

### 4. Start the Application

Run both frontend and backend concurrently:

```bash
npm run dev
```

Or run them separately:

```bash
# Terminal 1 - Backend
cd backend
npm run dev    # Runs on http://localhost:5000

# Terminal 2 - Frontend
cd frontend
npm run dev    # Runs on http://localhost:3000
```

## API Endpoints

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register a new user | - |
| POST | `/api/auth/login` | Login user | - |
| GET | `/api/auth/profile` | Get user profile | User |
| PUT | `/api/auth/profile` | Update user profile | User |

### Rooms
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/rooms` | Get all rooms (with filters) | - |
| GET | `/api/rooms/:id` | Get room by ID | - |
| POST | `/api/rooms` | Create a room | Admin |
| PUT | `/api/rooms/:id` | Update a room | Admin |
| DELETE | `/api/rooms/:id` | Delete a room | Admin |

### Bookings
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/bookings` | Create a booking | User |
| GET | `/api/bookings` | Get user's bookings | User |
| GET | `/api/bookings/:id` | Get booking by ID | User |
| PUT | `/api/bookings/:id/cancel` | Cancel a booking | User |

### Admin
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/admin/login` | Admin login | - |
| POST | `/api/admin/register` | Register admin | - |
| GET | `/api/admin/dashboard` | Get dashboard stats | Admin |
| GET | `/api/admin/users` | Get all users | Admin |
| DELETE | `/api/admin/users/:id` | Delete a user | Admin |
| GET | `/api/admin/bookings` | Get all bookings | Admin |
| PUT | `/api/admin/bookings/:id` | Update booking status | Admin |

### Query Parameters for Rooms

```
GET /api/rooms?type=Deluxe&minPrice=100&maxPrice=300&availability=true&search=king
```

## API Testing Examples

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123","phone":"+1234567890"}'
```

### Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Create Booking (with auth token)
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -d '{"roomId":"<ROOM_ID>","checkInDate":"2025-06-01","checkOutDate":"2025-06-05","guests":2}'
```

## Frontend Pages

| Route | Page | Access |
|-------|------|--------|
| `/` | Home | Public |
| `/about` | About Us | Public |
| `/rooms` | Room Listing (with filters) | Public |
| `/rooms/:id` | Room Details | Public |
| `/login` | User Login | Public |
| `/signup` | User Registration | Public |
| `/contact` | Contact Us | Public |
| `/booking` | Booking Confirmation | User |
| `/dashboard` | User Dashboard | User |
| `/my-bookings` | My Bookings | User |
| `/admin/login` | Admin Login | Public |
| `/admin/dashboard` | Admin Dashboard | Admin |

## Deployment

### Backend (Render / Railway / Heroku)

1. Push the backend to GitHub
2. Deploy via Render or Railway:
   - Set build command: `npm install`
   - Set start command: `node server.js`
   - Add environment variables (MONGO_URI, JWT_SECRET)
3. Update `frontend/vite.config.js` proxy target with your backend URL

### Frontend (Vercel / Netlify)

1. Push the frontend to GitHub
2. Deploy via Vercel or Netlify:
   - Build command: `npm run build`
   - Output directory: `dist`
3. Set environment variable for API URL if needed

### Environment Variables for Production

```env
# Backend
PORT=5000
MONGO_URI=your_production_mongodb_uri
JWT_SECRET=your_secure_jwt_secret
NODE_ENV=production
```

## Security Features

- Passwords hashed using bcrypt (10 salt rounds)
- JWT tokens for authentication (30-day expiry)
- Protected admin routes with separate auth middleware
- CORS enabled for cross-origin requests
- Environment variables for sensitive data
- Input validation on all endpoints

## License

MIT
"# bookmyroom" 
