import Link from "next/link";
import { useUser } from '@auth0/nextjs-auth0';
import {Button,Dropdown} from 'react-bootstrap'



function Header() {

    const { user, error, isLoading } = useUser();
   
    return (
        <div className=" bg-black flex place-content-end pt-3 pb-3 pl-20 pr-20">
            <Link href = "/" >
                <p className="  cursor-pointer text-4xl text-white font-bold mr-auto">Grimoire</p>
            </Link>
             {user && 
                <div className="flex space-x-4 ">
                    
                    <Dropdown>
                        <Dropdown.Toggle variant="light" id="dropdown-basic" className="p-1">
                            <img className="rounded-full inline cursor-pointer h-9 w-9" src = {user.picture}/>
                        </Dropdown.Toggle>
                        
                        <Dropdown.Menu>
                            <Link href="/profile" passHref>
                                <Dropdown.Item  className="hover:bg-gray-300">Your Books</Dropdown.Item>
                            </Link>
                        </Dropdown.Menu>
                        
                    </Dropdown>
                    <div className="flex">
                        <a href="/api/auth/logout">
                            <Button variant="light" size="sm" className="mr-auto h-full">Sign out</Button>   
                        </a>
                    </div>
                </div>
             }
             {!user && 
                <div className= "flex">
                    <a href="/api/auth/login">
                        <Button variant="light" size="sm" className="mr-auto h-full">Sign in</Button>
                    </a>
                </div>
             }
        </div>
        
        
    )
}

export default Header
