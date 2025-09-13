import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'], // Add "Oswald" font
        spaceGrotesk: ['Space Grotesk', 'sans-serif'], // Custom font
        inter: ["Inter", "sans-serif"], // Add Inter font
      },
      boxShadow: {
        'sticky': '0px 0px 15px rgba(0, 0, 0, 0.17)',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'primary-green': '#60a008',
        customGreen: '#60a008',
        transparentText: 'transparent',
        customBlue: "rgba(54, 93, 192, 0.9)", // Add custom blue for background
      },
      spacing: {
        'gutter-x': '1.5rem', // Custom gutter-x value
      },
      zIndex: {
        200: '200',
      },
    },
  },
  plugins: [],
} satisfies Config;
