import React, {useContext } from 'react'

import { WordsFetchContext } from './contexts/WordsFetch';

export default function StartOrSkip() {
  const { skipWord, createQuestion, started, wordsLeft, reset } = useContext(WordsFetchContext)
  // let started = false
  if(!started && wordsLeft>=1){
    return (
      <div>
        <button onClick={createQuestion}>Begin</button>
        <button onClick={reset}>Go back</button>
      </div>
    )
  }
  else if(started && wordsLeft>=1){
    return(
      <div>
        <button onClick={skipWord}>Skip</button>
        <button onClick={reset}>Reset</button>
      </div>
    )
  }
  else{
    return null
  }
}
