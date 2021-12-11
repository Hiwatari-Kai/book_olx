const mongoose =  require('mongoose');

const bookSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true,'Please add a title.'],
        trim : true,
        maxlength :[50,'Title can not be more than 50 characters.']
    },
    author : {
        type : String,
        required  :[true,'Please add a title.'],
        trim : true,
        maxlength : [50,'Title can not be more than 50 characters.']
    },
    price :{
        type : Number,
        required : [true,'Please add a price.']
    } ,
    userMail : {
        type : String
    }
})

mongoose.models = {}
const book = mongoose.model('Book',bookSchema)

export default book
