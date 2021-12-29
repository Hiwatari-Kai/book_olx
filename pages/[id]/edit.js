import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Alert ,Button} from 'react-bootstrap';
import config from '../../config';
const Edit = ({data}) => {

    const router = useRouter();
    const { register, handleSubmit ,formState: {errors}} = useForm();
    const onSubmit = async(formData)=>{
        const editedData = {...formData};
       
        
        const res = await fetch(`${config.HOST}/api/books/${router.query.id}`, {
            body: JSON.stringify(editedData),
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'PUT'
          });
          const result = await res.json();
          router.push('/profile');
    }


    return (
    <div className='bg-gray-50 pb-5'>
        <Link href="/profile">
            <Button variant="outline-dark" className="ml-10 mt-5">Go Back</Button>
        </Link>
        <div className="flex justify-center " >
            <div className='flex flex-col w-1/4'>
                <h1 className='text-center text-4xl font-bold mb-3'>EDIT</h1>
                <form onSubmit = {handleSubmit(onSubmit)} >
                    
                        <div className = "flex flex-col mb-2">     
                            <label htmlFor = "name" className="mb-1"><p className='text-sm'>Your Name</p></label>
                            <input autoComplete="off" {...register("name",{required : true})} defaultValue={data.name} id = "name" className="border-2 border-gray-300 rounded-lg p-2"></input>
                            {errors?.name && 
                                <Alert className="pt-1 pb-1 pl-3 pr-3" variant='danger'>
                                    <p className="text-sm">Please provide a name.</p>
                                </Alert>
                             }
                        </div>
                        <div className = "flex flex-col mb-2">     
                            <label htmlFor = "phone" className="mb-1"><p className='text-sm'>Phone Number</p></label>
                            <input autoComplete="off" type="tel" {...register("phone",{minLength : 10,maxLength : 10,pattern :  /^[0-9]+$/})} defaultValue={data.phone} id = "phone"  className="border-2 border-gray-300 rounded-lg p-2"></input>
                            {errors?.phone && 
                                <Alert className="pt-1 pb-1 pl-3 pr-3" variant='danger'>
                                    {(errors?.phone?.type==='minLength' || errors?.phone?.type==='maxLength') && <p className="text-sm">Phone number should be 10 digits long.</p>}
                                    {errors?.phone?.type==='pattern' && <p className="text-sm">Phone number should only contain digits from 0-9.</p>}
                                </Alert>
                             }
                        </div>
                        <div className = "flex flex-col mb-2">     
                            <label htmlFor = "mail" className="mb-1"><p className='text-sm'>Email</p></label>
                            <input autoComplete="off" {...register("mail",{required : true, pattern : /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/})} defaultValue={data.mail} id = "mail" className="border-2 border-gray-300 rounded-lg  p-2"></input>
                            {errors?.mail && 
                                <Alert className="pt-1 pb-1 pl-3 pr-3" variant='danger'>
                                    {errors?.mail?.type==='pattern' && <p className="text-sm">Please provide a valid email.</p>}
                                    {errors?.mail?.type==='required' && <p className="text-sm">Email is required.</p>}
                                </Alert>
                             }
                        </div>
                        <div className = "flex flex-col mb-2">
                            <label htmlFor="title" className="mb-1"><p className='text-sm'>Book's Name</p></label>
                            <input  autoComplete="off" {...register("title",{required : true})} defaultValue={data.title} id ="title"  className="border-2 border-gray-300 rounded-lg  p-2"></input> 
                            {errors?.title && 
                                <Alert className="pt-1 pb-1 pl-3 pr-3" variant='danger'>
                                    <p className="text-sm">Book's name is required.</p>
                                </Alert>
                             }
                       </div>
                        <div className = "flex flex-col mb-2"> 
                            <label htmlFor = "author" className="mb-1"><p className='text-sm'>Author's Name</p></label>
                            <input autoComplete="off" {...register("author",{required : true})} defaultValue={data.author} id = "author"  className="border-2 border-gray-300 rounded-lg  p-2"></input>
                            {errors?.author && 
                                <Alert className="pt-1 pb-1 pl-3 pr-3" variant='danger'>
                                    <p className="text-sm">Author's  name is required.</p>
                                </Alert>
                             }
                        </div>
                        <div className = "flex flex-col mb-2">     
                            <label htmlFor = "price" className="mb-1"><p className='text-sm'>Price</p></label>
                            <input autoComplete="off" {...register("price",{required : true,pattern : /^[0-9]+$/})} defaultValue={data.price} id = "price" className="border-2 border-gray-300 rounded-lg p-2"></input>
                            {errors?.price && 
                                <Alert className="pt-1 pb-1 pl-3 pr-3" variant='danger'>
                                    {errors.price?.type==='required' && <p className="text-sm">Price is required.</p>}
                                    {errors.price?.type==='pattern' && <p className="text-sm">Price should be a number.</p>}
                                </Alert>
                             }
                        </div>
                        <div className = "flex flex-col mb-2">     
                            <label htmlFor = "description" className="mb-1"><p className='text-sm'>Description</p></label>
                            <textarea  defaultValue={data.description} rows="4" cols="50" autoComplete="off" {...register("description",{required : true,maxLength : 200})} id = "description" className="border-2 border-gray-300 rounded-lg p-2"></textarea>
                            {errors?.description && 
                                <Alert className="pt-1 pb-1 pl-3 pr-3" variant='danger'>
                                    {errors.description?.type==='required' && <p className="text-sm">Description is required.</p>}
                                    {errors.description?.type==='maxLength' && <p className="text-sm">Description must be less than 200 characters.</p>}

                                </Alert>
                             }
                        </div>
                        
                    <div className="flex justify-center mt-7">    
                        <Button type="submit" variant="dark" className=" rounded-lg text-white text-lg ">Submit</Button> 
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
}

export async function getServerSideProps({query : {id}}) {
    const res = await fetch(`${config.HOST}/api/books/${id}`);
    const {data} = await res.json();
    return (
      { props: { data } });
  }
export default Edit