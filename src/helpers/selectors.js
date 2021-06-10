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