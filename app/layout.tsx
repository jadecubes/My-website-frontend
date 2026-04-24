import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import { ThemeProvider } from '@/context/ThemeContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ethos Studio — Professional Graphic Design',
  description: 'Professional graphic design — posters, banners, infographics, and product visuals made with intention.',
  openGraph: {
    title: 'Ethos Studio — Professional Graphic Design',
    description: 'Professional graphic design — posters, banners, infographics, and product visuals.',
    type: 'website',
  },
};

// Runs synchronously in <head> before React mounts, so the correct
// `dark` class is on <html> before first paint. Prevents FOUC (flash of
// light theme while JS boots). Static string — safe to inject.
const themeInitScript = `
(function(){try{
  var s=localStorage.getItem('theme');
  var t=s||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
  if(t==='dark')document.documentElement.classList.add('dark');
}catch(e){}})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ThemeProvider>
          <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
