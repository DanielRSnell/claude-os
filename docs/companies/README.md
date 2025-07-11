# Companies Directory

This directory contains all company information for the markdown database. Each company is stored as a separate markdown file with structured frontmatter.

## Structure

```
companies/
├── README.md                    # This file
├── acme-corp.md                # Individual company files
├── tech-solutions-inc.md       # Named using kebab-case
└── [additional company files]
```

## Company File Format

Each company file uses the following frontmatter structure:

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

# Company Profile

Additional company information, history, and relationship details go here.
```

## Field Descriptions

- **type**: Always "company" for company files
- **name**: Full company name
- **industry**: Industry or sector the company operates in
- **size**: Company size category
- **website**: Primary company website URL
- **location**: Headquarters location (city, state/country)
- **phone**: Main company phone number
- **email**: General contact email address
- **linkedin**: Company LinkedIn page URL
- **tags**: Array of relevant tags for categorization
- **status**: Current relationship status
- **created_date**: Date company was added (YYYY-MM-DD format)
- **last_contact**: Date of last interaction (YYYY-MM-DD format)
- **notes**: Brief notes about the company
- **primary_contact**: Reference to main contact file (filename without extension)

## Usage Guidelines

### Creating a New Company

1. Use the template from `../templates/company-template.md`
2. Name the file using kebab-case (e.g., `acme-corp.md`)
3. Fill in all relevant frontmatter fields
4. Add detailed company information in the content section

### Naming Convention

- Use kebab-case for file names
- Include company type if needed: `acme-corp.md`, `tech-solutions-llc.md`
- For subsidiaries, use parent company: `acme-corp-subsidiary.md`

### Linking to Contacts

- Reference contact files using `[[contact-name]]` syntax
- Use the contact filename without extension
- Creates bidirectional relationships in Obsidian

## Company Size Categories

### Small
- 1-50 employees
- Startups and small businesses
- Local or regional operations

### Medium
- 51-250 employees
- Growing companies
- Regional to national operations

### Large
- 251-1000 employees
- Established corporations
- National to international operations

### Enterprise
- 1000+ employees
- Large corporations
- Global operations

## Industry Categories

Common industry classifications:
- **Technology**: Software, hardware, IT services
- **Finance**: Banking, insurance, investments
- **Healthcare**: Medical, pharmaceutical, biotechnology
- **Manufacturing**: Production, industrial, automotive
- **Retail**: E-commerce, brick-and-mortar, consumer goods
- **Consulting**: Professional services, advisory
- **Education**: Schools, universities, training
- **Non-profit**: Charities, foundations, NGOs

## Status Management

### Active
- Current clients or partners
- Ongoing business relationships
- Regular communication

### Inactive
- Past clients or partners
- Dormant relationships
- Potential for reactivation

### Prospect
- Potential clients
- Sales opportunities
- Lead generation targets

### Archived
- No longer relevant
- Closed relationships
- Historical records

## Company Information Fields

### Required Fields
- **name**: Full company name
- **status**: Current relationship status
- **size**: Company size category

### Contact Fields
- **website**: Primary website
- **phone**: Main phone number
- **email**: General contact email
- **linkedin**: Company LinkedIn page

### Business Fields
- **industry**: Industry classification
- **location**: Headquarters location
- **primary_contact**: Main contact person

### Relationship Fields
- **created_date**: When relationship started
- **last_contact**: Last interaction date
- **notes**: Relationship notes

## Obsidian Integration

- Use the Templates plugin to create new companies from the template
- Use Dataview plugin to query companies by industry, size, or status
- Graph view will show relationships between companies and contacts
- Daily notes can reference companies using `[[company-name]]` syntax

## Cross-References

Companies create relationships with:
- **Contacts**: Through the `primary_contact` field and referenced by contacts
- **Projects**: Referenced by projects in `client_company` field
- **Sites**: Referenced by sites in `client_company` field

## Tagging Strategy

Use consistent tags across all companies:
- `industry/tech`, `industry/finance`, `industry/healthcare` for industry
- `size/startup`, `size/enterprise`, `size/fortune500` for company size
- `type/client`, `type/vendor`, `type/partner` for relationship type
- `location/usa`, `location/europe`, `location/asia` for geography
- `priority/high`, `priority/medium`, `priority/low` for importance
- `stage/lead`, `stage/prospect`, `stage/client` for sales pipeline

## Research and Documentation

### Company Profile Information
- Company history and background
- Key personnel and leadership
- Products and services offered
- Market position and competitors
- Recent news and developments

### Business Intelligence
- Revenue and financial information
- Growth trends and metrics
- Technology stack and tools used
- Organizational structure
- Strategic initiatives

### Relationship Management
- Contract details and terms
- Project history and outcomes
- Communication preferences
- Decision-making process
- Key stakeholders and influencers

## Privacy and Compliance

- Store only publicly available information
- Respect confidentiality agreements
- Comply with data protection regulations
- Regular cleanup of outdated information

## Examples

- `acme-corp.md` - Technology company client
- `global-solutions-inc.md` - Large enterprise prospect
- `startup-innovations.md` - Small startup partner
- `consulting-firm-llc.md` - Professional services vendor