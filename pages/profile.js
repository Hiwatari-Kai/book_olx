import Link from 'next/link';
import { getSession} from 'next-auth/react';
import { useRouter } from 'next/router';
const profile = ({data}) => {

    const stringShort = (x)=>{
        if(x.length<=21)
            return x;
        return x.substr(0,19) + "..";
    }

    const router = useRouter();
    const handleDelete = async(id)=>{
        const res = await fetch(`http://localhost:3000/api/books/${id}`, {
            method: 'DELETE',
          });
        router.push('/profile');
    }
    return (
        <div className = "flex flex-wrap p-24 space-x-3">
                {
                    data.map((book)=>{
                    return (
                        <div key = {book._id} className="p-4 shadow-lg w-52 bg-indigo-200 rounded-md">
                            <div className= "flex flex-col items-center">
                                <p className ="text-lg text-blue-900 font-bold">{stringShort(book.title)}</p>
                                <p className="text-md font-semibold italic">{stringShort(book.author)}</p>
                                <p className="text-lg font-semibold"><span>&#8377;</span>{book.price}</p>
                                <div className='flex'>
                                <Link href = {`/${book._id}/edit`}>
                                    <button className="border-solid border-2 bg-blue-600 py-auto px-auto rounded-lg text-white text-md w-16 h-8">Edit</button>
                                </Link>
                                <button onClick = {()=>handleDelete(book._id)}className="border-solid border-2 bg-blue-600 py-auto px-auto rounded-lg text-white text-md w-16 h-8">Delete</button> 
                                </div>
                            </div>
                        </div>
                        
                        )
                    })
                }
            </div>
    )
}

export async function getServerSideProps(context) {
    
    const session = await getSession(context);
    if(!session)
    {
        return {
            redirect: {
            destination: '/',
            permanent: false,
            },
        }
    }
  
    const res = await fetch(`http://localhost:3000/api/books/profile?userMail=${session.user.email}`);
   
    const {data} = await res.json()
    return { props: { data } }
  }



export default profile
