import { useRouter } from 'next/router';
import { useState } from 'react';

const Edit = ({data}) => {

    const router = useRouter();
    const [title,setTitle] = useState(data.title);
    const [author,setAuthor] = useState(data.author);
    const [price,setPrice]  = useState(data.price);
    const [name,setName] = useState(data.name);
    const [mail,setMail] = useState(data.userContactMail);
    const [phone,setPhone] = useState(data.phone);
    const handleEdit = async(event)=>{
        event.preventDefault();
        
        const res = await fetch(`http://localhost:3000/api/books/${router.query.id}`, {
            body: JSON.stringify({
              title: title,
              author : author,
              price : price,
              userMailContact : mail,
              name : name,
              phone : phone
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
      <div className="flex justify-center content-center h-screen flex-wrap ">
            <div className="p-14 shadow-lg">
                <form onSubmit = {handleEdit} >
                    <div className= "grid grid-cols-2 gap-8">
                        <div className = "flex flex-col">     
                            <label htmlFor = "name" className="mb-2">Your Name</label>
                            <input id = "name" value ={name} onChange = {(e)=>setName(e.target.value)} placeholder = "name" className="border-2 border-black rounded-lg p-3"></input>
                        </div>
                        <div className = "flex flex-col">     
                            <label htmlFor = "phone" className="mb-2">Phone Number</label>
                            <input id = "phone" value ={phone} onChange = {(e)=>setPhone(e.target.value)} placeholder = "Phone number" className="border-2 border-black rounded-lg p-3"></input>
                        </div>
                        <div className = "flex flex-col">     
                            <label htmlFor = "mail" className="mb-2">Email</label>
                            <input id = "mail" value ={mail} onChange = {(e)=>setMail(e.target.value)} placeholder = "Email" className="border-2 border-black rounded-lg  p-3"></input>
                        </div>
                        <div className = "flex flex-col">
                            <label htmlFor="title" className="mb-2">Book's Name</label>
                            <input onChange = {(e)=>setTitle(e.target.value)} id ="title" value={title} placeholder = "Book's name" className="border-2 border-black rounded-lg  p-3"></input> 
                        </div>
                        <div className = "flex flex-col"> 
                            <label htmlFor = "author" className="mb-2">Author's Name</label>
                            <input id = "author" onChange = {(e)=>setAuthor(e.target.value)} placeholder = "Author's name" className="border-2 border-black rounded-lg  p-3"></input>
                        </div>
                        <div className = "flex flex-col">     
                            <label htmlFor = "price" className="mb-2">Price</label>
                            <input id = "price" onChange = {(e)=>setPrice(e.target.value)} placeholder = "Price" className="border-2 border-black rounded-lg p-3"></input>
                        </div>
                        
                    </div>
                    <div className="flex justify-center mt-7">    
                        <button type="submit" className="border-solid border-2 bg-blue-600 py-auto px-auto rounded-lg text-white text-lg w-28 h-12">Submit</button> 
                    </div>
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