import Trashcan from '../assets/trashcan.svg'
import { projectFirestore } from "../firebase/config"


export default function BookList({ books }) {

    if (books.length === 0) {
        return <div className="error">No books to load...</div>
    }

    const handleClick = (id) => {
        projectFirestore.collection('books').doc(id).delete()
    }

    return (
        <div className="book-list">
            {books.map(book => (
                <div key={book.id} className={`card`}>
                    <h3>{book.title}</h3>
                    <p>{book.author}</p>
                    <img
                        className="delete"
                        onClick={() => handleClick(book.id)}
                        src={Trashcan} alt="delete icon"
                    />
                </div>
            ))}
        </div>
    )
}
