import connectDB from '../../../utils/dbConnect';
import Book from '../../../models/Book';

const handler = async (req, res) => {
    
    const {method} = req;
    
    switch(method){
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