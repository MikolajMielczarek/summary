import React, { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'

import { Routes, Route } from 'react-router'

import TaskCard from './TaskCard'
import TaskList from './TaskList'
import TaskForm from './TaskForm'
import SubtaskList from './subtask/SubtaskList'

export default function Tasks() {
  const [isPending, setIsPending] = useState(false)

  const { user } = useAuthContext()
  const { documents, error } = useCollection(
    'tasks',
    ["uid", "==", user.uid],
    ['createdAt', 'desc']
    )

  const dateStringTimestamp = (time) => {
    const timeCreation = new Date(time.seconds * 1000).toLocaleString()
    return timeCreation;
  }

  return (
    <>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {documents && 
        <section className='tasks'>
          <aside className='tasks__tasks'>
            <TaskList
              uid={user.uid}
              tasks={documents}
              dateStringTimestamp={dateStringTimestamp}
            />
          </aside>
          <section className='tasks__content'>
              <TaskCard tasks={documents} dateStringTimestamp={dateStringTimestamp}/>
          </section>
        </section>
      }
      <Routes>
        <Route path="task-form" element={<TaskForm uid={user.uid}/>}>
        </Route>
        <Route path=":id/*" element={<TaskCard uid={user.uid} tasks={documents} dateStringTimestamp={dateStringTimestamp}/>}>
        </Route>
      </Routes>
    </>
  )
}
 