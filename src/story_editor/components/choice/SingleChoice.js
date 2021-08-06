import React, {useState, useEffect} from 'react';
import scrollToNode from '../utilities/ScrollToNode';

const SingleChoice = ({choice, addChoiceCont, deleteChoice, isConditional, setSaveStatus}) => {

    const[choiceType, setChoiceType] = useState(choice.hasOwnProperty('choice_type') ? choice.choice_type : 'info');
    const[choiceText, setChoiceText] = useState(choice.hasOwnProperty('choice_text') ? choice.choice_text : '');
    const[choiceLong, setChoiceLong] = useState(choice.hasOwnProperty('choice_long') ? choice.choice_long : '');
    const[next, setNext] = useState(choice.hasOwnProperty('next') ? choice.next : 0);

    const [rootId, setRootId] = useState(choice.hasOwnProperty('root_id') ? choice.root_id : 0);
    const [pickedId, setPickedId] = useState(choice.hasOwnProperty('picked_id') ? choice.picked_id : 0);
    const [isPicked, setIsPicked] = useState(choice.hasOwnProperty('is_picked') ? choice.is_picked : true);

    const [isChoiceSaved, setIsChoiceSaved] = useState(true);

      useEffect(() => {
        if(choice.hasOwnProperty('next') && next !== choice.next){
          setNext(parseInt(choice.next));
        }
        //eslint-disable-next-line
      }, [choice.next])
  
    const choiceTypeChange = (type) => {
      setChoiceType(type);
      setIsChoiceSaved(false);
      setSaveStatus(false);
    }
    
    const choiceTextChange = (event) => {
      setChoiceText(event.target.value);
      setIsChoiceSaved(false);
      setSaveStatus(false);
    }
    const choiceLongChange = (event) => {
      setChoiceLong(event.target.value);
      setIsChoiceSaved(false);
      setSaveStatus(false);
    }
    const nextChange = (event) => {
      setNext(Number(event.target.value));
      setIsChoiceSaved(false);
      setSaveStatus(false);
    }

    const rootIdChange = (event) => {
      setRootId(Number(event.target.value));
      setIsChoiceSaved(false);
      setSaveStatus(false);
    }
  
    const pickedIdChange = (event) => {
      setPickedId(Number(event.target.value));
      setIsChoiceSaved(false);
      setSaveStatus(false);
    }

    const pickedChange = (pickedValue) => {
      setIsPicked(pickedValue);
      setIsChoiceSaved(false);
      setSaveStatus(false);
    }
  
    const submitSingleChoice = (event) => {
      event.preventDefault();
  
      let newSingleChoice = {}

      if(isConditional) {
        newSingleChoice = {
          c_id: choice.c_id,
          is_conditional: true,
          root_id: rootId,
          picked_id: pickedId,
          is_picked: isPicked,
          choice_type: choiceType,
          choice_text: choiceText,
          choice_long: choiceLong,
          next: next
        }
      }
      else{
        newSingleChoice = {
          c_id: choice.c_id,
          is_conditional: false,
          choice_type: choiceType,
          choice_text: choiceText,
          choice_long: choiceLong,
          next: next
        }
      }

      addChoiceCont(newSingleChoice);
      setIsChoiceSaved(true);
    }

    const condSingleChoice = () => {
      if(isConditional){
        return (
          <div className="cond_single_choice">
          <div className="text_switch">
            <div>
              <p className="cursor_pointer" onClick={() => scrollToNode(rootId)}>ROOT</p>
              #<input className="next_textbox" value={rootId} onChange={rootIdChange}></input>
            </div>
            <div>
              <p>CHOICE</p>
              #<input className="next_textbox" value={pickedId} onChange={pickedIdChange}></input>
            </div>
          </div>
          <p>SHOW IF THE CHOICE IS</p>
        <div className="text_switch">
          <div className={isPicked ? "text_checked" : "text_unchecked"} onClick={() => pickedChange(true)}>PICKED</div>
          <div className={isPicked ? "text_unchecked" : "text_checked"} onClick={() => pickedChange(false)}>NOT PICKED</div>
        </div>
        </div>
        )
      }
      else {
        return null;
      }
    }
  
    return(
      <div className={isChoiceSaved ? "node_branch node_saved" : "node_branch node_unsaved"}>
        <form onSubmit={submitSingleChoice}>
          <div className="branch_header">
          <button className="submit_button node_header_button" type='submit'></button>
          <p className="branch_header_text">CHOICE #{choice.c_id}</p>
          <button className="delete_button node_header_button" onClick={() => deleteChoice(choice.c_id)}>X</button>
          </div>
          {condSingleChoice()}
          <p>CHOICE TYPE</p>
          <div className="text_switch">
            <div className={choiceType === 'info' ? "text_checked" : "text_unchecked"} onClick={() => choiceTypeChange('info')}>INFO</div>
            <div className={choiceType === 'progress' ? "text_checked" : "text_unchecked"} onClick={() => choiceTypeChange('progress')}>PROGRESS</div>
          </div>
          <p>CHOICE TEXT</p>
          <input className="choice_textbox" value={choiceText} onChange={choiceTextChange} maxLength="30"></input>
          <p>LONG TEXT</p>
          <textarea className="dial_textbox" value={choiceLong} onChange={choiceLongChange} maxLength="100"></textarea>
          <p className="cursor_pointer" onClick={() => scrollToNode(next)}>NEXT</p>
          #<input className="next_textbox" value={next} onChange={nextChange}></input>
        </form>
      </div>
    )
  }

export default SingleChoice;