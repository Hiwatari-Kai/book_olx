import { useRouter } from 'next/router';
import { useState } from 'react';

const Edit = ({data}) => {

    const router = useRouter();
    const [title,setTitle] = useState(data.title);
    const [author,setAuthor] = useState(data.author);
    const [price,setPrice]  = useState(data.price);
    const handleEdit = async(event)=>{
        event.preventDefault();
        
        const res = await fetch(`http://localhost:3000/api/books/${router.query.id}`, {
            body: JSON.stringify({
              title: title,
              author : author,
              price : price
            }),
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'PUT'
          });
          const result = await res.json();
          router.push('/profile');
    }


    return (
        <div className="flex justify-center content-center h-screen flex-wrap">
            <div className="p-14 shadow-lg">
                <form onSubmit = {handleEdit} className= "flex flex-col">
                    <label htmlFor="title" className="mb-1">Title</label>
                    <input  onChange = {(e)=>setTitle(e.target.value)}id ="title" value={title} placeholder = "Book's name" className="border-2 border-black rounded-lg mb-3 p-3"></input> 
                    <br/>
                    <label htmlFor = "author" className="mb-2">Author's Name</label>
                    <input onChange = {(e)=>setAuthor(e.target.value)}id = "author" value = {author} placeholder = "Author's name" className="border-2 border-black rounded-lg mb-3 p-3"></input>
                    <label htmlFor = "price" className="mb-2">Price</label>
                    <input onChange = {(e)=>setPrice(e.target.value)}id = "price" value = {price} placeholder = "price" className="border-2 border-black rounded-lg mb-3 p-3"></input>
                    <button type="submit" className="border-solid border-2 bg-blue-600 py-auto px-auto rounded-lg text-white text-lg w-28 h-12">Save</button> 
                </form>
            </div>
        </div>
    )
}

export async function getServerSideProps({query : {id}}) {
    const res = await fetch(`http://localhost:3000/api/books/${id}`);
    const {data} = await res.json();
    return (
      { props: { data } });
  }
export default Edit