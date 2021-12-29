import Link from "next/link";
import BookList from "../components/BookList"
import {useSession} from 'next-auth/react';
import {useState ,useEffect} from 'react';
import { Button ,Spinner} from 'react-bootstrap';
import Image from 'next/image';
import config from '../config';


export default function Home() {
  const {data : session} = useSession();
  const [ books,setBooks] = useState([]);
  const [term,setTerm] = useState("");
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    if(term===""){
      handleAll();
    }
    
  }, [term])

 const handleAll = async ()=>{
   // const res = await fetch(`${config.HOST}/api/books/`);
    const res = await fetch(`/api/books/`);
    const {data} = await res.json();
    setLoading(false);
    setBooks(data);
  }
  

  const handleSearch = async()=>{
    setLoading(true);
    const res = await fetch(`${config.HOST}/api/books/search?term=${term}`);
    const {data} = await res.json();
    setLoading(false);
    setBooks(data);
  }
  
  return (
    <div>
      <div className = "flex p-2 justify-center bg-searchGreen">
        
        <input  className = "border-solid border-2 border-gray-300 w-1/2 pl-5 pt-2 pb-2 h-9 rounded-l-md "placeholder="Search..." value = {term} onChange={(e)=>setTerm(e.target.value)}></input>
        <div onClick = {handleSearch} className ="bg-black pl-4 pr-4 pt-2 pb-2 h-9 rounded-r-md">
          <i className="fas fa-search  text-white"></i>
        </div>
        
        
      </div>
      
        <div className="h-80 relative ">
        
          <div className="h-80 w-1/2 bg-gradient-to-r from-black via-searchGreen p-8">
          </div>
          
          <Image src = "/StaticImages/bg-imageS.png" layout="fill" className="opacity-40" />
        </div>
        <div className="flex pl-24 pr-24 pt-10">
          <p className="text-3xl font-poppins font-extrabold">Choose Your Books!</p>
          <div className="ml-auto">
            <Link href= "/book_input" >
                    <Button size="lg" variant="success" className="border-0 rounded-lg text-white text-lg bg-searchGreen hover:bg-black "><p className="font-poppins font-semibold">+ Add</p></Button>
            </Link>
          </div>
        
        </div>
      
      {loading ? <div className="h-64 flex justify-content-center align-items-center"><Spinner  animation="border" /></div> : <BookList data={books}/>}
    </div>
      
  )
}
