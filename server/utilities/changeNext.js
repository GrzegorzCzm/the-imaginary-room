const changeNext = (node, changeType) => { //When Add Next button of the nodes is clicked, all the Next values of the nodes below needs to be increased by 1 (same goes for IDs). This function does that. t is the node whose Add Next button is clicked.
    
    let changeFactor = 0;
    
    if(changeType === 'increment'){
        changeFactor = 1;
    }
    else if (changeType === 'decrement'){
        changeFactor = -1;
    }

    switch(node.type){
        case 'choice':
            {
                const newChoices = node.choices.map(c => {return {...c, next: c.next+changeFactor}}); //The Choice node itself doesn't have a Next value. Its choices does. So I first increse the next values of each node, then update the "choices" property of the node in the next line.
                return {...node, node_id: node.node_id+changeFactor, choices: newChoices}
            }
        case 'cond_choice':
            {
                const newCondChoices = node.choices.map(c => { //When it comes to a conditional choice node, things get a little bit complicated.
                    if(node.is_conditional){ //If the choice is conditional, it has if_picked and if_not_picked sections. We need to increase the Next values of both.
                      return {...c, if_picked: {...c.if_picked, next: c.if_picked.next+changeFactor}, if_not_picked: {...c.if_not_picked, next: c.if_not_picked.next+changeFactor}}
                    }
                    else{ //If the choice is not conditional, it is more straightforward. We just increase the next value.
                      return {...c, next: c.next+changeFactor}
                    }
                  });
                  return {...node, node_id: node.node_id+changeFactor, choices: newCondChoices}; //Just like the choice node, we add the updated choices property.
            }
        case 'cond_dialogue':
            {
                const newBranches = node.branches.map(b => {return {...b, next: b.next+changeFactor}});
                return {...node, node_id: node.node_id+changeFactor, branches: newBranches};
            }
        default:
            return node.hasOwnProperty("next") ? {...node, node_id: node.node_id+changeFactor, next: node.next+changeFactor} : {...node, node_id: node.node_id+changeFactor}; //With any other node, we just increase the next value and the ID value.
    }
  }

module.exports = changeNext;