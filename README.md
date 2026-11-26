# Dr. Praveen Chandra – Premium Cardiologist Website

A modern, highly animated, interactive React application built with **Vite**, **GSAP / ScrollTrigger**, and **React Router** for **Dr. Praveen Chandra** — Padma Shri Awardee and Chairman of Interventional Cardiology at Medanta – The Medicity, Gurugram.

---

## 🌟 Highlights & Features

- **Component Architecture**: 100% modular React architecture with reusable navigation, layouts, animated backgrounds, and CTA buttons.
- **GSAP & ScrollTrigger Animations**:
  - Section-based animated environments (cardiac SVG pulses, rotating medical rings, dynamic artery flow, drifting micro-particles).
  - Staggered card reveals, parallax backgrounds, and interactive counter animations.
  - Smooth hover and transition effects tailored per section.
- **5 Complete Pages**:
  1. **Home (`/`)**: Immersive Hero with live photo, doctor stats, preview biography, areas of expertise, landmark treatments, achievements showcase, video spotlight, and appointment banner.
  2. **About (`/about`)**: Full professional biography, King George's Medical College (KGMC) education, career milestones, international fellowships (FACC, FESC, FSCAI, FAPSIC, FCSI), and academic research highlights.
  3. **Treatments & Expertise (`/treatments`)**: Categorized clinical treatments including TAVI/TAVR (First in India), MitraClip (First in India), Complex PCI, Acute MI Angioplasty, BMV, and Peripheral interventions with interactive category filters and hash navigation.
  4. **Media & Videos (`/media`)**: Video library with interactive player (patient success stories, doctor insights, procedure guides, media interviews) and links to Medanta's press room.
  5. **Contact & Appointments (`/contact`)**: Hospital OPD coordinates, coordinator contacts, 24/7 cardiac emergency info (1068), and Google Maps integration.
- **Direct Medanta Booking Integration**: All appointment buttons across all pages link directly to the official [Medanta Doctor Profile](https://www.medanta.org/hospitals-near-me/gurugram-hospital/speciality/cardiology/doctor/dr-praveen-chandra).
- **Responsive & Accessible**: Optimized for mobile, tablet, and desktop screens with reduced-motion support.

---

## 📂 Project Structure

```
dr-praveen-chandra/
├── public/
│   ├── favicon.svg
│   ├── images/
│   │   ├── doctor/ (dr-praveen-chandra.png)
│   │   ├── achievements/
│   │   ├── treatments/
│   │   ├── medical/
│   │   └── media/
│   ├── videos/
│   │   ├── doctor/
│   │   ├── patient-stories/
│   │   ├── treatments/
│   │   └── informational/
│   ├── icons/
│   └── favicon/
│
├── src/
│   ├── components/
│   │   ├── layout/ (Footer.jsx, Footer.css)
│   │   ├── navigation/ (Navbar.jsx, Navbar.css)
│   │   ├── backgrounds/ (HeartAnimation.jsx, HeartAnimation.css)
│   │   └── common/ (AppointmentButton.jsx, AppointmentButton.css)
│   │
│   ├── pages/
│   │   ├── Home/ (Home.jsx, Home.css)
│   │   ├── About/ (About.jsx, About.css)
│   │   ├── Treatments/ (Treatments.jsx, Treatments.css)
│   │   ├── Media/ (Media.jsx, Media.css)
│   │   └── Contact/ (Contact.jsx, Contact.css)
│   │
│   ├── data/ (doctorData.js)
│   ├── hooks/ (useScrollAnimation.js, useMediaQuery.js)
│   ├── styles/ (globals.css)
│   ├── App.jsx
│   └── main.jsx
│
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
```bash
npm install
```

### Development
Start the local development server:
```bash
npm run dev
```

### Production Build
Compile production assets:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```
