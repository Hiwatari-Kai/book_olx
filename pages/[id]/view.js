import Link from 'next/link';
import {Button} from 'react-bootstrap';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
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
            <div className=" mr-16 ml-16 bg-gray-800 rounded-2xl relative bottom-20 pl-10 pr-10 pb-16 pt-16">
                <div className="grid xl:grid-cols-2 lg:grid-cols-1 md:gap-10">
                
                    <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4 ">
                        <div className="relative sm:flex sm:justify-center">
                            <div className="rounded-2xl w-72 h-80 flex justify-content-center relative">
                                <Image alt="Book Image" src={data.mediaUrl} layout="fill" className='rounded-lg opacity-50 object-cover'></Image>
                            </div>
                            <div className="absolute w-60 h-80 top-0 left-6 cursor-pointer">
                                <a href={data.mediaUrl} target="_blank" rel="noopener noreferrer">
                                    <Image alt="Book Image" src={data.mediaUrl}  layout="fill" className='rounded-lg object-cover'></Image>
                                </a>
                            </div>
                        </div>
                        <div className="flex flex-col justify-content-center md:ml-12 sm:ml-5">
                                <p className='text-white text-3xl font-poppins mb-2 break-words'>{data.title}</p>
                                <p className='text-sm font-poppins text-searchGreen mb-2 break-words'>Author: {data.author}</p>
                                <p className="text-3xl font-poppins text-white mb-4">Rs {data.price}/-</p>
                                <div className="flex space-x-3"> 
                                    <img src="/StaticImages/detailsIconGreen.png" className='h-10 w-7'/> 
                                    <img src="/StaticImages/detailsIconBlue.png" className='h-10 w-7'/>
                                    <img src="/StaticImages/detailsIconRed.png" className='h-10 w-7'/>
                                </div>
                             
                        </div>
                        
                    </div>
                    <div className="flex justify-center sm:mt-5">
                        <div>
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
            
        </div>
    )
}

export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(ctx) {
      
        const res = await fetch(`${config.HOST}/api/books/${ctx.query.id}`);
        const {data} = await res.json();
        return (
        { props: { data } });
    }
  });

export default View
