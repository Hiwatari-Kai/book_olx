import connectDB from '../../../utils/dbConnect';
import Book from '../../../models/Book';
import Cors from 'cors'

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD','POST'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}



const handler = async (req, res) => {
    await runMiddleware(req, res, cors)
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