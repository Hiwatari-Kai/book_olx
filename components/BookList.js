import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession} from "next-auth/react"

const BookList =  ({data}) => {

    const router  = useRouter();
    const { data: session } = useSession();
    
    

   
    return (
        <div className="p-20">
        {session && 
            <Link href= "/book_input">
                <button className="border-solid border-2 bg-blue-600 py-auto px-auto  rounded-lg text-white text-lg w-24 h-12">Add</button>
            </Link>
        }
            <div className = "flex flex-wrap mt-10 ">
                {
                    data.map((book)=>{
                    return (
                        <div key = {book._id} className="p-5 shadow-lg w-48">
                            <div className= "flex flex-col">
                                <p className="break-words">Title : {book.title}</p>
                                <p>Author : {book.author}</p>
                                <p>Price : {book.price}</p>
                            </div>
                        </div>
                        
                        )
                    })
                }
            </div>
        </div>
    )
}


export default BookList
