import Trashcan from '../assets/trashcan.svg'
import { useFirestore } from '../hooks/useFirestore'


export default function BookList({ books }) {

    const { deleteDocument } = useFirestore('books')

    if (books.length === 0) {
        return <div className="error">No books to load...</div>
    }

    return (
        <ul className="book-list">
            {books.map(book => (
                <li key={book.id} className={`card`}>
                    <h3>{book.bookTitle}</h3>
                    <p>{book.bookAuthor}</p>
                    <img
                        className="delete"
                        onClick={() => deleteDocument(book.id)}
                        src={Trashcan} alt="delete icon"
                    />
                </li>
            ))}
        </ul>
    )
}
