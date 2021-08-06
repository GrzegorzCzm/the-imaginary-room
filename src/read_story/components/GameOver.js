import React from 'react';
import {useHistory} from 'react-router-dom';

const GameOver = ({dispContent}) => {
  const history = useHistory();
    return(
      <div className="description center_content">
      <p>{dispContent.text}</p>
      <button className="game_over_button" onClick={() => history.push('/browse_stories')}>FINISH</button>
    </div>
    )
  }

export default GameOver;