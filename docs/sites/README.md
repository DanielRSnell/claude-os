# Sites Directory

This directory contains file-based site projects. Each site gets its own folder with a standardized structure for HTML/CSS/JS development using Tailwind 4.

## Structure

```
sites/
├── README.md                    # This file
├── example-portfolio/           # Example site project
│   ├── pages/                  # Individual page files
│   │   ├── home/              # Home page partials
│   │   ├── about/             # About page partials
│   │   └── framework/         # Framework demo page
│   ├── partials/              # Page-specific partials
│   ├── globals/               # Site-wide components
│   │   ├── header.html
│   │   └── footer.html
│   ├── components/            # Reusable components
│   ├── styles/                # Tailwind 4 CSS
│   │   └── main.css
│   ├── scripts/               # JavaScript files
│   │   └── main.js
│   └── project.md             # Project metadata
└── [other-site-projects]/
```

## Site Project Structure

Each site project contains:

### Required Files

- **project.md**: Project metadata with frontmatter
- **styles/main.css**: Tailwind 4 configuration and custom styles
- **pages/**: Individual page files organized by page
- **globals/**: Site-wide components (header, footer, navigation)

### Optional Directories

- **partials/**: Page-specific partial components
- **components/**: Reusable components used across pages
- **scripts/**: JavaScript files
- **assets/**: Images, fonts, and other static assets

## Project.md Format

Each site project includes a `project.md` file with this frontmatter:

```yaml
---
type: site
title: ""
status: development # planning, development, testing, live, archived
url: ""
repository: ""
hosting: ""
domain: ""
ssl: false
analytics: ""
technologies: [HTML, CSS, JavaScript, Tailwind 4]
tags: []
created_date: 
launch_date: 
last_updated: 
project: "" # references main project file
client_company: "" # references company file
client_contact: "" # references contact file
description: ""
---

# Site Documentation

Additional site details, notes, and documentation go here.
```

## Field Descriptions

- **type**: Always "site" for site projects
- **title**: Site/project name
- **status**: Development status (planning, development, testing, live, archived)
- **url**: Live site URL
- **repository**: Git repository URL
- **hosting**: Hosting provider/service
- **domain**: Domain name
- **ssl**: SSL certificate status (true/false)
- **analytics**: Analytics tracking ID or service
- **technologies**: Array of technologies used
- **tags**: Array of relevant tags
- **created_date**: Project creation date
- **launch_date**: Site launch date
- **last_updated**: Last update date
- **project**: Reference to main project file
- **client_company**: Reference to company file
- **client_contact**: Reference to contact file
- **description**: Brief site description

## Technology Standards

### CSS Framework
- **Tailwind 4** is the primary CSS framework
- Custom CSS properties for theming
- Semantic component classes (like DaisyUI)
- WordPress-compatible structure using `mw-full` and `mw-theme` classes

### HTML Structure
- **No HTML boilerplate** in individual page files
- Semantic HTML with proper aria attributes
- Responsive design using Tailwind classes
- Component-based architecture

### JavaScript
- Vanilla JavaScript for interactivity
- Module-based organization
- Event-driven architecture
- Accessibility-focused implementations

## Development Workflow

### Creating a New Site

1. Create a new folder with a descriptive name
2. Copy the basic structure from `example-portfolio/`
3. Create `project.md` with proper frontmatter
4. Set up the required directories and files
5. Link to related project, company, and contact files

### File Organization

- **Pages**: Each page gets its own directory under `pages/`
- **Partials**: Page-specific components go in the page directory
- **Globals**: Site-wide components go in `globals/`
- **Components**: Reusable components go in `components/`
- **Styles**: All CSS goes in `styles/main.css`

### CSS Framework

The framework provides:
- Semantic component classes (`.btn`, `.card`, `.badge`)
- Layout utilities (`.stack`, `.cluster`, `.grid`)
- Typography classes (`.h1`, `.h2`, `.lead`)
- Interactive components (accordion, tabs, forms)
- WordPress-compatible containers

## Status Management

- **planning**: Site is in planning/design phase
- **development**: Site is actively being developed
- **testing**: Site is in testing phase
- **live**: Site is live and accessible
- **archived**: Site is no longer active

## Usage Guidelines

### WordPress Compatibility

All HTML uses WordPress-compatible structure:
- **mw-full**: Full-width sections
- **mw-theme**: Theme-constrained containers
- Proper semantic markup for block themes

### Responsive Design

- Mobile-first approach using Tailwind
- Semantic breakpoints (sm, md, lg, xl)
- Flexible grid and flexbox layouts
- Scalable typography

### Accessibility

- Proper ARIA attributes
- Semantic HTML structure
- Keyboard navigation support
- Screen reader compatibility

## Cross-References

Sites create relationships with:
- **Projects**: Through the `project` field
- **Companies**: Through the `client_company` field
- **Contacts**: Through the `client_contact` field

## Examples

- `example-portfolio/` - Portfolio website with framework demo
- `corporate-website/` - Corporate website project
- `e-commerce-site/` - E-commerce website project
- `marketing-landing/` - Marketing landing page project