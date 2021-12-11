import connectDB from '../../../utils/dbConnect';
import Book from '../../../models/Book';

const handler = async (req, res) => {
    
    const {method} = req;
    
    switch(method){
        case 'GET':
            try {
                const books = await Book.find({});
                res.status(200).json({success :true , data :books});
            } catch (error) {
                res.status(400).json({success :false});
            }
            break;
        case 'POST':
            try {
                const book = await Book.create(req.body);
                res.status(201).json({success :true , data :book});
            } catch (error) {
                res.status(400).json({success :false});
            }
            break;
        default :
            res.status(400).json({success :false});
            break;
          
    }
   

        

}

export default connectDB(handler)