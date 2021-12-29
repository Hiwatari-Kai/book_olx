import Link from 'next/link';
import NotFound from './NotFound';



const BookList =  ({data}) => {

    const stringShort = (x)=>{
        if(x.length<=16)
            return x;
        return x.substr(0,14) + "..";
    }
    return (
        <div className="pl-20 pr-20 pt-4 pb-5">
            {data.length===0 && <NotFound message="No books are available currently. Come back latter."></NotFound>}
            <div className = "grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 p-3">
                {
                    
                    data.map((book)=>{
                    return (
                        <Link href = {`/${book._id}/view`} key = {book._id} >
                            <div className="hover:shadow-2xl bg-cardImage w-52 h-60 cursor-pointer bg-cover bg-searchGreen opacity-90 rounded-3xl flex flex-col justify-content-end">
                                <img className="w-12 h-12 mb-20 ml-6 opacity-70" src="/StaticImages/cardIcon.svg"/>
                                <div className= "flex flex-col h-24 rounded-3xl bg-gradient-to-t from-black pl-6 pt-2">
                                    
                                    <p className ="text-xl font-roboto text-white font-bold">{stringShort(book.title)}</p>
                                    <p className="text-sm font-roboto text-gray-300 font-semibold">{stringShort(book.author)}</p>
                                    <p className="text-lg font-roboto text-gray-200 font-semibold"><span>&#8377;</span> {book.price}</p>
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
