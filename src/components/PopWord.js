import React, { useContext } from 'react'
import { WordsFetchContext } from './contexts/WordsFetch';
import MyGuess from './MyGuess'
import BeginGame from './BeginGame';

function PopWord(){
  const { popWord, wordsLeft, currentWord, usedWords, createQuestion, currentQuestion, keepScore, score, setGuess, myGuess, reset } = useContext(WordsFetchContext)

  if(wordsLeft===0 && usedWords.length>0){
    return(
      <div>
        <h2>Welldone... here are the words you were given...</h2>
        <button onClick={reset}>Reset</button>
        <p>Thanks to <a href="https://www.github.com/dwyl"> dwyl </a>For providing the words library</p>
      </div>
    )
  }
  else if (wordsLeft === 0 && score===0){
    return (
      null
    )
  } else if(wordsLeft>0){
    return (
      <>
        <h2>{currentQuestion}</h2>
        <MyGuess answer={currentWord} popWord={popWord} createQuestion={createQuestion} keepScore={keepScore} setGuess={setGuess} myGuess={myGuess}/>
        <BeginGame />
      </>
    )
  }
}

export default PopWord
