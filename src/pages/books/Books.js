import React, { useState } from "react"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useCollection } from "../../hooks/useCollection"
import { Route, Routes } from "react-router"

import BookList from "./BookList"
import BookForm from "./BookForm"
import BookFormAlreadyRead from "./BookFormAlreadyRead"
import BookCard from "./BookCard"

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

    const dateFromTimestamp = (time) => {
      let dataToDisplay = [];
      const timestampForDate = time.toDate();
      dataToDisplay[0] = [timestampForDate.getFullYear()];
      let month = timestampForDate.getMonth()+1;
      let day = timestampForDate.getUTCDate();
      
      if(month < 10){
          dataToDisplay[1] = [`0${month}`]
      }else{
          dataToDisplay[1] = [month]
      }
      if(day < 10){
          dataToDisplay[2] = [`0${day}`]
      }else{
          dataToDisplay[2] = [day]
      }
      const timeDisplay = `${dataToDisplay[2]}.${dataToDisplay[1]}.${dataToDisplay[0]}`;
      return timeDisplay;
  }

  return (
  <>
    <section className="books">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {documents &&
        <>
          <section className="books__forms">
            <BookForm uid={user.uid} />
            <BookFormAlreadyRead uid={user.uid} />
          </section>
          <BookList books={documents} dateFromTimestamp={dateFromTimestamp} />
        </>
      }
    </section>
    <Routes>
      <Route
        path=":id"
        element={<BookCard
                  books={documents}
                  dateFromTimestamp={dateFromTimestamp}
                />}
      >
      </Route>
    </Routes>
  </>
  )
}
