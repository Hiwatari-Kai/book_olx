import Link from "next/link";
import BookList from "../components/BookList"
import {useSession} from 'next-auth/react';
import {useState ,useEffect} from 'react';

export default function Home() {
  const {data : session} = useSession();
  const [ books,setBooks] = useState([]);
  const [term,setTerm] = useState("");

  useEffect(() => {
    if(term===""){
      handleAll();
    }
    
  }, [term])

 const handleAll = async ()=>{
    const res = await fetch('http://localhost:3000/api/books/');
    const {data} = await res.json();
    setBooks(data);
  }
  

  const handleSearch = async()=>{
    const res = await fetch(`http://localhost:3000/api/books/search?term=${term}`);
    const {data} = await res.json();
    setBooks(data);
  }
  
  return (
    <div>
    <div className = "flex space-x-5 mt-8 justify-center">
    
        <input  className = "border-solid border-2 w-96 p-2 h-12"placeholder="Search..." value = {term} onChange={(e)=>setTerm(e.target.value)}></input>
        <button onClick = {handleSearch} className="border-solid border-1  ml-24 bg-blue-600 py-auto px-auto  rounded-lg text-white text-lg w-32 h-12">Search</button>
      </div>
      {session && 
              <Link href= "/book_input">
                  <button className="border-solid border-1 ml-24 bg-blue-600 py-auto px-auto mt-5  rounded-lg text-white text-lg w-24 h-12">Add</button>
              </Link>
          }
      <BookList data={books}/>
    </div>
      
  )
}
