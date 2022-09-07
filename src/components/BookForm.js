import { useEffect, useState } from 'react'
import { useFirestore } from '../hooks/useFirestore'

export default function BookForm({ uid }) {
   const [bookTitle, setBookTitle] = useState('')
   const [bookAuthor, setBookAuthor] = useState('')
   const [bookCategory, setBookCategory] = useState('')
   const [bookNote, setBookNote] = useState('')
   const [bookRead, setBookRead] = useState(false)
   const [bookRecomendation, setBookRecomendation] = useState(false)
   const [bookWait, setBookWait] = useState(true)

   const { addDocument, response } = useFirestore('books')

   const resetForm = () => {
        setBookTitle('')
        setBookAuthor('')
        setBookCategory('')
   }

   const handleSubmit = (e) => {
    e.preventDefault()
    addDocument({
        uid,
        bookTitle,
        bookAuthor,
        bookCategory,
        bookNote,
        bookRead,
        bookRecomendation,
        bookWait
    })
    resetForm()
   }

   /*useEffect(() => {
    if(response.succes) {
        setBookTitle('')
        setBookAuthor('')
        setBookCategory('')
    }
   }, [response.succes])
   */
  
  return (
    <form onSubmit={handleSubmit}>
        <h2>What do I want to read?</h2>
        <label>
            <span>Book title:</span>
            <input
            required
            type="text"
            onChange={(e) => setBookTitle(e.target.value)}
            value={bookTitle}
            />
        </label>
        <label>
            <span>Book author:</span>
            <input
            required
            type="text"
            onChange={(e) => setBookAuthor(e.target.value)}
            value={bookAuthor}
            />
        </label>
        <label>
            <span>Book category:</span>
            <input
            required
            type="text"
            onChange={(e) => setBookCategory(e.target.value)}
            value={bookCategory}
            />
        </label>
        <button>Add book to the list</button>
    </form>
  )
}
