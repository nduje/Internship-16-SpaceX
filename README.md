# SpaceX Mission Control

### DUMP Internship - React #3

## Task

**SpaceX Mission Control** is a React + TypeScript web application for exploring SpaceX missions, ships, and general company information.

Users can browse launches, search and filter missions, open detailed views for individual missions and ships, and switch between light and dark mode.  
The focus is on a clean interface, smooth navigation, and a fully responsive experience across devices.

## Features

**Navigation & Layout**

- Fixed top navigation with links and theme toggle
- Shared layout component across all pages
- 404 page for invalid routes

**Home**

- Countdown to next launch (fetched from SpaceX API v4)
- Company summary loaded dynamically from API
- Background image/video section inspired by spacex.com

**Launches**

- Server-side paginated list using POST query endpoint
- Search by mission name with URL sync (`/launches?search=crew-6`)
- Filters for successful, failed, and upcoming missions
- Previous/Next pagination with optional page numbers
- Loading states (spinner or skeleton) and API error handling
- Clicking a card opens detailed mission view
- Detail page shows mission patch, date, rocket name (additional fetch), failure details (if any), and YouTube link

**Ships**

- Batch-based fetching (e.g. 10 ships per request)
- Infinite scroll using Intersection Observer API
- Search by ship name with URL sync (`/ships?search=just-read`)
- Changing search resets list and scroll position
- Ship cards display image, name, type, and active status indicator
- Detail page displays extended ship information (home port, roles, specifications, status, etc.)

**Dark / Light Theme**

- Toggle between themes
- Theme stored in `localStorage`
- Implemented via Context provider

## Setup

1. Clone repository (`git clone git@github.com:nduje/Internship-16-SpaceX.git`)
2. Install dependencies (`npm install`)
3. Run development server (`npm run dev`)
4. Open app in browser (`http://localhost:5173`)
