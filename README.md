# Hey Coco! Website

Premium single-page agency site for [heycoco.agency](https://heycoco.agency), built with Next.js, Tailwind CSS 4, TypeScript, and Payload CMS on PostgreSQL.

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Without a database, the site falls back to static content in `content/`.

## CMS Admin

With `DATABASE_URL` and `PAYLOAD_SECRET` configured:

1. Run migrations: `npm run migrate`
2. Seed content: `npm run seed`
3. Open [http://localhost:3000/admin](http://localhost:3000/admin)

Default admin credentials come from `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `.env.local` (see `.env.example`).

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string (Railway Postgres) |
| `PAYLOAD_SECRET` | Random secret for Payload auth |
| `NEXT_PUBLIC_SERVER_URL` | Public site URL (e.g. `https://heycoco.agency`) |
| `RESEND_API_KEY` | Resend API key for contact form emails |
| `CONTACT_TO_EMAIL` | Recipient for form submissions |
| `PREVIEW_SECRET` | Token for draft preview URLs |
| `REVALIDATE_SECRET` | Token for CMS webhook revalidation |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | First admin user (seed script) |

## Project Structure

- `app/(frontend)/` — Public site pages
- `app/(payload)/` — Payload admin + REST API
- `app/api/` — Contact form, preview, revalidation
- `collections/` — Payload CMS collections
- `globals/` — Payload CMS globals (site settings)
- `components/` — Layout, UI, and sections
- `content/` — Static fallback content + seed source
- `lib/cms.ts` — CMS fetch layer with static fallback

## Deploy to Railway

1. Create a new Railway project from this repo
2. Add a **PostgreSQL** plugin and link `DATABASE_URL` to the web service
3. Set environment variables from `.env.example`
4. Deploy — Railway runs `npm run migrate` on release, then starts the app
5. After first deploy, run `npm run seed` once (Railway shell or one-off job)
6. Point `heycoco.agency` DNS to the Railway domain

### Railway services

- **Web** — Next.js app (Nixpacks via `railway.toml`)
- **Postgres** — Payload CMS database

Uploaded media is stored in `/media` on the container filesystem. For production persistence, mount a Railway volume at `/app/media` or configure S3-compatible storage later.

## Preview drafts

```
/api/preview?secret=PREVIEW_SECRET&slug=my-project&type=projects
/api/exit-preview
```

## Revalidate cache (webhook)

```bash
curl -X POST https://heycoco.agency/api/revalidate \
  -H "x-revalidate-secret: YOUR_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"paths": ["/"]}'
```

## Build

```bash
npm run generate:importmap
npm run generate:types
npm run build
npm start
```
