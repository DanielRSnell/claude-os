# Contacts Directory

This directory contains all contact information for the markdown database. Each contact is stored as a separate markdown file with structured frontmatter.

## Structure

```
contacts/
├── README.md                    # This file
├── john-doe.md                 # Individual contact files
├── jane-smith.md               # Named using kebab-case
└── [additional contact files]
```

## Contact File Format

Each contact file uses the following frontmatter structure:

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

# Contact Details

Additional contact information, meeting notes, and interaction history go here.
```

## Field Descriptions

- **type**: Always "contact" for contact files
- **name**: Full name of the contact
- **company**: Reference to company file (filename without extension)
- **role**: Job title or role at the company
- **email**: Primary email address
- **phone**: Primary phone number
- **website**: Personal or professional website
- **location**: City, state/country where contact is located
- **linkedin**: LinkedIn profile URL
- **twitter**: Twitter handle or URL
- **tags**: Array of relevant tags for categorization
- **category**: Type of contact relationship
- **status**: Current contact status
- **created_date**: Date contact was added (YYYY-MM-DD format)
- **last_contact**: Date of last interaction (YYYY-MM-DD format)
- **notes**: Brief notes about the contact

## Usage Guidelines

### Creating a New Contact

1. Use the template from `../templates/contact-template.md`
2. Name the file using kebab-case (e.g., `john-doe.md`)
3. Fill in all relevant frontmatter fields
4. Add detailed contact information in the content section

### Naming Convention

- Use kebab-case for file names
- Format: `first-name-last-name.md`
- For duplicates, add company: `john-doe-acme-corp.md`

### Linking to Companies

- Reference company files using `[[company-name]]` syntax
- Use the company filename without extension
- Creates bidirectional relationships in Obsidian

## Contact Categories

### Client
- Direct clients or customers
- People who pay for services
- Decision makers for projects

### Colleague
- Professional peers
- Industry contacts
- Networking connections

### Vendor
- Service providers
- Suppliers
- Contractors and freelancers

### Prospect
- Potential clients
- Leads and opportunities
- Cold contacts

### Personal
- Personal friends
- Family members
- Personal service providers

## Status Management

### Active
- Currently engaged contacts
- Regular communication
- Ongoing relationships

### Inactive
- Dormant contacts
- Infrequent communication
- Maintained for reference

### Archived
- No longer relevant
- Closed relationships
- Historical records

## Contact Information Fields

### Required Fields
- **name**: Full name
- **category**: Relationship type
- **status**: Current status

### Communication Fields
- **email**: Primary contact method
- **phone**: Phone number with country code
- **linkedin**: Professional networking
- **twitter**: Social media contact

### Location Fields
- **location**: City/state/country
- **website**: Personal or professional site

### Professional Fields
- **company**: Company affiliation
- **role**: Job title or position

## Obsidian Integration

- Use the Templates plugin to create new contacts from the template
- Use Dataview plugin to query contacts by category, status, or tags
- Graph view will show relationships between contacts and companies
- Daily notes can reference contacts using `[[contact-name]]` syntax

## Cross-References

Contacts create relationships with:
- **Companies**: Through the `company` field
- **Projects**: Referenced by projects in `client_contact` field
- **Sites**: Referenced by sites in `client_contact` field

## Tagging Strategy

Use consistent tags across all contacts:
- `role/developer`, `role/designer`, `role/manager` for job roles
- `industry/tech`, `industry/finance`, `industry/healthcare` for industries
- `priority/high`, `priority/medium`, `priority/low` for importance
- `source/linkedin`, `source/referral`, `source/conference` for origin
- `skill/react`, `skill/design`, `skill/marketing` for expertise

## Privacy and Security

- Store only business-relevant contact information
- Respect privacy preferences and GDPR compliance
- Use discretion when adding personal details
- Regular cleanup of inactive contacts

## Examples

- `john-doe.md` - Client contact at Acme Corp
- `jane-smith.md` - Freelance designer contact
- `mike-johnson.md` - Vendor contact for hosting services
- `sarah-wilson.md` - Prospect contact from networking event