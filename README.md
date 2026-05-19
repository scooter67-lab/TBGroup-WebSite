# TB Group — Corporate Website

Production-ready monorepo: public site, admin panel, REST API.

## Stack

| Layer | Technologies |
|-------|----------------|
| Frontend | React 19, Vite, TailwindCSS, Framer Motion, React Router, Axios, React Hook Form |
| Admin | React 19, Vite, TailwindCSS, Recharts |
| Backend | Node.js, Express, MongoDB, Mongoose, JWT, Multer, Nodemailer, Helmet |
| DevOps | Docker, docker-compose, Nginx |

## Project structure

```
TBWEB/
├── client/          # Public website (port 5173)
├── admin/           # Admin dashboard (port 5174)
├── server/          # REST API (port 5000)
├── nginx/           # Reverse proxy config
├── docker-compose.yml
└── .env.example
```

## Quick start (development)

### Prerequisites

- Node.js 20+
- MongoDB (local or Docker)

### 1. Environment

```bash
cp .env.example .env
```

Edit `.env` — set `MONGODB_URI`, `JWT_SECRET`, mail and Bitrix24 settings.

### 2. Install dependencies

```bash
npm run install:all
```

### 3. Seed database

```bash
cd server
npm run seed
```

Default admin: `admin@tbgroup.ru` / `Admin123!` (from `.env`).

### 4. Run

```bash
# Terminal 1 — API
cd server && npm run dev

# Terminal 2 — Site
cd client && npm run dev

# Terminal 3 — Admin
cd admin && npm run dev
```

Or from root (with `concurrently`):

```bash
npm run dev
```

- Site: http://localhost:5173  
- Admin: http://localhost:5174  
- API: http://localhost:5000/api/health  

## Docker (production)

```bash
cp .env.example .env
docker-compose up -d --build
```

Nginx serves the site on port 80, proxies `/api` to the backend.

## API endpoints

| Method | Path | Auth |
|--------|------|------|
| POST | `/api/auth/login` | — |
| GET | `/api/auth/me` | JWT |
| GET/POST/PUT/DELETE | `/api/cases` | POST/PUT/DELETE: JWT |
| GET/POST | `/api/reviews` | Moderation via JWT |
| GET | `/api/services` | — |
| POST | `/api/contact` | Rate limited |
| POST | `/api/upload` | JWT |
| GET | `/api/settings/public` | — |
| GET | `/api/stats/dashboard` | JWT |

## Integrations

- **Bitrix24** — set `BITRIX24_WEBHOOK_URL` for lead creation on form submit
- **Nodemailer** — set SMTP variables for email notifications
- **reCAPTCHA** — optional `RECAPTCHA_SECRET_KEY` / `RECAPTCHA_SITE_KEY`

## Features

- Corporate pages: Home, Services (МойСклад, Битрикс24, Телефония), Cases, Reviews, About, Contacts
- Dark mode, animations, SEO (meta, OpenGraph, sitemap, robots)
- Admin: CRUD cases/reviews/services, banners, settings, contact requests
- JWT auth, file uploads, rate limiting, Helmet security

## License

Proprietary — TB Group
