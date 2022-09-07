import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Books from './pages/Books';
import Calendar from './pages/Calendar';
import Home from './pages/Home';
import Time from './pages/Time';
import Todo from './pages/Todo';
import FavoritePages from './pages/FavoritePages';
import Weather from './pages/Weather';
import About from './pages/About';
import Register from './pages/Registration';
import Login from './pages/Login';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
const { authIsReady, user } = useAuthContext()

  return (
    <div className='page-container'>
      {authIsReady && 
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/books" element={!user ? <Navigate to="/" /> : <Books />} />
            <Route path="/favorite-pages" element={<FavoritePages />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/time" element={<Time />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/about" element={<About />} />
            <Route path="/register"
              element={user ? <Navigate to="/" /> : <Register />} />
            <Route path="/login"
              element={user ? <Navigate to="/" /> : <Login />} />
          </Routes>
        </BrowserRouter>
      }
    </div>
  );
}

export default App;
