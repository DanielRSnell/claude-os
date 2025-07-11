# Tasks Directory

This directory contains all task files for the markdown database. Each task is stored as a separate markdown file with structured frontmatter, creating a comprehensive task management system.

## Structure

```
tasks/
├── README.md                    # This file
├── setup-database.md           # Individual task files
├── design-homepage.md          # Named using kebab-case
├── implement-contact-form.md   # Descriptive task names
└── [additional task files]
```

## Task File Format

Each task file uses the following frontmatter structure:

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

# Task Details

Additional task information, progress notes, and implementation details go here.
```

## Field Descriptions

- **type**: Always "task" for task files
- **title**: Task name or summary
- **status**: Current task status
- **priority**: Task priority level
- **project**: Reference to project file (filename without extension)
- **assignee**: Person responsible for the task
- **due_date**: Task deadline (YYYY-MM-DD format)
- **completion_date**: Actual completion date (YYYY-MM-DD format)
- **tags**: Array of relevant tags for categorization
- **description**: Brief task description
- **notes**: Additional task notes and context

## Usage Guidelines

### Creating a New Task

1. Use the template from `../templates/task-template.md`
2. Name the file using kebab-case (e.g., `setup-database.md`)
3. Fill in all relevant frontmatter fields
4. Add detailed task information in the content section

### Naming Convention

- Use kebab-case for file names
- Be descriptive: `implement-user-authentication.md`
- Include context: `fix-mobile-navigation-bug.md`
- Avoid generic names: `task-1.md`, `todo.md`

### Linking to Projects

- Reference project files using `[[project-name]]` syntax
- Use the project filename without extension
- Creates bidirectional relationships in Obsidian

## Task Status Management

### Todo
- Task is identified and ready to start
- Requirements are defined
- Waiting for assignment or scheduling

### In-Progress
- Task is actively being worked on
- Progress is being made
- May have partial completion

### Completed
- Task is finished and delivered
- Requirements have been met
- Quality checks passed

### Cancelled
- Task is no longer needed
- Requirements changed
- Deprioritized or abandoned

## Priority Levels

### High
- Critical tasks requiring immediate attention
- Blocking other tasks or project progress
- Time-sensitive deadlines
- Customer-facing issues

### Medium
- Important tasks with standard priority
- Normal workflow items
- Scheduled development work
- Regular maintenance tasks

### Low
- Nice-to-have tasks
- Future enhancements
- Technical debt items
- Documentation updates

## Task Categories and Tags

### By Type
- `type/development` - Coding and implementation
- `type/design` - UI/UX design work
- `type/testing` - Quality assurance tasks
- `type/documentation` - Writing and documentation
- `type/research` - Investigation and analysis
- `type/maintenance` - Ongoing maintenance work

### By Technology
- `tech/frontend` - Frontend development
- `tech/backend` - Backend development
- `tech/database` - Database work
- `tech/deployment` - Deployment and DevOps
- `tech/mobile` - Mobile development

### By Area
- `area/authentication` - Login and user management
- `area/ui` - User interface work
- `area/api` - API development
- `area/security` - Security implementations
- `area/performance` - Performance optimization

### By Complexity
- `complexity/simple` - Quick and easy tasks
- `complexity/medium` - Standard complexity
- `complexity/complex` - Complex or challenging tasks

## Time Management

### Estimation
- Add time estimates in the notes section
- Use story points or hour estimates
- Consider complexity and dependencies

### Tracking
- Update status regularly
- Log time spent in notes
- Track blockers and dependencies

### Deadlines
- Set realistic due dates
- Account for dependencies
- Buffer time for testing and review

## Task Dependencies

### Blocking Tasks
- Tasks that must be completed first
- Prerequisites and requirements
- External dependencies

### Related Tasks
- Tasks that are related or similar
- Tasks that share resources
- Tasks in the same feature area

### Sequential Tasks
- Tasks that must be done in order
- Workflow dependencies
- Build pipeline tasks

## Obsidian Integration

- Use the Templates plugin to create new tasks from the template
- Use Dataview plugin to query tasks by status, priority, or assignee
- Graph view will show relationships between tasks and projects
- Daily notes can reference tasks using `[[task-name]]` syntax

## Cross-References

Tasks create relationships with:
- **Projects**: Through the `project` field (bidirectional relationship)
- **Contacts**: Can be referenced in task notes
- **Companies**: Can be referenced in task context

## Task Management Workflows

### Sprint Planning
- Query tasks by project and priority
- Assign tasks to team members
- Set sprint deadlines and goals

### Daily Standups
- Review in-progress tasks
- Identify blockers and dependencies
- Update task status and notes

### Project Tracking
- Monitor task completion rates
- Track project progress
- Identify bottlenecks and issues

## Reporting and Analytics

### Task Metrics
- Completion rates by priority
- Time to completion analysis
- Assignee workload distribution
- Project progress tracking

### Dataview Queries
- Tasks by status and priority
- Overdue tasks report
- Completed tasks this week
- Tasks by assignee

## Best Practices

### Task Creation
- Be specific and actionable
- Include acceptance criteria
- Set realistic deadlines
- Assign appropriate priority

### Task Management
- Update status regularly
- Document progress and blockers
- Communicate changes to team
- Archive completed tasks

### Quality Control
- Review task requirements
- Test completed work
- Document lessons learned
- Update templates and processes

## Examples

- `setup-development-environment.md` - Development setup task
- `implement-user-registration.md` - Feature implementation task
- `fix-responsive-layout-bug.md` - Bug fix task
- `write-api-documentation.md` - Documentation task
- `deploy-to-staging-server.md` - Deployment task