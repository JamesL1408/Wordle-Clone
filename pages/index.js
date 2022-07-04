import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'

import { library } from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faGithubSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';


const WORD_LENGTH = 5;

export default function Home() {

  const [solution,setSolution] = useState('');
  const [guesses,setGuesses] = useState(Array(6).fill(null));
  const [currentGuess,setCurrentGuess] = useState('');
  const [isGameOver,setIsGameOver] = useState(false);

  useEffect(() => {
    const handleType = (event) =>{

      if(isGameOver){
        return;     
      }

      if(event.key === 'Enter'){
        if(currentGuess.length !==5 ){
          return;
        }
        const newGuesses = [...guesses];
        newGuesses[guesses.findIndex(val=>val==null)] = currentGuess;
        setGuesses(newGuesses);
        setCurrentGuess('');

        const isCorrect = solution === currentGuess;
        if(isCorrect) {
          setIsGameOver(true);
          setTimeout(() => { alert('Well Done! You guessed correctly!') }, 1000);
        }
      }

      if(event.key === 'Backspace') {
        setCurrentGuess(currentGuess.slice(0,-1));
        return;
      }

      if(currentGuess.length >= 5){
        return;
      }

      const isLetter = event.key.match(/^[a-z]{1}$/) != null;
      if(isLetter){setCurrentGuess(currentGuess + event.key);}
    };

    window.addEventListener('keydown',handleType);

    return()=>window.removeEventListener('keydown',handleType);
  },[currentGuess,isGameOver,solution,guesses]);

  useEffect(()=>{
  const fetchWord = () =>{
  const words = require("../public/words.json");
  const randomWord = words[Math.floor(Math.random() * words.length)];
  setSolution(randomWord.toLowerCase());
  };
  fetchWord();
  },[]);

  function refreshPage (){
    window.location.reload();
  }


  return (
    <div className={styles.container}>
      <Head> 
        <title>Wordle - Clone</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/wordleLogo.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
      </Head>

      <header className='header' >
        <div className='title'>Wordle</div>
      </header>

      <div className='board'>
        {guesses.map((guess,i) =>{
          const isCurrentGuess = i === guesses.findIndex(val=>val==null);
          return(
            <Line  guess={isCurrentGuess ? currentGuess : guess ?? ""} isFinal={!isCurrentGuess && guess!=null} solution={solution}/>
          )
        })}
      </div>

      <button onClick={refreshPage} className='refresh'>New Game</button>

      <div className='footer'>
        <a target='_blank' href="https://www.linkedin.com/in/james-llewellyn-5b0229241/"><FontAwesomeIcon className='icon' icon={faLinkedin}/></a>
        <a target='_blank' href="https://github.com/JamesL1408/"><FontAwesomeIcon className='icon' icon={faGithubSquare}/></a>
        <a target='_blank' href="https://www.facebook.com/james.llewellyn.14"><FontAwesomeIcon className='icon' icon={faFacebookSquare}/></a>
        <a  target='_blank' download href="/CVJames.pdf"><FontAwesomeIcon className='iconpdf' icon={faFileLines}/></a>
      </div>
      
    </div>
  )
}

function Line({guess, isFinal,solution}){
  const tiles = [];

  for(let i = 0; i<WORD_LENGTH; i++){
    const char = guess[i];
    let className = 'tile';

    if(isFinal){
      if(char === solution[i]){
        className += ' correct';
      }else if(solution.includes(char)){
        className += ' close';
      }else{
        className += ' incorrect';
      }
    }

    tiles.push(<div key={i} className={className}>{char}</div>)
  }

  return(
    <div className='line'>
      {tiles}
    </div>
  )
}

