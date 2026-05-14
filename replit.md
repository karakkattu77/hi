# Stop Big AI — Campaign Website

## Overview

An activist campaign website to stop fossil-fueled AI datacenters across the United States. Built in the editorial style of the Power Shift Project — dark forest green background, warm cream text, and gold/amber accents with Playfair Display serif headlines. Users can explore an interactive map of AI datacenter projects, click on each to see targeted digital actions, and take action across three nationwide campaign categories.

## Architecture

- **Frontend only** — No database needed. All data is static/hardcoded.
- **React + Vite** frontend served via Express backend
- **Leaflet + react-leaflet** for the interactive map (CartoDB dark tiles, gold markers)
- **Shadcn UI** components with full Power Shift campaign theme
- **Wouter** for routing (single page at /)

## Key Files

- `client/src/pages/Home.tsx` — Full single-page campaign site (hero, map, nationwide actions with tabs, education, footer)
- `client/src/data/datacenters.ts` — All datacenter project data + categorized nationwide actions
- `client/src/index.css` — Power Shift campaign theme CSS variables
- `client/index.html` — Playfair Display + Space Grotesk fonts, Leaflet CSS

## Brand / Design

- **Colors:** Dark forest green background (hsl 120 22% 8%), warm cream text (hsl 40 28% 90%), gold primary (hsl 42 72% 48% = #c9a227)
- **Fonts:** Playfair Display serif for headlines, Space Grotesk for body, Space Mono for labels/code
- **Style:** Editorial, environmental, movement-oriented — modeled on Power Shift Project
- **Hero:** Uses Power Shift planet globe image as background (darkened overlay), italic gold "Burning" in headline

## Data

10 AI datacenter projects tracked with:
- Location (lat/lng for gold map markers)
- Status (proposed / approved / under-construction / operational)
- Power consumption (MW), water use (gallons/day), energy source
- Key concerns
- 2-3 targeted digital actions per project (linking to app.chilli.club)

## Nationwide Campaign — Three Categories

### Federal Government (6 actions)
FTC, Congress, EPA (water), FERC (grid costs), Senate (permits), DOE (renewable mandate)

### Banks & Insurance (6 actions)
JPMorgan Chase, BlackRock, Goldman Sachs, Citi, AIG/Munich Re/Lloyd's, State Pension Funds

### Big Tech Corporations (6 actions)
Microsoft (carbon pledge), Google (transparency), Amazon (Climate Pledge), Meta (real renewables), OpenAI (energy disclosure), xAI/Musk (South Memphis)

## Map Markers

- Gold glowing dots on Leaflet map with dark forest tile filter
- Active/operational projects have a pulsing ring animation
- Clicking a marker opens a right-side panel with project details and actions
- Panel styled in deep forest green with gold accents
- Panel can be closed with X button, returning map to full US view

## Adding Real Action Links

To update action URLs when chilli.club links are provided, edit:
`client/src/data/datacenters.ts` — update `url` fields in each project's `actions` array and in `NATIONWIDE_ACTIONS`.

## Running

```
npm run dev
```

Serves on port 5000.

<!-- Last touched via Cowork: 2026-05-14 -->
