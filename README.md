# Assignment 5: PS4 — Rick and Morty Explorer

Rick and Morty Explorer is a web application built using React and React Router to browse characters from the Rick and Morty series, view their details, search by name, filter by status, and navigate across pages.

## Project Details
- Assignment: Assignment-5
- Problem Statement: PS4 — Rick and Morty Explorer
- Target Repository: ps4-rick-and-morty-explorer
- Live Deployment URL: [Deployment URL will be added here after deployment]

## Technologies Used
- React
- React Router
- Vite
- Vanilla CSS

## API Reference
- The Rick and Morty API: https://rickandmortyapi.com/
- Character Endpoint: https://rickandmortyapi.com/api/character

## Implemented Routes
- `/` : Home page with an introduction and link to characters
- `/characters` : Characters catalog with search, status filter, and pagination
- `/characters/:id` : Character details page showing image, status, gender, origin, location, and episode count
- `*` : Not-found page for invalid routes

## Screenshots

### Home Page
![Home Page](docs/screenshots/home.jpg)

### Characters Page
![Characters Page](docs/screenshots/characters.jpg)

## Installation and Execution

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview the production build:
```bash
npm run preview
```

## Deployment

### Vercel
1. Import the repository into Vercel.
2. The included `vercel.json` ensures client-side routing works for direct URLs.
3. Deploy the project.

### Netlify
1. Import the repository into Netlify.
2. The included `public/_redirects` file routes all requests to `index.html`.
3. Set the build command to `npm run build` and publish directory to `dist`.
