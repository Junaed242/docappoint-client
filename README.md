# DocAppoint - Doctor Appointment Manager

DocAppoint is a medical appointment scheduling platform built as a full-stack, decoupled application. Patients can browse medical specialists, search for physicians by name, filter by consulting fees, book appointments, and manage their schedules securely from a private user dashboard.

## 🚀 Live Site Link
**Live Application URL:** [https://docappoint-client-eight.vercel.app/](https://docappoint-client-eight.vercel.app/)
**Server URL:** [https://docappoint-server-ten.vercel.app/](https://docappoint-server-ten.vercel.app/)

## 🌟 Key Features
- **Dynamic SEO Metadata Engine:** Utilizes Next.js Server Components to generate search-engine-optimized titles and descriptions dynamically for each doctor's details page before rendering on the client.
- **Robust Authentication & Social Sign-In:** Integrated with Better-auth v1.6, supporting custom form credentials (with strict uppercase, lowercase, and length checks) as well as secure Google OAuth handshakes.
- **Next.js 16 Secure Routing:** Employs the native server-side `proxy.js` request-interception convention to protect dashboard routes, verifying session validity directly against the MongoDB store.
- **Zero-Refresh CRUD Operations:** Incorporates reactive state synchronization inside the User Dashboard, allowing patients to add, modify, or delete appointments with immediate UI updates.
- **Modern Medical UI:** Designed with a responsive grid layout using HeroUI v3 compound components and Tailwind CSS v4.0 design tokens for a consistent, accessible healthcare interface.

## 🛠️ Technology Stack
- **Frontend Framework:** Next.js 16 (App Router), React 19.
- **Styling & UI:** Tailwind CSS v4.0, HeroUI v3, DaisyUI, React Icons.
- **Authentication:** Better-auth v1.6 (MongoDB Adapter), Next.js `proxy.js` interception.
- **Backend API:** Node.js, Express.js.
- **Database:** MongoDB Atlas.
