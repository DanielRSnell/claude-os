# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static portfolio website built with vanilla HTML, CSS, and JavaScript using Tailwind 4 as the CSS framework. The site demonstrates a component-based architecture with reusable HTML partials and a custom CSS framework built on top of Tailwind.

## Development Commands

This project uses vanilla HTML/CSS/JS with no build process required. Development is done by:

- Opening HTML files directly in the browser
- Using a local server (e.g., Live Server extension, `python -m http.server`, or `npx serve`)
- No compilation or build steps needed

## Architecture

### File Structure

```
example-portfolio/
├── pages/                  # Page-specific content
│   ├── home/              # Home page sections
│   │   ├── hero.html      # Hero section
│   │   ├── about.html     # About section
│   │   ├── projects.html  # Projects section
│   │   └── contact.html   # Contact section
│   └── framework/         # Framework demo page
│       ├── index.html     # Complete demo page
│       └── framework.html # Demo content partial
├── globals/               # Site-wide components
│   ├── header.html        # Navigation header
│   └── footer.html        # Site footer
├── components/            # Reusable components
│   └── project-card.html  # Project card template
├── styles/
│   └── main.css          # Tailwind 4 + custom framework
├── scripts/
│   └── main.js           # Component loading & interactions
└── project.md            # Project metadata
```

### Component Loading System

The architecture uses a dynamic component loading system via JavaScript:

- **main.js** loads HTML partials into placeholder elements
- Components are loaded based on page structure detection
- Home page loads: header, footer, hero, about, projects, contact
- Other pages load: header, footer only
- Uses `fetch()` to load HTML files and inject into placeholders

### CSS Framework

Built on Tailwind 4 with custom semantic classes:

#### Key Features:
- **Semantic components**: `.btn`, `.card`, `.badge`, `.alert`
- **Layout utilities**: `.stack`, `.cluster`, `.grid`, `.section`
- **Typography**: `.h1`-`.h6`, `.lead`, `.small`, `.caption`
- **Container system**: `.mw-theme`, `.mw-full` (WordPress-compatible)
- **Component variants**: `.primary`, `.secondary`, `.sm`, `.lg`
- **Interactive components**: Accordion, tabs, forms

#### CSS Architecture:
- Uses `@layer theme, base, components, utilities`
- CSS custom properties for theming
- Tailwind 4 import structure
- Component classes use `@apply` for Tailwind utilities

### JavaScript Architecture

**main.js** handles:
- Component loading with `loadComponent()`
- Mobile menu toggle
- Smooth scrolling navigation
- Scroll-based animations with IntersectionObserver
- Dynamic project card generation
- Form submission handling
- Interactive components (accordion, tabs)

## Key Conventions

### HTML Structure
- No HTML boilerplate in partials - only content
- Semantic HTML with proper ARIA attributes
- Component-based architecture with includes
- WordPress-compatible container classes

### CSS Classes
- Semantic component names over utility-only approaches
- Size variants: `.sm`, `.lg` (default has no class)
- Style variants: `.primary`, `.secondary`, `.outline`, `.ghost`
- State classes: `.active`, `.loading`, `.disabled`

### JavaScript Patterns
- Async/await for component loading
- Event delegation for dynamic content
- Intersection Observer for animations
- Modular function organization

## Development Workflow

1. **Adding New Components**: Create HTML file in appropriate directory, add to loading system if needed
2. **Styling**: Use existing framework classes first, extend in `main.css` if needed
3. **Interactions**: Add JavaScript in `main.js` using existing patterns
4. **Testing**: Open in browser directly or use local server

## File Relationships

- **project.md**: Contains metadata and project documentation
- **pages/**: Page-specific content sections
- **globals/**: Site-wide components used across pages
- **components/**: Reusable components (currently just project-card)
- **styles/main.css**: Complete styling system
- **scripts/main.js**: All JavaScript functionality

## Important Notes

- This is a vanilla HTML/CSS/JS project with no build process
- Tailwind 4 is used via CDN/direct import
- Component loading is done dynamically with JavaScript
- The CSS framework provides semantic classes for rapid development
- All interactions are handled with vanilla JavaScript
- Responsive design is mobile-first using Tailwind utilities