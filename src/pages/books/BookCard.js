import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useFirestore } from '../../hooks/useFirestore'
import Trashcan from '../../assets/trashcan.svg'
import Edit from '../../assets/pen-to-square-solid.svg'
import produce from 'immer'

export default function BookCard({ books, dateFromTimestamp }) {
    const [bookTitle, setBookTitle] = useState('')
    const [bookAuthor, setBookAuthor] = useState('')
    const [bookStarRecomendation, setBookStarRecomendation] = useState('')
    const [bookRead, setBookRead] = useState(false)
    const [bookStarAfter, setBookStarAfter] = useState('')
    const [bookNote, setBookNote] = useState('')
    const [editPending, setEditPending] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()
    const params = useParams()

    const { editDocument, deleteDocument, response } = useFirestore('books')

    const [currentBook, setCurrentBook] = useState(null)


    useEffect(()=> {
        if(books){
            const newBook = books.filter(book => book.id === id)[0]
            setCurrentBook(newBook)
            setBookTitle(newBook.bookTitle)
            setBookAuthor(newBook.bookAuthor)
            setBookStarRecomendation(newBook.bookStarRecomendation)
            setBookRead(newBook.bookRead)
            setBookStarAfter(newBook.bookStarAfter)
            setBookNote(newBook.bookNote)
        }
    },[books, id])

    console.log(params)
    console.log(currentBook)
    console.log(bookTitle)
    console.log(response)

    const editHandle = () => {
        setEditPending(true);
        console.log("działa")
    }

    const resetForm = () => {
        setCurrentBook('')
        setBookTitle('')
        setBookAuthor('')
        setBookStarRecomendation('')
        setBookRead('')
        setBookStarAfter('')
        setBookNote('')
    }

    const submitChange = (e) => {
        e.preventDefault();
        const newBooks = produce (currentBook, (draft)=>{
            draft.bookTitle = bookTitle;
            draft.bookAuthor = bookAuthor;
            draft.bookStarRecomendation = bookStarRecomendation;
            draft.bookStarAfter = bookStarAfter;
            draft.bookNote = bookNote;
            draft.bookRead = bookRead;
            delete draft.id;
        })

        const newBooks2 = {
            ...currentBook,
            bookTitle,
            bookAuthor,
            bookStarRecomendation,
            bookStarAfter,
            bookNote,
            bookRead
        }

        console.log(newBooks)
        console.log(newBooks2)
        console.log(currentBook)

        editDocument(id, newBooks2)
        setEditPending(false)
        resetForm()
    }

  return (
    <aside className='books__card card'>
        <div className='card__bgc'></div>
        <div className='card__content'>
            <button onClick={()=>{navigate(-1)}}>X</button>
            <div className='card__bookcard'>
                {currentBook &&
                <div className='card__bookcard'>
                    <form className='card__form' onSubmit={submitChange}>
                        <h2 className='card__form-header'>{currentBook.bookTitle}</h2>
                        <div className='card__form-container'>
                            {!editPending && 
                                <p className='card__form-container-txt'>Title: {currentBook.bookTitle}</p>
                            }
                            {editPending && 
                                <>
                                    <label className='card__form-container-label' htmlFor="">Title 
                                    </label>
                                    <input
                                        className='card__form-container-input'
                                        type="text"
                                        onChange={(e)=> {
                                            setBookTitle(e.target.value)
                                        }}
                                        placeholder={bookTitle}
                                        value={bookTitle} />
                                </>
                            }
                        </div>
                        <div className='card__form-container'>
                            {!editPending && 
                                <p className='card__form-container-txt'>Author: {currentBook.bookAuthor}</p>
                            }
                            {editPending && 
                                <>
                                    <label className='card__form-container-label' htmlFor="">Author 
                                    </label>
                                    <input
                                        className='card__form-container-input'
                                        type="text"
                                        onChange={(e)=> {
                                            setBookAuthor(e.target.value)
                                        }}
                                        placeholder={currentBook.bookAuthor}
                                        value={bookAuthor} />
                                </>
                            }
                        </div>
                        <div className='card__form-container'>
                            {!editPending && 
                                <p className='card__form-container-txt'>Recomendation: {currentBook.bookStarRecomendation}</p>
                            }
                            {editPending && 
                                <>
                                    <label className='card__form-container-label' htmlFor="">Recomendation
                                    </label>
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
                                </>
                            }
                        </div>
                        <div className='card__form-container'>
                            {!editPending && 
                                <p className='card__form-container-txt'>After read: {currentBook.bookStarAfter}</p>
                            }
                            {editPending && 
                                <>
                                    <label className='card__form-container-label' htmlFor="">After read
                                    </label>
                                    <select
                                        className='form__container-select'
                                        id="starsR"
                                        name="starsR"
                                        required
                                        onChange={(e) => setBookStarAfter(e.target.value)}
                                        value={bookStarAfter}
                                    >
                                        <option className='form__container-select-option'
                                            value="">--Choose an option--</option>
                                        <option className='form__container-select-option'
                                            value="0" >0 - impossible to finish</option>
                                        <option className='form__container-select-option'
                                            value="1" >1 - bad</option>
                                        <option className='form__container-select-option'
                                            value="2" >2 - not bad not good</option>
                                        <option className='form__container-select-option'
                                            value="3" >3 - have a good moments</option>
                                        <option className='form__container-select-option'
                                            value="4" >4 - good</option>
                                        <option className='form__container-select-option'
                                            value="5" >5 - must read</option>
                                        <option className='form__container-select-option'
                                            value="6" >--no recomendation--</option>
                                    </select>
                                </>
                            }
                        </div>
                        <div className='card__form-container'>
                            {!editPending && 
                                <p className='card__form-container-txt'>Note: {currentBook.bookNote}</p>
                            }
                            {editPending && 
                                <>
                                    <label className='card__form-container-label' htmlFor="">Note
                                    </label>
                                    <input
                                        className='card__form-container-input'
                                        type="text"
                                        onChange={(e)=> {
                                            setBookNote(e.target.value)
                                        }}
                                        placeholder={currentBook.bookNote}
                                        value={bookNote} />
                                </>
                            }
                        </div>
                        {editPending &&
                            <div className='card__form-save'>
                                <button className='card__form-save-btn'>
                                    save
                                </button>
                            </div>
                        }
                    </form>
                    <div className='card__data'>
                        <div className='card__data-edit'>
                                <img
                                className='card__data-edit-img'
                                onClick = {() =>  editHandle()}
                                src={Edit}
                                alt="edit" />
                        </div>
                        <div className='card__data-delete'>
                                <img
                                 className='card__data-delete-img'
                                 onClick={() =>{
                                    deleteDocument(currentBook.id)
                                    navigate(-1)
                                    }
                                }
                                 src={Trashcan}
                                 alt="edit" />
                        </div>
                        <div className='card__data-date'>
                            <p className='card__data-date-txt'>Creation date: {dateFromTimestamp(currentBook.createdAt)}</p>
                            <p className='card__data-date-txt'>Last edit date: {dateFromTimestamp(currentBook.createdAt)}</p>
                        </div>
                    </div>
                </div>
                }
            </div>
        </div>
    </aside> 
  )
}
