import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useFirestore } from '../../hooks/useFirestore'
import produce from 'immer'

export default function SubtaskForm({ task, id, uid, operationsOnSubtask }) {
  // const { addDocument, response } = useFirestore('tasks')

  const { editDocument, deleteDocument, response } = useFirestore('tasks')


  const [currentTask, setCurrentTask] = useState('')
  // const [currentSubtasks, setCurrentSubtasks] = useState([])

  const [idSubtask, setIdSubtask] = useState('')
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
  const [currentSubtask, setCurrentSubtask] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    let idSubtask = String(new Date().getTime())
    if (task) {
      setCurrentTask(task)
      setIdSubtask(idSubtask)
      // setCurrentSubtasks(task.taskSubtasks)
    }
  }, [task, id])

  const resetForm = () => {
    // setCurrentSubtasks([])
    setSubtaskDescription('')
    setSubtaskDeadline('')
    setSubtaskPriority('')
    setSubtaskStatus('')
    setSubtaskManyTotal('')
    setSubtaskManySpend('')
    setSubtaskManyLeft('')
    setSubtaskTimeTotal('')
    setSubtaskTimeDone('')
    setSubtaskTimeLeft('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
  
    const subtask = {
      idSubtask,
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
    }
    setCurrentSubtask(
      {
        idSubtask,
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
      }
    )

    const newSubtask = produce(currentTask, (draft) => {
      draft.taskSubtasks.push(subtask)
    })
    editDocument(id, newSubtask)
    console.log(newSubtask)
    resetForm()
    navigate(-1)
  }

  return (
    <section className='form-subtask'>
      <div className='form-subtask__bgc'></div>
      <div className='form-subtask__content'>
        <form className='form-subtask__form' onSubmit={handleSubmit}>
          <button className='form-subtask__form-back-btn' onClick={() => { navigate(-1) }}>X</button>
          <h2 className='form-subtask__form-header'>NEW SUBTASK</h2>
          <label className='form-subtask__form-container'>
            <span className='form-subtask__form-container-txt'>Name</span>
            <input
              className='form-subtask__form-container-input'
              required
              type="text"
              onChange={(e) => setSubtaskName(e.target.value)}
              value={subtaskName}
            />
          </label>
          <label className='form-subtask__form-container'>
            <span className='form-subtask__form-container-txt'>Description</span>
            <input
              className='form-subtask__form-container-input'
              required
              type="text"
              onChange={(e) => setSubtaskDescription(e.target.value)}
              value={subtaskDescription}
            />
          </label>
          <label className='form-subtask__form-container'>
            <span className='form-subtask__form-container-txt'>Deadline</span>
            <input
              className='form-subtask__form-container-input'
              required
              type="date"
              onChange={(e) => setSubtaskDeadline(e.target.value)}
              value={subtaskDeadline}
            />
          </label>
          <label className='form-subtask__form-container' htmlFor="priority">
            <span className='form-subtask__form-container-txt'>Priority</span>
            <select
              className='form-subtask__form-container-select'
              id="priority"
              name="priority"
              required
              onChange={(e) => setSubtaskPriority(e.target.value)}
              value={subtaskPriority}
            >
              <option className='form-subtask__form-container-select-option' value="" >--Choose an option--</option>
              <option className='form-subtask__form-container-select-option' value="1" >1 - neutral</option>
              <option className='form-subtask__form-container-select-option' value="2" >2 - middle</option>
              <option className='form-subtask__form-container-select-option' value="3" >3 - high</option>
            </select>
          </label>
          <label className='form-subtask__form-container' htmlFor="status">
            <span className='form-subtask__form-container-txt'>Status</span>
            <select
              className='form-subtask__form-container-select'
              id="status"
              name="status"
              required
              onChange={(e) => setSubtaskStatus(e.target.value)}
              value={subtaskStatus}
            >
              <option className='form-subtask__form-container-select-option' value="" >--Choose an option--</option>
              <option className='form-subtask__form-container-select-option' value="1" >NOT started</option>
              <option className='form-subtask__form-container-select-option' value="2" >IN progress</option>
              <option className='form-subtask__form-container-select-option' value="3" >finished</option>
            </select>
          </label>
          <label className='form-subtask__form-container'>
            <span className='form-subtask__form-container-txt'>Many in total</span>
            <input
              className='form-subtask__form-container-input'
              required
              type="number"
              onChange={(e) => setSubtaskManyTotal(e.target.value)}
              step="1"
              min="0"
              value={subtaskManyTotal}
            />
          </label>
          <label className='form-subtask__form-container'>
            <span className='form-subtask__form-container-txt'>Many spend</span>
            <input
              className='form-subtask__form-container-input'
              required
              type="number"
              onChange={(e) => {
                setSubtaskManySpend(e.target.value)
                setSubtaskManyLeft(subtaskManyTotal - e.target.value)
                }
              }
              step="1"
              min="0"
              max={subtaskManyTotal}
              value={subtaskManySpend}
            />
          </label>
          <label className='form-subtask__form-container'>
            <span className='form-subtask__form-container-txt'>Many left {subtaskManyLeft}$</span>
          </label>
          <label className='form-subtask__form-container'>
            <span className='form-subtask__form-container-txt'>Work time in total in days</span>
            <input
              className='form-subtask__form-container-input'
              required
              type="number"
              onChange={(e) => setSubtaskTimeTotal(e.target.value)}
              step="1"
              min="0"
              value={subtaskTimeTotal}
            />
          </label>
          <label className='form-subtask__form-container'>
            <span className='form-subtask__form-container-txt'>Work time done in days</span>
            <input
              className='form-subtask__form-container-input'
              required
              type="number"
              onChange={(e) => {
                  setSubtaskTimeDone(e.target.value)
                  setSubtaskTimeLeft(subtaskTimeTotal - e.target.value)
                  }
                }
              step="1"
              min="0"
              max={subtaskTimeTotal}
              value={subtaskTimeDone}
            />
          </label>
          <label className='form-subtask__form-container'>
            <span className='form-subtask__form-container-txt'>Work time left in days {subtaskTimeLeft}</span>
          </label>
          <button className='form-subtask__form-btn'>ADD</button>
        </form>
      </div>

    </section>
  )
}




  // let idSubtask = toString(new Date().getTime());
  // console.log(idSubtask)