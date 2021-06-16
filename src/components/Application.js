import React, { Fragment } from "react";
import DayList from 'components/DayList';
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from 'helpers/selectors';
import useApplicationData from 'hooks/useApplicationData';
import "components/Application.scss";
import 'components/Application.scss';



export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const items = dailyAppointments.map((item) => {
    const interview = getInterview(state, item.interview)
    const interviewersForDay = getInterviewersForDay(state, state.day);
    return (
      <Appointment
        key={item.id}
        id={item.id}
        time={item.time}
        interview={interview}
        interviewers={interviewersForDay}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
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

