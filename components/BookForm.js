import { useRouter } from 'next/router';
import {useSession} from 'next-auth/react'

const bookForm = () => {
    const router = useRouter();
    const {data :session} = useSession();
    const handleSubmit = async(event)=>{
        event.preventDefault();
        const Title = event.target.title.value;
        const Author = event.target.author.value;
        const Price = event.target.price.value;
        console.log(session);
        const res = await fetch('http://localhost:3000/api/books/', {
            body: JSON.stringify({
              title: Title,
              author : Author,
              price : Price,
              userMail : session.user.email
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          });
          const result = await res.json();
          router.push('/');
    }


    return (
        <div className="flex justify-center content-center h-screen flex-wrap">
            <div className="p-14 shadow-lg">
                <form onSubmit = {handleSubmit} className= "flex flex-col">
                    <label htmlFor="title" className="mb-1">Title</label>
                    <input  id ="title" placeholder = "Book's name" className="border-2 border-black rounded-lg mb-3 p-3"></input> 
                    <br/>
                    <label htmlFor = "author" className="mb-2">Author's Name</label>
                    <input id = "author" placeholder = "Author's name" className="border-2 border-black rounded-lg mb-3 p-3"></input>
                    <label htmlFor = "price" className="mb-2">Price</label>
                    <input id = "price" placeholder = "price" className="border-2 border-black rounded-lg mb-3 p-3"></input>
                    <button type="submit" className="border-solid border-2 bg-blue-600 py-auto px-auto rounded-lg text-white text-lg w-28 h-12">Submit</button> 
                </form>
            </div>
        </div>
    )
}

export default bookForm