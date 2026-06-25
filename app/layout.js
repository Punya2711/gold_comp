import './globals.css';
import { Toaster } from 'sonner';

export const metadata = {
  title: 'Rayaru Gold Buying Company | Your Gold, Our Promise',
  description:
    'Sell your gold with confidence at Rayaru Gold Buying Company in Bangalore. Transparent evaluation, instant payment, best market price. 5+ years of trusted service.',
  keywords:
    'gold buying, sell gold Bangalore, gold price today, gold evaluation, Rayaru gold, Kumaraswamy Layout, instant cash for gold',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
