import connectDB from '../../../utils/dbConnect';
import Book from '../../../models/Book';


const handler = async (req, res) => {
    
    const {method} = req;
    
    
    switch(method){
        case 'GET':
            try {
                //console.log("try");
                const books = await Book.find({userMail : req.query.userMail});
               
                res.status(200).json({success :true , data :books});
            } catch (error) {
                res.status(400).json({success :false});
            }
            res.end();
            break;  
        default:
            res.status(400).json({success :false});
            break;

          
    }
   

        

}



export default connectDB(handler)