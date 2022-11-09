import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useFirestore } from '../../hooks/useFirestore'
import produce from 'immer'
import Trashcan from '../../assets/trashcan.svg'
import HideDetailsAndEdit from '../../assets/angles-left-solid.svg'

import Edit from '../../assets/pen-to-square-solid.svg'

export default function SubtaskCard({ idForSubtask, subtasks, task, uid, dateStringTimestamp, changeDetails }) {


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
  const [editPending, setEditPending] = useState(false)


  // const { id } = useParams()
  const navigate = useNavigate()
  // const params = useParams()

  const { editDocument, deleteDocument, response } = useFirestore('tasks')

  const [currentSubtask, setCurrentSubtask] = useState(null)
  console.log(currentSubtask)

  useEffect(() => {

    if(subtasks){
      console.log(idForSubtask)

      const newSubtask = subtasks.filter(subtask => subtask.idSubtask === idForSubtask)[0]
      console.log(newSubtask)
      setCurrentSubtask(newSubtask)
      setSubtaskName(newSubtask.subtaskName)
      setSubtaskDescription(newSubtask.subtaskDescription)
      setSubtaskDeadline(newSubtask.subtaskDeadline)
      setSubtaskPriority(newSubtask.subtaskPriority)
      setSubtaskStatus(newSubtask.subtaskStatus)
      setSubtaskManyTotal(newSubtask.subtaskManyTotal)
      setSubtaskManySpend(newSubtask.subtaskManySpend)
      setSubtaskManyLeft(newSubtask.subtaskManyLeft)
      setSubtaskTimeTotal(newSubtask.subtaskTimeTotal)
      setSubtaskTimeDone(newSubtask.subtaskTimeDone)
      setSubtaskTimeLeft(newSubtask.subtaskTimeLeft)
    }
  }, [subtasks, idForSubtask])

  const editHandle = () => {
    setEditPending(true);
  }
  
  const resetForm = () => {
    setCurrentSubtask('')
      setSubtaskName('')
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

  const submitChange = (e) => {
      e.preventDefault();
      const newSubtasks = produce(currentSubtask, (draft) => {
        draft.subtaskName = subtaskName;
        draft.subtaskDescription = subtaskDescription;
        draft.subtaskDeadline = subtaskDeadline;
        draft.subtaskPriority = subtaskPriority;
        draft.subtaskStatus = subtaskStatus;
        draft.subtaskManyTotal = subtaskManyTotal;
        draft.subtaskManySpend = subtaskManySpend;
        draft.subtaskManyLeft = subtaskManyLeft;
        draft.subtaskTimeTotal = subtaskTimeTotal;
        draft.subtaskTimeDone = subtaskTimeDone;
        draft.subtaskTimeLeft = subtaskTimeLeft;
        delete draft.id;
      })
      editDocument(task.id, newSubtasks)
      setEditPending(false)
      resetForm()
    }

    if(subtasks){
      console.log(currentSubtask)

    }
    return (
      <aside className='subtasks__card card-subtasks'>
        <div className='card-subtasks__bgc'></div>
        <div className='card-subtasks__content'>
          <button onClick={() => { changeDetails(false) }}>
          <img
                        className='table__table-tbody-card-edit-link-img'
                        src={HideDetailsAndEdit}
                        alt="edit icon"
                    />
          </button>
          <div className='card-subtasks__card'>
            {currentSubtask &&
              <div className='card-subtasks__card'>
                <form className='card-subtasks__form' onSubmit={submitChange}>
                  <h2 className='card-subtasks__form-header'>{currentSubtask.subtaskName}</h2>
                  <div className='card-subtasks__form-container'>
                    {!editPending &&
                      <p className='card-subtasks__form-container-txt'>Title: {currentSubtask.subtaskName}</p>
                    }
                    {editPending &&
                      <>
                        <label className='card-subtasks__form-container-label' htmlFor="">Name
                        </label>
                        <input
                          className='card-subtasks__form-container-input'
                          type="text"
                          onChange={(e) => {
                            setSubtaskName(e.target.value)
                          }}
                          placeholder={subtaskName}
                          value={subtaskName} />
                      </>
                    }
                  </div>
                  <div className='card-subtasks__form-container'>
                    {!editPending &&
                      <p className='card-subtasks__form-container-txt'>Description: {currentSubtask.subtaskDescription}</p>
                    }
                    {editPending &&
                      <>
                        <label className='card-subtasks__form-container-label' htmlFor="">Description
                        </label>
                        <input
                          className='card-subtasks__form-container-input'
                          type="text"
                          onChange={(e) => {
                            setSubtaskDescription(e.target.value)
                          }}
                          placeholder={currentSubtask.subtaskDescription}
                          value={subtaskDescription} />
                      </>
                    }
                  </div>
                  <div className='card-subtasks__form-container'>
                    {!editPending &&
                      <p className='card-subtasks__form-container-txt'>Description: {currentSubtask.subtaskDeadline}</p>
                    }
                    {editPending &&
                      <>
                        <label className='card-subtasks__form-container-label' htmlFor="">Deadline
                        </label>
                        <input
                          className='card-subtasks__form-container-input'
                          type="date"
                          onChange={(e) => {
                            setSubtaskDescription(e.target.value)
                          }}
                          placeholder={currentSubtask.subtaskDeadline}
                          value={subtaskDeadline} />
                      </>
                    }
                  </div>
                  <div className='card-subtasks__form-container'>
                    {!editPending &&
                      <p className='card-subtasks__form-container-txt'>Priority: {currentSubtask.subtaskPriority}</p>
                    }
                    {editPending &&
                      <>
                        <label className='card-subtasks__form-container-label' htmlFor="">Priority
                        </label>
                        <select
                          className='card-subtasks__form-container-select'
                          id="priority"
                          name="priority"
                          required
                          onChange={(e) => setSubtaskPriority(e.target.value)}
                          value={subtaskPriority}
                        >
                          <option className='card-subtasks__form-container-select-option' value="" >--Choose an option--</option>
                          <option className='card-subtasks__form-container-select-option' value="1" >1 - neutral</option>
                          <option className='card-subtasks__form-container-select-option' value="2" >2 - middle</option>
                          <option className='card-subtasks__form-container-select-option' value="3" >3 - high</option>
                        </select>
                      </>
                    }
                  </div>
                  <div className='card-subtasks__form-container'>
                    {!editPending &&
                      <p className='card-subtasks__form-container-txt'>Status: {currentSubtask.subtaskStatus}</p>
                    }
                    {editPending &&
                      <>
                        <label className='card-subtasks__form-container-label' htmlFor="">Status
                        </label>
                        <select
                          className='card-subtasks__form-container-select'
                          id="status"
                          name="status"
                          required
                          onChange={(e) => setSubtaskStatus(e.target.value)}
                          value={subtaskStatus}
                        >
                          <option className='card-subtasks__form-container-select-option' value="" >--Choose an option--</option>
                          <option className='card-subtasks__form-container-select-option' value="1" >NOT started</option>
                          <option className='card-subtasks__form-container-select-option' value="2" >IN progress</option>
                          <option className='card-subtasks__form-container-select-option' value="3" >finished</option>
                        </select>
                      </>
                    }
                  </div>
                  <div className='card-subtasks__form-container'>
                    {!editPending &&
                      <p className='card-subtasks__form-container-txt'>Many in total budget: {currentSubtask.subtaskManyTotal}$</p>
                    }
                    {editPending &&
                      <label className='card-subtasks__form-container'>
                        <span className='card-subtasks__form-container-txt'>Many in total budget</span>
                        <input
                          className='card-subtasks__form-container-input'
                          required
                          type="number"
                          onChange={(e) => setSubtaskManyTotal(e.target.value)}
                          step="1"
                          min="0"
                          value={subtaskManyTotal}
                        />
                      </label>
                    }
                  </div>
                  <div className='card-subtasks__form-container'>
                    {!editPending &&
                      <p className='card-subtasks__form-container-txt'>Many spend: {currentSubtask.subtaskManySpend}$</p>
                    }
                    {editPending &&
                      <label className='card-subtasks__form-container'>
                        <span className='card-subtasks__form-container-txt'>Many spend</span>
                        <input
                          className='card-subtasks__form-container-input'
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
                    }
                  </div>
                  <div className='card-subtasks__form-container'>
                    {!editPending &&
                      <p className='card-subtasks__form-container-txt'>Many left {currentSubtask.subtaskManyLeft}$</p>
                    }
                    {editPending &&
                      <label className='card-subtasks__form-container'>
                        <span className='card-subtasks__form-container-txt'>Many left {subtaskManyLeft}$</span>
                      </label>
                    }
                  </div>
                  <div className='card-subtasks__form-container'>
                    {!editPending &&
                      <p className='card-subtasks__form-container-txt'>Work time in total in days: {currentSubtask.subtaskTimeTotal}</p>
                    }
                    {editPending &&
                      <label className='card-subtasks__form-container'>
                        <span className='card-subtasks__form-container-txt'>Work time in total in days</span>
                        <input
                          className='card-subtasks__form-container-input'
                          required
                          type="number"
                          onChange={(e) => setSubtaskTimeTotal(e.target.value)}
                          step="1"
                          min="0"
                          value={subtaskTimeTotal}
                        />
                      </label>
                    }
                  </div>
                  <div className='card-subtasks__form-container'>
                    {!editPending &&
                      <p className='card-subtasks__form-container-txt'>Work time done in days {currentSubtask.subtaskTimeDone}</p>
                    }
                    {editPending &&
                      <label className='card-subtasks__form-container'>
                        <span className='card-subtasks__form-container-txt'>Work time done in days</span>
                        <input
                          className='card-subtasks__form-container-input'
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
                    }
                  </div>
                  <div className='card-subtasks__form-container'>
                    {!editPending &&
                      <p className='card-subtasks__form-container-txt'>Work time left in days {currentSubtask.subtaskTimeLeft}</p>
                    }
                    {editPending &&
                      <label className='card-subtasks__form-container'>
                        <span className='card-subtasks__form-container-txt'>Work time left in days {subtaskTimeLeft}</span>
                      </label>
                    }
                  </div>
                  {editPending &&
                    <div className='card-subtasks__form-save'>
                      <button className='card-subtasks__form-save-btn'>
                        save
                      </button>
                    </div>
                  }
                </form>
                <div className='card-subtasks__data'>
                  <div className='card-subtasks__data-edit'>
                    <img
                      className='card-subtasks__data-edit-img'
                      onClick={() => editHandle()}
                      src={Edit}
                      alt="edit" />
                  </div>
                  <div className='card-subtasks__data-delete'>
                    <img
                      className='card-subtasks__data-delete-img'
                      onClick={() => {
                        deleteDocument(currentSubtask.id)
                        navigate(-1)
                      }
                      }
                      src={Trashcan}
                      alt="edit" />
                  </div>
                  {/* <div className='card-subtasks__data-date'>
                    <p className='card-subtasks__data-date-txt'>Creation date: {dateStringTimestamp(currentSubtask.createdAt)}</p>
                    {currentSubtask.lastEdit && <p className='card-subtasks__data-date-txt'>Last edit date: {dateStringTimestamp(currentSubtask.lastEdit)}</p>}
                    {!currentSubtask.lastEdit && <p className='card-subtasks__data-date-txt'>Last edit date: never edited</p>}
                  </div> */}
                </div>
              </div>
            }
          </div>
        </div>
      </aside>
    )
  }
