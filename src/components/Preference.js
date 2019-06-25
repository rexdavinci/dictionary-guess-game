import React from 'react'

export default function Preference(props) {
  const {submitForm, setDifficulty, pref, difficultyLevels, setWordsStrength, setNumberOfWords} = props.items

  return (
    <nav className="navbar">
    <form onSubmit={submitForm}>
      <div>
        <label htmlFor="difficulty"> Difficulty: </label>
          <select defaultValue={"default"} onChange={(e)=>{setDifficulty(e.target.value)}}>
            <option> - </option>
            {pref(difficultyLevels)}
          </select>
      </div>

      <div>
        <label htmlFor="word-strength">
          Only words<span> </span>
          <input type="number" min="3" max="15" onChange={(e)=>{setWordsStrength(e.target.value)}}/>
          <span> </span>characters long
        </label>
      </div>
      <div>
        <label htmlFor="number-of-words">
        I want<span> </span>
        <input type="number" min="1" onChange={(e)=>{setNumberOfWords(e.target.value)}}/>
        <span> </span>words
        </label>
      </div>
      <button>Submit</button>
    </form>
    <h4>Input your preferences to begin</h4>
  </nav>
  )
}
