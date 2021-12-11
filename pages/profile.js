import Link from 'next/link';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
const profile = ({data}) => {
    const router = useRouter();

    const handleDelete = async(id)=>{
        const res = await fetch(`http://localhost:3000/api/books/${id}`, {
            method: 'DELETE',
          });
        router.push('/profile');
    }
    return (
        <div className = "flex flex-wrap p-24">
                {
                    data.map((book)=>{
                    return (
                        <div key = {book._id} className="p-5 shadow-lg w-48">
                            <div className= "flex flex-col">
                                <p className="break-words">Title : {book.title}</p>
                                <p>Author : {book.author}</p>
                                <p>Price : {book.price}</p>
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
    const res = await fetch(`http://localhost:3000/api/books/profile?userMail=${session.user.email}`);
   
    const {data} = await res.json()
    return { props: { data } }
  }



export default profile
