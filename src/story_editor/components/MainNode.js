import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {setContentAction} from '../reducers/contentReducer';
import {setLastTypeAction} from '../reducers/lastTypeReducer';
import {contentStructure} from './utilities/AddNodeButton';
import storyService from '../../create_story/services/story';
import scrollToNode from './utilities/ScrollToNode';

import TitleNode from './TitleNode';
import DescriptionNode from './DescriptionNode'; 
import DialogueNode from './DialogueNode';
import CondDialogueNode from './conditional_dialogue/CondDialogueNode';
import ChoiceNode from './choice/ChoiceNode';
import CondChoiceNode from './conditional_choice/CondChoiceNode';
import InputNode from './InputNode';
import GameOverNode from './GameOverNode';

const MainNode = ({node}) => {
    const [nodeType, setNodeType] = useState(node.type) //Here, I wanted to use react states instead of redux because this state will only be used within this component and other components won't be accessing this, so it didn't make sense for me to use redux states here.
    const nodeId = node.node_id

    const [isSaved, setIsSaved] = useState(true);

    const storyId = useSelector(state => state.storyId);
    const userToken = useSelector(state => state.userToken);
    const lastType = useSelector(state => state.lastType);
    const dispatch = useDispatch();

    const setSaveStatus = (status) => {
      setIsSaved(status);
    }

    const typeChange = (event) => {
      const newLastType = event.target.value
      dispatch(setLastTypeAction(newLastType));
      setNodeType(newLastType);
    }

    const createNewNode = async (nodeId) => {
          const newNode = contentStructure(nodeId, lastType);
          const returnedContent = await storyService.createStoryNode(storyId, newNode, userToken);
          dispatch(setContentAction(returnedContent));
          scrollToNode(nodeId+1);
    }

    const deleteNode = async (nodeId) => {
        const returnedContent = await storyService.deleteStoryNode(storyId, nodeId, userToken);
        dispatch(setContentAction(returnedContent));
    }
  
    let pickedNode = null;

    switch(nodeType){
      case 'title':
        pickedNode = <TitleNode nodeId={nodeId} setSaveStatus={setSaveStatus} />;
        break;
      case 'description':
        pickedNode = <DescriptionNode nodeId={nodeId} setSaveStatus={setSaveStatus}/>;
        break;
      case 'dialogue':
        pickedNode = <DialogueNode nodeId={nodeId} setSaveStatus={setSaveStatus}/>;
        break;
      case 'cond_dialogue':
        pickedNode = <CondDialogueNode nodeId={nodeId} setSaveStatus={setSaveStatus}/>;
        break;
      case 'choice':
        pickedNode = <ChoiceNode nodeId={nodeId} setSaveStatus={setSaveStatus}/>;
        break;
      case 'cond_choice':
        pickedNode = <CondChoiceNode nodeId={nodeId} setSaveStatus={setSaveStatus}/>;
        break;
      case 'input':
        pickedNode = <InputNode nodeId={nodeId} setSaveStatus={setSaveStatus}/>;
        break;
      default:
        pickedNode = <GameOverNode nodeId={nodeId} setSaveStatus={setSaveStatus}/>;
    }
  
    return(
      <div name={nodeId} className="main_node">
        <p className="node_id"><b>#</b>{nodeId}</p>
        <div className={isSaved ? "inner_node node_saved" : "inner_node node_unsaved"}>
          <div className="node_header">
          <button type='submit' form={nodeType+"_"+nodeId} className='submit_button node_header_button'></button>
          <select className="select_node" value={nodeType} onChange={typeChange}>
          <option value="title" >TITLE</option>
          <option value="description">DESCRIPTION</option>
          <option value="dialogue">DIALOGUE</option>
          <option value="cond_dialogue">CONDITIONAL DIALOGUE</option>
          <option value="choice">CHOICE</option>
          <option value="cond_choice">CONDITIONAL CHOICE</option>
          <option value="input">INPUT</option>
          <option value="game_over">GAME OVER</option>
        </select>
        <button className="delete_button node_header_button" onClick={() => deleteNode(node.node_id)}>X</button>
          </div>
        {pickedNode}
        </div>
        <button className="next_button" onClick={() => createNewNode(node.node_id)}></button>
      </div>
    )
  }

export default MainNode;