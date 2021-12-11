import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"



function Header() {

    const { data: session } = useSession()
    return (
        <div className="h-20 bg-indigo-200 pt-4 flex place-content-end p-10">
            <Link href = "/" >
                <p className="cursor-pointer text-4xl text-blue-900 font-bold mr-auto">Grimoire</p>
            </Link>
             {session && 
                <div className="flex space-x-1">
                    <Link href="/profile">
                        <img className="rounded-full  cursor-pointer h-10 w-10" src = {session.user.image}/>
                    </Link>
                    <button className="border-solid border-2 w-20 h-10   bg-indigo-500" onClick={() => signOut()}>Sign out</button>   
                </div>
             }
             {!session && <button className="border-solid border-2 w-20 h-10 bg-indigo-500" onClick={() => signIn("google")}>Sign in</button>}
             
        </div>
       
        
    )
}

export default Header
