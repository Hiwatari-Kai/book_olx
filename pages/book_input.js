import BookForm from "../components/BookForm";
import {getSession} from 'next-auth/react';

const Book_input = () => {
    return(
        <div className="bg-gray-50">
            <BookForm/>
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
    return (
      { props: {} });
  }

export default Book_input

