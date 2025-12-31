# Kvory - Personal Portfolio Website

![Version](https://img.shields.io/badge/version-2.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

A modern, responsive personal portfolio website featuring smooth animations, dark mode support, and interactive 3D elements.

## ✨ Features

- **Responsive Design** - Fully responsive across desktop, tablet, and mobile devices
- **Dark Mode** - Toggle between light and dark themes with smooth transitions
- **3D Background** - Interactive 3D geometric shapes using Three.js
- **Constellation Effect** - Animated starfield constellation in dark mode
- **Smooth Scroll-Snap** - Section-based snap scrolling for better UX
- **View Transitions API** - Smooth cross-page transitions
- **AOS Animations** - Scroll-triggered animations throughout the site
- **Typewriter Effect** - Dynamic text animation on hero section

## 📁 Project Structure

```
Kvory V2/
├── index.html          # Main homepage
├── about.html          # About page with skills & education
├── project.html        # Projects showcase page
├── assets/
│   ├── css/
│   │   ├── style.css   # Main stylesheet
│   │   ├── about.css   # About page styles
│   │   └── project.css # Project page styles
│   ├── js/
│   │   └── script.js   # Main JavaScript file
│   └── img/            # Images and icons
└── vercel.json         # Vercel deployment config
```

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom styles with Tailwind CSS utilities
- **JavaScript** - Vanilla JS for interactions
- **Three.js** - 3D graphics library
- **AOS** - Animate On Scroll library
- **Google Fonts** - Plus Jakarta Sans & Sora

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local development server (optional but recommended)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/kvory-portfolio.git
   ```

2. Navigate to the project directory:

   ```bash
   cd kvory-portfolio
   ```

3. Open `index.html` in your browser or use a local server:

   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js (npx)
   npx serve
   ```

4. Visit `http://localhost:8000` in your browser

## 📱 Pages

### Home (`index.html`)

- Hero section with typewriter animation
- Interactive 3D background
- About preview
- Project showcase
- Contact form

### About (`about.html`)

- Detailed biography
- Skills & technologies
- Education timeline
- Academic records

### Projects (`project.html`)

- Featured project highlight
- Project grid with details
- Live demo & source code links

## 🎨 Customization

### Colors

Main color palette defined in CSS:

- Primary: `#22c55e` (Green)
- Dark: `#0f172a`, `#1e293b`
- Light: `#f1f5f9`, `#ffffff`

### Dark Mode

Dark mode preferences are saved to `localStorage` and persist across sessions.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Raffi Andhika**

- Website: [kvorys.vercel.app](https://kvorys.vercel.app)
- GitHub: [@Kvoryz](https://github.com/Kvoryz)

---
