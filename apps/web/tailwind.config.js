/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        default: "var(--vms-bg)",
        subtle: "var(--vms-bg-subtle)",
        success: "var(--vms-bg-success)",
        muted: "var(--vms-border-muted)",
        inverted: "var(--vms-bg-inverted)",
        emphasis: "var(--vms-bg-emphasis)",
        light: "var(--vms-brand-muted-light)",
        error: "var( --vms-bg-dark-error)",

        brand: {
          default: "var(--vms-brand, #FFBE0A)",
          emphasis: "var(--vms-brand-emphasis,#fff)",
          light: "var(--vms-brand-light, #ED1C24)",
          muted: "var(--vms-brand-muted)",
          accent: "var(--vms-brand-accent, #fff)",
          sidebar: "var(--vms-brand-sidebar, #fff)",
          subtle: "var(--vms-brand-subtle, #fde8e9)",
          black: "var(--buff-bg-black)",
        },
      },

      backgroundImage: {
        hero: "url('/images/hero.png')",
      },

      borderColor: {
        error: "var(--vms-border-error)",
        success: "var(--vms-bg-success)",
        default: "var(--vms-border)",
        muted: "var(--vms-border-muted)",
        focus: "var(--vms-border-focus)",
        brand: "var(--vms-brand)",
      },

      textColor: {
        default: "var(--buff-text)",
        success: "--var(--vms-text-success)",
        error: "var(--vms-text-error)",
        brand: "var(--vms-brand-text)",
        muted: "var(--vms-text-muted)",
        subtle: "var(--vms-text-subtle)",
        solid: "var(--vms-brand-solid-text)",
      },

      fontFamily: {
        sans: ["var(--font-buff)", "Helvetica Neue", "sans-serif"],
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
