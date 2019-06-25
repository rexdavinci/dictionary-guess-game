import React, {useState} from 'react'
import RightorWrong from './RightorWrong'

export default function Form({answer, popWord, createQuestion, keepScore, myGuess, setGuess}) {
  const [rightORwrong, setRightORWrong] = useState("")
  const [tried, setTried] = useState(1)

  const handleChange =(e)=>{
    setGuess(e.target.value)
  }

  const handleSubmit=async (e)=>{
    e.preventDefault()
    setTried(tried+1)
    await setRightORWrong('checking if you are right...')
    if(myGuess===answer){
      await setTimeout(function(){
        setRightORWrong("Good Job")
        keepScore()
        setTimeout(async function(){
          setRightORWrong("")
          await popWord()
          await createQuestion()
        }, 3000)
      }, 2000)
    } else {
      setGuess("")
      keepScore()
      setRightORWrong("Try again or Click Generate new Word to proceed to another one")
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="answer">My Guess: </label>
        <input type="text" placeholder="enter your guess here" onChange={handleChange}/>
      </form>
      <RightorWrong rightORwrong={rightORwrong}/>
    </>
  )
}
