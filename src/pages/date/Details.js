import React from 'react'

export default function Details({times, errors, loadings, getTimeFromData}) {

  return (
    <section className="container-page__expand day-expand-section">

        <div className="day-expand-section__main">

            <div className="day-expand-section__left">

                <div className="day-expand-section__left-zone">

                    <p className="day-expand-section__left-zone-txt">current timezone</p>

                    {!times && <p className="day-expand-section__left-zone-location">Loading...</p>}
                    {times && <p className="day-expand-section__left-zone-location">{times.timezone}</p>}
                    

                </div>

                <div className="day-expand-section__left-year">

                    <p className="day-expand-section__left-year-txt">day of the year</p>

                    {!times && <p className="day-expand-section__left-year-day">Loading...</p>}
                    {times && <p className="day-expand-section__left-year-day">{times.day_of_year}</p>}

                </div>

            </div>


            <div className="day-expand-section__center">

            </div>


            <div className="day-expand-section__right">

                <div className="day-expand-section__right-day-week">

                    <p className="day-expand-section__right-day-week-txt">day of the week</p>

                    {!times && <p className="day-expand-section__right-day-week-day">Loading...</p>}
                    {times && <p className="day-expand-section__right-day-week-day">{times.day_of_week}</p>}

                </div>

                <div className="day-expand-section__right-week-number">

                    <p className="day-expand-section__right-week-number-txt">week number</p>

                    {!times && <p className="day-expand-section__right-week-number-week">Loading...</p>}
                    {times && <p className="day-expand-section__right-week-number-week">{times.week_number}</p>}

                </div>

            </div>

        </div>

    </section>
  )
}

