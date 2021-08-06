import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { setContentAction } from '../reducers/contentReducer';
import storyService from '../../create_story/services/story';
import scrollToNode from './utilities/ScrollToNode';

const DescriptionNode = ({nodeId, setSaveStatus}) => {

  const node = useSelector(state => state.content.find(c => c.node_id === nodeId));
  const dispatch = useDispatch();

  const storyId = useSelector(state => state.storyId);
  const userToken = useSelector(state => state.userToken);

  const [text, setText] = useState(node.hasOwnProperty('text') ? node.text : '');
  const [next, setNext] = useState(node.hasOwnProperty('next') ? node.next : node.node_id+1);

  useEffect(() => {
    if(node.hasOwnProperty('next') && next !== node.next){
      setNext(parseInt(node.next));
    }
    //eslint-disable-next-line
  }, [node.next]);
  
    const submitDescription = async (event) => {
      event.preventDefault();
      const newDescription = {
        id: node.id,
        node_id: node.node_id,
        type: 'description',
        text: text,
        next: next
      }
      const returnedContent = await storyService.updateStoryNode(storyId, newDescription, userToken);
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
  
    return(
      <div className="description_node">
        <form onSubmit={submitDescription} id={"description_"+nodeId}>
          <p>TEXT</p>
          <textarea className="desc_textbox" value={text} onChange={textChange} maxLength="300"></textarea>
          <p className="cursor_pointer" onClick={() => scrollToNode(next)}>NEXT</p>
          #<input className="next_textbox" value={next} onChange={nextChange}></input>
        </form>
      </div>
    )
  }

export default DescriptionNode;