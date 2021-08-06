import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { setContentAction } from '../reducers/contentReducer';
import storyService from '../../create_story/services/story';
import scrollToNode from './utilities/ScrollToNode';

const TitleNode = ({nodeId, setSaveStatus}) => {

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
  
    const submitTitle = async (event) => {
      event.preventDefault();
     const newTitle = {
        id: node.id,
        node_id: node.node_id,
        type: 'title',
        text: text,
        next: next,
      }
      const returnedContent = await storyService.updateStoryNode(storyId, newTitle, userToken);
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
      <div className="title_node">
        <form onSubmit={submitTitle} id={"title_"+nodeId}>
          <p>TEXT</p>
          <input className="title_textbox" name='text' value={text} onChange={textChange}></input>
          <p className="cursor_pointer" onClick={() => scrollToNode(next)}>NEXT</p>
          #<input className="next_textbox" name='next' value={next} onChange={nextChange}></input>
        </form>
      </div>
    )
  }
  
export default TitleNode;