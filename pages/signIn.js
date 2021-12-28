import {useSession} from 'next-auth/react';
import { useRouter } from 'next/router';


const SignIn = () => {
    const router = useRouter();
    const {data : session} = useSession();
    if(session)
    {
        router.push('/');
        
    }
    return (
        <div className="flex justify-content-center align-items-center h-screen">
            <div className="flex flex-col space-y-10 align-items-center p-10 rounded-2xl">
                <p className="text-4xl text-bold text-gray-500 font-poppins">Please Sign in to know seller's details.</p>
                
                <img src="/StaticImages/signInImageS.svg" className="ml-10 w-96 h-96"/>
            </div>
            
        </div>
    )
}

export default SignIn
