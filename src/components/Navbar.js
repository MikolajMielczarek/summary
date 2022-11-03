import { Link, useNavigate } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'


export default function Navbar() {

    const { logout } = useLogout();
    const { user } = useAuthContext();
    const navigate = useNavigate();

  return (
    <nav className='navigation'>
            {!user && 
                <ul className='navigation__list'>
                    <div className='navigation__list--container'>
                        <li className='navigation__list-link-container navigation__list-link-container--logout'>
                            <Link className='navigation__list-link-container-link' to="/">Home</Link>
                        </li>
                        <li className='navigation__list-link-container navigation__list-link-container--logout'>
                            <Link className='navigation__list-link-container-link' to="/about">About Me</Link>
                        </li>
                    </div>
                    <div className='navigation__container-regandlog'>
                        <button className='navigation__list-btn navigation__list-btn--register' onClick={() => navigate("/register")}>Register</button>
                        <button className='navigation__list-btn' onClick={() => navigate("/login")}>Login</button>
                    </div>
                </ul>
            }
            {user && 
                <ul className='navigation__list'>
                    <li className='navigation__list-link-container '>
                        <Link className='navigation__list-link-container-link' to="/">Home</Link>
                    </li>
                    <li className='navigation__list-link-container'>
                        <Link className='navigation__list-link-container-link' to="/tasks">Tasks</Link>
                    </li>
                    <li className='navigation__list-link-container'>
                        <Link className='navigation__list-link-container-link' to="/books">Books</Link>
                    </li>
                    <li className='navigation__list-link-container'>
                        <Link className='navigation__list-link-container-link' to="/calendar">Calendar</Link>
                    </li>
                    <li className='navigation__list-link-container'>
                        <Link className='navigation__list-link-container-link' to="/time">Time</Link>
                    </li>
                    <li className='navigation__list-link-container'>
                        <Link className='navigation__list-link-container-link' to="/weather">Weather</Link>
                    </li>
                    <li className='navigation__list-link-container'>
                        <Link className='navigation__list-link-container-link navigation__list-link-container--logout' to="/about">AboutMe</Link>
                    </li>
                    <li className='navigation__list-link-container'><p className='navigation__list-link-container-txt'>login as {user.displayName}</p>
                    </li>
                    <button className='navigation__list-btn' onClick={logout}>Logout</button>
                </ul>
            } 
    </nav>
  )
}
