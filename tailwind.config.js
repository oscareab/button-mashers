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
    'bg-darkpink',
    'bg-darkgreen',
    'bg-darkblue',
    'bg-darkpurp',
    'hover:bg-darkpink',
    'hover:bg-darkgreen',
    'hover:bg-darkblue',
    'hover:bg-darkpurp',
    'w-[50px]',
    'h-[50px]',
    'm-0',
    'border-black',
    'border-2',
    'text-pink',
    'text-green',
    'text-blue',
    'text-purp',
    'btn-disabled',
    'no-animation',
  ],
  theme: {
    colors: {
      pink: "#ff71ce",
      darkpink: "#8b2f5a", // Darker shade
      blue: "#01cdfe",
      darkblue: "#014d6e", // Darker shade
      green: "#05ffa1",
      darkgreen: "#026b46", // Darker shade
      purp: "#b967ff",
      darkpurp: "#4a2766", // Darker shade
      white: "#FFFFFF",
      black: "#000000"
    },
  },
  darkMode: false,
  plugins: [
    require('daisyui'),
  ],
}

