import { createSlice } from '@reduxjs/toolkit'
import axios from '../apis/timeAxios'
import useAxiosTime from '../hooks/useAxiosTime'


export const timeSlice = createSlice({
  name: 'dataForDate',
  initialState: {
    data: {
      "abbreviation":"CEST","client_ip":"78.8.70.128","datetime":"2022-09-08T17:00:59.001252+02:00","day_of_week":4,"day_of_year":251,"dst":true,"dst_from":"2022-03-27T01:00:00+00:00","dst_offset":3600,"dst_until":"2022-10-30T01:00:00+00:00","raw_offset":3600,"timezone":"Europe/Warsaw","unixtime":1662649259,"utc_datetime":"2022-09-08T15:00:59.001252+00:00","utc_offset":"+02:00","week_number":36
    }
  },
  reducers: {
    getTimeData: (state, action) => {
      state.data = [action.payload];
    }
  },
})

export const getDataDate = () => (dispatch) => {
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

    if(time){
      dispatch(getTimeData(time))
    }

    if(error){
      throw new Error('Axios get data from time api does not work')
    }

  };


export const { getTimeData } = timeSlice.actions
// Action creators are generated for each case reducer function

export default timeSlice.reducer