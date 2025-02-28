/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Scan tous les fichiers dans /src
  ],
  theme: {
    extend: {
      colors: {
        background: "#F0F1FF",
        button: "#860000",
        cardGrey: "#C4C4C4",
        textGrey: "#AFAFAF",
      },
      screens: {
        xs: { min: "0px", max: "400px" },
        downXs: { max: "400px" },

        sm: { min: "400px", max: "767px" },
        upSm: { min: "400px" },
        downSm: { max: "767px" },

        md: { min: "768px", max: "1023px" },
        upMd: { min: "768px" },
        downMd: { max: "1023px" },

        lg: { min: "1024px", max: "1279px" },
        upLg: { min: "1024px" },
        downLg: { max: "1279px" },

        xl: { min: "1280px", max: "1400px" },
        upXl: { min: "1280px" },
        downXl: { max: "1400px" },

        "2xl": { min: "1401px", max: "1500px" },
        up2Xl: { min: "1401px" },
        down2Xl: { max: "1500px" },

        "3xl": { min: "1501px", max: "1600px" },
        up3xl: { min: "1501px" },
        down3Xl: { max: "1600px" },

        "4xl": { min: "1601px", max: "1800px" },
        up4xl: { min: "1601px" },
        down4xl: { max: "1800px" },

        "5xl": { min: "1801px", max: "2000px" },
        up5xl: { min: "1801px" },
        down5xl: { max: "2000px" },

        "6xl": { min: "2000px" },
      },
    },
  },
  plugins: [],
};
