import connectDB from '../../../utils/dbConnect';
import Book from '../../../models/Book';
import router from 'next/router';
import NextCors from 'nextjs-cors';


const handler = async (req, res) => {
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
     });
    
    const {method} = req;
    const term = `${req.query.term}`;
    const nTerm = new RegExp(term, 'i');
    
    switch(method){
        case 'GET':
            try {
                //console.log("try");
                const books = await Book.find({ title : { $regex: nTerm } });
               
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