import React from 'react'
import Counter from '../components/Counter'
import Jokes from '../components/Jokes'
import ProgramersQuotes from '../components/ProgramersQuotes'
import Posts from '../components/Posts'
import Time from './date/Time'
import Details from './date/Details'
import { useAuthContext } from '../hooks/useAuthContext'

export default function Home({times, errors, loadings, getTimeFromData}) {

    const { user } = useAuthContext()

  return (

    <main className='page-container_main main'>
        <Time times={times} errors={errors} loadings={loadings} getTimeFromData={getTimeFromData} />

        {!user && <div className='main__welcome'>
                    <h2>Please register or login to see your own data</h2>
                    <p>Here you will see them!</p>
                </div>}
        {user &&
        <React.Fragment>
            <section className='main__section'>
                <div className='main__welcome'>
                    <h2>{user.displayName}</h2>
                    <p>Here are my important data</p>
                </div>
                <div className='main__my-data'>

                    <div className='main__tasks'>
                        <h2>Tasks</h2>
                        <p>Left: 6. ASAP: 2</p>
                        <p>Complited: 9</p>
                    </div>

                    <div className='main__books'>
                        <h2>Books</h2>
                        <p>Waiting: 2. !import: 1</p>
                        <p>Read: 19</p>
                    </div>

                    <div className='main__calendar'>
                        <h2>Meetings this month</h2>
                        <p>2</p>
                        <h2>Meetings next month</h2>
                        <p>1</p>
                    </div>

                </div>
            </section>

            <aside className='main_time-and-weather'>
                <div className='main_time'>
                    <p>13:27</p>
                </div>
                <div className='main_weather'>
                    <h3>Wroclaw</h3>
                    <p>Weather condition</p>
                    <p>
                        <span>temp</span>
                        <span>&deg;C</span>
                    </p>
                </div>
            </aside>
        </React.Fragment>
        }

    </main>

  )
}

/* 
<Time times={times} errors={errors} loadings={loadings} getTimeFromData={getTimeFromData} />
*/