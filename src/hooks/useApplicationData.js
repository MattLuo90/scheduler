import React, {useEffect, useState} from "react";
import axios from 'axios';


export default function useApplication() {
  
  const setDay = day => setState(prev => ({ ...prev, day }));
  
  
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });
  
  
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ])
    .then(all => {
        setState(prev => ({ 
          ...prev, 
          days: all[0].data, 
          appointments: all[1].data, 
          interviewers: all[2].data
        }));
      })
  }, [])
  
  const bookInterview= (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const daySpot = state.days.filter(item => item.appointments.includes(id))

    const newDaySpot ={
      ...daySpot[0],
      spots: Number(daySpot[0].spots) - 1
    }
    const newDayIndex = state.days.findIndex(item => item.appointments.includes(id))

    const newDaysObject = {
      ...state.days,
      [newDayIndex] : newDaySpot
    }
    const days = []
    for (let obj in newDaysObject) {
      days.push(newDaysObject[obj])
    }
    
    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        setState({
        ...state,
        appointments,
        days 
      })
    })
  }
  
  function cancelInterview(id) {
    const interview = null
    const appointment = {
      ...state.appointments[id],
      interview
    };
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const daySpot = state.days.filter(item => item.appointments.includes(id))

    const newDaySpot ={
      ...daySpot[0],
      spots: Number(daySpot[0].spots) + 1
    }
    const newDayIndex = state.days.findIndex(item => item.appointments.includes(id))

    const newDaysObject = {
      ...state.days,
      [newDayIndex] : newDaySpot
    }

    const days = []
    for (let obj in newDaysObject) {
      days.push(newDaysObject[obj])
    }
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        setState({
        ...state,
        appointments,
        days
      })
    })
  }
  return {setDay, state, cancelInterview, bookInterview}
}
