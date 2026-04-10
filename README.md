# Mohan Karuparthi Portfolio (React)

A deployment-ready personal portfolio built with React and Vite, styled with custom CSS, and configured for Vercel.

## Tech Stack

- React 18
- Vite 5
- Custom CSS
- Vercel

## Project Structure

- `index.html` - Vite entry HTML
- `src/main.jsx` - React bootstrap
- `src/App.jsx` - main portfolio component
- `src/styles.css` - complete styling and animations
- `public/profile.png` - profile image asset
- `public/Mohan_Resume.pdf` - resume PDF
- `vercel.json` - Vercel build and routing config

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start dev server:

```bash
npm run dev
```

3. Open the URL shown in terminal (usually `http://localhost:5173`).

## Production Build Check

```bash
npm run build
npm run preview
```

## Deploy To Vercel

1. Push this project to GitHub.
2. Go to Vercel dashboard and click **Add New Project**.
3. Import your repository.
4. Framework preset: **Vite**.
5. Build command: `npm run build`.
6. Output directory: `dist`.
7. Deploy.

`vercel.json` is already configured for Vite build output and SPA rewrites.
