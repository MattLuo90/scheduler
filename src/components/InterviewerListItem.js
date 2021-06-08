import React from "react";
import "components/InterviewerListItem.scss";
import classNames from 'classnames';

const InterviewerListItem = props => {
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
    "interviewers__item-image":props.avatar,
  });
  return (
    <li onClick={()=>props.setInterviewer(props.name)} className={interviewerClass} >
      <img
        className='interviewers__item-image'
        src={props.avatar}
        alt={props.name}
      />
  {props.selected && props.name}
    </li>

  )
}

export default InterviewerListItem;