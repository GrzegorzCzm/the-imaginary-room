import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { setContentAction } from '../reducers/contentReducer';
import storyService from '../../create_story/services/story';
import scrollToNode from './utilities/ScrollToNode';

const DialogueNode = ({nodeId, setSaveStatus}) => {

  const node = useSelector(state => state.content.find(c => c.node_id === nodeId));
  const dispatch = useDispatch();

  const storyId = useSelector(state => state.storyId);
  const userToken = useSelector(state => state.userToken);

  const [text, setText] = useState(node.hasOwnProperty('text') ? node.text : '');
  const [speaker, setSpeaker] = useState(node.hasOwnProperty('speaker') ? node.speaker : '');
  const [next, setNext] = useState(node.hasOwnProperty('next') ? node.next : node.node_id+1);

    useEffect(() => {
      if(node.hasOwnProperty('next') && next !== node.next){
        setNext(parseInt(node.next));
      }
      //eslint-disable-next-line
    }, [node.next])
  
    const submitDial = async (event) => {
      event.preventDefault();
      const newDialogue = {
        id: node.id,
        node_id: node.node_id,
        type: 'dialogue',
        speaker: speaker,
        text: text,
        next: next
      }
      const returnedContent = await storyService.updateStoryNode(storyId, newDialogue, userToken);
      dispatch(setContentAction(returnedContent));
      setSaveStatus(true);
    }

    const textChange = (event) => {
      setText(event.target.value);
      setSaveStatus(false);
    }

    const nextChange = (event) => {
      setNext(Number(event.target.value));
      setSaveStatus(false);
    }

    const speakerChange = (event) => {
      setSpeaker(event.target.value);
      setSaveStatus(false);
    }
  
    return(
      <div className="dialogue_node">
        <form onSubmit={submitDial} id={"dialogue_"+nodeId}>
          <p>SPEAKER</p>
          <input className="speaker_textbox" value={speaker} onChange={speakerChange}></input>
          <p>TEXT</p>
          <textarea className="dial_textbox" value={text} onChange={textChange} maxLength="100"></textarea>
          <p className="cursor_pointer" onClick={() => scrollToNode(next)}>NEXT</p>
          #<input className="next_textbox" value={next} onChange={nextChange}></input>
        </form>
      </div>
    )
  }

export default DialogueNode;