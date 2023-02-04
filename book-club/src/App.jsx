import React, {useState, useEffect} from 'react'
import BooksContainer from "./components/BooksContainer"
import Header from "./components/Header"
import DetailsPanel from './components/DetailsPanel'
import {GlobalStyle} from './styles'
import {Transition} from 'react-transition-group'


//Everything after the await keyword is suspended until the return promise is complete
//await keyword is only available within a async function with regular javascript code
//response property can be utlized as a boolean to run the subsequent steps
//Functions utilized on the whole program should be defined in the app component


const App = () => {
  
  const [books, setBooks] = useState([])
  const [selectedBook, setSelectedBook] = useState(null)
  const [showPanel, setShowPanel] = useState(false);

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
    setShowPanel(true)
  }

  const closePanel = () => {
    setShowPanel(false)
  }

  return (
    <>
      <GlobalStyle/>
      <Header/>
      <BooksContainer books={books} pickBook={pickBook} isPanelOpen={showPanel}/>
      <Transition in={showPanel} timeout={300}>
         {(state) => <DetailsPanel book={selectedBook} closePanel={closePanel} state={state}/>}
      </Transition>
    </>
  )
}
export default App;
