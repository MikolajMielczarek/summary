import { useState } from "react"
import { useAuthContext } from "../../hooks/useAuthContext"
import BookList from "./BookList"
import BookForm from "./BookForm"

import { useCollection } from "../../hooks/useCollection"
import BookFormAlreadyRead from "./BookFormAlreadyRead"


export default function Books() {
  const [isPending, setIsPending] = useState(false)

  const { user } = useAuthContext()

  // query that is responsible for gives proper data
  //to right user ["uid", "==", user.uid]
  const { documents, error } = useCollection(
    'books',
    ["uid", "==", user.uid],
    ['createdAt', 'desc']
    )


  return (

    <section className="books">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {documents &&
        <>
          <BookForm uid={user.uid}/>
          <BookFormAlreadyRead uid={user.uid} />
          <BookList books={documents}/>
        </>
      }
    </section>
    
  )
}
