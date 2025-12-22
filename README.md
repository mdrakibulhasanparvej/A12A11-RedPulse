# 🩸 REDPULSE

A full-stack **Blood Donation Application** built with the **MERN Stack** to connect blood donors with recipients efficiently.  
This platform supports role-based dashboards (Admin, Donor, Volunteer), secure authentication, donation request management, and funding via Stripe.

---

## 🌐 Live Website
🔗 **Live Link:** https://redpulses.web.app

---

## 🎯 Project Purpose
The main goal of this application is to create a reliable, user-friendly digital platform that:
- Connects blood donors with people in urgent need
- Manages blood donation requests efficiently
- Ensures secure access through role-based dashboards
- Promotes transparency through donation tracking and funding records

---

## 👥 User Roles & Permissions

### 🧑‍💼 Admin
- Manage all users (block / unblock)
- Assign roles (Donor → Volunteer / Admin)
- View and manage all donation requests
- View total users, total funds, and total donation requests
- Access funding records

### 🩸 Donor
- Register & manage profile
- Create, update, and delete own donation requests
- View donation request status
- Donate blood and change status (pending → inprogress → done/canceled)

### 🤝 Volunteer
- View all donation requests
- Update donation request status only
- Restricted from deleting or editing requests

---

## 🔐 Authentication & Security
- Email & Password Authentication using **Firebase**
- Role-based route protection
- JWT used to protect private APIs
- Firebase & MongoDB credentials secured using **Environment Variables**
- Reload-safe private routes (no auto logout on refresh)

---

## 🧩 Core Features

### 🌍 Public Features
- Home page with banner, featured section, contact form & footer
- Search donors by blood group, district & upazila
- View all pending blood donation requests
- Responsive navbar with user dropdown

### 📊 Dashboard (Private)
- Fully responsive sidebar dashboard
- Profile management with edit/save toggle
- Pagination & filtering for donation requests
- Charts & statistics for admin & volunteers

### 🆕 Donation Management
- Create blood donation requests
- View request details
- Donate blood via confirmation modal
- Status tracking: `pending → inprogress → done / canceled`

### 💳 Funding (Challenge Feature)
- Stripe payment integration
- Funding history table
- Total funds shown in admin & volunteer dashboard

---

## 🧱 Tech Stack

### Frontend
- React 19
- React Router
- Tailwind CSS + DaisyUI
- Framer Motion (animations)
- TanStack React Query
- React Hook Form
- Firebase Authentication

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Stripe Payment Gateway

---

## 📦 Frontend Dependencies

```json

  @headlessui/react: 2.2.9
  @tailwindcss/vite: 4.1.17
  @tanstack/react-query: 5.90.12
  axios: 1.13.2
  daisyui: 5.5.8
  firebase: 12.6.0
  framer-motion: 12.23.26
  prettier: 3.7.4
  react: 19.2.0
  react-dom: 19.2.0
  react-fast-marquee: 1.6.5
  react-hook-form: 7.68.0
  react-hot-toast: 2.6.0
  react-icons: 5.5.0
  react-router: 7.10.1
  react-simple-typewriter: 5.0.1
  react-toastify: 11.0.5
  sweetalert2: 11.26.10
  swiper: 12.0.3
  tailwindcss: 4.1.17
  typewriter-effect: 2.22

