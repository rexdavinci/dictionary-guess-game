import React, { useState, useEffect, createContext } from 'react'

export const WordsFetchContext = createContext()

export default function WordsFetchProvider({children, difficulty, wordsStrength, numberOfWords, reset}) {
  const [allWords, setWords] = useState([])
  const [wordsLeft, setWordsLeft] = useState(0)
  const [currentWord, setCurrentWord] = useState("")
  const [currentQuestion, setCurrentQuestion] = useState("")
  const [usedWords, setUsedWords] = useState([])
  const [started, setStarted] = useState(false)
  const [score, setScore] = useState(0)
  const [myGuess, setGuess] = useState("")


  async function designStrength(a){
    if(wordsStrength==="default"){
      return a
    }else {
      wordsStrength = Number(wordsStrength)
      return a = await a.filter(b=>{
        return b.length === wordsStrength
      })
    }
  }

  async function designNumberOfWords(gws){
    let myWords = []
    if(numberOfWords !== "default"){
      numberOfWords = Number(numberOfWords)
      while(myWords.length < numberOfWords){
        let randomChoice = await gws[Math.floor(Math.random()*gws.length)]
        await myWords.push(randomChoice)
        await gws.splice(gws.indexOf(randomChoice),1)
      }
      await setWords(myWords)
      let rmd = await myWords.length
      await setWordsLeft(rmd)
    } else {
      await setWords(gws)
      let rmd = await gws.length
      await setWordsLeft(rmd)
    }
  }

  async function designDifficulty(a, q){
    let splitWord = await a.split("")
    switch(difficulty){
      case "1":
        for(let i in splitWord){
          if(i%3 === 0){
            q.push(splitWord[i])
          } else {
            q.push('x')
          }
        }
        q = q.join("").toUpperCase()
        break;
      case "2":
          for(let i in splitWord){
            if(i%2 === 0){
              q.push('x')
            } else {
              q.push(splitWord[i])
            }
          }
          q = q.join("").toUpperCase()
          break;
      default:
        for(let i in splitWord){
          if(i%2 === 0){
            q.push(splitWord[i])
          } else {
            q.push('x')
          }
        }
        q = q.join("").toUpperCase()
      }
    }

  async function getWords(){
    const response = await fetch('https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json')
    const data = await response.json()
    let gameWords = await Object.keys(data)
    gameWords = await designStrength(gameWords)
    await designNumberOfWords(gameWords)
  }


  function getUsedWords(){
    setUsedWords([...usedWords, currentWord])
  }

  async function createQuestion(){
    if(wordsLeft === 0){
      setStarted(false)
    }else{
      let randomWord = allWords[Math.floor(Math.random()*allWords.length)]
      let question = []
      await setCurrentWord(randomWord)
      await designDifficulty(randomWord, question)
      await setCurrentQuestion(question)
      await setStarted(true)
    }
  }

  const keepScore = async()=>{
    setScore(score + 1)
  }

  async function skipWord(){
    await popWord()
    if(allWords.length>0){
      await createQuestion()
    }
  }

  async function popWord(){
    await allWords.splice(allWords.indexOf(currentWord), 1)
    await setWords(allWords)
    await setWordsLeft(allWords.length)
    await getUsedWords()
  }

  useEffect(() => {
    getWords()
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <WordsFetchContext.Provider value={{
      reset,
      allWords: [...allWords],
      wordsLeft: wordsLeft,
      popWord: popWord,
      currentWord: currentWord,
      createQuestion: createQuestion,
      currentQuestion: currentQuestion,
      skipWord: skipWord,
      keepScore:keepScore,
      score: score,
      started: started,
      getUsedWords: getUsedWords,
      usedWords: usedWords,
      myGuess: myGuess,
      setGuess: setGuess,
      difficulty:difficulty,
      wordsStrength: wordsStrength

    }}>
      {children}
    </WordsFetchContext.Provider>
  )
}



