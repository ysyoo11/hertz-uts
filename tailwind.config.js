module.exports = {
  content: ['./src/pages/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        hertz: '#FFCC01',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
