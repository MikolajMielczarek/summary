import { useEffect, useState } from 'react'
import { useFirestore } from '../../hooks/useFirestore'

export default function BookForm({ uid }) {
   const [bookTitle, setBookTitle] = useState('')
   const [bookAuthor, setBookAuthor] = useState('')
   const [bookStarRecomendation, setBookStarRecomendation] = useState('')
   const [bookRead, setBookRead] = useState(false)

   const { addDocument, response } = useFirestore('books')

   const resetForm = () => {
        setBookTitle('')
        setBookAuthor('')
        setBookStarRecomendation('')
   }

   const handleSubmit = (e) => {
    e.preventDefault()
    addDocument({
        uid,
        bookTitle,
        bookAuthor,
        bookStarRecomendation,
        bookRead,
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
        <h2>To read ?</h2>
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
        <label htmlFor="starsR">
            <span>Stars recomendation</span>
            <select id="starsR" name="starsR" required onChange={(e) => setBookStarRecomendation(e.target.value)} value={bookStarRecomendation} >
                <option value="">--Choose an option--</option>
                <option value="0" >0 - impossible to finish</option>
                <option value="1" >1 - bad</option>
                <option value="2" >2 - not bad not good</option>
                <option value="3" >3 - have a good moments</option>
                <option value="4" >4 - good</option>
                <option value="5" >5 - must read</option>
            </select>
        </label>
        <button>Add book to the list</button>
    </form>
  )
}
