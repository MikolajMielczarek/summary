import Link from 'react-router-dom'
import { useState } from 'react'

export default function Navbar() {

    const [user, setUser] = useState(true)

    const logout = () => {

    }

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
                        <Link to="/register">Register</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </>
            }
            {user &&
                <li>
                    <button className='btn' onClick={logout}>Logout</button>
                </li>
            }

        </ul>
    </nav>
  )
}
