import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'; 
import storyService from '../create_story/services/story';

import MainDisplay from './components/MainDisplay';

import '../styles/read_story.css';

function ReadStory() {

  const storyId = useParams().id;

  const [dispId, setDispId] = useState(1);  //Storing the ID of the content to be displayed
  const [choiceLog, setChoiceLog] = useState([]);  //Storing the choices the player has made. Holds objects containing 2 values: The ID of the dialogue at which the choices are presented, and the ID of the choice that the player has chosen.
  const [inputLog, setInputLog] = useState([]);  //Storing the inputs from the player (such as player name). The objects it holds contain 2 values: The name of the input, and the value the player enters in this input.
  const [content, setContent] = useState([]);

  useEffect(() => {
    storyService.getStory(storyId)
    .then(story => {
      setContent(story.story_content)
    });
  }, []);

  const nextButton = (nextId) => {  //Triggered when the "next" button of the components is clicked. Sets dispID, so that the next content can be displayed.
      setDispId(nextId);
  }

  const saveChoice = (dispContent, choiceId) => {  //Triggered when player clicks on a choice. The parameters are send from the Choice component.
    
    const rootId = dispContent.node_id; //The ID of the choice content
    const rootChoices = dispContent.choices;  //All the choices specified in the choice content

    if(choiceLog.filter(c => c.root_id===rootId).length > 0){  //We check if any choice was made with the same root_id. If so, we don't create a new choice log, but modify the one that already exists.
      if(rootChoices.find(c => c.c_id===choiceId).choice_type === 'info'){  //We find the choice with the choiceId (the choice player has picked) and check its type. If it is 'info', then we add it to the array of info_choice_ids (it is an array because there can be more than one info choice selected).
        setChoiceLog(
          choiceLog.map(c => (c.root_id === rootId) ? {...c, info_choice_ids: c.info_choice_ids.concat(choiceId)} : c)  //We find the choice log that was created for the same choice content using its rootId, and then update it by adding the new choice to the array.
          )
      }
      else if(rootChoices.find(c => c.c_id===choiceId).choice_type === 'progress'){  //If the player picked a 'progress' choice, we set the prog_choice_id property of the choice log to the choiceId.
        setChoiceLog(
          choiceLog.map(c => (c.root_id === rootId) ? {...c, prog_choice_id: choiceId} : c)  //Like we did with the info choice above, we find the related choice content and set its prog_choice_id to the choiceId.
          )
      }
    }

    else{  //If no choice was made with the same rootId, we create a new choice log.
      if(rootChoices.find(c => c.c_id===choiceId).choice_type === 'info'){  //If the player picked an info choice, we create a new log and put the choiceId as the first element of the info_choice_ids array.
        const newChoice = {
          root_id: rootId,
          prog_choice_id: null,
          info_choice_ids: [choiceId]
        }
        setChoiceLog(choiceLog.concat(newChoice))
      }
      else if(rootChoices.find(c => c.c_id===choiceId).choice_type === 'progress'){  //If the choice is a progress choice, we set rog_choice_id to choiceId
        const newChoice = {
          root_id: rootId,
          prog_choice_id: choiceId,
          info_choice_ids: []
        }
        setChoiceLog(choiceLog.concat(newChoice))
      }
    }
  }

  const saveInput = (inputName, inputValue) => {  //Triggered when player clicks on the "next" button of an input.
    const newInput = {
      input_name: inputName,
      input_value: inputValue
    }
    setInputLog(inputLog.concat(newInput))
  }

  return (
    <div className="read_story">
      <MainDisplay content={content} dispId={dispId} nextButton={nextButton} choiceLog={choiceLog} saveChoice={saveChoice} inputLog={inputLog} saveInput={saveInput} />
    </div>
  );
}

export default ReadStory;
