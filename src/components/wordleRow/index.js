import React, { useState } from 'react';
import './styles.css';

import WordleCell from '../wordleCell';

function WordleRow(props) {

  const checkWordCoalesce = () => {
    let word = "";
    
    for (let i = 1; i <= 5; i++) {
      word += document.getElementById(`cell-${props.curRow}-${i}`).value;
    }

    if (word.length == 5) {
      props.checkWord(word);
    } else {
      return;
    }
  }

  return (
    <div className="wordleRow">
      {[...Array(5)].map((x, i) =>
        <WordleCell id={i+1} guess={props.guess[i]} row={props.row_id} curRow={props.curRow} checkRowWord={checkWordCoalesce} />
      )}
    </div>
  );
}

export default WordleRow;
