import React, {useContext} from 'react'
import {WordsFetchContext} from './contexts/WordsFetch'

export default function Statistic() {
  const { difficulty, wordsLeft, score, wordsStrength, usedWords } = useContext(WordsFetchContext)

  function isDefault(attr){
    if(attr === "default"){
      return (
        <em>{attr}</em>
      )
    } else {
      return attr
    }
  }

  if(wordsLeft>0 || usedWords.length>0){
    return (
      <div>
        <nav className="navbar">
          <ul>
            <li>Difficulty: <b>{isDefault(difficulty)}</b></li>
            <li>Words Left: <b>{wordsLeft}</b></li>
            <li>Words Strength: <b>{isDefault(wordsStrength)}</b> characters long </li>
            <li>Score: <b>{score}</b></li>
          </ul>
        </nav>
      </div>
    )
  } else{

    return(
      <nav className="navbar">
        <ul>
            <li>Difficulty: Loading Preference...</li>
            <li>Words Left: Loading Preference...</li>
            <li>Words Strength: Loading Preference...</li>
            <li>Score: -</li>
          </ul>
      </nav>
    )
  }
}
