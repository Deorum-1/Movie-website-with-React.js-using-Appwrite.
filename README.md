# Movie App

A React + Vite movie search app with Appwrite integration.

## Features

- Search movies using The Movie Database (TMDB) API
- Display popular movies and search results
- Appwrite backend integration for tracking trending searches
- `client.ping()` is called on app startup to verify Appwrite connectivity

## Project structure

- `src/App.jsx` — main application logic and search flow
- `src/lib/appwrite.js` — Appwrite client wrapper and helper functions
- `src/components` — reusable UI components
- `index.html` — app entry point

## Requirements

- Node.js 18+ recommended
- npm package manager

## Setup

1. Install dependencies:

```bash
npm install
```

2. Add environment variables for the TMDB API key and Appwrite collection/database if needed:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_APPWRITE_PROJECT_ID=6a73b6b2002534030732
VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
```

> The app currently includes a hardcoded Appwrite project ID value, but database and collection IDs may still need to be configured.

3. Start the development server:

```bash
npm run dev
```

4. Open the app in the browser:

```text
http://localhost:5173
```

## Appwrite integration

The app uses the Appwrite Web SDK to connect to Appwrite at `https://fra.cloud.appwrite.io/v1`.

- `src/lib/appwrite.js` initializes `Client` and `Databases`
- `src/App.jsx` calls `client.ping()` on mount to verify the connection
- Trending search counts are retrieved from Appwrite and displayed in the UI

## Scripts

- `npm run dev` — start Vite development server
- `npm run build` — build production assets
- `npm run preview` — preview production build
- `npm run lint` — lint the codebase

## Notes

- The app uses Tailwind CSS and React 19
- If you do not have a TMDB API key, the app cannot fetch movie data
- Ensure Appwrite database and collection values are available in `.env` or via your environment
