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
    'hover:bg-pink',
    'hover:bg-green',
    'hover:bg-blue',
    'hover:bg-purp',
    'w-[60px]',
    'w-[50px]',
    'w-[35px]',
    'w-[20px]',
    'h-[60px]',
    'h-[50px]',
    'h-[35px]',
    'h-[20px]',
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

