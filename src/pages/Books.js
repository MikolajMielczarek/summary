import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import BookList from "../components/BookList"
import BookForm from "../components/BookForm"

import { useCollection } from "../hooks/useCollection"


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

  console.log(documents)

  return (

    <div className="books">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {documents &&
        <>
          <BookList books={documents}/>
          <BookForm uid={user.uid}/>
        </>
      }
    </div>
    
  )
}
