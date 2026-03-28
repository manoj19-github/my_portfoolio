import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Manoj Santra | MERN Stack Developer Portfolio',
  description:
    'Full Stack Developer specializing in scalable web & mobile applications with 4 years of professional experience. Expert in React, Node.js, Flutter, and React Native.',
  keywords: [
    'MERN Stack Developer',
    'Full Stack Developer',
    'React Developer',
    'Node.js Developer',
    'Mobile App Developer',
    'Manoj Santra',
  ],
  authors: [{ name: 'Manoj Santra' }],
  openGraph: {
    title: 'Manoj Santra | MERN Stack Developer',
    description:
      'Full Stack Developer specializing in scalable web & mobile applications',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
