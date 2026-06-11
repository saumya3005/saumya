import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Saumya Agrahari | SDE & AI/ML Engineer',
  description: 'Portfolio of Saumya Agrahari, final-year B.Tech AI/ML student, and 3x hackathon winner.',
  keywords: [
    'Saumya Agrahari',
    'AI Engineer',
    'ML Engineer',
    'Software Developer',
    'Full Stack Developer',

    'Python developer',
    'Next.js portfolio',
    'UHack winner',
  ],
  authors: [{ name: 'Saumya Agrahari' }],
  openGraph: {
    title: 'Saumya Agrahari | SDE & AI/ML Engineer',
    description: 'Portfolio of Saumya Agrahari, final-year B.Tech AI/ML student, and 3x hackathon winner.',
    url: 'https://saumyaagrahari.dev', // placeholder
    siteName: 'Saumya Agrahari Portfolio',
    images: [
      {
        url: 'https://i.postimg.cc/zGqh8fwk/IMG-20260608-WA0015.jpg',
        width: 1200,
        height: 630,
        alt: 'Saumya Agrahari Portfolio Portrait',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saumya Agrahari | SDE & AI/ML Engineer',
    description: 'Portfolio of Saumya Agrahari, final-year B.Tech AI/ML student, and 3x hackathon winner.',
    images: ['https://i.postimg.cc/zGqh8fwk/IMG-20260608-WA0015.jpg'],
  },
};

import SmoothScrolling from '@/components/SmoothScrolling';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-zinc-950 text-white selection:bg-yellow-500/30 selection:text-white">
        <SmoothScrolling>
          {children}
        </SmoothScrolling>
      </body>
    </html>
  );
}
