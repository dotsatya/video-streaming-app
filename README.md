# Video Streaming DB

A full‑stack **Next.js 13** (App Router) application that powers a video streaming platform backed by MongoDB. Users can register or log in (email/password or Google OAuth), upload videos via ImageKit, browse and stream content, and manage their media from a dashboard.

**🔗 Demo:** [https://dotstreamingapp.vercel.app](https://dotstreamingapp.vercel.app)

---

## 🧩 Features

- User authentication with [NextAuth](https://next-auth.js.org/) (Google and credentials)
- MongoDB database connection using Mongoose
- File upload & storage with [ImageKit](https://imagekit.io/) (supports images & videos)
- Custom dashboard for uploading and viewing videos
- Responsive UI built with Tailwind CSS and Radix-based components
- Serverless API routes (`/api/video`, `/api/auth`, `/api/file-delete`)
- JWT sessions with secure cookies
- Automated environment caching for database connections

## 🛠️ Tech Stack

| Layer | Libraries / Services |
|-------|---------------------|
| Framework | Next.js 13 (app router) |
| Styling | Tailwind CSS \\ class-variance-authority |
| Authentication | next-auth (Google, Credentials) |
| Database | MongoDB (via mongoose) |
| File Storage | ImageKit (upload auth token) |
| Forms & Validation | react-hook-form, zod, @hookform/resolvers |
| HTTP Client | axios |
| Icons | lucide-react |
| Notifications | sonner (toast) |

## 📁 Architecture Overview

- `app/` – pages and layouts (dashboard, login, signup, etc.)
- `app/components` – shared React components (`FileUpload`, providers)
- `app/api` – route handlers for authentication, videos, file deletion, imageKit auth
- `components/` – UI primitives (buttons, cards, sidebar) using Radix & Tailwind
- `lib/` – helpers (`db.ts`, `authOptions.ts`)
- `models/` – Mongoose schemas (`User.ts`, `Video.ts`)

## 🚀 Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/yourusername/video-streaming-db.git
   cd video-streaming-db
   ```

2. **Install dependencies**
   ```bash
   npm install   # or yarn / pnpm
   ```

3. **Set environment variables** – create a `.env.local` (example below).

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000` in your browser.

## 📦 Environment Variables

```env
NEXTAUTH_SECRET=...              # random string for JWT encryption
GOOGLE_CLIENT_ID=...             # Google OAuth client ID
GOOGLE_CLIENT_SECRET=...         # Google OAuth secret
MONGODB_URI=mongodb+srv://...    # MongoDB connection string
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=...
IMAGEKIT_PRIVATE_KEY=...
NEXT_PUBLIC_URL_ENDPOINT=...     # e.g. https://ik.imagekit.io/<yourid>
``` 

> The code checks for `MONGODB_URI` on startup and will crash if missing.

## 🎯 Usage

- **Register** (email/password or Google) at `/signup`
- **Log in** at `/login`
- **Dashboard** (protected by middleware) provides links to:
  - `/dashboard/upload` – upload a new video/image
  - `/dashboard/all-videos` – browse all uploaded videos
  - `/dashboard/account` – (unimplemented placeholder)
- **Uploading** uses a client component that obtains short‑lived ImageKit auth tokens via `/api/auth/imageKit-auth`; the file is then POSTed to ImageKit and metadata saved in MongoDB via `/api/video`.
- **Video listing** fetches from `/api/video` and renders `<video>` tags with thumbnails.

## 🔗 API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/auth/register` | create a new user (name, email, password)
| `GET`  | `/api/auth/imageKit-auth` | return ImageKit upload token
| `GET`  | `/api/video` | list videos (public)
| `POST` | `/api/video` | create a video record (authenticated)
| `DELETE` | `/api/file-delete` | remove a file from ImageKit (authenticated)

Authentication for `/api/video` POST uses `getServerSession(authOptions)`.

## 📦 Deployment

The app is structured for deployment to Vercel (or any Node.js host). Environment variables should be configured in the hosting dashboard. The demo runs at:

👉 [https://dotstreamingapp.vercel.app](https://dotstreamingapp.vercel.app)

## 📝 Notes

- Mongo connection caching adapts to development hot‑reloading via a global cache.
- Passwords are hashed using `bcryptjs` inside the credentials provider.
- Video schema includes optional transformations and default dimensions.
- The project uses TypeScript throughout with some custom `next-auth` session typing (`next-auth.d.ts`).

## 📄 License

This project is open–source – feel free to fork and extend!

---

Happy streaming! 🎬

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
