# Ethostudio Frontend

Next.js 14 frontend for the Ethos Studio portfolio site.

## Requirements
- Node.js 20+

## Setup

```bash
# 1. Create Next.js app (first time only)
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=no --import-alias="@/*"

# 2. Copy env
cp .env.local.example .env.local

# 3. Install dependencies (already done by create-next-app)
npm install
```

## Running locally

Make sure the backend containers are running first:
```bash
cd ../ethostudio-infrastructure && docker compose up -d
```

Then:
```bash
npm run dev
```

Visit http://localhost:3000

## Pages

| Route | Description |
|---|---|
| `/` | Homepage with hero, services, portfolio preview |
| `/portfolio` | Full project gallery |
| `/portfolio/[slug]` | Single project detail |
| `/contact` | Contact form |
