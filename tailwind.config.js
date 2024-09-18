/** @type {import('tailwindcss').Config} */
export default {
  content: ["./public/**/*.{html,js}"],
  safelist: [
    'btn',
    'bg-white',
    'bg-pink',
    'bg-green',
    'bg-blue',
    'bg-purp',
    'w-[50px]',
    'h-[50px]',
    'm-0',
    'border-black',
    'border-2',
    'text-pink',
    'text-green',
    'text-blue',
    'text-purp',
  ],
  theme: {
    colors: {
      pink: "#ff71ce",
      blue: "#01cdfe",
      green: "#05ffa1",
      purp: "#b967ff",
      white: "#FFFFFF",
      black: "#000000"
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

