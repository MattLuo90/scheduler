import {useEffect, useReducer} from "react";
import axios from 'axios';
import reducer, {
  SET_APPLICATION_DATA,
  SET_DAY,
  SET_INTERVIEW
} from 'helpers/reducer';
 

export default function useApplication() {
  
  const setDay = day => dispatch({ type: SET_DAY, day: day });
  
  
  const [state, dispatch] = useReducer(reducer, {
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
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      });
    });
  }, []);
  
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
    

    dispatch({
      type: SET_INTERVIEW,
      appointments,
      days
    });
    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
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

    dispatch({
      type: SET_INTERVIEW,
      appointments,
      days
    });
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
  }

  return {setDay, state, cancelInterview, bookInterview}
}
