# Mohan Karuparthi Portfolio (React + Vite)

A modern, animation-rich personal portfolio built with React 18 and Vite 5, with custom UI effects and Vercel-ready deployment configuration.

## Highlights

- Responsive single-page portfolio with section-based navigation (Home, About, Skills, Projects, Journey, Contact)
- Animated hero with SoftAurora background (OGL/WebGL)
- Glass-style responsive header and mobile menu
- Interactive project showcase with animated Magic Bento cards and category filtering
- Technical Skills section with logo cards and continuous marquee motion
- About section with ProfileCard integration
- Optional Splash Cursor effect with lazy loading
- Resume modal (embedded PDF) and downloadable assets

## Tech Stack

- React 18
- Vite 5
- React Router DOM 6
- GSAP (interactive animation effects)
- OGL (SoftAurora shader background)
- Custom CSS (global styling, motion, responsiveness)
- Vercel (deployment)

## Scripts

```bash
npm run dev      # start local development server
npm run build    # create production build
npm run preview  # preview production build locally
```

## Project Structure

```text
.
├── public/
│   ├── Mohan_Resume.pdf
│   ├── profile.png
│   ├── logo.png
│   └── logo-tab.png
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── SoftAurora.jsx
│   │   ├── About.jsx
│   │   ├── ProfileCard.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── MagicBento.jsx
│   │   ├── Timeline.jsx
│   │   ├── Contact.jsx
│   │   ├── ResumeModal.jsx
│   │   ├── Footer.jsx
│   │   └── SplashCursor.jsx
│   ├── data/
│   │   └── portfolioData.js
│   ├── hooks/
│   │   └── useSplashCursorEnabled.js
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── index.html
├── vercel.json
├── vite.config.js
└── package.json
```

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Open the local URL shown in terminal (commonly http://localhost:5173).

## Build and Preview

```bash
npm run build
npm run preview
```

## Deployment

This project is configured for Vercel using `vercel.json`.

Typical deployment flow:

1. Push code to your GitHub repository.
2. Import the repository into Vercel.
3. Keep default Vite settings (build command: `npm run build`, output: `dist`).

## Notes

- Skill and tool logos are currently loaded from public icon CDNs.
- If you want fully offline-safe icons, move logo assets into `public/skills/` and update `src/data/portfolioData.js` paths accordingly.
