import React, {useState, useEffect} from 'react'
import BooksContainer from "./components/BooksContainer"
import Header from "./components/Header"
import DetailsPanel from './components/DetailsPanel'
import { GlobalStyle } from './styles'


//Everything after the await keyword is suspended until the return promise is complete
//await keyword is only available within a async function with regular javascript code
//response property can be utlized as a boolean to run the subsequent steps

const App = () => {
  
  const [books, setBooks] = useState([])
  const [selectedBook, setSelectedBook] = useState(null)

  useEffect( () => {
    const fetchData = async () => {
      const response = await fetch('https://book-club-json.herokuapp.com/books')
      const books = await response.json()
      setBooks(books)
    }
    fetchData()
  }, [])

  const pickBook = (book) => {
    setSelectedBook(book)
  }

  console.log(selectedBook)
  return (
    <>
      <GlobalStyle/>
      <Header/>
      <BooksContainer books={books} pickBook={pickBook}/>
      {selectedBook && <DetailsPanel book={selectedBook}/>}
    </>
  )
}
export default App;
