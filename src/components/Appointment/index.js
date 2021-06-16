import React from 'react'
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';
import Confirm from 'components/Appointment/Confirm';
import Error from 'components/Appointment/Error';

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVE = "SAVE";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVE, true);
    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW)
      })
      .catch(() => {
        transition(ERROR_SAVE, true)
      })
  }

  function cancel() {
    transition(DELETE, true);
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY)
      })
      .catch(() => {
        transition(ERROR_DELETE, true)
      })

  }

  function confirm() {
    transition(CONFIRM)
  }
  function edit() {
    transition(EDIT)
  }
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirm}
          onEdit={edit}
        />
      )}
      {mode === CREATE && <Form
        interviewers={props.interviewers}
        onCancel={() => back()}
        onSave={save}
      />}
      {mode === SAVE && <Status message="Saving" />}
      {mode === DELETE && <Status message="Deleting" />}
      {mode === CONFIRM && <Confirm onConfirm={cancel} onCancel={back} message="Delete the appointment?" />}
      {mode === EDIT && <Form
        name={props.interview.student}
        interviewers={props.interviewers}
        interviewer={props.interview.interviewer.id}
        onCancel={() => back()}
        onSave={save} />}
      {mode === ERROR_DELETE && <Error message="could not cancel appointment" onClose={back} />}
      {mode === ERROR_SAVE && <Error message="could not save appointment" onClose={back} />}
    </article>
  )
}