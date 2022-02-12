import React, { useState, useEffect } from 'react';
import { words } from './assets/wordle_words';
import Typography from '@mui/material/Typography';
import { Shake } from 'reshake'

import './App.css';

import WordleRow from './components/wordleRow';

function App() {
  const [shakeBoard, setShakeBoard] = useState(false);
  const [wordleWord, setWordleWord] = useState("");
  const [curRow, setCurRow] = useState(1);
  const [guesses, setGuesses] = useState([[], [], [], [], [], []]);

  const checkWord = (word) => {
    if (!words.includes(word.toLowerCase())) {
      setShakeBoard(true)
      setTimeout(function() {
        setShakeBoard(false)
      }, 500);
      return
    }

    // lets make our guess
    let guess = []

    for (let i = 0; i < 5; i++) {
      if (wordleWord[i] == word[i]) {
        guess.push('g');
      } else if (wordleWord.includes(word[i])) {
        guess.push('y')
      } else {
        guess.push('l');
      }
    }

    setGuesses(prevGuesses => {
      const newGuesses = [...prevGuesses];
      newGuesses[curRow - 1] = [...guess];
      return newGuesses;
    })
    setCurRow(curRow + 1); 
  }

  useEffect(() => {
    const d = new Date();
    var currentDate = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDay(), 0, 0, 0, 0);

    var myrng = new Math.seedrandom(`${currentDate.getTime()}`);
    var wordIndex = parseInt(currentDate.getTime() * myrng()) % 15918;

    setWordleWord(words[wordIndex].toUpperCase());
  });

  return (
    <div className="app-body">
      <Typography variant="h4" style={{ color: '#17ae8a' }}>
        THordle
      </Typography>
      <Typography variant="h5">
        A <span style={{ color: '#55e4ac' }}>TreeHacks</span> wordle clone
      </Typography>
      <br/>
      <Shake h={10} v={0} r={0} dur={300} int={10} active={shakeBoard} fixed={true}>
        <div className='wordleBoardContainer'>
          {[...Array(6)].map((x, i) =>
            <WordleRow guess={guesses[i]} row_id={i+1} curRow={curRow} checkWord={checkWord} />
          )}
        </div>
      </Shake>
      <br/>
      <Typography variant="h8">
        Created with ❤️ at TreeHacks 2022
      </Typography>
    </div>
  );
}

export default App;
