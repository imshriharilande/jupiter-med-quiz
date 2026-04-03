import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'JupiterMed Quiz | Advanced Medical Learning Platform',
  description: 'The ultimate ecosystem for MBBS students and NEET PG aspirants.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
