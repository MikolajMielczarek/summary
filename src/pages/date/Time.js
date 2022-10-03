import { getTimeFromData } from "./getTimeFromData"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { getDate } from "../../redux/timeSlice";

export default function Time() {
  



  return (
    <aside className="time">
            <h2 className="time__header">Clock</h2>

    </aside>
  )
}


/* 

const [times, setTimes] = useState(false)
  const [errors, setErrors] = useState(null)
  const [loadings, setLoadings] = useState(null)

  const dispatch = useDispatch()
  dispatch(getDate())
  const dateData = useSelector((state) => state.time)  

  useEffect(() => {
    setInterval(()=> {
      dispatch(getDate())
    },1000)
  }, [])

  useEffect(() => {
    setTimes(dateData.data)
    setErrors(dateData.message)
    setLoadings(dateData.loading) 
  },[dateData.data, dateData.message, dateData.loading])

            {loadings && <p className="time__clock">{getTimeFromData(times.datetime)}</p>}
            {!loadings && errors && <p className="errMsg">{errors}</p>}
            {!loadings && !errors && times && <p className="time__clock">{getTimeFromData(times.datetime)}</p>}
            {!loadings && !errors && !times && <p className="time__clock">No time from API.</p>}

*/