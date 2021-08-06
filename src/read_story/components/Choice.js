import React, {useState} from 'react';

const Choice = ({dispContent, nextButton, saveChoice, choiceLog}) => {
    const [dispText, setDispText] = useState('');  //First, I defined this as a normal variable but it didn't change on mouse over. So I defined it as a state, so on mouse over, its value is set and the component is re-rendered, so its new value can be displayed.
    const choices = dispContent.choices;  //Choices is an array of choice objects. Each object contains choice_text, which is the text to be displayed on the buttons, and choice_long, which is the text to be displkayed on the main display when the mouse is on the choice button.
    console.log(dispContent);
    console.log(choiceLog);
    if(choiceLog.filter(c => c.root_id===dispContent.node_id).length > 0){  //I check if the same choice content was displayed before or not (if the player ever made a choice here or not)
      const chosenInfo = choiceLog.find(c => c.root_id===dispContent.node_id).info_choice_ids;  //I find the info ids stored for this choice
      const chosenProg = choiceLog.find(c => c.root_id===dispContent.node_id).prog_choice_id;  //I find the progress id stored for this choice (keep in mind there can be only 1 progress choice, so this is not an array but a value)
      const filteredChoices = choices.filter(c => c.choice_type==='info' || (c.choice_type==='progress' && chosenProg === null));  //I filter the choices to include only info choices, and progress choices are included only when no progress choice has been made before. In my story the player will need to make a progress choice if there is any but in case someone else designs a choice content which you can end without making any progress choice and then come back, I still include the progress choices here (if none has been made before of course)
      return(
        <div className="choices">
          <div className="choice_text center_content">{dispText}</div>
          <div className="choice_list">
          {filteredChoices.map(c =>
            <button key={c.c_id} className={(c.choice_type==='info' && chosenInfo.includes(c.c_id)) ? "choice_option selected_info" : "choice_option "+c.choice_type} 
            onMouseOver={() => {setDispText(c.choice_long)}} onClick={() => {
              nextButton(c.next)
              saveChoice(dispContent, c.c_id)
            }}>{c.choice_text}</button>
            )}
          </div>
        </div>
      )
    }
    else{
      return(
        <div className="choices">
          <div className="choice_text center_content">{dispText}</div>
          <div className="choice_list">
          {choices.map(c => //Listing every choice defined
            <button key={c.c_id} className={"choice_option "+c.choice_type} onMouseOver={() => {setDispText(c.choice_long)}} onClick={() => {
              nextButton(c.next)
              saveChoice(dispContent, c.c_id)
            }}>{c.choice_text}</button>
            )}
          </div>
        </div>
      )
    }
  }

export default Choice;