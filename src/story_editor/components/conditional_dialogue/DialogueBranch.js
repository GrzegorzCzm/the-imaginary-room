import React, {useState, useEffect} from 'react';
import scrollToNode from '../utilities/ScrollToNode';

const DialogueBranch = ({branch, addBranchCont, deleteBranch, setSaveStatus}) => {
    const [choiceId, setChoiceId] = useState(branch.hasOwnProperty('c_id') ? branch.c_id : 0);
    const [speaker, setSpeaker] = useState(branch.hasOwnProperty('speaker') ? branch.speaker : '');
    const [text, setText] = useState(branch.hasOwnProperty('text') ? branch.text : '');
    const [next, setNext] = useState(branch.hasOwnProperty('next') ? branch.next : 0);
    const [isDefault, setIsDefault] = useState(false);

    const[isBranchSaved, setIsBranchSaved] = useState(true);

    useEffect(() => {
      if(branch.hasOwnProperty('next') && next !== branch.next){
        setNext(parseInt(branch.next));
      }
      //eslint-disable-next-line
    }, [branch.next])
    
    const choiceIdChange = (event) => {
      setChoiceId(Number(event.target.value));
      setIsBranchSaved(false);
      setSaveStatus(false);
    }
    const speakerChange = (event) => {
      setSpeaker(event.target.value);
      setIsBranchSaved(false);
      setSaveStatus(false);
    }
    const textChange = (event) => {
      setText(event.target.value);
      setIsBranchSaved(false);
      setSaveStatus(false);
    }
    const nextChange = (event) => {
      setNext(Number(event.target.value));
      setIsBranchSaved(false);
      setSaveStatus(false);
    }
    const switchIsDefault = () => {
      if(isDefault){
        setIsDefault(false);
        setChoiceId(0);
      }
      else{
        setIsDefault(true);
        setChoiceId(-1);
      }
      setIsBranchSaved(false);
      setSaveStatus(false);
    }
  
    const submitBranch = (event) => {
      event.preventDefault();
      const newBranch = {
        b_id: branch.b_id,
        c_id: choiceId,
        speaker: speaker,
        text: text,
        next: next
      }
      addBranchCont(newBranch);
      setIsBranchSaved(true);
    }

    return(
      <div className={isBranchSaved ? "node_branch node_saved" : "node_branch node_unsaved"}>
        <form onSubmit={submitBranch}>
          <div className="branch_header">
            <button className="submit_button node_header_button" type='submit'></button>
            <p className="branch_header_text">DIALOGUE BRANCH</p>
            <button className="delete_button node_header_button" onClick={() => deleteBranch(branch.b_id)}>X</button>
          </div>
          <p>CHOICE</p>
          #<input className="next_textbox" value={choiceId} onChange={choiceIdChange} disabled={isDefault}></input>
          <div className={isDefault ? "dial_branch_def_checked" : "dial_branch_def_unchecked"} onClick={() => switchIsDefault()}>DEFAULT</div>
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

  export default DialogueBranch;