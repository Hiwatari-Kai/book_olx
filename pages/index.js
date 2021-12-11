
import BookList from "../components/BookList"

export default function Home({data}) {
  return (
    <div>
      <BookList data={data}/>
    </div>
      
  )
}
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch('http://localhost:3000/api/books/');
  const {data} = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}