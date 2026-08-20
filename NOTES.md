# PlantCare — Project Notes

Personal notes on what this project is and how it was planned/built —
written so I can walk someone through it without re-figuring it out
on the spot.

## What it does

PlantCare is a plant-discovery web app. A visitor can search or
browse a live plant database (Perenual API), open any plant to see a
full care guide (watering, sunlight, soil, toxicity notes), and — if
they create an account — save plants to a personal "shelf" they can
revisit and manage later.

**Core features:**
- Search plants by name, or browse a "Plants in Your Region" grid on
  the home page
- Full plant detail page: photo, description, watering/sunlight
  badges, a care-guide spec table, tips & notes, and related plants
- Account system (sign up / log in) gating the ability to save plants
- A personal "Plant Shelf" on the profile page, with an edit mode to
  remove saved plants
- Fully responsive — desktop nav collapses into a mobile hamburger
  menu below 720px

## How I planned it

**1. Scaffold and file structure first.** Started from a plain Vite +
React app, then decided the folder layout before writing components:
`components/` for reusable pieces, `pages/` for route-level screens,
`utils/` for API/data logic, `contexts/` for global state, each
component's CSS living next to its `.jsx` file rather than in one
giant stylesheet.

**2. Built the UI screen by screen against design references**,
matching real reference screenshots for the navbar, home page, plant
cards, about page, login/signup modals, and the profile/shelf views —
rather than guessing at a design. Established a single set of design
tokens early (`index.css`'s `:root` — colors, shadows, border-radius,
spacing) so every component pulls from the same source instead of
hardcoding its own values.

**3. Routing next**, using React Router: home, explore, about,
plant detail (`/plant/:id`), and a protected profile route that
redirects to login if you're not signed in.

**4. Data: mock first, then the real API, with fallback built in from
day one.** Started with a hardcoded array of plants so the UI could
be built and tested without depending on the network. When the real
Perenual API was wired in (`utils/plantApi.js`), the mock data didn't
get thrown away — it became the fallback whenever the real API fails
or hits its rate limit, so the app never shows a broken or empty
screen during development.

**5. Auth, mocked locally.** There's no backend yet, so `AuthContext`
fakes a login session in memory (any email/password "works," a
display name is derived from the email). This was a deliberate,
temporary decision to unblock building and testing everything that
depends on being logged in — the shelf feature, the protected profile
route, the auth-gated "Add to Shelf" button — without waiting on a
real backend to exist first. `utils/auth.js` documents the real API
shape to swap in later.

**6. The shelf feature tied several pieces together**: clicking "Add
to My Shelf" on a plant detail page checks auth state — if logged
out, it opens the login modal; if logged in, it saves the plant and
shows a toast notification. The profile page has an "Edit shelf" mode
that swaps each card's favorite icon for a remove (×) button.

**7. Consistency and responsiveness passes.** After the core features
worked, went back through the whole app checking that colors,
shadows, spacing, and font sizes were all pulling from the same
tokens (not one-off hex values), and fixed layout problems that only
show up at small screen widths (the navbar had no mobile treatment at
all originally — it visually broke below ~900px until a hamburger
menu was added).

**8. Performance/reliability once the real API was live.** The free
Perenual tier caps usage at 100 requests/day, which gets burned
through fast in development (every page visit fires a request, React
StrictMode fires effects twice, etc.). Added a request cache in
`plantApi.js` — repeat calls for the same data reuse the same
in-flight request instead of hitting the network again, and a failed
request specifically due to rate-limiting stays "failed" in the cache
for a minute so the app doesn't keep retrying a request it already
knows will fail.

**9. Simplification pass.** Home, Explore, and the Plant Detail page
had each grown their own near-identical "fetch → loading → error →
fallback" logic. Pulled that into one shared hook
(`hooks/useAsyncData.js`) so there's a single place that owns that
behavior instead of three copies that could drift out of sync.

## Architecture worth being able to explain

- **Design tokens** (`src/index.css`): every color/shadow/radius is a
  CSS custom property. Components reference `var(--accent-leaf-vibrant)`
  etc. instead of hardcoding hex values, so the whole app's look can
  change from one file.
- **`AuthContext`** is the single source of truth for: who's logged
  in, what's on their shelf, and whether the login/signup modal is
  open. Any component (the navbar, the plant detail page) can trigger
  that modal through context instead of managing its own copy.
- **`useAsyncData`** is the one place that knows how to "fetch, track
  loading/error, fall back to mock data on failure." Every page that
  loads plants from the API uses it instead of repeating that logic.
- **`plantApi.js`** is the only file that talks to Perenual. It
  normalizes the API's raw response shape into exactly what
  `<PlantCard />` and the detail page expect, and caches requests so
  the same data isn't fetched twice.
- **Graceful fallback everywhere**: every API call has a mock-data
  fallback path, so a rate-limited or offline API degrades the app to
  "shows mock plants" rather than "shows a broken page."

## Known limitations (worth saying out loud, not hiding)

- **No real backend.** Login/register are mocked client-side in
  `AuthContext`. The shelf and profile data live only in memory and
  reset on page refresh.
- **Perenual free tier rate limit** (100 requests/day) means the app
  will fall back to mock data if you use it heavily in one session.
- **`<Preloader />` exists but isn't wired into any loading state
  yet** — built to spec, intentionally not connected until that
  stage of the project.