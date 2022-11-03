import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import TaskForm from './pages/tasks/TaskForm';
import Navbar from './components/Navbar';
import Books from './pages/books/Books';
import Calendar from './pages/Calendar';
import Home from './pages/Home';
import Time from './pages/date/Time';
import Tasks from './pages/tasks/Tasks'; 
import FavoritePages from './pages/FavoritePages';
import Weather from './pages/Weather';
import About from './pages/About';
import Login from './pages/auth/Login';
import { useAuthContext } from './hooks/useAuthContext';
import Contact from './pages/Contact';
import Register from './pages/auth/Registration'
import './css/styles.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDate } from './redux/timeSlice';
import NavbarMUI from './components/NavbarMUI';


function App() {
  const { authIsReady, user } = useAuthContext()

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
  },[dateData.data])
  */

  return (
    <main className='page-container'>
      {authIsReady && 
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="tasks/*" element={!user ? <Navigate to="/" /> : <Tasks />} />
            <Route path="books/*" element={!user ? <Navigate to="/" /> : <Books />} />
            <Route path="favorite-pages" element={<FavoritePages />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="time" element={<Time />} />
            <Route path="weather" element={<Weather />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="register"
              element={user ? <Navigate to="/" /> : <Register />} />
            <Route path="/login"
              element={user ? <Navigate to="/" /> : <Login />} />
            {/* <Route path='*' element={<Navigate to='/' />} /> */}
          </Routes>
        </BrowserRouter>
      }
    </main>
  );
}

export default App;

/*
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


<Route exact path="/" element={<Home times={times} errors={errors} loadings={loadings} getTimeFromData={getTimeFromData}/>} />

<Route path="/time" element={<Time times={times} errors={errors} loadings={loadings} getTimeFromData={getTimeFromData}/>} />
*/