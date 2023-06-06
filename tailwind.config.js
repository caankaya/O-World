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
    themes: ['night'], // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    base: false, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  },
};

/* Palette de couleur du theme "night" de daisyUI :
primary : #3abff8
primary-focus : #18b4f7
primary-content : #182730
secondary : #828df8
secondary-focus : #606ff6
secondary-content : #1e1e2f
accent : #f471b5
accent-focus : #f250a3
accent-content : #301c26
neutral : #1d282a
neutral-focus : #273449
neutral-content : #ced0d4
base-100 : #0f1729
base-200 : #05080f
base-300 : #000000
base-content : #c8cad0
info : #0ca6e9
info-content: #daecfb
success : #2bd4bd
success-content : #172b28
warning : #f4c152
warning-content : #312817
error : #fb6f84
error-content : #311c1e */
