import React, {useState} from 'react'
import WordsFetchProvider from './contexts/WordsFetch';
import PopWord from './PopWord';
import StartOrSkip from './StartOrSkip';
import Preference from './Preference';
import Statistic from './Statistic';
import Result from './Result';

export default function GuessGame() {
  const [prefSet, setPref] = useState(false)
  const [difficulty, setDifficulty] = useState("default")
  const [wordsStrength, setWordsStrength] = useState("default")
  const [numberOfWords, setNumberOfWords] = useState("default")
  let difficultyLevels = [1,2]

  function pref(attr){
    return attr.map((att, index)=>{
      return(<option key={index} value={att}>{att}</option>)
    })
  }

  function submitForm(e){
    e.preventDefault()
    setPref(!prefSet)
  }
  function reset(){
    setPref(!pref)
  }

  if(!prefSet){
    return(
      <Preference items={{submitForm, setDifficulty, pref, difficultyLevels, setWordsStrength, setNumberOfWords}}/>
    )
  } else {
    return(
      <>
        <WordsFetchProvider difficulty={difficulty} wordsStrength={wordsStrength} numberOfWords={numberOfWords} reset={reset}>
          <Statistic />
          <PopWord/>
          <StartOrSkip />
          <Result fromGuessGame={prefSet}/>
        </WordsFetchProvider>
      </>
    )
  }
}
