# Insyd Frontend

A notification system for architecture professionals built with Next.js.

## Features

- Real-time activity tracking and notifications
- User interaction simulation (follow, post, comment)
- Clean and responsive UI with dark mode support
- Built with modern React patterns and best practices

## Tech Stack

- Next.js 13.5
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Lucide React icons

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/                 # Next.js app directory
│   ├── notifications/   # Notifications page
│   ├── trigger/        # Activity trigger page
│   └── layout.tsx      # Root layout
├── components/         # React components
│   ├── ui/            # UI components
│   └── ...            # Feature components
└── lib/               # Utilities and API
```

## API Integration

The frontend communicates with the backend through:
- POST `/api/activity` - Trigger new activities
- GET `/api/notifications/:userId` - Fetch user notifications

## Environment Variables

Create a `.env.local` file with:
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```
