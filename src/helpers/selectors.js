export const getAppointmentsForDay = (state, day) => {
  let filteredAppointments = state.days.filter(time => time.name === day)
  if (filteredAppointments.length === 0 || state.days.length === 0) {
    return [];
  }
  return filteredAppointments[0].appointments.map(id => state.appointments[id]);
};

export const getInterview = (state, interview) => {
  if (!interview) {
    return null;
  }
  const bookedInterview = state.interviewers[interview.interviewer];
  return {
    student: interview.student,
    interviewer: bookedInterview
  }
}

export const getInterviewersForDay = (state, day) => {
  let filteredInterviewers = state.days.filter(time => time.name === day)
  if (filteredInterviewers.length === 0 || state.days.length === 0) {
    return [];
  }
  return filteredInterviewers[0].interviewers.map(id => state.interviewers[id]);
};