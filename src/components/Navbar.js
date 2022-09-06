import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'

export default function Navbar() {

    const { logout } = useLogout()

  return (
    <nav>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/todo">Todo</Link>
            </li>
            <li>
                <Link to="/books">Books</Link>
            </li>
            <li>
                <Link to="/calendar">Calendar</Link>
            </li>
            <li>
                <Link to="/time">Time</Link>
            </li>
            <li>
                <Link to="/weather">Weather</Link>
            </li>
            <li>
                <Link to="/about">AboutMe</Link>
            </li>

            
                <>
                    <li>
                        <button><Link to="/register">Register</Link></button>
                    </li>
                    <li>
                        <button><Link to="/login">Login</Link></button>
                    </li>
                </>
            
            
                <li>
                    <button className='btn' onClick={logout}>Logout</button>
                </li>
            

        </ul>
    </nav>
  )
}
