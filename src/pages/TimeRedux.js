import axios from '../apis/timeAxios'
import useAxiosTime from '../hooks/useAxiosTime'

import { useDispatch, useSelector } from 'react-redux'
import { getTimeData, getDataDate } from '../redux/time'


export default function TimeRedux() {

    /*
    const { data } = useSelector((state) => state.dataForDate)
    const dispatch = useDispatch()
    */

  const [time, error, loading] = useAxiosTime({
    axiosInstance: axios,
    method: 'GET',
    url: '/',
    requestConfig: {
      headers: {
        'Content-Language': 'en-US',
        'Accept': 'application/json'
      }
    }
  })

    const timeProps = new Date(time.datetime)
    const timePropsHours = timeProps.getHours()
    const timePropsMin = timeProps.getMinutes()
    const timePropsSec = timeProps.getSeconds()


  return (
        <article>


            <h2>TimeRedux</h2>

            {loading && <p>Loading...</p>}

            {!loading && error && <p className="errMsg">{error}</p>}

            {!loading && !error && time && <p>{`${timePropsHours}:${timePropsMin}:${timePropsSec}`}</p>}

            {!loading && !error && !time && <p>No quote to display.</p>}
            
        </article>
  )
}
