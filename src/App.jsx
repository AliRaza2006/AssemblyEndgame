import React, { useEffect, useState } from "react"
import {Header} from "../Components/Header.jsx"
import {Status} from "../Components/Status.jsx"
import { Language } from "../Components/Language.jsx"
import { languages } from "../utils/languages.js"
import { Alphabet } from "../Components/Alphabet.jsx"
import { Key } from "../Components/key.jsx"
import Confetti from "react-confetti"
export default function App() {
  const [currentWord,setCurrentWord]=useState("")
  const [loading,setLoading]=useState(true)
  async function getWord() {
    setLoading(true);
    const start = Date.now();
    try {
        const response = await fetch(
            `https://random-word-api.herokuapp.com/word?length=${Math.floor(Math.random() * 4) + 3}&diff=1`
        );

        const data = await response.json();
        setCurrentWord(data[0].toLowerCase());
    } catch (err) {
        console.error(err);
    } finally {
        const elapsed = Date.now() - start;
        const minLoadingTime = 2000; // 1 second

        if (elapsed < minLoadingTime) {
            await new Promise(resolve =>
                setTimeout(resolve, minLoadingTime - elapsed)
            );
        }
        setLoading(false);
    }
}
  useEffect(()=>{
    getWord()
  },[])
  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  const [guessed,setGuessed]=useState([])
  let numberOfWrongGuesses=0
  const isLastGuessedLetterIncorrect=(!guessed.length||currentWord.includes(guessed[guessed.length-1]))?false:true
  for(let i=0;i<guessed.length;i++)
  {
    if(!currentWord.split("").includes(guessed[i]))
      numberOfWrongGuesses++
  }
  const isGameOver=numberOfWrongGuesses===languages.length-1
  const isGameWon=currentWord.split("").every((item)=>(guessed.includes(item)))
  console.log(numberOfWrongGuesses)
  function handleClick(alphabet)
  {
    if(!guessed.includes(alphabet))
    {
      setGuessed((prevGuessed)=>([...prevGuessed,alphabet]))
    }
  }
  async function handleNewGame()
  {
    await getWord()
    setGuessed([])
  }
    if(!loading)
    {
      return (
          <main>
              {isGameWon?<Confetti/>:null}
              <Header/>
              <Status won={isGameWon} over={isGameOver} lastIncorrectStatus={isLastGuessedLetterIncorrect} languageIndex={numberOfWrongGuesses-1}/>
              <div className="languageWrapper">
                {
                  languages.map((language,index)=>
                  (
                    <Language name={language.name} color={language.color} bgColor={language.backgroundColor} key={language.name} isDead={index<numberOfWrongGuesses?true:false} />
                  ))
                }
              </div>
              <div className="wordBox">
                {
                  [...currentWord].map((alphabet,index)=>{
                    const isCorrect=guessed.includes(alphabet)&&currentWord.split("").includes(alphabet)
                    return <Alphabet 
                    alphhabet={isCorrect?alphabet.toUpperCase():isGameOver||isGameWon?alphabet.toUpperCase():""} 
                    key={index}
                    unguessedLettersCondition={isGameOver&&!guessed.includes(alphabet)} />
                  })
                }
              </div>
              <div className="keyboard">
                {
                  [...alphabet].map((item)=>{
                    const isGuessed=guessed.includes(item)
                    const isCorrect=currentWord.split("").includes(item)
                    let color=!isGuessed?"#FCBA29":isCorrect?"#10A95B":"#EC5D49"
                    return <Key name={item.toUpperCase()} store={!(isGameOver||isGameWon)?()=>handleClick(item):null} key={item} bgColor={color}/>
                  })
                }
              </div>
              {isGameOver||isGameWon?<button className="newGame" onClick={handleNewGame}>New Game</button>:null}
          </main>
      )
    }
    else
    {
      return(
        <div className="loading">
        <div className="loader"></div>
        </div>
      )
    }
}
