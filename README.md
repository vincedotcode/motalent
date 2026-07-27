# MoTalent 💼

**An end-to-end recruitment platform — post vacancies, source candidates, and run hiring from application through to offer.**

> ⚠️ **Demo link check:** `motalent-liart.vercel.app` did not respond when this README was written. Confirm the deployment is up, then add the link back here and in the repo's About section — or remove the stale URL from the repo settings.

---

## What it does

**For employers** — Publish vacancies, manage applicant pipelines, schedule interviews on a built-in calendar, and generate offer documents as PDFs.

**For candidates** — Build a profile, browse and apply to roles, and track application status.

**AI-assisted screening** — OpenAI and Google Generative AI are wired into the server for candidate/vacancy matching and screening support.

**Scheduling** — Interview management on `react-big-calendar`, timezone-aware via `date-fns-tz`.

**Documents** — Offer letters and summaries produced client-side with `jsPDF` and `html2canvas`.

**Notifications** — Transactional email through SendGrid, push and messaging through Firebase.

**Payments** — Stripe for employer plans.

**Installable** — Configured as a PWA via `next-pwa`.

---

## Stack

**Frontend** — Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui on Radix, Zustand for client state, TanStack Table for data grids, React Hook Form + Zod, Framer Motion, Recharts, `react-big-calendar`

**Backend** — Node.js, Express (ESM), MongoDB (Mongoose), JWT + bcrypt, Joi validation, Multer + Cloudinary uploads, `async-mutex` and `p-limit` for concurrency control, Puppeteer + Cheerio for scraping

**AI** — OpenAI and Google Generative AI

**Services** — Firebase (admin SDK + client), SendGrid, Stripe

**Docs** — Swagger at `/api-docs`

---

## Repository layout

```
motalent/
├── client/     # Next.js frontend
└── server/     # Express API
```

---

## Running locally

**Prerequisites:** Node.js 18+, MongoDB, and credentials for Firebase, SendGrid, Stripe and OpenAI.

```bash
git clone https://github.com/vincedotcode/motalent.git
cd motalent
```

**Server**

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

```bash
MONGODB_URI=
JWT_SECRET=
OPENAI_API_KEY=
GOOGLE_API_KEY=
SENDGRID_API_KEY=
STRIPE_SECRET_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
FIREBASE_SERVICE_ACCOUNT=
```

**Client**

```bash
cd ../client
npm install
npm run dev
```

Open `http://localhost:3000`.

```bash
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
```

---

## Implementation notes

The server uses `async-mutex` and `p-limit` around the scraping and AI-screening paths. Both are rate-limited external dependencies, and firing a batch of applications at them concurrently is a reliable way to get throttled — the limiters are there on purpose.

---

## License

MIT — see [LICENSE](LICENSE).

## Contact

Vince Erkadoo — [vincedotcode.com](https://vincedotcode.com) · [vince@vincedotcode.com](mailto:vince@vincedotcode.com)
