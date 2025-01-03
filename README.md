# Todo App

A simple todo application built with [Next.js](https://nextjs.org/), [tRPC](https://trpc.io/), and [Drizzle](https://orm.drizzle.team/).

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create, read, update, and delete todo items
- Full-stack type safety using tRPC
- Database interactions handled by Drizzle
- Server-side rendering and API routes using Next.js

## Prerequisites

- Node.js (v20 or higher recommended)
- npm or pnpm
- A PostgreSQL database (Neon, Prisma, Supabase, Docker, etc.)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/v3ceban/todo.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd todo
   ```
3. **Install dependencies:**

   ```bash
   # Using npm
   npm install

   # or using pnpm
   pnpm install
   ```

## Project Structure

Below is a simplified overview of the `src` directory structure:

```
./src/
├── app/                # Next.js app directory (pages, API routes, etc.)
├── components/         # Reusable React components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── server/             # Server-side code (tRPC, database, authentication, server actions)
├── styles/             # Global styling
├── trpc/               # tRPC API definitions
└── ...
```

## Usage

1. **Start the development server:**

   ```bash
   # Using npm
   npm run dev

   # Using pnpm
   pnpm run dev
   ```

2. **Open the app in the browser** at [http://localhost:3000](http://localhost:3000).

3. **Create Todo Items**: Use the UI to authenticate and view/add/edit/remove your todo tasks.

## Environment Variables

Create a file named `.env` or `.env.local` in the root directory and add required environment variables. For example:

```bash
AUTH_SECRET="secret"
AUTH_GOOGLE_ID="google_id"
AUTH_GOOGLE_SECRET="google_secret"
DATABASE_URL=postgresql://user:password@localhost:5432/database_name
```

You can find required environment variables in `.env.example`.

## Deployment

1. **Build the application for production:**

   ```bash
   # Using npm
   npm run build

   # Using pnpm
   pnpm run build
   ```

2. **Start the production server:**

   ```bash
   # Using npm
   npm run start

   # Using pnpm
   pnpm run start
   ```

3. **Deploy on your preferred platform** (e.g., Vercel, AWS, or Docker). Make sure to set your environment variables accordingly on the hosting service.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
