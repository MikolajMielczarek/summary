import React, { useState } from 'react'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { Routes, Route } from 'react-router'

import SubtaskList from './SubtaskList'
import SubtaskCard from './SubtaskCard'
import SubtaskForm from './SubtaskForm'

export default function Subtask({ subtasks, operationsOnSubtask, uid }) {

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

  const [detailsSubtask, setDetailsSubtask] = useState(false)

  return (
    <>
      <section className='subtask'>
        <aside className='subtask__subtask'>
          <SubtaskList
            subtasks={subtasks}
            operationsOnSubtask={operationsOnSubtask}
            uid={uid}
          />
        </aside>
        {detailsSubtask && 
          <aside className='tasks__content'>
              <SubtaskCard subtasks={subtasks} operationsOnSubtask={operationsOnSubtask}/>
          </aside>
        }
      </section>
      <Routes>
          <Route path="task/subtask-new" element={<SubtaskForm uid={uid} operationsOnSubtask={operationsOnSubtask}/>}>
          </Route>
      </Routes>
    </>
  )
}
