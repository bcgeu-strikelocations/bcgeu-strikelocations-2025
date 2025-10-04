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
        bcgeu: {
          blue: {
            50: '#f0f7ff',   // Used for backgrounds
            100: '#e0efff',  // Used for separators
            200: '#b9ddff',  // Used for borders
            600: '#0065a4',  // Primary blue
            700: '#005085',  // Used for text
            800: '#004066',  // Used for borders
          },
          gold: {
            600: '#ffd700',  // Gold - used for flags and postal search
          },
          red: {
            600: '#db1e2a',  // Strike red - used in button variants
          },
        },
        // Location type colors
        location: {
          cannabis: '#059669',  // emerald-600 - cannabis stores
          office: '#374151',    // gray-700 - offices  
          warehouse: '#92400e', // amber-800 - warehouses
          cvse: '#ea580c',      // orange-600 - CVSE
          liquor: '#dc2626',    // red-600 - liquor stores
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
