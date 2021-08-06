import React from 'react';

const Dialogue = ({dispContent, nextButton}) => { 
    return(
      <div className="dialogue" onClick={() => nextButton(dispContent.next)}>
        <div className="dialogue_speaker center_content">{dispContent.speaker}</div>
        <div className="dialogue_inner center_content">{dispContent.text}</div>
      </div>
    )
  }

export default Dialogue;