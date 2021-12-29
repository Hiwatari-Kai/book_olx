import BookForm from "../components/BookForm";
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

const Book_input = () => {
    return(
        <div className="bg-gray-50">
            <BookForm/>
        </div>
    )
}

export const getServerSideProps = withPageAuthRequired();

export default Book_input

