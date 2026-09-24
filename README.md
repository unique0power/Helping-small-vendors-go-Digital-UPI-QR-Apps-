# DigitalDukaan - Take Your Small Business Digital

DigitalDukaan is a complete, modern SaaS application built to empower local Indian businesses (grocery stores, tea stalls, bakeries, etc.) to seamlessly transition into the digital world.

## Tech Stack
- **Frontend**: React 19, Vite, Tailwind CSS v4, React Router v7, Recharts, Lucide Icons
- **Backend (API)**: ASP.NET Core 10 Web API, Entity Framework Core, SQL Server (LocalDB), JWT Auth

## Features Implemented
1. **Landing Page**: Premium SaaS hero section with dynamic dashboard preview.
2. **Auth & Onboarding**: Login, Signup, and a beautifully animated 3-step Vendor Onboarding wizard.
3. **Vendor Dashboard**: Complete business overview with dynamic Recharts area chart and real-time Digital Readiness score.
4. **Digital Catalog**: Manage products with prices and categories.
5. **Sales & Expenses Trackers**: Record transactions and calculate profit instantly.
6. **QR Generator**: Generates a local UPI payment QR code for the vendor using `qrcode.react`.
7. **Digital Bills**: Creates a digital receipt that can be downloaded/printed.
8. **Digital Profile (My Shop)**: Public-facing business page with WhatsApp/Call quick links.
9. **Learn Digital**: Educational tutorials with English/Hindi language toggle.
10. **Admin Dashboard**: Role-based access control showing platform-wide metrics. (Login with Mobile: `9999999999` to access).

## How to Run

### Frontend (React + Vite)
The frontend uses a mock DataContext for a seamless demo experience.
1. Open terminal and go to `Frontend` directory
2. Run `npm install`
3. Run `npm run dev`
4. Open the localhost URL in your browser.

### Backend (ASP.NET Core)
1. Open terminal and go to `Backend` directory
2. Ensure you have SQL Server LocalDB running.
3. Run `dotnet restore`
4. Run `dotnet run`

## Demo Logins
- **Vendor**: Register normally, or use any mobile number to login.
- **Admin**: Login with Mobile: `9999999999` to see the Admin Dashboard.
