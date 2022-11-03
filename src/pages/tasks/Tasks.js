import React, { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import { NavLink } from 'react-router-dom'


import { Routes, Route } from 'react-router'

import TaskCard from './TaskCard'
import TaskList from './TaskList'
import TaskForm from './TaskForm'
import SubtaskList from '../subtask/SubtaskList'
import Plus from '../../assets/circle-plus-solid.svg'


export default function Tasks() {
  const [isPending, setIsPending] = useState(false)

  const { user } = useAuthContext()
  const { documents, error } = useCollection(
    'tasks',
    ["uid", "==", user.uid],
    ['createdAt', 'desc']
    )

  const dateStringTimestamp = (time) => {
    const timeCreation = new Date(time.seconds * 1000).toLocaleString();
    return timeCreation;
  }

  return (
    <>
      <section className='tasks'>
        <div className='tasks__infromations'>
          <h2 className='tasks__infromations-header'>Tasks List</h2>
          <NavLink
            className='tasks__infromations-link'
            to='task-form'>
            <img
              className='tasks__infromations-link-img'
              src={Plus} alt="edit icon"
            />
        </NavLink>

        </div>
        {error && <p className='error'>{error}</p>}
        {isPending && <p className="loading">Loading...</p>}
        {documents &&
          <>
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
          </>
        }
      </section>
      <Routes>
        <Route path="task-form" element={<TaskForm uid={user.uid}/>}>
        </Route>
        <Route path=":id/*" element={<TaskCard uid={user.uid} tasks={documents} dateStringTimestamp={dateStringTimestamp}/>}>
        </Route>
      </Routes>
    </>
  )
}
 