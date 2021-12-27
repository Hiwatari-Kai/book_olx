module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors :{
        "searchGreen" : "#0EE2B2",
      },
      backgroundImage :{
        'landingImage' : "url('/StaticImages/bg-image.png')",
        'cardImage' : "url('/StaticImages/cardBgImage.png')",
        'landingImage2' : "url('/StaticImages/bg-image2.png')",
        'detailsImage' : "url('/StaticImages/detailsImage.png')",
        'bookImage' : "url('http://res.cloudinary.com/kai21/image/upload/v1640421750/vdqlskyzjcnd2l2vcacw.jpg')",
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
