# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Upstart Portfolio is a modern portfolio website inspired by the Upstart theme design. It features clean, professional aesthetics with a focus on business-oriented web development services. Built with vanilla HTML, CSS, and JavaScript using the original framework's semantic component system (from example-portfolio) with Tailwind 4 for project-specific styling enhancements.

## Development Commands

This project uses vanilla HTML/CSS/JS with no build process required. Development workflow:

- Open HTML files directly in the browser or use a local server
- Use Live Server extension, `python -m http.server`, or `npx serve`
- No compilation, build steps, or dependencies needed
- Hot reload available with live server solutions

## Architecture

### File Structure

```
upstart-portfolio/
├── pages/
│   ├── home/              # Home page sections
│   │   ├── index.html     # Main page file
│   │   ├── hero.html      # Hero section with CTA
│   │   ├── services.html  # Services grid
│   │   ├── portfolio.html # Portfolio showcase
│   │   └── contact.html   # Contact form & info
│   ├── about/             # About page (future)
│   ├── services/          # Services page (future)
│   ├── portfolio/         # Portfolio page (future)
│   └── contact/           # Contact page (future)
├── globals/               # Site-wide components
│   ├── header.html        # Professional navigation
│   └── footer.html        # Footer with links
├── components/            # Reusable components
│   └── project-card.html  # Portfolio project card
├── styles/
│   └── main.css          # Upstart-inspired design system
├── scripts/
│   └── main.js           # Enhanced interactions
└── project.md            # Project documentation
```

### Component Loading System

Uses a sophisticated component loading system via JavaScript:

- **UpstartPortfolio class** manages all functionality
- Dynamic HTML component loading with error handling
- Page structure detection for appropriate component loading
- Home page loads: header, footer, hero, services, portfolio, contact
- Other pages load: header, footer only
- Async/await pattern for reliable component loading

### Design System

Uses the original framework's semantic component system with Upstart theme styling:

#### Typography
- **Primary Font**: DM Sans (400, 500, 600, 700)
- **Heading Font**: Plus Jakarta Sans (400, 500, 600, 700)
- **System Fallbacks**: Comprehensive font stack
- **Framework Classes**: `.h1`-`.h6`, `.lead`, `.body`, `.small`
- **Responsive Scale**: Fluid typography with lg: breakpoint scaling

#### Color Palette
- **Primary**: Blue (#3B82F6 - hsl(221 83% 53%))
- **Background**: Clean white (#FFFFFF)
- **Foreground**: Dark gray (#1F2937 - hsl(220 13% 13%))
- **Muted**: Light grays for secondary content
- **Accent**: Primary color with opacity variants

#### Framework Component System
- **Layout**: `.section`, `.mw-theme`, `.mw-full`, `.stack`, `.cluster`, `.grid`
- **Typography**: `.h1`-`.h6`, `.lead`, `.body`, `.small`
- **Buttons**: `.btn` with variants (primary, outline, ghost, link)
- **Cards**: `.card` with modifiers (hover, glass)
- **Forms**: `.input`, `.textarea`, `.form-group`, `.label`
- **Navigation**: `.nav`, `.nav-link` with active states
- **Badges**: `.badge` with color variants (primary, outline)
- **Animations**: `.animate-fade-in-up`, `.animate-stagger`

#### Project-Specific Tailwind Classes
- **Layout**: `max-w-4xl`, `mx-auto`, `aspect-video`, `backdrop-blur-sm`
- **Colors**: `text-primary`, `bg-primary/10`, `border-primary/20`
- **Spacing**: `space-x-4`, `gap-16`, `p-2`
- **Positioning**: `sticky top-0 z-50`, `absolute inset-0`
- **Effects**: `group-hover:scale-105`, `transition-transform duration-300`

### JavaScript Architecture

**UpstartPortfolio class** handles:
- Component loading with robust error handling
- Advanced navigation with smooth scrolling
- Active navigation highlighting with IntersectionObserver
- Dynamic portfolio project rendering
- Portfolio filtering and load more functionality
- Scroll effects and parallax animations
- Form submission with validation
- Notification system
- Mobile menu interactions

#### Key Features:
- **Portfolio Management**: Dynamic project loading, filtering, pagination
- **Animation System**: Intersection Observer for scroll-triggered animations
- **Form Handling**: Comprehensive form processing with validation
- **Responsive Design**: Mobile-first approach with desktop enhancements
- **Performance**: Efficient event handling and DOM manipulation

## Key Conventions

### HTML Structure
- Semantic HTML5 with proper ARIA attributes
- Component-based architecture with dynamic loading
- Professional navigation with mobile responsiveness
- WordPress-compatible container classes (`.mw-theme`, `.mw-full`)

### CSS Architecture
- **Framework Foundation**: Uses original semantic component system
- **Styling Enhancement**: Tailwind 4 for project-specific styling
- **Color System**: Upstart-inspired colors applied to framework variables
- **Typography**: Google Fonts (DM Sans, Plus Jakarta Sans) override defaults
- **Responsive Design**: Mobile-first approach with framework breakpoints
- **Modern CSS**: Custom properties, backdrop-filter, grid/flexbox
- **Component Pattern**: Framework classes (`.btn.primary`, `.card.hover`) + Tailwind

### JavaScript Patterns
- ES6+ class-based architecture
- Async/await for component loading
- Event delegation for dynamic content
- Intersection Observer for performance
- Modular, maintainable code structure

## Development Workflow

### Adding New Components
1. Create HTML component file in appropriate directory
2. Add loading logic to `UpstartPortfolio.loadComponents()`
3. Ensure proper placeholder elements in page files
4. Test component loading and responsiveness

### Styling Guidelines
- **Primary**: Use existing framework classes (`.section`, `.card`, `.btn`, etc.)
- **Secondary**: Add Tailwind classes for project-specific styling
- **Avoid**: Creating new CSS component classes
- **Colors**: Use framework color variables with Upstart theme overrides
- **Typography**: Use framework typography classes (`.h1`-`.h6`, `.lead`)
- **Layout**: Use framework layout classes (`.mw-theme`, `.stack`, `.cluster`)
- **Forms**: Use framework form classes (`.input`, `.form-group`, `.label`)
- **Enhancement**: Add Tailwind utility classes for specific styling needs

### Interactive Features
- Add functionality to `UpstartPortfolio` class
- Use modern JavaScript patterns
- Implement proper error handling
- Ensure accessibility compliance
- Test across devices and browsers

## Professional Features

### Business Focus
- Service-oriented content structure
- Professional color scheme and typography
- Trust indicators and social proof
- Clear calls-to-action throughout
- Contact forms with comprehensive fields

### Portfolio Showcase
- Dynamic project rendering
- Category filtering system
- Project detail overlays
- Technology stack displays
- Success metrics and ratings

### Performance Optimizations
- Efficient component loading
- Optimized animations
- Responsive images
- Smooth scrolling
- Professional scrollbar styling

## Important Notes

- Clean, professional aesthetic inspired by Upstart theme
- No build process required - pure HTML/CSS/JS
- Component-based architecture for maintainability
- Professional typography with Google Fonts
- Comprehensive form handling and validation
- Mobile-first responsive design
- Accessibility-focused development
- Modern JavaScript without framework dependencies