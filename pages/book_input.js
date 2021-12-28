import { useRouter } from 'next/router';
import {useSession} from 'next-auth/react'
import { useState } from 'react';
import { useForm } from "react-hook-form";
import {Alert,Button} from 'react-bootstrap'
import Link from 'next/link';
import config from '../config';

const Book_input = () => {
    const router = useRouter();
    const {data :session} = useSession();
    const { register, handleSubmit,formState: {errors}} = useForm();
    const [media,setMedia] = useState("");
    
    const onSubmit = async(formData)=>{
        const mediaUrl = await imageUpload();
        const uploadData = {...formData,mediaUrl : mediaUrl,userMail : session.user.email};
        
        const res = await fetch(`${config.HOST}/api/`, {
            body: JSON.stringify(uploadData),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          });
          const result = await res.json();
          router.push('/');
          
    }
    const imageUpload = async()=>{
        if(!media)
            return ;
        const data = new FormData();
        data.append('file', media);
        data.append('upload_preset', 'bookStore');
        data.append('cloud_name',process.env.CLOUD_NAME);
        const res = await fetch('https://api.cloudinary.com/v1_1/kai21/image/upload', {
            method: 'POST',
            body: data,
        });
        res = await res.json();
        return res.url;

    }
    return (
        <div  className="bg-gray-50">
            <Link href="/">
                <Button variant="outline-dark" className="ml-10 mt-5">Go Back</Button>
            </Link>
            <div className="flex justify-center pb-5" >
                <div className='flex flex-col'>
                    <h1 className='text-center text-4xl font-bold mb-3'>Add Your Book</h1>
                    <form onSubmit = {handleSubmit(onSubmit)} >
                        
                            <div className = "flex flex-col mb-2">     
                                <label htmlFor = "name" className="mb-1"><p className='text-sm'>Your Name</p></label>
                                <input  autoComplete="off" {...register("name",{required : true})} id = "name" className="border-2 border-gray-300 rounded-lg p-2"></input>
                                {errors?.name && 
                                    <Alert className="pt-1 pb-1 pl-3 pr-3" variant='danger'>
                                        <p className="text-sm">Please provide a name.</p>
                                    </Alert>
                                }
                            </div>
                            <div className = "flex flex-col mb-2">     
                                <label htmlFor = "phone" className="mb-1"><p className='text-sm'>Phone Number</p></label>
                                <input  autoComplete="off" type="tel" {...register("phone",{minLength : 10,maxLength : 10,pattern :  /^[0-9]+$/})} id = "phone"  className="border-2 border-gray-300 rounded-lg p-2"></input>
                                {errors?.phone && 
                                    <Alert className="pt-1 pb-1 pl-3 pr-3" variant='danger'>
                                        {(errors?.phone?.type==='minLength' || errors?.phone?.type==='maxLength') && <p className="text-sm">Phone number should be 10 digits long.</p>}
                                        {errors?.phone?.type==='pattern' && <p className="text-sm">Phone number should only contain digits from 0-9. </p>}
                                    </Alert>
                                }
                            </div>
                            <div className = "flex flex-col mb-2">     
                                <label htmlFor = "mail" className="mb-1"><p className='text-sm'>Email</p></label>
                                <input  autoComplete="off" {...register("mail",{required : true, pattern : /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/})} id = "mail" className="border-2 border-gray-300 rounded-lg  p-2"></input>
                                {errors?.mail && 
                                    <Alert className="pt-1 pb-1 pl-3 pr-3" variant='danger'>
                                        {errors?.mail?.type==='pattern' && <p className="text-sm">Please provide a valid email.</p>}
                                        {errors?.mail?.type==='required' && <p className="text-sm">Email is required.</p>}
                                    </Alert>
                                }
                            </div>
                            <div className = "flex flex-col mb-2">
                                <label htmlFor="title" className="mb-1"><p className='text-sm'>Book's Name</p></label>
                                <input   autoComplete="off" {...register("title",{required : true})} id ="title"  className="border-2 border-gray-300 rounded-lg  p-2"></input> 
                                {errors?.title && 
                                    <Alert className="pt-1 pb-1 pl-3 pr-3" variant='danger'>
                                        <p className="text-sm">Book's name is required.</p>
                                    </Alert>
                                }
                        </div>
                            <div className = "flex flex-col mb-2"> 
                                <label htmlFor = "author" className="mb-1"><p className='text-sm'>Author's Name</p></label>
                                <input  autoComplete="off"  {...register("author",{required : true})} id = "author"  className="border-2 border-gray-300 rounded-lg  p-2"></input>
                                {errors?.author && 
                                    <Alert className="pt-1 pb-1 pl-3 pr-3" variant='danger'>
                                        <p className="text-sm">Author's  name is required.</p>
                                    </Alert>
                                }
                            </div>
                            <div className = "flex flex-col mb-2">     
                                <label htmlFor = "price" className="mb-1"><p className='text-sm'>Price</p></label>
                                <input  autoComplete="off" {...register("price",{required : true,pattern : /^[0-9]+$/})} id = "price" className="border-2 border-gray-300 rounded-lg p-2"></input>
                                {errors?.price && 
                                    <Alert className="pt-1 pb-1 pl-3 pr-3" variant='danger'>
                                        {errors.price?.type==='required' && <p className="text-sm">Price is required.</p>}
                                        {errors.price?.type==='pattern' && <p className="text-sm">Price should be a number.</p>}
                                    </Alert>
                                }
                            </div>
                            <div className = "flex flex-col mb-2">     
                                <label htmlFor = "description" className="mb-1"><p className='text-sm'>Description</p></label>
                                <textarea rows="4" cols="50" autoComplete="off" {...register("description",{required : true,maxLength : 200})} id = "description" className="border-2 border-gray-300 rounded-lg p-2"></textarea>
                                {errors?.description && 
                                    <Alert className="pt-1 pb-1 pl-3 pr-3" variant='danger'>
                                        {errors.description?.type==='required' && <p className="text-sm">Description is required.</p>}
                                        {errors.description?.type==='maxLength' && <p className="text-sm">Description must be less than 200 characters.</p>}

                                    </Alert>
                                }
                            </div>
                            <div className = "flex flex-col mb-2">     
                                <label className="mb-1"><p className='text-sm'>Upload a photo of the book</p></label>
                                <input {...register("photo",{required : true})} className="bg-white p-1 border-gray-300 border-2 rounded-lg" name="media" type="file" accept="image/*" onChange={(e)=>setMedia(e.target.files[0])}/>
                                {errors?.photo && 
                                    <Alert className="pt-1 pb-1 pl-3 pr-3" variant='danger'>
                                        {errors.photo?.type==='required' && <p className="text-sm">A photo is required.</p>}
                                    </Alert>
                                }
                            </div>
                            
                        <div className="flex justify-center mt-7">    
                            <Button type="submit" variant="dark" className="  rounded-lg text-white text-lg ">Submit</Button> 
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default Book_input

