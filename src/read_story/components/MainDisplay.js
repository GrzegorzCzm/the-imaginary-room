import React from 'react';

import Title from './Title';
import Description from './Description';
import Dialogue from './Dialogue';
import Choice from './Choice';
import GameOver from './GameOver';
import Input from './Input';

const MainDisplay = ({content, dispId, nextButton, choiceLog, saveChoice, inputLog, saveInput}) => {
    
    let dispCont = content.length > 0 ? content.find(c => c.node_id === dispId) : {};  //Finds the content to be displayed using its ID.
  
    if(inputLog.length > 0){  //Checks if there is any input stored
  
      if(dispCont.type==='choice' || dispCont.type==='cond_dialogue' || dispCont.type==='cond_choice'){  //Since we will convert the objects into strings, both of these types would work
        let choiceStr = JSON.stringify(dispCont);  //We convert the whole object into one string
        const textInputs = inputLog.filter(i => choiceStr.includes('%%'+i.input_name)); //Find the text inputs included in the converted object
        textInputs.forEach(t => {
          choiceStr = choiceStr.replace(new RegExp('%%'+t.input_name, 'g'), t.input_value)  //Change each one of these inputs within the string with their values
        })
        dispCont = JSON.parse(choiceStr)  //Parse the string back to an object
      }
  
      else{  //Applies for all the other content types with a text property
      const textInputs = inputLog.filter(i => dispCont.text.includes('%%'+i.input_name));  //Checks if the "text" value of dispCont contains any registered input and filters inputLog, so that only the inputs included in the text remain. So "textInput" is an array of objects within inputLog, but only the ones that are included in the text.
  
      textInputs.forEach(t => {  //The inputs included in textInputs are included in the text for sure. So we find these inputs within the text and replace them with the input values
        dispCont.text = dispCont.text.replace(new RegExp('%%'+t.input_name, 'g'), t.input_value)  //Normally .replace() method works like that: dispCont.text.replace(('%%'+t.input_name), t.input_value) But this replaces only the firs occurence of the substring to be replaced. In order to repalce all the occurences, I need to use replace globally.
                                                                                                  //And it is normally used like this: str.replace(/-/g, '*') (replaces all - signs with *).This is called a regular expression. But this syntax doesn't work with variables. In order to make it work with variables, I had to use the constructor syntax.
                                                                                                  //Also keep in mind that .replace() doesn't apply the changes to the string directly, but only returns the modified string. This is why I assigned it to "dispCont.text"
      })}
    }
    //So at this point, any input defined in the text attribute of dispCont has been repalced with its value. The "speaker" attribute of dialogues may also include inputs, but I will replace them below, if the dispCont is a dialogue.
  
    if(dispCont.type==='title'){
      return(
        <Title dispContent={dispCont} nextButton={nextButton} />
      )
    }

    else if(dispCont.type==='description'){
      return(
        <Description dispContent={dispCont} nextButton={nextButton} />
      )
    }

    else if(dispCont.type==='dialogue'){
      if(inputLog.length > 0){  //I do the same input check as I did above. But this time I check "speaker" instead of "text". The reason why I do this here is that only dialogues include the "speaker" attribute
  
        const speakerInputs = inputLog.filter(i => dispCont.speaker.includes('%%'+i.input_name));
    
        speakerInputs.forEach(s => {
          dispCont.speaker = dispCont.speaker.replace(new RegExp('%%'+s.input_name, 'g'), s.input_value)
        })
    
      }
      return(
        <Dialogue dispContent={dispCont} nextButton={nextButton} />
      )
    }

    else if(dispCont.type==='choice'){
      return(
        <Choice dispContent={dispCont} nextButton={nextButton} saveChoice={saveChoice} choiceLog={choiceLog} />
      )
    }

    else if(dispCont.type==='cond_dialogue'){  //Conditional dialogues are the dialogues which change depending on a choice player has made before. It includes a root_id, which is the ID of the choice content, and branches. The "branches" attribute is an array of objects. Each object contains c_id, which is a choice ID, and branch, which is the dialogue to be displayed if the choice with the c_id has been chosen by the player.
      const progChoiceId = choiceLog.find(c => c.root_id===dispCont.root_id).prog_choice_id; //As I explained above, root_id is the ID of the choice content (the display content when choices are presented to the player) based on which we want to change our dialogue. So here, we check tchoiceLog to find which choice the player has made, and assign it to the variable "choiceId".
      const infoChoiceIds = choiceLog.find(c => c.root_id===dispCont.root_id).info_choice_ids;
      let selectedDispCont = dispCont.branches.find(n => n.c_id===progChoiceId); //We check the branches to find the branch with the specified choice ID. The branch is constructed almost like a dialogue (except for an ID field), so we can send it to the "dialogue" component.
      if(typeof selectedDispCont === 'undefined'){
        selectedDispCont = dispCont.branches.find(n => infoChoiceIds.includes(n.c_id));
      }
      let newDispCont = {}
      if(typeof selectedDispCont === 'undefined'){  //We check if we were able to find the specified branch. If we weren't, then it would mean that the ID is -1. If ID of a branch is -1, it is like an else statement. It is triggered if the player didn't choice other specified choices.
        newDispCont = dispCont.branches.find(n => n.c_id===-1)
      }
      else{
        newDispCont = selectedDispCont; //Meaning player has chosen one of the choice IDs specified in a branch.
      }
        return(
          <Dialogue dispContent={newDispCont} nextButton={nextButton} />
        )
    }

    else if(dispCont.type==='input'){
      return(
        <Input dispContent={dispCont} nextButton={nextButton} saveInput={saveInput} />
      )
    }

    else if(dispCont.type==='cond_choice'){
      const unCondChoices = dispCont.choices.filter(c => !c.is_conditional);  //First we get the unconditional choices (the choices whose is_conditional property set to false)
      const condChoices = dispCont.choices.filter(c => c.is_conditional);  //We get the conditional choices
      
      const pickedChoices = condChoices.map(c => {  //Here, we try to find which choice to display, and refactor them to put them in the same form as a normal choice
        const relatedChoice = choiceLog.find(n => (n.root_id===c.root_id));  //We find the choice log that we want to check

        if(relatedChoice.prog_choice_id===c.picked_id || relatedChoice.info_choice_ids.includes(c.picked_id)){  //We check if any choice wit the same picked_id of the conditional choice was made (we check both progress and info choices)
          return c.is_picked ? c : null
        }
        else{  //If there was no choice with the specified ID (picked_id)
          return c.is_picked ? null : c
        }
      });
      const newChoices = unCondChoices.concat(pickedChoices); //I merge the conditional and unconditional choices into one array.
      dispCont.choices = newChoices.filter(n => n!==null);  //We filter the null elements out (remember we return null if there is no 'if_not_picked' property)
      return(
        <Choice dispContent={dispCont} nextButton={nextButton} saveChoice={saveChoice} choiceLog={choiceLog} />
      )
    }

    return(
      <GameOver dispContent={dispCont} />
    )

  }

export default MainDisplay;