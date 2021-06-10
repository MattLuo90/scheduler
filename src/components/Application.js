import React, { useState, Fragment, useEffect } from "react";
import DayList from 'components/DayList';
import Appointment from "components/Appointment";
import axios from 'axios';
import { getAppointmentsForDay, getInterview } from 'helpers/selectors';
import "components/Application.scss";



export default function Application(props) {

  const setDay = day => setState(prev => ({ ...prev, day }));
  // const setDays = days => setState(prev => ({ ...prev, days }));

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ])
      .then(all => {
        console.log(all)
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      })
  }, [])




  const items = dailyAppointments.map((item) => {
    const interview = getInterview(state, item.interview)
    return (
      <Appointment
        key={item.id}
        id={item.id}
        time={item.time}
        interview={interview} />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <Fragment>
          {items}
          <Appointment key="last" time="5pm" />
        </Fragment>
      </section>
    </main>
  );
}

