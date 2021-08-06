import React from 'react';
import { useSelector } from 'react-redux';
import MainNode from '../MainNode';

const NodeList = () => {

    const content = useSelector(state => state.content);

    return(
        <div className="node_list">
                {
                    content.map(c =>  <MainNode key={c.id} node={c} />) //MainNode is the main container for all the other nodes. I use "const_id" as a key, because key needs to be something that won't change later and node IDs are changed whenever a new node is inserted or deleted in between. But const_id never changes. That way, changes in nodes are rendered properly
                }
        </div>
    );
}

export default NodeList;