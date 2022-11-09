import React, { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { Routes, Route } from 'react-router'

import SubtaskList from './SubtaskList'
import SubtaskCard from './SubtaskCard'
import SubtaskForm from './SubtaskForm'

export default function Subtask({ task, id, uid, dateStringTimestamp }) {

  const [subtaskName, setSubtaskName] = useState('')
  const [subtaskDescription, setSubtaskDescription] = useState('')
  const [subtaskDeadline, setSubtaskDeadline] = useState('')
  const [subtaskPriority, setSubtaskPriority] = useState('')
  const [subtaskStatus, setSubtaskStatus] = useState('')
  const [subtaskManyTotal, setSubtaskManyTotal] = useState('')
  const [subtaskManySpend, setSubtaskManySpend] = useState('')
  const [subtaskManyLeft, setSubtaskManyLeft] = useState('')
  const [subtaskTimeTotal, setSubtaskTimeTotal] = useState('')
  const [subtaskTimeDone, setSubtaskTimeDone] = useState('')
  const [subtaskTimeLeft, setSubtaskTimeLeft] = useState('')
  const [showDetailsSubtask, setDetailsSubtask] = useState(false)

  return (
    <>
      <section className='subtask'>
          <SubtaskList
            task={task}
            subtasks={task.taskSubtasks}
            uid={uid}
            dateStringTimestamp={dateStringTimestamp}
          />
        {showDetailsSubtask && 
          <aside className='tasks__content'>
              <SubtaskCard
                subtasks={task.taskSubtasks}
              />
          </aside>
        }
      </section>
      <Routes>
          <Route
            path="tasks/subtask-new"
            element={<SubtaskForm
                      subtasks={task.taskSubtasks}
                      task={task}
                      id={id}
                      uid={uid}
                    />}
          >
          </Route>
      </Routes>
    </>
  )
}
