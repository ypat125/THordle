import React, { useState, useEffect } from 'react';
import { words } from './assets/wordle_words';
import Typography from '@mui/material/Typography';
import { Shake } from 'reshake'

import './App.css';

import WordleRow from './components/wordleRow';
import SuccessModal from './components/successModal';
import FailureModal from './components/failureModal';

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD6mX2UcUYKghKoilC3epLEy1G0uFYh7S0",
  authDomain: "thordle.firebaseapp.com",
  projectId: "thordle",
  storageBucket: "thordle.appspot.com",
  messagingSenderId: "1057414189884",
  appId: "1:1057414189884:web:0dbe6420c55e8f57c58439",
  measurementId: "G-QN3MXB9DYW"
};

const app = initializeApp(firebaseConfig);

function App() {
  // Modals
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [failureModalOpen, setFailureModalOpen] = useState(false);

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
    let completelyCorrect = true;

    for (let i = 0; i < 5; i++) {
      if (wordleWord[i] == word[i]) {
        guess.push('g');
      } else if (wordleWord.includes(word[i])) {
        guess.push('y');
        completelyCorrect = false;
      } else {
        guess.push('l');
        completelyCorrect = false;
      }
    }

    setGuesses(prevGuesses => {
      const newGuesses = [...prevGuesses];
      newGuesses[curRow - 1] = [...guess];
      return newGuesses;
    })
    setCurRow(curRow + 1); 

    if (completelyCorrect) {
      setSuccessModalOpen(true);
      return;
    }

    if (curRow == 6) {
      setFailureModalOpen(true);
      return;
    }
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
            <WordleRow key={i} guess={guesses[i]} row_id={i+1} curRow={curRow} checkWord={checkWord} />
          )}
        </div>
      </Shake>
      <br/>
      <Typography variant="h8">
        Created with ❤️ at TreeHacks 2022
      </Typography>
      <SuccessModal closeModal={() => setSuccessModalOpen(false)} isModalOpen={successModalOpen} />
      <FailureModal closeModal={() => setFailureModalOpen(false)} isModalOpen={failureModalOpen} />
    </div>
  );
}

export default App;
