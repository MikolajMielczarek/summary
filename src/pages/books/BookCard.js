import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'

export default function BookCard({ books }) {
    const {id} = useParams()
    const navigate = useNavigate()
    const params = useParams()

    const [currentBook, setCurrentBook] = useState(null)

    useEffect(()=> {
        if(books){
            const newBook = books.filter(book => book.id === id)[0]
            setCurrentBook(newBook)
        }
    },[books, id])

    console.log(params)
    console.log(currentBook)

  return (
    <div className='book__bookcard'>{currentBook && currentBook.bookTitle}
    
    <button onClick={()=>{
        navigate(-1)
    }}>X</button>

    </div>
  )
}
