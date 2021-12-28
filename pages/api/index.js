import connectDB from '../../utils/dbConnect';
import Book from '../../models/Book';
export default async (req, res) => {
    const { method } = req;
  
    // This will allow OPTIONS request
    if (method === "OPTIONS") {
      return res.status(200).send("ok");
    }
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

  };
}

export default connectDB(handler)