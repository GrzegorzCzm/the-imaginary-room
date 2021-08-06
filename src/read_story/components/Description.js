import React from 'react';

const Description = ({dispContent, nextButton}) => {
    return(
      <div className="description center_content" onClick={() => nextButton(dispContent.next)}>
        <p>{dispContent.text}</p>
      </div>
    )
  }

export default Description;