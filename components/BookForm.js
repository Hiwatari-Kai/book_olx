import { useRouter } from 'next/router';
import {useSession} from 'next-auth/react'
import { useState } from 'react';

const bookForm = () => {
    const router = useRouter();
    const {data :session} = useSession();
    const [bookTitle,setTitle] = useState("");
    const [bookAuthor,setAuthor] = useState("");
    const [bookPrice,setPrice] = useState(0);
    const [ownerName,setName] = useState("");
    const [ownerMail,setMail] = useState("");
    const [ownerNumber,setNumber] = useState("");
    const [media,setMedia] = useState("");
    
    const handleSubmit = async(event)=>{
        event.preventDefault();
        const mediaUrl = await imageUpload();
        console.log(mediaUrl);
        const res = await fetch('http://localhost:3000/api/books/', {
            body: JSON.stringify({
              title: bookTitle,
              author : bookAuthor,
              price : bookPrice,
              userMail : session.user.email,
              userMailContact : ownerMail,
              name : ownerName,
              phone : ownerNumber,
              mediaUrl : mediaUrl
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          });
          const result = await res.json();
          router.push('/');
          
    }
    const imageUpload = async()=>{
        const data = new FormData();
        data.append('file', media);
        data.append('upload_preset', 'bookStore');
        data.append('cloud_name','kai21');
        const res = await fetch('https://api.cloudinary.com/v1_1/kai21/image/upload', {
            method: 'POST',
            body: data
        });
        res = await res.json();
        console.log(res);
        return res.url;

    }

    return (
        <div className="flex justify-center content-center h-screen flex-wrap ">
            <div className="p-14 shadow-lg">
                <form onSubmit = {handleSubmit} >
                    <div className= "grid grid-cols-2 gap-8">
                        <div className = "flex flex-col">     
                            <label htmlFor = "name" className="mb-2">Your Name</label>
                            <input id = "name" onChange={(e)=>setName(e.target.value)} value ={ownerName} placeholder = "name" className="border-2 border-black rounded-lg p-2"></input>
                        </div>
                        <div className = "flex flex-col">     
                            <label htmlFor = "phone" className="mb-2">Phone Number</label>
                            <input id = "phone" onChange={(e)=>setNumber(e.target.value)} value ={ownerNumber} placeholder = "Phone number" className="border-2 border-black rounded-lg p-2"></input>
                        </div>
                        <div className = "flex flex-col">     
                            <label htmlFor = "mail" className="mb-2">Email</label>
                            <input id = "mail" onChange={(e)=>setMail(e.target.value)} value ={ownerMail} placeholder = "Email" className="border-2 border-black rounded-lg  p-2"></input>
                        </div>
                        <div className = "flex flex-col">
                            <label htmlFor="title" className="mb-2">Book's Name</label>
                            <input  id ="title" onChange={(e)=>setTitle(e.target.value)} value ={bookTitle} placeholder = "Book's name" className="border-2 border-black rounded-lg  p-2"></input> 
                        </div>
                        <div className = "flex flex-col"> 
                            <label htmlFor = "author" className="mb-2">Author's Name</label>
                            <input id = "author" onChange={(e)=>setAuthor(e.target.value)} value ={bookAuthor} placeholder = "Author's name" className="border-2 border-black rounded-lg  p-2"></input>
                        </div>
                        <div className = "flex flex-col">     
                            <label htmlFor = "price" className="mb-2">Price</label>
                            <input id = "price" onChange={(e)=>setPrice(e.target.value)} value ={bookPrice} placeholder = "Price" className="border-2 border-black rounded-lg p-2"></input>
                        </div>
                        
                    </div>
                    <div className="mt-5">
                        <span className='mr-2'>Upload photo</span>
                        <input className=""name="media" type="file" accept="image/*" onChange={(e)=>setMedia(e.target.files[0])}/>
                    </div>    
                    <div className="flex justify-center mt-7">    
                        <button type="submit" className="border-solid border-2 bg-blue-600 py-auto px-auto rounded-lg text-white text-lg w-28 h-12">Submit</button> 
                    </div>
                </form>
            </div>
        </div>
    )
}

export default bookForm