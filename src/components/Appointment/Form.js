import React, {useState} from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";



export default function Form(props) {

  const [name, setName] = useState(props.name || '');
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const Reset = () => {
    setName("");
    setInterviewer(null)
  }

  const Cancel = () => {
    Reset();
    props.onCancel()
  }

  const save = () => {
    if (name === "") {
     return setError("Student name cannot be blank"); 
    }
    setError("");
    props.onSave(name, interviewer);
  }
  
  return (
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input
          className="appointment__create-input text--semi-bold"
          name={props.name}
          type="text"
          value={name}
          placeholder="Enter Student Name"
          onChange={(event)=>setName(event.target.value)}
          data-testid="student-name-input"
        />
      </form>
      <section className="appointment__validation">{error}</section>
      <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button onClick={Cancel} danger>Cancel</Button>
        <Button onClick={save} confirm>Save</Button>
      </section>
    </section>
  </main>
  
  )
}