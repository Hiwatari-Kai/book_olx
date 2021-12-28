import connectDB from '../../../utils/dbConnect';
import Book from '../../../models/Book';
import NextCors from 'nextjs-cors';


const handler = async (req, res) => {
    
    await NextCors(req, res, {
        // Options
        methods: ['GET','POST', 'HEAD', 'PUT', 'PATCH', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
     });
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