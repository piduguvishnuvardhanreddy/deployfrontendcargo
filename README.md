# 🚀 Frontend Cargo - Delivery Management System

Modern React + TypeScript frontend for the Delivery Management System, integrated with MongoDB backend.

---

## 📋 Features

- ✅ **React 18** with TypeScript
- ✅ **Vite** for fast development
- ✅ **Tailwind CSS** for styling
- ✅ **React Router** for navigation
- ✅ **JWT Authentication** with MongoDB backend
- ✅ **Role-based access** (Customer, Driver, Admin)
- ✅ **Responsive design**
- ✅ **Modern UI components**

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Backend server running on port 5000

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

---

## 📁 Project Structure

```
frontend-cargo/
├── src/
│   ├── components/          # Reusable UI components
│   ├── contexts/           # React contexts (Auth, etc.)
│   ├── lib/               # Utilities and API client
│   ├── pages/             # Page components
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── public/                # Static assets
├── .env                   # Environment variables
├── package.json           # Dependencies
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # Tailwind configuration
└── tsconfig.json          # TypeScript configuration
```

---

## 🔧 Configuration

### Environment Variables

Create `.env` file:
```env
VITE_API_URL=http://localhost:5000
```

---

## 📡 API Integration

The frontend connects to the MongoDB backend API:

- **Authentication**: `/api/auth/*`
- **Deliveries**: `/api/deliveries/*`
- **Tracking**: `/api/tracking/*`
- **Admin**: `/api/admin/*`

All API calls are handled through `src/lib/api.ts`

---

## 🎨 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **Axios** - HTTP client
- **Lucide React** - Icons
- **Sonner** - Toast notifications

---

## 🏗️ Build for Production

```bash
# Build the app
npm run build

# Preview production build
npm run preview
```

---

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

---

## 🔐 Authentication Flow

1. User signs up/logs in
2. Backend returns JWT token
3. Token stored in localStorage
4. Token sent with all API requests
5. Auto-login on page refresh

---

## 👥 User Roles

### Customer
- Create delivery orders
- Track orders
- View order history

### Driver
- View assigned deliveries
- Update delivery status
- Share location

### Admin
- View all orders
- Assign drivers
- View statistics

---

## 🎯 Next Steps

1. Start backend server
2. Run `npm install`
3. Run `npm run dev`
4. Open http://localhost:5173
5. Sign up and start using!

---

*Built with ❤️ using React + TypeScript + MongoDB*
