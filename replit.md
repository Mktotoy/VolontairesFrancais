# Volontaires français - Website Documentation

## Overview

Volontaires français is a website for a French association dedicated to supporting volunteers of Olympic and Paralympic Games. The project is transitioning from a legacy static HTML site to a modern Next.js frontend with a Directus headless CMS backend.

**Purpose**: Showcase the association, enable member recruitment, share news and information, and build a community of French Olympic volunteers.

**Current Status (November 2025)**: 
- ✅ **Frontend**: Next.js 16 running on port 5000 - fully functional
- ✅ **Backend**: Directus v11.13.4 CMS on port 8055 with PostgreSQL integration
- ✅ **Admin Interface**: Accessible via `/admin` proxy (port 5000 → 8055)
- ✅ **Database**: PostgreSQL created and configured via environment variables
- Active folders: `frontend/` (Next.js app), `backend/` (Directus CMS), `attached_assets/` (media)

**How to run both services:**
```bash
cd backend && npm start &  # Starts Directus on port 8055
cd frontend && npm run dev  # Starts Next.js on port 5000
```

**Accessing the services:**
- Frontend: http://localhost:5000 (homepage, articles, team, FAQ)
- Admin Panel: http://localhost:5000/admin (Directus CMS)
- API Routes: http://localhost:5000/items/* (proxied from backend)
- Assets: http://localhost:5000/assets/* (proxied file storage)

**Asset Loading:**
- Frontend pages use centralized `getAssetUrl()` helper (`lib/assets.ts`)
- All asset URLs use relative paths `/assets/{id}` (no mixed content errors)
- Logos use `/images/` from public folder (static assets)
- Scalable: Adding new resources just uses `getAssetUrl(fileId)` - single point of maintenance

**Asset Architecture:**
```
Directus stores file ID → API returns file ID
Frontend calls getAssetUrl(fileId) → generates /assets/{id} relative URL
URL routes through Next.js proxy (same protocol as page) → backend serves
Supports HTTPS/HTTP automatically (no mixed content)
```

**Workflow Configuration:**
The default workflow `dev` runs both services in parallel using the command:
```bash
bash -c "(cd backend && npm start) & (cd frontend && npm run dev) & wait"
```

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Content Management Architecture

**Headless CMS**: Directus v11.13.4 serves as the content management system, providing:
- RESTful API for content delivery
- PostgreSQL database for content storage (via `pg` package)
- Admin interface for non-technical content editors
- Authentication and authorization for admin users

**Content Model**: The system defines structured collections for:
- `posts`: News articles with title, slug, excerpt, content, publish date, category, featured image, and SEO metadata
- `team_members`: Board member profiles with name, role, category, sort order, and profile images
- `faq`: Frequently asked questions with question/answer pairs and categorization
- `categories`: Content classification for posts
- `cards`, `pages`, `social_links`: Supporting content types

**Why Directus?**
- Provides a user-friendly admin interface for non-developers to manage content
- Self-hosted solution maintaining data ownership
- Flexible schema definition allowing easy content model evolution
- Direct SQL database access when needed for advanced queries

### Frontend Architecture

**Framework**: Next.js 16.0.5 with React 19.2.0 using the App Router pattern

**Key Design Decisions**:
- **Server-Side Rendering**: Pages fetch content server-side for SEO benefits and performance
- **Incremental Static Regeneration**: `revalidate: 300` (5 minutes) balances fresh content with performance
- **Component-Based Architecture**: Reusable React components (Header, Footer, FaqItem, NewsArticle, Gallery, etc.)
- **Client-Side Interactivity**: "use client" directive for interactive components (accordions, menus, animations)

**Data Fetching Pattern**:
```typescript
// Server components fetch from Directus
const items = await directus.request(readItems('collection', { fields, filter, sort }));
```

**Styling Approach**: 
- Custom CSS in `/app/styles/main.css` following the Olympic color palette
- CSS modules for component-specific styles
- CSS custom properties for consistent theming
- Mobile-first responsive design

**Why Next.js?**
- SEO-critical content benefits from server-side rendering
- File-based routing simplifies page structure
- Built-in image optimization (future enhancement)
- Vercel deployment ready
- React ecosystem compatibility

### Legacy Static Site

**Architecture**: Python-based static site generator using Jinja2 templates

**Build Process**:
1. Templates in `templates/pages/` extend `templates/base.html`
2. Partials (header, footer) in `templates/partials/`
3. `build.py` script generates static HTML files
4. `server.py` runs development server with URL rewriting

**Why Keep Legacy?**
- Fallback during migration
- Reference implementation for content structure
- Demonstrates template-based architecture before CMS migration

**Migration Strategy**: Content from legacy HTML has been extracted into Directus via `backend/scripts/seed-from-front.js`, allowing gradual transition.

### Integration Layer

**Directus SDK**: `@directus/sdk` v20.2.0 provides typed client for API communication

**Configuration**: 
- `NEXT_PUBLIC_DIRECTUS_URL`: Directus API endpoint (default: http://localhost:8055)
- `NEXT_PUBLIC_DIRECTUS_TOKEN`: Optional static token for authenticated requests

**Why SDK over Direct Fetch?**
- Type-safe API interactions
- Simplified query syntax
- Built-in error handling
- Future-proof against Directus API changes

### SEO Strategy

**Schema.org Markup**: FAQ page implements FAQPage structured data for rich search results

**Meta Tags**: Each page defines custom metadata via Next.js Metadata API

**URL Structure**: Clean, semantic URLs (`/equipe`, `/actu`, `/faq`)

**Performance**: Server-side rendering ensures content is indexable on first paint

## External Dependencies

### Third-Party Services

**HelloAsso**: Membership payment integration (referenced in adhesion page, external iframe)

**Social Media Platforms**:
- Facebook: Community engagement and updates
- Instagram: Visual content sharing
- LinkedIn: Professional network presence

### Content Delivery

**Font Delivery**:
- Google Fonts: Righteous font family
- Custom Font: Walaweh (locally hosted in `/public/fonts/`)

**Icon Library**: Font Awesome 6.4.0 via CDN for consistent iconography

### Development Tools

**Node.js Versions**: Multiple Node installations in `.tools/` (v20.19.6, v22.21.1) for environment flexibility

**Database**: PostgreSQL required for Directus backend (not included in repository, must be provisioned separately)

### Asset Management

**Static Assets**: 
- Team member photos in `/public/images/equipe/`
- Olympic-themed imagery
- Logos and brand assets in `/public/images/`

**File Uploads**: Directus handles uploaded assets via its built-in file storage system

### Deployment Considerations

**Environment Variables Required**:
- `DIRECTUS_URL`, `DIRECTUS_EMAIL`, `DIRECTUS_PASSWORD`: Backend authentication
- `NEXT_PUBLIC_DIRECTUS_URL`, `NEXT_PUBLIC_DIRECTUS_TOKEN`: Frontend API access

**Port Configuration & URL Routing**:
- Frontend (Next.js): Port 5000 (configured via `npm run dev`)
- Backend (Express API): Port 8055 (runs via `npm start`)
- Database (PostgreSQL): Configured via DATABASE_URL environment variable

**Security Note**: Database credentials use Replit secrets
- Backend reads `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE` from Replit secrets
- `init-env.js` script maps these to `DB_*` variables Directus expects
- `.env` file contains only non-sensitive config (KEY, SECRET, PORT)

**URL Mapping** (via Next.js rewrites):
- `/admin/*` → Backend Directus admin interface ✅
- `/auth/*`, `/server/*` → Authentication and server info ✅
- `/users/*`, `/roles/*`, `/permissions/*` → User management ✅
- `/collections/*`, `/fields/*`, `/relations/*` → Schema management ✅
- `/settings/*`, `/webhooks/*`, `/policies/*` → Configuration ✅
- `/translations/*`, `/extensions/*` → Localization and extensions ✅
- `/presets/*`, `/dashboards/*`, `/panels/*`, `/notifications/*` → Admin UI ✅
- `/comments/*`, `/activity/*` → Comments and activity logs ✅
- `/files/*`, `/folders/*`, `/images/*`, `/assets/*` → File management ✅
- `/versions/*`, `/revisions/*` → Versioning and history ✅
- `/items/*` → Content collections ✅
- `/api/*` → General API routes ✅

**Accessing the system:**
```
Frontend:     http://localhost:5000
Admin Panel:  http://localhost:5000/admin  ← Directus CMS
API Routes:   http://localhost:5000/items/* (posts, team_members, faq, etc.)
```