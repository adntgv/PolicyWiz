# PolicyWiz

> Generate legal policy pages for your app or website in minutes — not days.

PolicyWiz is a web app that helps indie hackers, SaaS founders, and small business owners generate professional legal policies. Answer a few questions about your app and get ready-to-use Privacy Policy, Terms of Service, Cookie Policy, Refund Policy, and DMCA Policy documents.

## ⚠️ Disclaimer

**Generated policies are templates and not legal advice.** Please consult a qualified attorney to ensure your policies meet all applicable legal requirements for your specific use case and jurisdiction.

## Features

- **Step-by-Step Wizard** — No legal jargon. Answer simple questions about your app.
- **AI-Powered Generation** — Professional policies generated using GPT-4o-mini.
- **5 Policy Types** — Privacy Policy, Terms of Service, Cookie Policy, Refund Policy, DMCA Policy.
- **Edit & Customize** — Fine-tune every word with the built-in editor.
- **Export Options** — Copy as Markdown, HTML, plain text, or download as PDF.
- **Hosted Pages** — Each policy gets a public URL (e.g., `/p/abc123`) you can link from your app.
- **Dashboard** — Manage, edit, and regenerate your policies.
- **Dark Theme** — Easy on the eyes.

## Tech Stack

- **Framework:** Next.js 14 + TypeScript
- **Styling:** Tailwind CSS
- **AI:** OpenAI API (gpt-4o-mini)
- **Database:** Supabase (PostgreSQL + RLS)
- **Deployment:** Docker (multi-stage build)

## Getting Started

### Prerequisites

- Node.js 18+
- OpenAI API key
- Supabase project

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/policywiz.git
   cd policywiz
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Fill in your `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   OPENAI_API_KEY=sk-...
   ```

5. Run the database migration:
   ```bash
   # Execute supabase/migrations/001_policies.sql in your Supabase SQL editor
   ```

6. Start development server:
   ```bash
   npm run dev
   ```

### Docker

```bash
docker build \
  --build-arg NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co \
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key \
  -t policywiz .

docker run -p 3000:3000 \
  -e OPENAI_API_KEY=sk-... \
  -e SUPABASE_SERVICE_ROLE_KEY=your-key \
  policywiz
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout
│   ├── generate/page.tsx     # Wizard questionnaire
│   ├── dashboard/page.tsx    # Policy management
│   ├── p/[code]/page.tsx     # Public hosted policy page
│   ├── auth/page.tsx         # Auth/pricing placeholder
│   └── api/
│       ├── generate/route.ts # AI generation endpoint
│       └── policies/route.ts # CRUD operations
├── components/
│   ├── Wizard.tsx            # Step-by-step questionnaire
│   ├── PolicyEditor.tsx      # Markdown editor/viewer
│   ├── PolicyCard.tsx        # Dashboard policy card
│   ├── ExportMenu.tsx        # Export dropdown
│   ├── Header.tsx            # Navigation header
│   └── Footer.tsx            # Footer with disclaimer
└── lib/
    ├── supabase.ts           # Client-side Supabase
    ├── supabase-server.ts    # Server-side Supabase
    ├── openai.ts             # Policy generation logic
    ├── types.ts              # TypeScript types
    └── utils.ts              # Utility functions
```

## Monetization

- **Free tier:** 1 policy generation
- **Pro ($14/mo):** Unlimited policies, custom branding, hosted pages without PolicyWiz branding, API access

## License

MIT
