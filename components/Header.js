import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"
import {Button,Dropdown} from 'react-bootstrap'



function Header() {

    const { data: session } = useSession()

   
    return (
        <div className=" bg-black flex place-content-end pt-3 pb-3 pl-20 pr-20">
            <Link href = "/" >
                <p className="  cursor-pointer text-4xl text-white font-bold mr-auto">Grimoire</p>
            </Link>
             {session && 
                <div className="flex space-x-4 ">
                    
                    <Dropdown>
                        <Dropdown.Toggle variant="light" id="dropdown-basic" className="p-1">
                            <img className="rounded-full inline cursor-pointer h-9 w-9" src = {session.user.image}/>
                        </Dropdown.Toggle>
                        
                        <Dropdown.Menu>
                            <Link href="/profile" passHref>
                                <Dropdown.Item  className="hover:bg-gray-300">Your Books</Dropdown.Item>
                            </Link>
                        </Dropdown.Menu>
                        
                    </Dropdown>
                    
                    <Button variant="light" size="sm" className="mr-auto" onClick={()=>signOut()}>Sign out</Button>   
                </div>
             }
             {!session && 
                <div className= "flex">
                    <Button variant="light" size="sm" className="mr-auto" onClick={() => signIn("google")}>Sign in</Button>
                </div>
             }
        </div>
        
        
    )
}

export default Header
