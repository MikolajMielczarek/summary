import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getDate = createAsyncThunk("time/getData", async (_arg, {rejectWithValue}) => {
  try {
    const { data } = await axios.get("https://worldtimeapi.org/api/ip/")
    return data;
  } catch (error){
    rejectWithValue(error.response.data)
  }
})

const timeSlice = createSlice({
  name: 'time',
  initialState: {
    data: [],
    isSuccesess: false,
    message: "",
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [getDate.pending]: (state) => {
        state.loading = true;
    },
    [getDate.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.isSuccesess = true;
    },
    [getDate.rejected]: (state, { payload }) => {
      state.message = payload;
      state.loading = false;
      state.isSuccesess = false;
    },
  },
})

export default timeSlice.reducer