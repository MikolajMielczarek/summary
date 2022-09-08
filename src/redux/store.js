import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter'
import timeReducer from './time'

export default configureStore({
    reducer: {
        counter: counterReducer,
        time: timeReducer,
    }
})