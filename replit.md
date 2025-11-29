# Volontaires français - Website Project

## Overview

Volontaires français is a website for a French association dedicated to gathering, supporting, and promoting French volunteers of Olympic and Paralympic Games. The project is a modern headless CMS architecture using **Next.js** as the frontend and **Directus** as the backend.

The association was officially founded on October 28, 2025, by volunteers from Paris 2024, with the mission to keep the Olympic volunteer community connected and support future volunteers for upcoming Games (e.g., Milano Cortina 2026).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Architecture Pattern: Headless CMS with Next.js + Directus

**Frontend (Next.js)**
- **Framework**: Next.js 16.0.5 with React 19.2.0
- **Port**: 5000 (development) via `PORT=5000 npm run dev`
- **Language**: TypeScript with strict type checking
- **Rendering Strategy**: Hybrid (SSR/SSG)
- **Styling**: CSS modules and global stylesheets

**Backend (Directus)**
- **CMS**: Directus 11.13.4 (open-source headless CMS)
- **Port**: 8055 (development)
- **API**: RESTful API consumed by frontend via Directus SDK
- **Database**: PostgreSQL (managed via Replit)
- **Configuration**: Environment variables in `backend/.env`

### Key URLs
- **Frontend**: `http://localhost:5000` or via Replit proxy
- **Directus Admin**: `http://0.0.0.0:8055`
- **API**: `http://0.0.0.0:8055/graphql` and REST endpoints

## Development Setup

### Start Frontend
```bash
cd frontend
PORT=5000 npm run dev
```

### Start Backend (Directus)
```bash
cd backend
npm start
```

### Build Frontend for Production
```bash
cd frontend
npm run build
npm start
```

## Project Structure

```
/
├── frontend/              # Next.js application
│   ├── app/              # App router pages
│   ├── components/       # React components
│   ├── lib/              # Utilities (Directus SDK, etc)
│   ├── public/           # Static assets
│   └── package.json
│
├── backend/              # Directus CMS
│   ├── scripts/          # Bootstrap & setup scripts
│   ├── uploads/          # Uploaded media
│   ├── .env              # Configuration
│   └── package.json
│
└── README.md
```

## Content Management

**Core Collections** (managed in Directus):
- `posts` - News articles
- `categories` - Article categories
- `faq` - FAQ entries
- `team_members` - Team profiles
- `pages` - CMS-managed pages
- `cards` - Reusable content cards

## External Services

**HelloAsso** (Membership Integration):
- Embedded donation/membership form
- External service for payment processing
- No direct API integration (iframe embed)

## Deployment

### Production Deployment
- **Frontend**: Deployable to Vercel (Next.js native)
- **Backend**: Requires separate hosting (Docker, VPS, or managed Directus service)
- **Database**: PostgreSQL instance needed

## Recent Changes (November 2025)

- **Architecture Migration**: Removed legacy Jinja2 static site
- **Full Next.js Directus Stack**: Implemented modern headless CMS setup with Next.js frontend and Directus backend
- **Node 22**: Installed for backend and frontend support
- **Frontend Development**: Configured `frontend-dev` workflow to run Next.js on port 5000
