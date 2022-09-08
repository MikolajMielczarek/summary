import React from 'react'
import Jokes from '../components/Jokes'
import MoviesQuotes from '../components/MoviesQuotes'
import Posts from '../components/Posts'
import Time from './Time'

export default function Home() {
  return (

    <main className='page-container_main main'>
        <Time />
        <MoviesQuotes />
        <Jokes />
        <Posts />
        <section className='main_section'>
            <div className='main_my-data'>

                <div className='main_todo'>
                    <h2>Todo</h2>
                    <p>Left: 6. ASAP: 2</p>
                    <p>Complited: 9</p>
                </div>

                <div className='main_books'>
                    <h2>Books</h2>
                    <p>Waiting: 2. !import: 1</p>
                    <p>Read: 19</p>
                </div>

                <div className='main_calendar'>
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

    </main>

  )
}
