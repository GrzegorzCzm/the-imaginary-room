import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setContentAction} from '../reducers/contentReducer';
import storyService from '../../create_story/services/story';

const GameOverNode = ({nodeId, setSaveStatus}) => {

  const node = useSelector(state => state.content.find(c => c.node_id === nodeId));
  const dispatch = useDispatch();

  const storyId = useSelector(state => state.storyId);
  const userToken = useSelector(state => state.userToken);

    const [text, setText] = useState(node.hasOwnProperty('text') ? node.text : '');
  
    const textChange = (event) => {
      setText(event.target.value);
      setSaveStatus(false);
    }
  
    const submitGameOver = async (event) => {
      event.preventDefault();
      const newGameOver = {
        id: node.id,
        node_id: node.node_id,
        type: 'game_over',
        text: text
      }
      const returnedContent = await storyService.updateStoryNode(storyId, newGameOver, userToken);
      dispatch(setContentAction(returnedContent));
      setSaveStatus(true);
    }
  
    return(
      <div className="game_over_node">
        <form id={"game_over_"+nodeId} onSubmit={submitGameOver}>
          <p>TEXT</p>
          <textarea className="desc_textbox" value={text} onChange={textChange} maxLength="300"></textarea>
        </form>
      </div>
    )
  }

export default GameOverNode;