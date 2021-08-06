import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setContentAction} from '../reducers/contentReducer';
import storyService from '../../create_story/services/story';
import scrollToNode from './utilities/ScrollToNode';

const InputNode = ({nodeId, setSaveStatus}) => {

  const node = useSelector(state => state.content.find(c => c.node_id === nodeId));
  const dispatch = useDispatch();

  const storyId = useSelector(state => state.storyId);
  const userToken = useSelector(state => state.userToken);

    const [inputName, setInputName] = useState(node.hasOwnProperty('input_name') ? node.input_name : '');
    const [text, setText] = useState(node.hasOwnProperty('text') ? node.text : '');
    const [next, setNext] = useState(node.hasOwnProperty('next') ? node.next : node.node_id+1);

    useEffect(() => {
      if(node.hasOwnProperty('next') && next !== node.next){
        setNext(parseInt(node.next));
      }
      //eslint-disable-next-line
    }, [node.next])
  
    const inputChange = (event) => {
      setInputName(event.target.value);
      setSaveStatus(false);
    }
  
    const textChange = (event) => {
      setText(event.target.value);
      setSaveStatus(false);
    }
  
    const nextChange = (event) => {
      setNext(parseInt(event.target.value));
      setSaveStatus(false);
    }
  
    const submitInput = async (event) => {
      event.preventDefault();
      const newInput = {
        id: node.id,
        node_id: node.node_id,
        type: 'input',
        input_name: inputName,
        text: text,
        next: next
      }
      const returnedContent = await storyService.updateStoryNode(storyId, newInput, userToken);
      dispatch(setContentAction(returnedContent));
      setSaveStatus(true);
    }
  
    return(
      <div className="input_node">
        <form id={"input_"+nodeId} onSubmit={submitInput}>
          <p>INPUT VARIABLE</p>
          <input className="speaker_textbox" value={inputName} onChange={inputChange}></input>
          <p>TEXT</p>
          <textarea className="dial_textbox" value={text} onChange={textChange} maxLength="100"></textarea>
          <p className="cursor_pointer" onClick={() => scrollToNode(next)}>NEXT</p>
          #<input className="next_textbox" value={next} onChange={nextChange}></input>
        </form>
      </div>
    )
  }

export default InputNode;