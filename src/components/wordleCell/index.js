import React, { useState } from 'react';
import './styles.css';

import TextField from '@mui/material/TextField';

function WordleCell(props) {
  const [value, setValue] = useState('');

  const setCleanValue = (value) => {
    // sanitize
    if ((!value.match(/[a-z]/i)) && value.length != 0) { // check if it is alpha
      return;
    }

    value = value.toUpperCase();
    let character_added = true;

    if (value.length === 1) {
      setValue(value);
    } else if (value.length === 2) {
      setValue(value.charAt(1));
    } else {
      setValue('');
      character_added = false;
    }

    if (character_added) {
      if (props.id < 6) {
        const nextfield = document.querySelector(
          `input[name=cell-${props.row}-${props.id + 1}]`
        );
        if (nextfield !== null) {
          nextfield.focus();
        }
      }
    } else {
      if (props.id > 1) {
        const nextfield = document.querySelector(
          `input[name=cell-${props.row}-${props.id - 1}]`
        );
        if (nextfield !== null) {
          nextfield.focus();
        }
      }
    }
  }

  return (
    <div className="wordleCell">
      <input 
        disabled={props.curRow != props.row} 
        value={value} type="text" 
        className={
          props.guess === 'g' && 'wordleCellInput green' || 
          props.guess === 'l' && 'wordleCellInput gray' ||
          props.guess === 'y' && 'wordleCellInput yellow' ||
          !props.guess && 'wordleCellInput'
        } 
        onChange={(e) => setCleanValue(e.target.value)} 
        name={`cell-${props.row}-${props.id}`} 
        id={`cell-${props.row}-${props.id}`} 
        onKeyPress={event => {
          if (event.key === 'Enter' && props.checkRowWord) {
            props.checkRowWord()
          }
        }}
      />
    </div>
  );
}

export default WordleCell;
