import React, {useContext} from 'react'
import {WordsFetchContext} from './contexts/WordsFetch'

export default function Result({prefSet}) {
  const { usedWords, wordsLeft } = useContext(WordsFetchContext)

  if(wordsLeft===0 && usedWords.length>0){
    return(
      <div>
        {usedWords.map((word, index)=>{
          return <li key={index}>{word}</li>
        })}

      </div>
    )
  }
  return null
}

