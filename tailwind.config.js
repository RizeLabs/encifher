/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
    container: false,
  },
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./src/**/*.{jsx,tsx,html}"],
  theme: {
    extend: {
      fontFamily: {
        'menseal': ["'Menseal'", 'sans-serif'], // Adding 'Menseal' font family
        'sora': ["'Sora'", 'sans-serif']
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        marquee: 'marquee 10s linear infinite',
      },
      borderRadius: {
        sm: "4px",
      },
      screens: {
        sm: "410px",
        mid: "450px",
        md: "768px",
        lg: "997px",
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(-45deg, rgba(120,87,255,1) 0%, rgba(87,46,255,1) 36%, rgba(80,36,255,1) 72%, rgba(120,87,255,1) 100%);',
      },
      colors: {
        'footer-bg': 'var(--footer-bg)',
        'primary-dark': 'var(--primary-dark)',
        'secondary-dark': 'var(--secondary-dark)',
        'primary-brand': 'var(--primary-brand)',
      },
    },
  },
  plugins: [],
};