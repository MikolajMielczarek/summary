import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import timeSlice from './timeSlice';

export default configureStore({
    reducer: {
        counter: counterReducer,
        time: timeSlice,
    }
})