import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // BCGEU Brand Colors
        bcgeu: {
          blue: {
            50: '#f0f7ff',
            100: '#e0efff',
            200: '#b9ddff',
            300: '#7cc2ff',
            400: '#36a3ff',
            500: '#0a87ff',
            600: '#0065a4', // Primary blue
            700: '#005085',
            800: '#004066',
            900: '#00354d',
          },
          gold: {
            50: '#fdfcf7',
            100: '#faf8ed',
            200: '#f5f0d6',
            300: '#ede4b8',
            400: '#e2d494',
            500: '#d4c26a',
            600: '#b8a967', // Primary gold
            700: '#9a8f4f',
            800: '#7d7440',
            900: '#665e35',
          },
          red: {
            50: '#fef2f2',
            100: '#fee2e2',
            200: '#fecaca',
            300: '#fca5a5',
            400: '#f87171',
            500: '#ef4444',
            600: '#db1e2a', // Strike red
            700: '#b91c1c',
            800: '#991b1b',
            900: '#7f1d1d',
          },
          orange: {
            50: '#fff7ed',
            100: '#ffedd5',
            200: '#fed7aa',
            300: '#fdba74',
            400: '#fb923c',
            500: '#f97316',
            600: '#ff7800', // No picket orange
            700: '#ea580c',
            800: '#c2410c',
            900: '#9a3412',
          },
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
