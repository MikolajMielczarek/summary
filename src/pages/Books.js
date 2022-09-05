import { useEffect, useState } from "react"
import { projectFirestore } from "../firebase/config"
import BookList from "../components/BookList"

export default function Books() {

  const [data, setData] = useState(null)
  const [isPending, setisPending] = useState(false)
  const [error, setError] = useState(false)

  useEffect( () => {
    setisPending(true)

    projectFirestore.collection('books').get().then((snapshot) => {
      if (snapshot.empty) {
        setError('No recepies to load')
        setisPending(false)
      } else {
        let results = []
        snapshot.docs.forEach( doc => {
          //for each doc we create new document with id and all
          // data and we pushing it to be in results array :)
          results.push({ id: doc.id, ...doc.data() })
        })
        setData(results)
        setisPending(false)
      }
    }).catch( err => {
      setError(err.message)
      setisPending(false)
    })

  }, [])

  console.log(data)

  return (

    <div className="books">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <BookList books={data}/>}
    </div>
    
  )
}
