import React, {useState, useEffect} from 'react'
import BooksContainer from './components/BooksContainer'
import Header from './components/Header'
import DetailsPanel from './components/DetailsPanel'
import Search from './components/Search'
import {GlobalStyle} from './styles'
import {Transition} from 'react-transition-group'

//Everything after the await keyword is suspended until the return promise is complete
//await keyword is only available within a async function with regular javascript code
//response property can be utlized as a boolean to run the subsequent steps
//Functions utilized on the whole program should be defined in the app component

const App = () => {
  const [books, setBooks] = useState([])
  const [selectedBook, setSelectedBook] = useState(null)
  const [showPanel, setShowPanel] = useState(false)
  const [filteredBooks, setFilteredBooks] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://book-club-json.herokuapp.com/books')
      const books = await response.json()
      setBooks(books)
      setFilteredBooks(books)
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

  const filterBooks = (searchTerm) => {
    const stringSearch = (bookAttribute, searchTerm) => (
      bookAttribute.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!searchTerm) {
      setFilteredBooks(books)
    } else {
      setFilteredBooks(books.filter(
        (book) => stringSearch(book.title, searchTerm) || stringSearch(book.author, searchTerm)
      )
        // book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        // book.author.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
  }

  const hasFiltered = filteredBooks.length !== books.length

  return (
    <>
      <GlobalStyle />
      <Header>
        <Search filterBooks={filterBooks}/>
      </Header>
      <BooksContainer books={filteredBooks} pickBook={pickBook} isPanelOpen={showPanel} title={hasFiltered ? 'Search results' : 'All books'}/>
      <Transition in={showPanel} timeout={300}>
        {(state) => <DetailsPanel book={selectedBook} closePanel={closePanel} state={state} />}
      </Transition>
    </>
  )
}
export default App
