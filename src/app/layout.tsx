import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Fustat, Inter } from 'next/font/google';

const fustat = Fustat({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-fustat',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'JupiterMed Quiz | Master Your Medical Career',
  description: 'The ultimate learning ecosystem for MBBS students and NEET PG aspirants.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fustat.variable} ${inter.variable}`}>
      <body style={{ margin: 0, padding: 0 }}>
        <AuthProvider>
          <ThemeProvider>
            <main>{children}</main>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
