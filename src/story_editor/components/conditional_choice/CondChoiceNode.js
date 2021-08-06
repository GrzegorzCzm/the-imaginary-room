import React, {useState, useEffect} from 'react';
import SingleChoice from '../choice/SingleChoice';
import {setContentAction} from '../../reducers/contentReducer';
import {useDispatch, useSelector} from 'react-redux';
import storyService from '../../../create_story/services/story';
  
  const CondChoiceNode = ({nodeId, setSaveStatus}) => {

    const node = useSelector(state => state.content.find(c => c.node_id === nodeId));
    const dispatch = useDispatch();

    const storyId = useSelector(state => state.storyId);
    const userToken = useSelector(state => state.userToken);

    const[choiceId, setChoiceId] = useState(node.hasOwnProperty('choices') ? Math.max(...node.choices.map(c => c.c_id))+1 : 1);
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

    useEffect(() => {
      if(node.hasOwnProperty('choices') && isDifferent(node.choices, choices)){
        setChoices(node.choices);
      }
      //eslint-disable-next-line
    }, [node.choices])

    const addCondChoice = (isConditional) => {
      const newSingleChoice= {
        c_id: choiceId,
        is_conditional: isConditional
      }
      setChoices(choices.concat(newSingleChoice));
      setChoiceId(choiceId+1);
      setSaveStatus(false);
    }

    const deleteCondChoice = (choiceId) => {
      const newChoices = choices.filter(c => c.c_id !== choiceId);
      setChoices(newChoices);
      setSaveStatus(false);
    }
  
    const addCondChoiceCont = (newSingleChoice) => {
        setChoices(
          choices.map(c => c.c_id===newSingleChoice.c_id ? newSingleChoice : c)
          );
          setSaveStatus(false);
    }
  
    const submitCondChoice = async (event) => {
      event.preventDefault();
      const newCondChoice = {
        id: node.id,
        node_id: node.node_id,
        type: 'cond_choice',
        choices: choices
      }
      const returnedContent = await storyService.updateStoryNode(storyId, newCondChoice, userToken);
      dispatch(setContentAction(returnedContent));
      setSaveStatus(true);
    }
  
    return(
      <div className="cond_choice_node">
        <form id={"cond_choice_"+nodeId} onSubmit={submitCondChoice}>

        </form>
        {
          choices.map((c, index) => (c.is_conditional) ? <SingleChoice key={index} choice={c} addChoiceCont={addCondChoiceCont} deleteChoice={deleteCondChoice} isConditional={true} setSaveStatus={setSaveStatus} /> : <SingleChoice key={index} choice={c} addChoiceCont={addCondChoiceCont} deleteChoice={deleteCondChoice} isConditional={false} setSaveStatus={setSaveStatus} />)
        }
        <div className="text_switch">
          <button className="add_branch_button node_header_button" onClick={() => {addCondChoice(false)}}>+UC</button>
          <button className="add_branch_button node_header_button" onClick={() => {addCondChoice(true)}}>+CC</button>
        </div>
      </div>
    )
  }

export default CondChoiceNode;