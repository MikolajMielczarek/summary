import { useEffect, useState } from 'react'
import { useFirestore } from '../../hooks/useFirestore'

export default function BookFormAlreadyRead({ uid }) {
   const [bookTitle, setBookTitle] = useState('')
   const [bookAuthor, setBookAuthor] = useState('')
   const [bookStarRecomendation, setBookStarRecomendation] = useState('')
   const [bookStarAfter, setBookStarAfter] = useState('')
   const [bookRead, setBookRead] = useState(true)

   const { addDocument, response } = useFirestore('books')

   const resetForm = () => {
        setBookTitle('')
        setBookAuthor('')
        setBookStarRecomendation('')
        setBookStarAfter('')
   }

   const handleSubmit = (e) => {
    e.preventDefault()
    setBookRead(true)
    addDocument({
        uid,
        bookTitle,
        bookAuthor,
        bookStarRecomendation,
        bookStarAfter,
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
        <h2>ADD to already read list?</h2>
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
        <label htmlFor="starsA">
            <span>Stars after read:</span>
            <select id="starsA" name="starsA" required onChange={(e) => setBookStarAfter(e.target.value)} value={bookStarAfter} >
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

/*  

    <label>
        <span>Book star:</span>
        <input
        required
        type="text"
        onChange={(e) => setBookStar(e.target.value)}
        value={bookStar}
        />
    </label>

*/