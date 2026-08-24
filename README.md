# PlantCare

A plant discovery app. Search or browse plants from a live database, view full care guides, and save plants to a personal shelf (requires an account).

**Live demo:** https://plantcare-frontend-omega.vercel.app

## Features

- Search and browse plants via the Perenual API
- Plant detail pages: photo, description, watering/sunlight, care guide, tips, related plants
- Account system with an auth-gated "Add to Shelf" flow
- Profile page with a personal plant shelf and an edit/remove mode
- Responsive layout, mobile nav included

## Tech stack

- React 19 + Vite
- React Router v7
- React Context API for auth/shelf state
- Perenual API for plant data
- Plain CSS with a shared design-token system (no UI framework)

## Setup

```bash
git clone https://github.com/jasssingh191/plantcare-frontend.git
cd plantcare-frontend
npm install
```

Create a `.env` file in the project root:

```
VITE_PERENUAL_API_KEY=your_api_key_here
```

Get a key from [perenual.com/subscription-api](https://perenual.com/subscription-api).

```bash
npm run dev
```

Open http://localhost:5173.

## Security note

`VITE_PERENUAL_API_KEY` is compiled into the client-side JS bundle at build time (standard for any `VITE_`-prefixed variable) — anyone can find it via browser dev tools. Fine for a school project against a free-tier key; not something to rely on if this key needs to stay private. Fixing that properly would mean adding a small backend/serverless proxy so the key never ships to the browser.

## Known limitations

- No real backend — login/register are mocked locally in `AuthContext` (any email/password works). Shelf and profile data live only in memory and reset on refresh.
- Perenual's free tier caps out at 100 requests/day. The app falls back to hardcoded mock data if the API is unreachable or rate-limited.
- `<Preloader />` exists (`src/components/Preloader`) but isn't wired into any loading state yet.

## Project structure

```
src/
├── assets/          # images, icons
├── vendor/fonts/    # self-hosted Inter font files
├── components/      # reusable UI (Navbar, PlantCard, Modal, Toast, Preloader, etc.)
├── pages/           # route-level screens (Home, Explore, About, PlantDetail, Profile, Login, Register)
├── contexts/         # AuthContext (auth, shelf, auth-modal state)
├── hooks/           # useAsyncData (shared fetch/loading/error/fallback logic)
├── utils/           # plantApi.js (Perenual integration), mockPlants.js, auth.js
├── App.jsx          # routes + layout
└── main.jsx         # entry point
```

See `NOTES.md` for how this was planned and built.
