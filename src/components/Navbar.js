import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'


export default function Navbar() {

    const { logout } = useLogout()

    const { user } = useAuthContext()

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

            
                {!user && 
                <>
                    <li>
                        <button><Link to="/register">Register</Link></button>
                    </li>
                    <li>
                        <button><Link to="/login">Login</Link></button>
                    </li>
                </>}
            
            
                {user && 
                <>
                    <li>hello, {user.displayName}</li>
                    <li>
                        <button className='btn' onClick={logout}>Logout</button>
                    </li>
                </>
                }
            

        </ul>
    </nav>
  )
}
