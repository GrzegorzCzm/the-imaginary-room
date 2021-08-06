import React from 'react';

const Title = ({dispContent, nextButton}) => {
    return(
      <div className='title' onClick={() => nextButton(dispContent.next)}>
        <h1>{dispContent.text}</h1>
      </div>
    )
  }  //First I defined the button like that: <button onClick={nextButton(dispContent.next)}>next</button> and noticed that it is triggered even when I don't click the button. This is because when it is like that, this is a function call, not a function. So I was calling the function instead of passing the function to onClick

export default Title;