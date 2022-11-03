import { DomElement } from 'htmlparser2';


import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useFirestore } from '../../hooks/useFirestore'

import Plus from '../../assets/circle-plus-solid.svg'
import DetailsAndEdit from '../../assets/angles-right-solid.svg'
import SubtaskCard from './SubtaskCard'

export default function SubtaskList({ task, subtasks, uid,dateStringTimestamp }) {

  const [copySubtasks, setCopySubtasks] = useState('')
  const { deleteDocument, editDocument } = useFirestore('tasks')

  const [details, setDetails] = useState(false)
  const [subtaskToEditId, setSubtaskToEditId] = useState('')

  useEffect(() => {
    setCopySubtasks(subtasks)
  }, [subtasks])

  const changeDetails = (change) => {
    setDetails(change)
  }

  return (
    <aside className='subtask__table table-subtasks'>
      <div className='table-subtasks__informations'>
        <div className='table-subtasks__informations-headers'>
          <h2 className='table-subtasks__informations-headers-header'>Subtasks List for:{task.taskName}</h2>
          <h3 className='table-subtasks__informations-headers-header'>Number of subtasks:{copySubtasks.length}</h3>
          </div>
          <NavLink className='table-subtasks__informations-link' to='tasks/subtask-new'>
            <img className='table-subtasks__informations-link-img' src={Plus} alt="edit icon"/>
          </NavLink>
      </div>
      <div className='table-subtasks__container'>
        <table className='table-subtasks__table'>
          <thead className='table-subtasks__table-thead'>
            <tr className='table-subtasks__table-thead-headers'>
              <th className='table-subtasks__table-thead-headers-header'>Name</th>
              <th className='table-subtasks__table-thead-headers-header'>Details</th>
            </tr>
          </thead>
          <tbody className='table-subtasks__table-tbody'>
            {copySubtasks && copySubtasks.map(subtask => { 
              return (
              <tr key={subtask.idSubtask} className='table-subtasks__table-tbody-card'>
                <td className='table-subtasks__table-tbody-card-edit'>
                  <button 
                  type='button' className='table-subtasks__table-tbody-card-edit-btn' onClick={(e) => {
                      setDetails(true)
                      setSubtaskToEditId(subtask.idSubtask)
                    }}>
                      <p className='table-subtasks__table-tbody-card-edit-btn-txt'>{subtask.subtaskName}</p>
                      {/* <img
                       className='table-subtasks__table-tbody-card-edit-btn-img' src={DetailsAndEdit} alt="edit icon"/> */}
                  </button>
                </td>
              </tr>
              )
            })}
          </tbody>
        </table>
        {details && subtasks && <SubtaskCard
                      idForSubtask={subtaskToEditId}
                      subtasks={subtasks}
                      task={task}
                      uid={uid}
                      dateStringTimestamp={dateStringTimestamp}
                      changeDetails={changeDetails}
                    />
        }
      </div>
    </aside>
  )
}