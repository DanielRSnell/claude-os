# Proposed Object Types for Markdown Database

## Folder Structure
```
docs/
├── projects/              # Project management
├── sites/                 # File-based sites directory
│   └── <project-name>/
│       ├── pages/         # Individual page files
│       ├── partials/      # Page-specific partials
│       ├── globals/       # Header, footer, etc.
│       ├── components/    # Reusable components
│       ├── styles/        # Tailwind 4 CSS
│       │   └── main.css
│       ├── project.md     # Project metadata & references
│       └── [html/css/js files]
├── contacts/              # Contact database
├── companies/             # Company database
├── tasks/                 # Task database
└── templates/             # Templates for each object type
```

## Object Types & Frontmatter

### 1. Projects (projects/)
```yaml
---
type: project
title: ""
status: planning # planning, active, on-hold, completed, cancelled
priority: medium # high, medium, low
start_date: 
due_date: 
completion_date: 
assignee: ""
tags: []
budget: 
client_company: "" # references company file
client_contact: "" # references contact file
description: ""
tasks: [] # references task files
---
```

### 2. Sites (sites/)
Note: Each site project contains a `project.md` file with this frontmatter:
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
```

### 3. Contacts (contacts/)
```yaml
---
type: contact
name: ""
company: "" # references company file
role: ""
email: ""
phone: ""
website: ""
location: ""
linkedin: ""
twitter: ""
tags: []
category: client # client, colleague, vendor, prospect, personal
status: active # active, inactive, archived
created_date: 
last_contact: 
notes: ""
---
```

### 4. Companies (companies/)
```yaml
---
type: company
name: ""
industry: ""
size: small # small, medium, large, enterprise
website: ""
location: ""
phone: ""
email: ""
linkedin: ""
tags: []
status: active # active, inactive, prospect, archived
created_date: 
last_contact: 
notes: ""
primary_contact: "" # references contact file
---
```

### 5. Tasks (tasks/)
```yaml
---
type: task
title: ""
status: todo # todo, in-progress, completed, cancelled
priority: medium # high, medium, low
project: "" # references project file
assignee: ""
due_date: 
completion_date: 
tags: []
description: ""
notes: ""
---
```

## Special Considerations

### Sites Directory
- Each site project gets its own folder with standardized structure
- **Technology Stack**: HTML/CSS/JS with Tailwind 4
- **Folder Structure**:
  - `pages/` - Individual page files (home, about, etc.)
  - `partials/` - Page-specific partial components
  - `globals/` - Site-wide components (header, footer, nav)
  - `components/` - Reusable components used across pages
  - `styles/main.css` - Tailwind 4 configuration and custom styles
  - `project.md` - Project metadata referencing project and client
- **Standards**: No HTML boilerplate, everything uses Tailwind classes
- Actual HTML/CSS/JS files live alongside the markdown

### Project Tasks
- Tasks are separate objects with their own files
- Projects reference task files in the tasks array
- Tasks reference back to their project
- Creates bidirectional relationships in Obsidian graph

### Cross-References
- Projects reference both company and contact
- Projects reference tasks (array of task files)
- Tasks reference back to project
- Contacts reference their company
- Companies have a primary contact
- Sites reference client company and contact

### Tagging Strategy
- Use consistent tags across all object types
- Consider hierarchical tags (e.g., `client/acme-corp`)
- Tags enable cross-linking and filtering in Obsidian

### Linking Between Objects
- Use `[[filename]]` syntax for internal links
- Reference fields use filename without extension
- Creates network of related objects

## Obsidian Integration
- Templates plugin can use the template files
- Dataview plugin can query frontmatter fields
- Graph view shows relationships between objects
- Daily notes can reference projects/contacts/companies