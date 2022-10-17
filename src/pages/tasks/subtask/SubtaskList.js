import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useFirestore } from '../../../hooks/useFirestore'

import Plus from '../../../assets/circle-plus-solid.svg'

export default function SubtaskList({subtasks, operationsOnSubtask, uid}) {

  const [copySubtasks, setCopySubtasks] = useState('')
  const { deleteDocument, editDocument } = useFirestore('tasks')

  useEffect(()=> {
      setCopySubtasks(subtasks)
  },[subtasks])


  return (
    <>
      <NavLink
        className='list-container__link'
        to='task-form'>
          <img
            className='list-container__link-img'
            src={Plus} alt="edit icon"
          />
      </NavLink>
    </>
  )
}
