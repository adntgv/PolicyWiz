# PolicyWiz — Product Specification

## Overview
PolicyWiz is a web application that generates legal policy pages (Privacy Policy, Terms of Service, Cookie Policy, Refund Policy, DMCA Policy) for indie hackers, SaaS founders, and small business owners. Users answer a simple questionnaire and receive AI-generated, professional policy documents ready to copy, embed, or host.

## Target Audience
- Indie hackers launching MVPs
- SaaS founders needing compliance
- Small business owners with websites
- Freelancers building client sites

## Monetization Model
- **Free Tier:** 1 free policy generation, basic export
- **Pro ($14/mo):** Unlimited policies, custom branding on hosted pages, remove PolicyWiz watermark, priority generation, API access

## Core User Flow
1. User lands on homepage → clicks "Generate Free Policy"
2. Wizard Step 1: Select policy type
3. Wizard Step 2: Enter app name, URL, contact email, jurisdiction
4. Wizard Step 3: Select data collected, third-party services, cookie types
5. Wizard Step 4: Review and generate
6. AI generates policy → user views in editor
7. User can edit, export (Markdown/HTML/text/PDF), or share via hosted URL
8. Policy saved to dashboard for future editing

## Policy Types
| Type | Description |
|------|-------------|
| Privacy Policy | Data collection, usage, sharing, user rights |
| Terms of Service | Usage rules, limitations, liability |
| Cookie Policy | Cookie types, purposes, management |
| Refund Policy | Return/refund conditions and procedures |
| DMCA Policy | Copyright infringement takedown procedures |

## Technical Architecture
- **Frontend:** Next.js 14, TypeScript, Tailwind CSS
- **Backend:** Next.js API routes
- **AI:** OpenAI GPT-4o-mini via API
- **Database:** Supabase (PostgreSQL + Row Level Security)
- **Auth:** Anonymous token (MVP), Supabase Auth (planned)
- **Hosting:** Docker container

## Important Disclaimer
All generated policies include a prominent disclaimer: "Generated policies are templates and not legal advice. Please consult a qualified attorney."
