import Link from 'next/link';



const BookList =  ({data}) => {

    const stringShort = (x)=>{
        if(x.length<=21)
            return x;
        return x.substr(0,19) + "..";
    }
    return (
        <div className="pl-20 pr-20 pt-10">
        
            <div className = "flex flex-wrap space-x-3">
                {
                    data.map((book)=>{
                    return (
                        <Link href = {`/${book._id}/view`} key = {book._id} >
                            <div className="p-4 shadow-lg w-52 cursor-pointer bg-indigo-200 rounded-md">
                                <div className= "flex flex-col items-center ">
                                    <p className ="text-lg text-blue-900 font-bold">{stringShort(book.title)}</p>
                                    <p className="text-sm font-semibold italic">{stringShort(book.author)}</p>
                                    <p className="text-lg font-semibold"><span>&#8377;</span>{book.price}</p>
                                </div>
                            </div>
                        </Link>
                        
                        )
                    })
                }
            </div>
        </div>
    )
}


export default BookList
