const mongoose =  require('mongoose');

const bookSchema = new mongoose.Schema({
    title : {
        type : String,
        
        trim : true,
        maxlength :[50,'Title can not be more than 50 characters.']
    },
    author : {
        type : String,
      
        trim : true,
        maxlength : [50,'Title can not be more than 50 characters.']
    },
    price :{
        type : Number,
        
    } ,
    userMail : {
        type : String,
        trim : true
    },
    mail : {
        type : String,
        trim  : true
    },
    name :{
        type : String,
        trim  : true
    },
    phone :{
        type : String,
        trim  : true
    },
    mediaUrl :{
        type : String
    },
    description:{
        type : String
    }

})

mongoose.models = {}
const book = mongoose.model('Book',bookSchema)

export default book
