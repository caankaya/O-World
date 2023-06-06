/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('daisyui')],

  // daisyUI config (optional - here are the default values)
  daisyui: {
    themes: ["light", "night"], // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: 'night', // name of one of the included themes for dark mode
    base: false, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  },
};

/* Palette de couleur du theme "night" de daisyUI :
primary : #7f5af0
primary-focus : #5433FF
primary-content : #ffffff
secondary : #f4976c
secondary-focus : #fb743e
secondary-content : #ffffff
accent : #37cdbe
accent-focus : #2aa79b
accent-content : #ffffff
neutral : #3a3f4b
neutral-focus : #28292d
neutral-content : #a9a9a9
base-100 : #ffffff
base-200 : #f9fafb
base-300 : #d1d5db
base-content : #1f2937
info : #2094f3
success : #009485
warning : #ff9900
error : #ff5724 */