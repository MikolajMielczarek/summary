import { useEffect, useState } from 'react'
import { useFirestore } from '../../hooks/useFirestore'

export default function BookForm({ uid }) {
   const [bookTitle, setBookTitle] = useState('')
   const [bookAuthor, setBookAuthor] = useState('')
   const [bookStarRecomendation, setBookStarRecomendation] = useState('')
   const [bookRead, setBookRead] = useState(false)
   const [bookStarAfter, setBookStarAfter] = useState('')
   const [bookNote, setBookNote] = useState('')
   const { addDocument } = useFirestore('books')

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
        bookStarAfter,
        bookNote,
        bookRead,
    })
    resetForm()
   }

  return (
    <form className='form' onSubmit={handleSubmit}>
        <h2 className='form__header'>ADD to read list?</h2>
        <label className='form__container'>
            <span className='form__container-txt'>Book title</span>
            <input
            className='form__container-input'
            required
            type="text"
            onChange={(e) => setBookTitle(e.target.value)}
            value={bookTitle}
            />
        </label>
        <label className='form__container'>
            <span className='form__container-txt'>Book author</span>
            <input
            className='form__container-input'
            required
            type="text"
            onChange={(e) => setBookAuthor(e.target.value)}
            value={bookAuthor}
            />
        </label>
        <label className='form__container' htmlFor="starsR">
            <span className='form__container-txt'>Stars recomendation</span>
            <select className='form__container-select' id="starsR" name="starsR" required onChange={(e) => setBookStarRecomendation(e.target.value)} value={bookStarRecomendation} >
                <option className='form__container-select-option' value="">--Choose an option--</option>
                <option className='form__container-select-option' value="0" >0 - impossible to finish</option>
                <option className='form__container-select-option' value="1" >1 - bad</option>
                <option className='form__container-select-option' value="2" >2 - not bad not good</option>
                <option className='form__container-select-option' value="3" >3 - have a good moments</option>
                <option className='form__container-select-option' value="4" >4 - good</option>
                <option className='form__container-select-option' value="5" >5 - must read</option>
                <option className='form__container-select-option' value="6" >--no recomendation--</option>
            </select>
        </label>
        <button className='form__btn'>Add book to the list</button>
    </form>
  )
}
