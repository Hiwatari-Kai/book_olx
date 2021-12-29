import Link from 'next/link';
import { withPageAuthRequired,getSession } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import {Button} from 'react-bootstrap';
import NotFound from '../components/NotFound';
import Image from 'next/image';
import config from '../config';

const Profile = ({data}) => {

    const stringShort = (x)=>{
        if(x.length<=16)
            return x;
        return x.substr(0,14) + "..";
    }

    const router = useRouter();
    const handleDelete = async(id)=>{
        const res = await fetch(`/api/books/${id}`, {
            method: 'DELETE',
          });
        router.push('/profile');
    }
    return (
        <div>
            <div className="h-80 relative ">
                <div className="h-80 w-1/2 bg-gradient-to-r from-black via-searchGreen"></div>
                <Image src = "/StaticImages/bg-image2S.png" layout="fill" className="opacity-70" />
                
            </div>
            
            <div className="pl-20 pr-20 pt-10 pb-5 bg-gray-50">
                <Link href="/">
                        <Button variant="dark" className="m-4">Go Back</Button>
                </Link>
               
                {data.length===0 && <NotFound message="You haven't listed any books."></NotFound>}
                <div className = "grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 p-3">
                        {
                            data.map((book)=>{
                            return (
                                <div key = {book._id} className="">
                                    <div className="bg-cardImage w-52 h-60 cursor-pointer bg-cover bg-searchGreen opacity-90 rounded-3xl flex flex-col justify-content-end">
                                        <img className="w-12 h-12 mb-11 ml-6 opacity-70" src="/StaticImages/cardIcon.svg"/>

                                        <div className= "flex flex-col h-32 rounded-3xl bg-gradient-to-t from-black pl-6 pt-1">
                                            <p className ="text-lg font-roboto text-white font-bold">{stringShort(book.title)}</p>
                                            <p className="text-xs font-roboto text-gray-300 font-semibold">{stringShort(book.author)}</p>
                                            <p className="text-lg font-roboto text-gray-200 font-semibold"><span>&#8377;</span> {book.price}</p>
                                            <div className="flex space-x-3 mt-1">
                                                <Link href = {`/${book._id}/edit`}>
                                                    <Button variant="outline-light" className=" hover:bg-black  border-2 rounded-sm text-white text-xs ">Edit</Button>
                                                </Link>
                                                <Button variant="outline-light" size="sm" onClick = {()=>handleDelete(book._id)}className="hover:bg-black border-2  rounded-sm text-white text-xs">Delete</Button> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                )
                            })
                        }
                    </div>
            </div>
    </div>
    )
}
export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(ctx) {
     
      const session = getSession(ctx.req, ctx.res);
      const res = await fetch(`${config.HOST}/api/books/profile?userMail=${session.user.email}`);
   
    const {data} = await res.json()
    return (
            { props: { data} }
            );
    }
  });
  

export default Profile
