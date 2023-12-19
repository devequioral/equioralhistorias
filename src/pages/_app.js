import '@/styles/grid.css';
import '@/styles/globals.css';

import { Montserrat } from 'next/font/google';
import { Roboto } from 'next/font/google';

const primary_font = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const secondary_font = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        :root {
          --color-white: #fafbff;
          --color-black: #141519;
          --color-gray: #e0e0e3;

          --theme-dark-color-primary: #ac89f8;
          --theme-dark-color-secondary: #dc9c9c;

          --theme-light-color-primary: #2a2e66;
          --theme-light-color-secondary: #9bacbf;

          --primary-font: ${primary_font.style.fontFamily};
          --secondary-font: ${secondary_font.style.fontFamily};
        }
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
