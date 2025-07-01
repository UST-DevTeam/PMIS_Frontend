/** @type {import('tailwindcss').Config} */
export default {
  content:["./src/**/*.{js,jsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors:{
        "primaryLine":"var(--mainprimary)",
        "secLine":"var(--mainsec)",
        "heading":"var(--mainsec2)",
        "topbarLine":"var(--topbar)",
        "txt-primary":"#0000ff",
        "bg-primary":"#87CEEB",
        "pcol":"#13b497",
        "pcolhover":"#FFAB2D",
        "darkBg":"#363636",
        "lightBg":"#ffffff",
        "bg-brown": "#6C6C6C",
        "med-gray": "#D0D0D0",
        "bg-brown2": "#404040",
        "txt-neavy":"#001F3F",
        "onHoverButton":"#ffab2d"
        // "topbarLine":"#6102af",
      },
      fontFamily: {
        sans: ['Libre Baskerville', 'sans-serif'],
        // poppins: 'Poppins',
        oxygen:'Oxygen'
      },
      
      backgroundImage: {
        'login': "url('/login_background.jpg')",
        'sideimage': "url('6780.png')",
        'regsideimage': "url('/bg_reg_side.png')",
        "primaryLine":"var(--mainprimary)",
        "oppprimaryLine":"var(--oppmainprimary)",
        "businesssideimage":"url('/Business Registration.png')",
        "setuppassword":"url('/SET UP PASSWORD.png)"
        
        
        // "topbarLine":"var(--topbar)",
        
      },

      backgroundSize:{
        sideimage:"100%"
      },



      textColor:{
        "darkBg":"#ffffff",
        "pcol":"#13b497",
        "pcolhover":"#FFAB2D",
      },
      backgroundColor:{
        'pbutton':"var(--mainsec)",
        'neavycolor':"#00ac25",
        "pcol":"#13b497",
        "pcolhover":"#FFAB2D",
        
      },
      borderColor:{
        'pbutton':"var(--mainsec)",
        "primaryLine":"var(--mainprimary)",
      },
      stroke:{
        'scolor':"var(--mainsec)",
        
        "pcolor":"var(--mainprimary)",
      }
    },
  },
  plugins: [],
}

