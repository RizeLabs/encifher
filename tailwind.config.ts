import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "nav-grad": "rgba(255, 255, 255, 0.12)"
      },
      backgroundImage: {
        "grad-blue": "radial-gradient(63.59% 96.74% at 50.31% 100%, #7C3AED 0%, rgba(124, 58, 237, 0.40) 46.3%, rgba(124, 58, 237, 0.08) 100%)",
        "grad-blue-hover": "radial-gradient(63.59% 96.74% at 50.31% 100%, #7C3AED 0%, rgba(124, 58, 237, 0.60) 46.3%, rgba(124, 58, 237, 0.40) 100%)",
      }
    },
  },
  plugins: [],
} satisfies Config;
