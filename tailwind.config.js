/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        destaqueAcao: '#9BC4A7',
        fundoPrimario: '#B7D9E7',
        fundoSecundario: '#F7F7F0',
        alerta: '#FDD280',
        textoEscuro: '#3C3F6E',
        graficos: '#C7BFE5'
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}