import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router'
import { useParams } from 'react-router'

import Subtask from '../subtask/Subtask'
import SubtaskForm from '../subtask/SubtaskForm'



export default function TaskCard({ uid, tasks, error, dateStringTimestamp}) {

  const { id } = useParams()
  const [currentTask, setCurrentTask] = useState(null)

  const [taskName, setTaskName] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [taskDeadline, setTaskDeadline] = useState('')
  const [taskPriority, setTaskPriority] = useState(false)
  const [taskStatus, setTaskStatus] = useState(false)
  const [subtaskName, setSubtaskName] = useState('')
  const [subtaskDescription, setSubtaskDescription] = useState('')
  const [subtaskDeadline, setSubtaskDeadline] = useState('')
  const [subtaskPriority, setSubtaskPriority] = useState(false)
  const [subtaskStatus, setSubtaskStatus] = useState(false)
  const [subtaskManyTotal, setSubtaskManyTotal] = useState('')
  const [subtaskManySpend, setSubtaskManySpend] = useState('')
  const [subtaskManyLeft, setSubtaskManyLeft] = useState('')
  const [subtaskTimeTotal, setSubtaskTimeTotal] = useState('')
  const [subtaskTimeDone, setSubtaskTimeDone] = useState('')
  const [subtaskTimeLeft, setSubtaskTimeLeft] = useState('')

  useEffect(() => {
    if(tasks){
      const choosenTask = tasks.filter(task => task.id === id)[0]
      setCurrentTask(choosenTask)
      console.log(choosenTask)
    }
  },[tasks, id])

  return (
    <section className='task-card__details details'>

      {currentTask && 
        <>
          <aside className='details__task'>
            
          </aside>
          <aside className='details__subtasks'>
            <Subtask task={currentTask} id={id} uid={uid} dateStringTimestamp={dateStringTimestamp} />
          </aside>
        </>  
      }

    </section>
  )
}
