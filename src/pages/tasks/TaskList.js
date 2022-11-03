import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import produce from 'immer'
import { useFirestore } from '../../hooks/useFirestore'
import { NavLink } from 'react-router-dom'

import SubtaskForm from '../subtask/SubtaskForm'
import TaskCard from './TaskCard'

export default function TaskList({ uid, tasks, dateStringTimestamp }) {

  const [copyTasks, setCopyTasks] = useState('')
  const { deleteDocument } = useFirestore('tasks')

  useEffect(()=> {
    if(tasks){
      setCopyTasks(tasks)
    }
  },[tasks])

  if (tasks.length === 0) {
    return <div className="error">No tasks to load...</div>
  }

  return (
    <>
      <section className='tasks__list list-container'>
        <ul className='list-container__list'>
          {copyTasks && copyTasks.map(task => (
            <div className='list-container__list-container' key={task.id}>
              <NavLink
              className='list-container__list-container-link'
              to={task.id}>
                <li className='list-container__list-container-link-li'>{task.taskName}</li>
              </NavLink>
            </div>
            )) 
          }
        </ul>
      </section>
    </>
  )
}
