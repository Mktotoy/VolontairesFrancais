# Volontaires français - Website Project

## Overview

Volontaires français is a website for a French association dedicated to gathering, supporting, and promoting French volunteers of Olympic and Paralympic Games. The project is a modern headless CMS architecture using **Next.js** as the frontend and **Directus** as the backend.

The association was officially founded on October 28, 2025, by volunteers from Paris 2024, with the mission to keep the Olympic volunteer community connected and support future volunteers for upcoming Games (e.g., Milano Cortina 2026).

## User Preferences

Preferred communication style: Simple, everyday language.

## Quick Start

### Development Mode (ports: Frontend 5000, Backend 8055)
```bash
./start-dev.sh
```

Or manually:
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

### Production Mode (ports: Frontend 3000, Backend 8055)
```bash
./start-prod.sh
```

Or manually:
```bash
# Terminal 1 - Backend
cd backend && npm start

# Terminal 2 - Frontend (build first if needed)
cd frontend && npm run build && npm run start:prod
```

## System Architecture

### Architecture Pattern: Headless CMS with Next.js + Directus

**Frontend (Next.js)**
- **Framework**: Next.js 16.0.5 with React 19.2.0
- **Dev Port**: 5000
- **Prod Port**: 3000
- **Language**: TypeScript with strict type checking
- **Rendering Strategy**: Hybrid (SSR/SSG)
- **Styling**: CSS modules and global stylesheets
- **Env Config**: `frontend/.env.local` (dev), environment variables (prod)

**Backend (Directus)**
- **CMS**: Directus 11.13.4 (open-source headless CMS)
- **Port**: 8055 (dev & prod)
- **API**: RESTful & GraphQL API consumed by frontend via Directus SDK
- **Database**: PostgreSQL (managed via Neon/Replit)
- **Configuration**: `backend/.env` (never commit, use `.env.example` as template)

### Key URLs
- **Frontend (Dev)**: `http://localhost:5000`
- **Frontend (Prod)**: `http://localhost:3000` or deployed URL
- **Directus Admin**: `http://0.0.0.0:8055/admin`
- **Directus API**: `http://0.0.0.0:8055/graphql` and REST endpoints

## Environment Variables

### Frontend (`frontend/.env.local`)
```
DIRECTUS_API_URL=http://0.0.0.0:8055
DIRECTUS_STATIC_TOKEN=
```

### Backend (`backend/.env`)
Required variables:
- `KEY` - Unique encryption key for Directus
- `SECRET` - Secret key for Directus
- `PORT` - Server port (default: 8055)
- `PUBLIC_URL` - Public URL of the API
- `DB_*` - PostgreSQL database connection details

See `backend/.env.example` for full list of available options.

## Project Structure

```
/
├── frontend/                 # Next.js application
│   ├── app/                 # App router pages
│   ├── components/          # React components
│   ├── lib/                 # Utilities (Directus SDK, etc)
│   ├── public/              # Static assets
│   ├── .env.local           # Development environment variables
│   ├── next.config.ts       # Next.js configuration
│   └── package.json
│
├── backend/                 # Directus CMS
│   ├── scripts/             # Bootstrap & setup scripts
│   ├── uploads/             # Uploaded media
│   ├── .env                 # Production environment variables (DO NOT COMMIT)
│   ├── .env.example         # Template for environment variables
│   └── package.json
│
├── start-dev.sh            # Development server launcher
├── start-prod.sh           # Production server launcher
└── README.md
```

## NPM Scripts

### Frontend
```bash
npm run dev              # Start dev server (port 5000)
npm run dev:prod        # Start dev server (port 3000, prod mode)
npm run build           # Build for production
npm run start           # Start production server (port 5000)
npm run start:prod      # Start production server (port 3000)
npm run lint            # Run ESLint
```

### Backend
```bash
npm run dev             # Start development server
npm run start           # Start production server
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

### Frontend Deployment Options
- **Vercel** (recommended): Seamless Next.js deployment, automatic from GitHub
- **Netlify**: Full-stack deployment with serverless functions
- **Railway**: Simple Node.js hosting
- **Custom VPS**: Any server with Node.js 22+

### Backend Deployment Options
- **Railway**: Managed PostgreSQL + Node.js hosting
- **DigitalOcean**: Droplets with Docker support
- **Render**: Free tier available for hobby projects
- **AWS/Azure**: Enterprise solutions with managed databases

### Production Checklist
- [ ] Set `NODE_ENV=production` on server
- [ ] Update `.env` with production database credentials
- [ ] Update `PUBLIC_URL` to production domain
- [ ] Build frontend: `npm run build`
- [ ] Configure CORS for frontend/backend communication
- [ ] Set up SSL/TLS certificates
- [ ] Configure environment variables on hosting platform
- [ ] Test API connectivity between frontend and backend

## Recent Changes (November 2025)

- **Architecture Migration**: Removed legacy Jinja2 static site, implemented Next.js Directus headless CMS
- **Node 22**: Installed for modern JavaScript support
- **Build Scripts**: Added production build configuration with separate ports
- **Environment Management**: Documented env variables, created examples
- **Launcher Scripts**: Added `start-dev.sh` and `start-prod.sh` for easy startup
- **Frontend Development**: Configured `frontend-dev` workflow to run Next.js on port 5000
