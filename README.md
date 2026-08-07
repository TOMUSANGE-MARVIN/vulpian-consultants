# Vulpian Consultants

Marketing website and CMS for Vulpian Consultants, a QMS and organizational
excellence consulting firm. Built with Next.js (App Router) and MongoDB.

## Stack

- Next.js 15 / React 19 / Tailwind CSS 4
- MongoDB Atlas via Mongoose
- Custom admin CMS at `/admin` (site content, services, team)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Requires a `.env.local` with:

```
MONGODB_URI=mongodb+srv://...
ADMIN_PASSWORD=...
```

## Admin CMS

Visit `/admin/login` and sign in with `ADMIN_PASSWORD` to manage:

- Site content (hero, who-we-are, values, vision/mission, approach, contact)
- Services
- Team

## Seeding

```bash
node scripts/seed.mjs
```

Seeds the database with the initial site content, 14 services, and the lead
consultant profile. Running it again overwrites existing content — use with
care against a live database.

## Deployment

Deploys to Vercel. Set `MONGODB_URI` and `ADMIN_PASSWORD` as environment
variables in the Vercel project settings before deploying.
