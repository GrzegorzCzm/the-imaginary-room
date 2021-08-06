import React, {useState} from 'react';

const Input = ({dispContent, nextButton, saveInput}) => {
    const [inputValue, setInputValue] = useState('');
  
    const inputChange = (event) => {
      setInputValue(event.target.value);
    }
  
    return(
      <div className="value_input center_content">
        <p>{dispContent.text}</p>
        <input className="input_textarea" onChange={inputChange} value={inputValue}></input>
        <button className="enter_input_button" onClick={() => {
          saveInput(dispContent.input_name, inputValue)
          nextButton(dispContent.next)
        }}>OK</button>
      </div>
    )
  }

export default Input;