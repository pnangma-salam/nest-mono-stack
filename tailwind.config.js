/** @type {import('tailwindcss').Config} */
import { createThemes } from 'tw-colors';
import { themes } from './src/themes';
import defaultTheme from 'tailwindcss/defaultTheme';

module.exports = {
  prefix: 'tw-',
  content: ['./src/**/*.{ts,tsx,js,jsx}', './views/**/*.{njk,html}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-heading)', ...defaultTheme.fontFamily.sans],
        body: ['var(--font-body)', ...defaultTheme.fontFamily.mono],
      },
      borderRadius: {
        none: 'var(--radius-none)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
      },
      fontSize: {
        title: 'var(--fs-title)',
        subtitle: 'var(--fs-subtitle)',
        body: 'var(--fs-body)',
      },
      screens: {
        mobile: 'var(--breakpoint-mobile)',
        tablet: 'var(--breakpoint-tablet)',
        laptop: 'var(--breakpoint-laptop)',
        desktop: 'var(--breakpoint-desktop)',
        tv: 'var(--breakpoint-tv)',
      },
    },
  },
  plugins: [
    import('tailwindcss-animate'),
    createThemes(themes, {
      produceCssVariable: (colorName) => `--prefix-${colorName}`,
      defaultTheme: 'light',
    }),
  ],
};
