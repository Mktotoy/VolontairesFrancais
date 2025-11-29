# Volontaires français - Website Project

## Overview

Volontaires français is a website for a French association dedicated to gathering, supporting, and promoting French volunteers of Olympic and Paralympic Games. The project is currently undergoing a migration from a legacy static HTML site to a modern headless CMS architecture using Next.js as the frontend and Directus as the backend.

The association was officially founded on October 28, 2025, by volunteers from Paris 2024, with the mission to keep the Olympic volunteer community connected and support future volunteers for upcoming Games (e.g., Milano Cortina 2026).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Architecture Pattern: Headless CMS with Static Site Generation

The project follows a **headless CMS architecture** separating content management from presentation:

**Frontend (Next.js)**
- **Framework**: Next.js 16.0.5 with React 19.2.0
- **Rendering Strategy**: Static Site Generation (SSG) with Incremental Static Regeneration (ISR)
- **Revalidation**: 5-minute intervals (300 seconds) for content freshness
- **Language**: TypeScript with strict type checking
- **Styling**: CSS modules and global stylesheets (no CSS-in-JS framework)
- **Client-Side Interactivity**: React hooks for accordions, galleries, mobile menus, and scroll effects

**Backend (Directus)**
- **CMS**: Directus 11.13.4 (open-source headless CMS)
- **Purpose**: Content management for posts, FAQ entries, team members, and pages
- **API**: RESTful API consumed by frontend via Directus SDK
- **Bootstrap Scripts**: Node.js scripts to programmatically create collections and seed initial content

**Legacy System**
- **Original Architecture**: Static HTML pages generated from Jinja2 templates via Python build script
- **Purpose**: Being phased out but still present in `legacy_site/` folder
- **Build Tool**: `build.py` compiles Jinja2 templates to HTML
- **Serving**: Simple Python HTTP server (`server.py`) on port 5000

### Design System

**Olympic Color Palette**:
- Blue: `#067fcc` (primary brand color)
- Yellow: `#fcb133` (accents and highlights)
- Green: `#07a459` (alternating sections)
- Red: `#eb2f50` (call-to-action buttons)

**Typography**:
- **Logo/Headers**: Walaweh custom font (with Righteous as fallback)
- **Body Text**: Arial, Helvetica, sans-serif

**Responsive Design**:
- Mobile-first approach with breakpoints for tablet and desktop
- Hamburger menu for mobile navigation
- Adaptive logo (full logo on desktop, monogram on mobile)

### Content Structure

**Core Collections** (Directus):
1. **posts** - News articles with title, slug, excerpt, content, published_at, status
2. **categories** - Article categorization (e.g., "Actu")
3. **faq** - FAQ entries with question/answer pairs
4. **team_members** - Team profiles with name, role, category, image, sort order
5. **pages** - Generic CMS-managed pages
6. **cards** - Reusable content cards

**Key Pages**:
- **Home** (`/`): Hero section, association intro, mission cards, CTA
- **Team** (`/equipe`): Board of directors with photos and roles
- **News** (`/actu`): Article listing with expandable previews
- **Individual Articles** (`/actu/[slug]`): Full article pages
- **Membership** (`/adhesion`): Benefits of joining, HelloAsso integration
- **FAQ** (`/faq`): Accordion-style questions with Schema.org markup
- **Gallery** (`/galerie`): Photo gallery with category filters
- **Legal** (`/mentions-legales`): Legal information and association details

### State Management & Interactivity

**Client Components** (React hooks):
- `FaqItem`: Accordion toggle for FAQ entries
- `NewsArticle`: Expandable article previews ("Lire plus/moins")
- `Gallery`: Filtered photo grid with lightbox modal
- `Header`: Mobile menu toggle and active navigation states
- `ScrollToTop`: Smooth scroll button with visibility threshold
- `PageAnimations`: Intersection Observer for scroll-triggered animations

**No Global State Library**: Uses React's built-in `useState` and Next.js navigation hooks

### Data Fetching Strategy

**Server Components by Default**:
- All pages fetch data server-side using Directus SDK
- Incremental Static Regeneration (ISR) for near-real-time updates without full rebuilds
- Error handling with fallbacks to empty arrays when Directus unavailable

**Directus SDK Integration**:
- Centralized client in `lib/directus.ts`
- REST API consumption (not GraphQL)
- Type-safe queries using TypeScript generics

### SEO & Accessibility

**Structured Data**:
- FAQ page includes Schema.org FAQPage markup for rich search results
- JSON-LD format for search engine consumption

**Semantic HTML**:
- Proper heading hierarchy (h1 → h6)
- ARIA labels on interactive elements (buttons, links)
- Alt text on images

**Performance Optimizations**:
- Font display swap for custom fonts
- CSS transitions for smooth UX
- Lazy loading for images via Next.js Image component (where applicable)

## External Dependencies

### Third-Party Services

**HelloAsso** (Membership Integration):
- Embedded donation/membership form on `/adhesion` page
- External service for payment processing
- No direct API integration (iframe embed)

### CMS & Database

**Directus**:
- Headless CMS for content management
- Default connection: `http://0.0.0.0:8055` (backend), `http://localhost:8055` (frontend)
- Requires PostgreSQL database (via `pg` driver version ^8.0.0)
- Authentication: Email/password login for admin access
- Environment variables: `DIRECTUS_URL`, `DIRECTUS_EMAIL`, `DIRECTUS_PASSWORD`

**PostgreSQL**:
- Primary database for Directus
- Managed through Directus ORM/query builder
- Schema managed by Directus migrations and bootstrap scripts

### Frontend Libraries

**Directus SDK**: `@directus/sdk` v20.2.0 for type-safe API consumption

**Font Awesome**: v6.4.0 CDN for icons (social media, UI elements)

**Google Fonts**: Righteous font as fallback for Walaweh

### Development Tools

**Python** (Legacy):
- `Jinja2`: Template engine for static HTML generation
- `http.server`: Development server on port 5000

**Node.js**:
- Multiple versions present in `.tools/` (v20, v22)
- `npm` for package management

### Hosting & Deployment

**Current Setup**: Replit-based development environment

**Static Assets**:
- Images stored in `public/images/` (frontend) and `legacy_site/images/`
- Custom fonts in `public/fonts/` and `legacy_site/fonts/`
- No CDN configuration detected

**Future Considerations**:
- Frontend likely deployable to Vercel (Next.js native platform)
- Directus requires separate hosting (Docker, VPS, or managed service)
- Database needs persistent PostgreSQL instance