import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router'
import { useParams } from 'react-router'

import Subtask from './subtask/Subtask'
import SubtaskForm from './subtask/SubtaskForm'



export default function TaskCard({ uid, tasks, error, dateStringTimestamp}) {

  const { id } = useParams()
  console.log(id)
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

  const operationsOnSubtask =
    (
    subtaskName,
    subtaskDescription,
    subtaskDeadline,
    subtaskPriority,
    subtaskStatus,
    subtaskManyTotal,
    subtaskManySpend,
    subtaskManyLeft,
    subtaskTimeTotal,
    subtaskTimeDone,
    subtaskTimeLeft
    ) => {
      setSubtaskName(subtaskName)
      setSubtaskDescription(subtaskDescription)
      setSubtaskDeadline(subtaskDeadline)
      setSubtaskPriority(subtaskPriority)
      setSubtaskStatus(subtaskStatus)
      setSubtaskManyTotal(subtaskManyTotal)
      setSubtaskManySpend(subtaskManySpend)
      setSubtaskManyLeft(subtaskManyLeft)
      setSubtaskTimeTotal(subtaskTimeTotal)
      setSubtaskTimeDone(subtaskTimeDone)
      setSubtaskTimeLeft(subtaskTimeLeft)
    }

  useEffect(()=>{
    if(tasks){
      const choosenTask = tasks.filter(task => task.id === id)[0]
      setCurrentTask(choosenTask)
      console.log(choosenTask)
    }
  },[tasks, id])

  return (
    <section>

      {currentTask && 
        <>
          <aside className='details__task'>

          </aside>
          <aside className='details__subtasks'>
            <Subtask subtasks={currentTask.taskSubtasks} operationsOnSubtask={operationsOnSubtask} uid={uid} />
          </aside>
        </>  
      }

    </section>
  )
}
