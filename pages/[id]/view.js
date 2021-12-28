import Link from 'next/link';
import {Button} from 'react-bootstrap';
import {getSession} from 'next-auth/react';
import config from '../../config';
import Image from 'next/image';

const View = ({data}) => {
    return (
        <div className="relative bg-black">
            <div className="h-2 bg-searchGreen"></div>
            <div className="h-80 bg-detailsImage bg-cover">
                <Link href="/">
                    <Button variant="outline-light" className="m-4">Go Back</Button>
                </Link>
            </div>
            <div className=" mr-16 ml-16 bg-gray-800 rounded-2xl relative bottom-20">
                <div className="flex p-16">
                
                    <div className="flex relative">
                        <div className="rounded-2xl w-80 h-80 flex justify-content-center relative">
                            <Image alt="Book Image" src={data.mediaUrl} layout="fill" className='rounded-lg opacity-50 object-cover'></Image>
                        </div>
                       <div className="absolute left-8 w-64 h-80 cursor-pointer">
                            <a href={data.mediaUrl} target="_blank" rel="noopener noreferrer">
                                <Image alt="Book Image" src={data.mediaUrl}  layout="fill" className='rounded-lg object-cover'></Image>
                            </a>
                        </div>
                        <div className="flex flex-col justify-content-center ml-14">
                            <p className='text-white text-3xl font-poppins mb-2 w-72 break-words'>{data.title}</p>
                            <p className='text-sm font-poppins text-searchGreen mb-2 w-72 break-words'>Author: {data.author}</p>
                            <p className="text-3xl font-poppins text-white mb-4">Rs {data.price}/-</p>
                            <div className="flex space-x-3"> 
                                <img src="/StaticImages/detailsIconGreen.png" className='h-10 w-7'/> 
                                <img src="/StaticImages/detailsIconBlue.png" className='h-10 w-7'/>
                                <img src="/StaticImages/detailsIconRed.png" className='h-10 w-7'/>
                            </div>
                             
                        </div>
                        
                    </div>
                    <div className="ml-52">
                        <p className="text-3xl text-white font-poppins mb-4">Seller's Details</p>
                        <p className='text-gray-200 font-poppins text-md mb-2'><span className="font-semibold ">Name : </span> {data.name}</p>
                        {data.phone &&   <p className='text-gray-200 font-poppins text-md mb-2'><span className="font-semibold ">Mobile No :</span> {data.phone}</p>}
                        <p className='text-gray-200 font-poppins text-md mb-4'><span className="font-semibold text-white">Email :</span> {data.mail}</p>
                        <p className="w-72 text-gray-300 text-md break-words">
                            {data.description}
                        </p>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
export async function getServerSideProps(context) {
    const session = await getSession(context);
    if(!session)
    {
        return {
            redirect: {
            destination: '/signIn',
            permanent: false,
            },
        }
    }
    const res = await fetch(`${config.HOST}/api/books/${context.query.id}`);
    const {data} = await res.json();
    return (
      { props: { data } });
  }
export default View
