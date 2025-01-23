# Albumly

Albumly is a modern photo album sharing application built with Next.js and Tailwind CSS. Create beautiful photo albums and share them with friends and family using unique links.

## Features

- Create photo albums with names and descriptions
- Upload multiple photos with drag-and-drop support
- Preview albums before saving
- Share albums via unique links
- Responsive design for all devices
- Modern, minimalistic UI with smooth animations

## Tech Stack

- Next.js 13 (App Router)
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- react-dropzone (File Upload)
- shadcn/ui (UI Components)

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
albumly/
├── app/                    # Next.js app router pages
├── components/            # Reusable React components
├── lib/                   # Utilities and store
└── public/               # Static assets
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

The application is configured for deployment on Vercel. Simply push to your repository and Vercel will automatically deploy your changes.

## License

MIT