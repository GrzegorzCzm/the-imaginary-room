import React, {useState, useEffect} from 'react';
import DialogueBranch from './DialogueBranch';
import {useDispatch, useSelector} from 'react-redux';
import {setContentAction} from '../../reducers/contentReducer';
import storyService from '../../../create_story/services/story';
import scrollToNode from '../utilities/ScrollToNode';
  
  const CondDialogueNode = ({nodeId, setSaveStatus}) => {

    const node = useSelector(state => state.content.find(c => c.node_id === nodeId));
    const dispatch = useDispatch();

    const storyId = useSelector(state => state.storyId);
    const userToken = useSelector(state => state.userToken);

    const [branchId, setBranchId] = useState(node.hasOwnProperty('branches') ? Math.max(...node.branches.map(b => b.b_id))+1 : 1);
    const [rootId, setRootId] = useState(node.hasOwnProperty('root_id') ? node.root_id : 0);
    const [branches, setBranches] = useState(node.hasOwnProperty('branches') ? node.branches : []);

    const isDifferent = (a, b) => {
      a.sort((x, y) => x.b_id - y.b_id);
      b.sort((x, y) => x.b_id - y.b_id);

      for(let i=0; i<a.length; i++){
        if(a[i].next !== b[i].next){
          return true;
        }
      }
      return false;
    }

    useEffect(() => {
      if(node.hasOwnProperty('branches') && isDifferent(node.branches, branches)){
        setBranches(node.branches);
      }
      //eslint-disable-next-line
    }, [node.branches])
  
    const rootChange = (event) => {
      setRootId(Number(event.target.value));
      setSaveStatus(false);
    }

    const addBranch = () => {
      const newBranch = {
        b_id: branchId
      }
      setBranches(branches.concat(newBranch));
      setBranchId(branchId+1);
      setSaveStatus(false);
    }

    const deleteBranch = (branchId) => {
      const newBranches = branches.filter(b => b.b_id !== branchId);
      setBranches(newBranches);
      setSaveStatus(false);
    }

    const addBranchCont = (newContent) => {
      setBranches(
        branches.map(b => b.b_id===newContent.b_id ? newContent : b)
      )
    }
  
    const submitCondDial = async (event) => {
      event.preventDefault();
      const newCondDial = {
        id: node.id,
        node_id: node.node_id,
        type: 'cond_dialogue',
        root_id: rootId,
        branches: branches
      }
      const returnedContent = await storyService.updateStoryNode(storyId, newCondDial, userToken);
      dispatch(setContentAction(returnedContent));
      setSaveStatus(true);
    }
  
    return(
      <div className="cond_dialogue_node">
        <form id={"cond_dialogue_"+nodeId} onSubmit={submitCondDial}>
          <p className="cursor_pointer" onClick={() => scrollToNode(rootId)}>ROOT</p>
          #<input className="next_textbox" value={rootId} onChange={rootChange}></input>
        </form>
        {
          branches.map(b => <DialogueBranch key={b.b_id} branch={b} addBranchCont={addBranchCont} deleteBranch={deleteBranch} setSaveStatus={setSaveStatus} />)
        }
        <button className="add_branch_button node_header_button" onClick={() => {addBranch()}}>+</button>
      </div>
    )
  }

  export default CondDialogueNode;