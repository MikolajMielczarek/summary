import React from 'react'
import { useState } from 'react'
import { useFirestore } from '../../hooks/useFirestore'
import { useNavigate } from 'react-router'

export default function TaskForm({ uid }) {
    const { addDocument, response } = useFirestore('tasks')
    const [taskName, setTaskName] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [taskDeadline, setTaskDeadline] = useState('')
    const [taskPriority, setTaskPriority] = useState('')
    const [taskStatus, setTaskStatus] = useState('')
    const [taskSubtasks, setTaskSubtasks] = useState([])

    const navigate = useNavigate()

    // const resetForm = () =>{
    //     setTaskName('')
    //     setTaskDescription('')
    //     setTaskDeadline('')
    //     setTaskPriority('')
    //     setTaskStatus('')
    // }

    const handleSubmit = (e) => {
        e.preventDefault()
        addDocument({
            uid,
            taskName,
            taskDescription,
            taskDeadline,
            taskPriority,
            taskStatus,
            taskSubtasks
        })
        
        navigate(-1)
    }

    console.log(response)
    
  return (
    <section className='form-task'>
        <div className='form-task__bgc'></div>
        <div className='form-task__content'>
            <form className='form-task__form' onSubmit={handleSubmit}>
                <button type = "button" className='form-task__form-back-btn' onClick={()=>{navigate(-1)}}>X</button>
                <h2 className='form-task__form-header'>NEW TASK</h2>
                <label className='form-task__form-container'>
                    <span className='form-task__form-container-txt'>Name</span>
                    <input
                        className='form-task__form-container-input'
                        required
                        type="text"
                        onChange={(e) => setTaskName(e.target.value)}
                        value={taskName}
                    />
                </label>
                <label className='form-task__form-container'>
                    <span className='form-task__form-container-txt'>Description</span>
                    <input
                        className='form-task__form-container-input'
                        required
                        type="text"
                        onChange={(e) => setTaskDescription(e.target.value)}
                        value={taskDescription}
                    />
                </label>
                <label className='form-task__form-container'>
                    <span className='form-task__form-container-txt'>Deadline</span>
                    <input
                        className='form-task__form-container-input'
                        required
                        type="date"
                        onChange={(e) => setTaskDeadline(e.target.value)}
                        value={taskDeadline}
                    />
                </label>
                <label className='form-task__form-container' htmlFor="priority">
                    <span className='form-task__form-container-txt'>Priority</span>
                    <select
                        className='form-task__form-container-select'
                        id="priority"
                        name="priority"
                        required
                        onChange={(e) => setTaskPriority(e.target.value)}
                        value={taskPriority}
                    >
                        <option className='form-task__form-container-select-option' value="" >--Choose an option--</option>
                        <option className='form-task__form-container-select-option' value="1" >1 - neutral</option>
                        <option className='form-task__form-container-select-option' value="2" >2 - middle</option>
                        <option className='form-task__form-container-select-option' value="3" >3 - high</option>
                    </select>
                </label>
                <label className='form-task__form-container' htmlFor="status">
                    <span className='form-task__form-container-txt'>Status</span>
                    <select
                        className='form-task__form-container-select'
                        id="status"
                        name="status"
                        required
                        onChange={(e) => setTaskStatus(e.target.value)}
                        value={taskStatus}
                    >
                        <option className='form-task__form-container-select-option' value="" >--Choose an option--</option>
                        <option className='form-task__form-container-select-option' value="1" >NOT started</option>
                        <option className='form-task__form-container-select-option' value="2" >IN progress</option>
                        <option className='form-task__form-container-select-option' value="3" >finished</option>
                    </select>
                </label>
                <button className='form-task__form-btn'>ADD</button>
            </form>
        </div>
    </section>
  )
}
