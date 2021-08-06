import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import SingleChoice from './SingleChoice';
import {setContentAction} from '../../reducers/contentReducer';
import storyService from '../../../create_story/services/story';

const ChoiceNode = ({nodeId, setSaveStatus}) => {

  const node = useSelector(state => state.content.find(c => c.node_id === nodeId));
  const dispatch = useDispatch();

  const storyId = useSelector(state => state.storyId);
  const userToken = useSelector(state => state.userToken);
  
  const[choiceId, setChoiceId] = useState(node.hasOwnProperty('choices') ? Math.max(...node.choices.map(c => c.c_id))+1 : 1); //This was like this before: useState(1) - But after adding some choices, refreshing the page would reset this value back to 1, so after refreshing, the next choice would have the ID of 1 again. So I changed it this way so if there are already choices added, it takes the max choice ID and increases it by 1 to assign to the next choice to be added.
  const[choices, setChoices] = useState(node.hasOwnProperty('choices') ? node.choices : []);

    const isDifferent = (a, b) => { //Checks if two "choices" arrays are different.
      a.sort((x, y) => x.c_id - y.c_id); //First we sort both arrays based on their ids (incrementally). For more info about the sort method, check the Proje aydınlanmaları file.
      b.sort((x, y) => x.c_id - y.c_id); //The reason why we sort them first is to make sure that the choices we compare in both arrays are in the same index.

      for(let i=0; i<a.length; i++){
        if(a[i].next !== b[i].next){ //Since we made sure that the indexes of the individual choices within both of the "choices" arays are the same, we just compare their next values.
          return true;
        }
      }
      return false;
    }

    useEffect(() => { //Since the choice node doesn't have the next values directly itself (the individual choices does) we need to go deeper and check the next values of each choice.
      if(node.hasOwnProperty('choices') && isDifferent(node.choices, choices)){
        setChoices(node.choices);
      }
      //eslint-disable-next-line
    }, [node.choices])
  
    const addChoice = () => { //Each choice node has individual choices and they are added here. It is similar to adding new nodes.
      const newSingleChoice= {
        c_id: choiceId
      }
      setChoices(choices.concat(newSingleChoice));
      setChoiceId(choiceId+1);
      setSaveStatus(false);
    }

    const deleteChoice = (choiceId) => {
      const newChoices = choices.filter(c => c.c_id !== choiceId);
      setChoices(newChoices);
      setSaveStatus(false);
    }
  
    const addChoiceCont = (newSingleChoice) => { //Updates the choices
      setChoices(
        choices.map(c => c.c_id===newSingleChoice.c_id ? newSingleChoice : c)
      );
    }
  
    const submitChoice = async (event) => {
      event.preventDefault();
      const newChoice = {
        id: node.id,
        node_id: node.node_id,
        type: 'choice',
        choices: choices
      }
      const returnedContent = await storyService.updateStoryNode(storyId, newChoice, userToken);
      dispatch(setContentAction(returnedContent));
      setSaveStatus(true);
    }
  
    return(
      <div className="choice_node">
        <form id={'choice_'+nodeId} onSubmit={submitChoice}>
        </form> 
        {
          choices.map(c => <SingleChoice key={c.c_id} choice={c} addChoiceCont={addChoiceCont} deleteChoice={deleteChoice} setSaveStatus={setSaveStatus} />)
        }
        <button className="add_branch_button node_header_button" onClick={() => {addChoice()}}>+</button>
      </div>
    )
  }

export default ChoiceNode;