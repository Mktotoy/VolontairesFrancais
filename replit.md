# Volontaires français - Website Documentation

## Overview

Volontaires français is a static showcase website (site vitrine) for a French association dedicated to international volunteers of Olympic and Paralympic Games. The website serves as an informational platform to present the association, its team, enable online membership registration, share news, and display a photo gallery of Olympic events and activities.

The project is a multi-page static website built with vanilla HTML, CSS, and JavaScript, designed to be simple, responsive, and easily maintainable. It integrates with HelloAsso for membership management and includes social media connectivity.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (November 2025)

**Content Updates:**
- **Homepage (index.html)**: Updated "Notre Association" section to emphasize Paris 2024 origins and inclusivity message (COJO, Club France, Ville Hôte all welcome). Simplified CTA section to focus on social media engagement.
- **Membership Page (adhesion.html)**: 
  - Renamed from "Adhésion en ligne" to "Pourquoi adhérer" (both page title and browser tab title)
  - Added "Conditions d'adhésion" section with pricing (15€/year) and eligibility criteria
  - Eligibility: French nationality + (former Olympic volunteer OR Milano Cortina reservist)
  - Important disclaimer about association not guaranteeing volunteer selection
  - Updated CSS classes from `.adhesion` to `.membership`
- **News Page (actu.html)**:
  - Added new article dated 11 November 2025: "C'est le moment ! 🚀 Les adhésions sont ouvertes !"
  - Updated dates: "La création" (28 October 2025), "Pourquoi adhérer ?" (6 November 2025)
  - Implemented "Lire plus" / "Lire moins" toggle system for better readability
  - Articles display preview by default with expandable full content
- **Navigation Optimization**: 
  - Reduced "Adhérer" CTAs to 2 locations only (header button + hero banner)
  - Removed "Galerie Photos" link from navigation menu (page file kept for future use)
  - Removed "Adhérer" from footer "Liens rapides" to avoid redundancy

**Architecture Improvements:**
- **Jinja2 Build Pipeline**: Implemented template-based architecture with `build.py` script
  - Header and footer factored into `templates/partials/`
  - Base layout template with block system (`templates/base.html`)
  - Page-specific templates in `templates/pages/`
  - Static HTML generation maintains SEO benefits while enabling code reuse
  - Navigation active states managed dynamically via template variables
  - Regenerate pages with: `python3 build.py`

**Team Photos:**
- Added 9 professional team member photos from `images/equipe/` directory
- Implemented circular photo display with CSS styling (border-radius, object-fit: cover)
- Photos mapped to: Fabian, Mathilde, Philippe, Alexa, Enora, Florence, Emmanuelle, Marie-Anne, Sébastien
- 3 members without photos (Julien, Océane, Patrice) display default icon placeholders

## System Architecture

### Frontend Architecture

**Technology Stack:**
- Pure HTML5 for markup
- CSS3 with custom properties (CSS variables) for theming
- Vanilla JavaScript for interactivity
- No frameworks or build tools required

**Design Approach:**
The application follows a traditional multi-page architecture where each page is a separate HTML file. This approach was chosen for:
- **Simplicity**: No build process or bundling required
- **SEO benefits**: Each page has its own URL and metadata
- **Easy hosting**: Can be deployed to any static host without configuration
- **Maintainability**: Clear separation of content across files

**Styling System:**
CSS is organized with:
- Custom font integration (Walaweh for branding, Arial for body text)
- CSS custom properties for consistent theming with association colors (blue: #067fcc, yellow: #fcb133, green: #07a459, red: #eb2f50)
- Responsive design patterns using media queries
- Single consolidated stylesheet (`css/styles.css`)

**Component Structure:**
- Shared header navigation across all pages with active state management
- Consistent footer (implied but not visible in provided files)
- Reusable page header pattern
- Mobile-responsive hamburger menu

**JavaScript Functionality:**
- Hamburger menu toggle for mobile navigation
- Scroll-to-top button with visibility based on scroll position
- Search input handler for content searching
- Intersection Observer for smooth scroll animations
- Click-outside detection to close mobile menu
- Gallery lightbox with keyboard navigation (arrows, escape)
- Gallery filtering by category (Paris 2024, Événements, Équipe)
- Active page highlighting in navigation
- FAQ accordion functionality with smooth expand/collapse transitions

### Page Architecture

**Multi-Page Structure:**
1. `index.html` - Homepage with hero section
2. `equipe.html` - Team/board members page
3. `adhesion.html` - Online membership registration page
4. `actu.html` - News/announcements section
5. `galerie.html` - Photo gallery
6. `faq.html` - Frequently Asked Questions with Schema.org FAQPage markup

Each page follows the same structural pattern:
- Consistent header with navigation and search bar
- Page-specific hero/header section with Olympic gradient
- Main content area with complete implementation
- Footer with social links and HelloAsso integration

**Navigation System:**
The navigation uses:
- Active state highlighting via `.active` class
- Five main sections accessible from all pages
- Clean URLs without .html extensions (e.g., `/equipe`, `/adhesion`, `/actu`)
- Search functionality in header
- External link to HelloAsso member space

**URL Structure:**
- All pages are accessible via clean URLs without file extensions
- The Python server automatically maps extensionless paths to their .html files
- Examples: `/` → `index.html`, `/equipe` → `equipe.html`, `/adhesion` → `adhesion.html`
- This provides better SEO and a more professional appearance

### Content Management

**Static Content Strategy:**
Content is directly embedded in HTML files rather than fetched from a CMS or API. This was chosen because:
- **Use case fit**: Association website with infrequent updates
- **Performance**: No API calls or database queries needed
- **Simplicity**: Non-technical team members can update via Replit interface
- **Reliability**: No external dependencies for content delivery

**News/Articles:**
Based on requirements, the news section should display articles about:
- Association creation announcement
- Membership benefits explanation
- Formatted with dates and emoji preservation

### Development Server

**Python HTTP Server:**
A simple Python 3 HTTP server (`server.py`) is included for local development:
- Serves static files on port 5000
- Implements cache-busting headers for development
- Handles clean URL routing (removes .html extensions)
- Binds to 0.0.0.0 for Replit compatibility
- No production-grade features (not intended for production use)

**Rationale:**
Python's built-in HTTP server was chosen over alternatives like Node.js because:
- No package dependencies required
- Python is universally available
- Sufficient for serving static files during development
- Simple 20-line implementation

## External Dependencies

### Third-Party Services

**HelloAsso Integration:**
- **Purpose**: Membership registration and payment processing
- **Integration method**: iframe widget embed
- **Widget code**: Provided for both membership form and pin's shop
- **URL pattern**: `https://www.helloasso.com/associations/volontaires-francais/...`
- **Implementation**: Should be embedded on `adhesion.html` page

**Social Media Platforms:**
- Facebook
- Instagram  
- LinkedIn
- **Purpose**: Community engagement and content distribution
- **Implementation**: Links to be added in header/footer

### CDN Dependencies

**Font Awesome:**
- **Version**: 6.4.0
- **Source**: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css`
- **Purpose**: Icons for UI elements (search icon, social media icons, menu)
- **Usage**: Loaded via CDN in HTML `<head>`

**Google Fonts (Righteous):**
- **Source**: `https://fonts.googleapis.com/css2?family=Righteous&display=swap`
- **Purpose**: Fallback font for logo when Walaweh is unavailable
- **Note**: Primary logo font is custom Walaweh font (local file at `fonts/Walaweh.otf`)

### Local Assets

**Custom Fonts:**
- `fonts/Walaweh.otf` - Primary branding typeface for logo and headings
- Loaded via `@font-face` with OpenType format
- Fallback chain: Walaweh → Righteous (Google Font) → Arial → sans-serif

**Images/Media:**
- Photo gallery images (placeholder icons, ready for real photos)
- Team member photos (placeholder icons, ready for team photos)
- Logo/branding assets available in `fonts/` directory:
  - LOGO_BLANC.png / LOGO_BLANC_1.png
  - LOGO_NOIR.png / LOGO_NOIR_1.png
  - LOGO_BLANC_COULEUR.png / LOGO_BLANC_COULEUR_1.png
  - LOGO_NOIR_COULEUR.png / LOGO_NOIR_COULEUR_1.png
  - MONOGRAMME_BLANC.png / MONOGRAMME_NOIR.png
  - MONOGRAMME_COULEUR_FOND_BLANC.png / MONOGRAMME_COULEUR_FOND_NOIR.png

### Data Storage

**No Database Required:**
The application is entirely static with no backend data storage. All content is managed through:
- Direct HTML editing for text content
- File-based asset management for images
- No user authentication or session management needed
- HelloAsso handles all membership data externally

This architecture eliminates the need for:
- Database servers (PostgreSQL, MySQL, etc.)
- Backend API frameworks
- User authentication systems
- Content management systems

**Trade-offs:**
- **Pros**: Zero infrastructure, instant deployment, maximum reliability
- **Cons**: Content updates require file edits, no dynamic personalization, limited search functionality

## SEO & Features

### Sitemap
- **File**: `sitemap.xml`
- **Purpose**: Search engine optimization and site discovery
- **Structure**: Lists all public pages with metadata (lastmod, changefreq, priority)
- **Note**: Update the domain URL in sitemap.xml when deploying to a custom domain

### Team Social Links
- **Location**: Team member cards in `equipe.html`
- **Implementation**: Commented HTML templates ready to use
- **How to add**: Uncomment the social buttons in each team member's card and replace placeholder URLs with actual LinkedIn/Facebook profile links
- **Styling**: Pre-configured hover effects and icon colors in `css/styles.css`

### FAQ Page
- **File**: `faq.html`
- **Purpose**: Answer frequently asked questions about the association
- **Features**:
  - Interactive accordion design with smooth animations
  - 11 Q&A covering membership, eligibility, association purpose, and policies
  - Schema.org FAQPage structured data for enhanced SEO
  - Numbered questions with gradient badges
  - Mobile-responsive layout
- **SEO**: Implements Schema.org FAQPage markup for rich results in search engines
- **Content**: Covers topics like membership requirements, nationality restrictions, future volunteer preparation, and association independence