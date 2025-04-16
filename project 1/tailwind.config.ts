import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Indian food inspired colors
        saffron: {
          50: "#fff8e6",
          100: "#ffefc4",
          200: "#ffe49d",
          300: "#ffd976",
          400: "#ffce4f",
          500: "#ffc328",
          600: "#cc9c20",
          700: "#997518",
          800: "#664e10",
          900: "#332708",
        },
        maroon: {
          50: "#f9e6e6",
          100: "#f0c4c4",
          200: "#e69d9d",
          300: "#dc7676",
          400: "#d24f4f",
          500: "#c82828",
          600: "#a02020",
          700: "#781818",
          800: "#501010",
          900: "#280808",
        },
        cream: {
          50: "#fefdf8",
          100: "#fcf9ed",
          200: "#f9f3dc",
          300: "#f7edcb",
          400: "#f4e7ba",
          500: "#f1e1a9",
          600: "#c1b487",
          700: "#918765",
          800: "#605a44",
          900: "#302d22",
        },
        chili: {
          50: "#fde6e6",
          100: "#fac4c4",
          200: "#f79d9d",
          300: "#f47676",
          400: "#f14f4f",
          500: "#ee2828",
          600: "#be2020",
          700: "#8f1818",
          800: "#5f1010",
          900: "#300808",
        },
        turmeric: {
          50: "#fef9e6",
          100: "#fdf0c4",
          200: "#fbe79d",
          300: "#fade76",
          400: "#f8d54f",
          500: "#f7cc28",
          600: "#c6a320",
          700: "#947a18",
          800: "#635210",
          900: "#312908",
        },
        leaf: {
          50: "#e6f9e6",
          100: "#c4f0c4",
          200: "#9de69d",
          300: "#76dc76",
          400: "#4fd24f",
          500: "#28c828",
          600: "#20a020",
          700: "#187818",
          800: "#105010",
          900: "#082808",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
