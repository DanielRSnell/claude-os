# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a multi-purpose Obsidian-based organizational system:

1. **LinkedIn Writing System** (`/linkedin-posts/`) - A content management system for creating engaging LinkedIn posts based on news articles
2. **Book Writing System** (`/book-project/`) - A comprehensive manuscript management system for fiction writing
3. **Web Development Database** (planned) - A markdown-based project management system for web development

All systems use markdown files with YAML frontmatter and are designed for Obsidian's ecosystem.

## Architecture

### LinkedIn Writing System (`/linkedin-posts/`)
A comprehensive system for creating and managing LinkedIn content:

- `posts/` - LinkedIn post content
  - `published/` - Posts that have been published
  - `drafts/` - Posts in development
  - `ideas/` - Post concepts and brainstorming
- `news-articles/` - Saved articles organized by category
  - `tech/` - Technology news
  - `business/` - Business and industry news
  - `career/` - Career development articles
  - `ai/` - AI and machine learning content
  - `other/` - Miscellaneous articles
- `templates/` - Reusable templates for posts and articles
- `research/` - Background research and data
- `analytics/` - Post performance tracking
- `assets/` - Images, videos, and media for posts

### Book Project Structure (`/book-project/`)
A manuscript management system for fiction writing:

- `manuscript/` - The actual book content
  - `chapters/` - Individual chapters (format: `01-chapter-title.md`)
  - `scenes/` - Scene-level breakdowns
  - `drafts/` - Version history
  - `revisions/` - Editorial passes
- `characters/` - Character profiles with relationships
- `worldbuilding/` - Setting and universe details
- `research/` - Reference materials and citations
- `planning/` - Outlines, timelines, and arcs
- `resources/` - Writing guides and techniques
- `templates/` - Reusable document templates
- `assets/` - Images and media files

### Planned Database Structure (Web Development)
The project specification defines markdown-based databases:
- `docs/projects/` - Project definitions and metadata
- `docs/sites/` - Web development projects (pure HTML/CSS/JS with Tailwind 4)
- `docs/contacts/` - Contact information
- `docs/companies/` - Company records
- `docs/tasks/` - Task management
- `docs/templates/` - Templates for creating new entries

## Development Commands

### LinkedIn Writing Workflow
No build system required - purely content-focused:

```bash
# Open in Obsidian for full feature access
# or use any markdown editor

# Quick navigation commands:
cd linkedin-posts/posts/drafts    # Current drafts
cd linkedin-posts/news-articles   # Saved articles
cd linkedin-posts/templates       # Templates
```

### Book Project Workflow
No build system required - purely content-focused:

```bash
# Open in Obsidian for full feature access
# or use any markdown editor

# For web previews (if needed):
python -m http.server 8000
```

### Web Development Projects (When Implemented)
```bash
# Local development for sites/
python -m http.server 8000
# Or use VS Code Live Server extension
```

## File Naming Conventions

### LinkedIn Writing System
- **Posts**: `YYYY-MM-DD-post-title.md` (date prefix for chronological sorting)
- **News Articles**: `YYYY-MM-DD-source-headline.md`
- **Post Series**: `series-name-part-X.md`
- **Analytics Reports**: `YYYY-MM-analytics.md`
- **Cross-references**: Use `[[filename]]` syntax for all links
- **Templates**: Use provided templates for consistency

### Book Project
- **Chapters**: `01-chapter-title.md` (sequential with leading zeros)
- **Characters**: `firstname-lastname.md`
- **Cross-references**: Use `[[filename]]` syntax for all links
- **Templates**: Use provided templates for consistency

### Database Objects (Web Dev)
- **Projects**: descriptive-project-name.md
- **Companies**: company-name.md
- **Contacts**: firstname-lastname.md
- **Tasks**: task-description.md

## Frontmatter Standards

### LinkedIn Writing System Frontmatter
**LinkedIn Posts**:
```yaml
---
title: "Post Title"
date: YYYY-MM-DD
status: draft|published|scheduled
post_type: discussion|thought-leadership|news-commentary|tips
topics: []
hashtags: []
news_source: "[[news-article-filename]]"
engagement_goal: awareness|discussion|thought-leadership
character_count: 0
has_media: false
media_type: image|video|document|none
performance:
  views: 0
  likes: 0
  comments: 0
  shares: 0
  engagement_rate: 0
---
```

**News Articles**:
```yaml
---
title: "Article Title"
source: "Publication/Website Name"
author: "Author Name"
date_published: YYYY-MM-DD
date_saved: YYYY-MM-DD
url: "https://..."
category: tech|business|career|ai|other
topics: []
key_points: []
relevance: high|medium|low
used_in_posts: []
---
```

### Book Project Frontmatter
**Chapters**:
```yaml
---
title: "Chapter Title"
chapter: 1
status: draft|revision|final
pov: "Character Name"
timeline: "Date/Time"
location: "Setting"
wordcount: 0
tags: [chapter, act-1, plot-point]
---
```

**Characters**:
```yaml
---
name: "Character Full Name"
role: protagonist|antagonist|supporting|minor
age: 
occupation: 
relationships: 
  - [[Other Character]]
tags: [character, main-cast]
---
```

### Database Frontmatter (Web Dev)
See `proposed-object-types.md` for complete specifications including projects, sites, contacts, companies, and tasks.

## Key Patterns

### Obsidian Integration
- Use YAML frontmatter for structured metadata
- Reference documents with `[[filename]]` syntax
- Maintain bidirectional relationships for graph visualization
- Leverage tags for categorization and filtering
- Use templates for consistency

### LinkedIn Writing Workflow
1. **Content Discovery**: Save interesting articles to `news-articles/[category]/`
2. **Ideation**: Create post ideas in `posts/ideas/`
3. **Drafting**: Develop posts in `posts/drafts/` using templates
4. **Review**: Check character count, hashtags, and engagement hooks
5. **Publishing**: Move to `posts/published/` and update performance metrics
6. **Analysis**: Track engagement in `analytics/` for continuous improvement

### Writing Style Guidelines
- Write posts as one flowing piece of content (no section headers)
- Hooks can use dramatic language to grab attention
- In the body, avoid overused buzzwords like "game-changer", "revolution", "disrupt"
- Avoid em dashes (—) as they're currently associated with AI writing
- Focus on concrete insights and strategic analysis
- Use professional but conversational tone
- Lead with value, not hype

### Book Writing Workflow
1. **Planning**: Create outlines in `planning/outlines/`
2. **Character Development**: Use templates in `characters/`
3. **Writing**: Draft chapters in `manuscript/chapters/`
4. **Revision**: Track edits in `manuscript/revisions/`
5. **Research**: Document sources in `research/`

### Content Management
- One concept per file
- Clear, descriptive filenames with date prefixes for chronological ordering
- Consistent tagging and cross-references
- Regular version tracking for major edits
- Link news articles to posts for reference tracking

## Important Notes

1. **No Build Process**: Files are served as-is, no compilation needed
2. **Obsidian-First Design**: Optimized for Obsidian's graph view, canvas, and plugin ecosystem
3. **Content-Focused**: Priority on writing, organization, and relationship tracking
4. **Template-Based**: Use provided templates for consistency across content types
5. **Version Control**: Recommended for tracking manuscript progress and major revisions