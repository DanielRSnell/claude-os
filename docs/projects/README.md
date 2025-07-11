# Projects Directory

This directory contains all project management files for the markdown database. Each project is stored as a separate markdown file with structured frontmatter.

## Structure

```
projects/
├── README.md                    # This file
├── project-name.md             # Individual project files
└── [additional project files]
```

## Project File Format

Each project file uses the following frontmatter structure:

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

# Project Content

Additional project details, notes, and documentation go here.
```

## Field Descriptions

- **type**: Always "project" for project files
- **title**: Project name/title
- **status**: Current project status (planning, active, on-hold, completed, cancelled)
- **priority**: Project priority level (high, medium, low)
- **start_date**: Project start date (YYYY-MM-DD format)
- **due_date**: Project due date (YYYY-MM-DD format)
- **completion_date**: Actual completion date (YYYY-MM-DD format)
- **assignee**: Person responsible for the project
- **tags**: Array of relevant tags for categorization
- **budget**: Project budget amount
- **client_company**: Reference to company file (filename without extension)
- **client_contact**: Reference to contact file (filename without extension)
- **description**: Brief project description
- **tasks**: Array of task file references (filenames without extensions)

## Usage Guidelines

### Creating a New Project

1. Use the template from `../templates/project-template.md`
2. Name the file using kebab-case (e.g., `website-redesign.md`)
3. Fill in all relevant frontmatter fields
4. Add detailed project information in the content section

### Linking to Other Objects

- **Companies**: Reference company files using `[[company-name]]` syntax
- **Contacts**: Reference contact files using `[[contact-name]]` syntax
- **Tasks**: Reference task files using `[[task-name]]` syntax

### Status Management

- **planning**: Project is in planning phase
- **active**: Project is currently being worked on
- **on-hold**: Project is temporarily paused
- **completed**: Project has been finished
- **cancelled**: Project has been cancelled

### Priority Levels

- **high**: Critical projects requiring immediate attention
- **medium**: Standard priority projects
- **low**: Nice-to-have projects that can be delayed

## Obsidian Integration

- Use the Templates plugin to create new projects from the template
- Use Dataview plugin to query projects by status, priority, or tags
- Graph view will show relationships between projects, companies, contacts, and tasks
- Daily notes can reference projects using `[[project-name]]` syntax

## Cross-References

Projects create relationships with:
- **Companies**: Through the `client_company` field
- **Contacts**: Through the `client_contact` field
- **Tasks**: Through the `tasks` array (bidirectional relationship)

## Tagging Strategy

Use consistent tags across all projects:
- `client/company-name` for client-specific projects
- `type/website`, `type/app`, `type/consulting` for project types
- `tech/react`, `tech/wordpress`, `tech/tailwind` for technology stacks
- `status/urgent`, `status/review` for status indicators

## Examples

- `website-redesign.md` - Corporate website redesign project
- `mobile-app-development.md` - Mobile application development project
- `marketing-campaign.md` - Marketing campaign project