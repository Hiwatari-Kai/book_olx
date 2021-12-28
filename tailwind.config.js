module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors :{
        "searchGreen" : "#0EE2B2",
      },
      backgroundImage :{
        'landingImage' : "url('/StaticImages/bg-imageS.png')",
        'cardImage' : "url('/StaticImages/cardBgImage.png')",
        'landingImage2' : "url('/StaticImages/bg-image2.png')",
        'detailsImage' : "url('/StaticImages/detailsImageS.png')",
      }
    },
    fontFamily:{
      "poppins" : ['Poppins','sans-serif'], 
      "roboto" : ['Roboto','sans-serif'],
      "footer" : ['Manrope','sans-serif'],
    },
    
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
