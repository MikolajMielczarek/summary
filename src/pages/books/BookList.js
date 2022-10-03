import React from 'react'
import Trashcan from '../../assets/trashcan.svg'
import { useFirestore } from '../../hooks/useFirestore'


export default function BookList({ books }) {

    const { deleteDocument } = useFirestore('books')

    if (books.length === 0) {
        return <div className="error">No books to load...</div>
    }

    let bookFilterAlreadyRead = books.filter((book) => {
        return book.bookRead === true
    })

    let bookFilterToRead = books.filter((book) => {
        return book.bookRead === false
    })

    return (
        <section className='books__list list'>
            <h2 className='list__header'>Books to read</h2>
            <ul className="list__list">
                {bookFilterToRead.map(book => (
                    <li key={book.id} className='list__list-card'>
                        <h3 className='list__list-card-header'>{book.bookTitle}</h3>
                        <p className='list__list-card-txt'>{book.bookAuthor}</p>
                        <p className='list__list-card-txt'>{book.bookStarRecomendation}</p>
                        <img
                            className="delete"
                            onClick={() => deleteDocument(book.id)}
                            src={Trashcan} alt="delete icon"
                        />
                    </li>
                ))}
            </ul>
            <h2 className='list__header'>Books already read</h2>
            <ul className="list__list">        
                {bookFilterAlreadyRead.map(book => (
                    <li key={book.id} className='list__list-card'>
                        <h3 className='list__list-card-header'>{book.bookTitle}</h3>
                        <p className='list__list-card-txt'>{book.bookAuthor}</p>
                        <p className='list__list-card-txt'>{book.bookStarRecomendation}</p>
                        <p className='list__list-card-txt'>{book.bookStarAfter}</p>
                        <img
                            className='list__list-card-delete'
                            onClick={() => deleteDocument(book.id)}
                            src={Trashcan} alt="delete icon"
                        />
                    </li>
                ))}
            </ul>
        </section>
    )
}
