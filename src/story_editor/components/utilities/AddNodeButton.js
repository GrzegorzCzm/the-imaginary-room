import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {setContentAction} from '../../reducers/contentReducer';
import storyService from '../../../create_story/services/story';

export const contentStructure = (nodeId, nodeType) => {
    switch (nodeType) {
        case 'title':
            {
                return {
                    id: new Date().getTime(),
                    node_id: nodeId+1,
                    type: 'title',
                }
            }

        case 'description':
            {
                return {
                    id: new Date().getTime(),
                    node_id: nodeId+1,
                    type: 'description',
                }
            }

        case 'dialogue':
            {
                return{
                    id: new Date().getTime(),
                    node_id: nodeId+1,
                    type: 'dialogue',
                }
            }

        case 'cond_dialogue':
            {
                return {
                    id: new Date().getTime(),
                    node_id: nodeId+1,
                    type: 'cond_dialogue',
                }
            }

        case 'choice':
            {
                return{
                    id: new Date().getTime(),
                    node_id: nodeId+1,
                    type: 'choice'
                }
            }

        case 'cond_choice':
            {
                return {
                    id: new Date().getTime(),
                    node_id: nodeId+1,
                    type: 'cond_choice',
                }
            }
        
        case 'input':
            {
                return{
                    id: new Date().getTime(),
                    node_id: nodeId+1,
                    type: 'input',
                }
            }
        
        default:
            {
                return{
                    id: new Date().getTime(),
                    node_id: nodeId+1,
                    type: 'game_over',
                }
            }
    }
}

const AddNodeButton = () => {

    const userToken = useSelector(state => state.userToken);
    const lastType = useSelector(state => state.lastType);
    const storyId = useSelector(state => state.storyId);
    const dispatch = useDispatch();

    const createNewContent = async (nodeId) => {
        const newNode = contentStructure(nodeId, lastType);
        const returnedNode = await storyService.createStoryNode(storyId, newNode, userToken);
        dispatch(setContentAction(returnedNode));
    }

    return (
        <div className="add_node_button">
            <button className="next_button" onClick={() => createNewContent(0)}></button>
        </div>
    )
}

export default AddNodeButton;