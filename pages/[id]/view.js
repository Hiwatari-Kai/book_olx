

const View = ({data}) => {
    return (
        <div className="grid  grid-cols-2 mt-5">
            <div className="p-5 shadow-lg ">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Book's Details</h1>
                </div>
                <div className= "flex flex-col">
                    <p className ="text-lg text-blue-900 font-bold">{data.title}</p>
                    <p className="text-sm font-semibold italic">{data.author}</p>
                    <p className="text-lg font-semibold"><span>&#8377;</span>{data.price}</p>
                    <div className="flex justify-center">
                    {
                        data.mediaUrl ? <img className="w-3/4" src={data.mediaUrl}/> : null
                    }
                        
                    </div>
                </div>
            </div>
        
            <div className="p-5 shadow-lg ">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Seller's Details</h1>
                </div>
                <div className= "flex flex-col">
                    <p className ="text-lg text-blue-900 font-bold">{data.name}</p>
                    <p className="text-sm font-semibold italic">{data.phone}</p>
                    <p className="text-lg font-semibold">{data.userMailContact}</p>
                </div>
            </div>
        </div>
    )
}
export async function getServerSideProps({query : {id}}) {
    const res = await fetch(`http://localhost:3000/api/books/${id}`);
    const {data} = await res.json();
    return (
      { props: { data } });
  }
export default View
