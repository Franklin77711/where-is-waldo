import "./stlyes/App.css";
import "./stlyes/welcome.css";
import "./stlyes/guess.css"
import "./stlyes/endgame.css"
import BgImg from './pics/background.jpg';
import WelcomePage from "./components/welcome";
import NavBar from "./components/navigation";
import Guess from "./components/guess";
import EndGame from "./components/endgame";
import { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import {collection, getDocs } from 'firebase/firestore/lite';
import { useRef } from "react";



function App() {
  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  async function getCharacters(db) {
    const characters = collection(db, 'Characters');
    const chacSnapShot = await getDocs(characters);
    const char = chacSnapShot.docs.map(doc => doc.data());
    setCharPosition(char[0])
  }

 

  
const bgImgRef = useRef(null)


const [isStarted, setIsStarted] = useState(false);
const [guessed, setGuessed] = useState(false);
const [position, setPosition] = useState([0,0]);
const [actualPos, setActualPos] = useState([0,0]);
const [charPosition, setCharPosition] = useState();
const [badGuess, setBadGuess] = useState(false);
const [goodGuess, setGoodGuess] = useState(false);
const [foundChar, setfoundChar] = useState({"Aang": false, "Neo": false, "Spider-Man": false});
const [finalTime, setFinalTime] = useState("00:00:00");
const [gameIsFinished, setGameIsFinished]= useState(false)

const [windowSize, setWindowSize] = useState([
  window.innerWidth,
  window.innerHeight,
]);

useEffect(()=>{
  const bgImg = bgImgRef.current;
  setActualPos([Math.round((position[0] / windowSize[0]) * 100) / 100, Math.round((position[1] / bgImg.clientHeight)* 100)/100]);
}, [position, windowSize])

const getFinalTime= (time)=>{
  setActualPos([0,0])
  setFinalTime(time);
  setGameIsFinished(true);
}



const startGame =()=>{
  setFinalTime("00:00:00");
  setfoundChar({"Aang": false, "Neo": false, "Spider-Man": false});
  setGameIsFinished(false)
  setIsStarted(true)
  getCharacters(db);
}


  const handleWindowResize = () => {
    setWindowSize([window.innerWidth, window.innerHeight]);
  }
function  renderGuess  (event) { 
  if(guessed){
    setGuessed(false);     
  }else{
    setPosition([event.pageX, event.pageY]);
    setGuessed(true);
  } 
}

const guessChar = (charName) =>{
  if(actualPos[0] >= charPosition[charName][0]-0.01 && 
    actualPos[0] <= charPosition[charName][0]+0.01 &&
    actualPos[1] >= charPosition[charName][1]-0.01 && 
    actualPos[1] <= charPosition[charName][1]+0.01){
    setfoundChar({...foundChar, [charName]: true});
    setGuessed(false); 
    setGoodGuess(true);
      setTimeout(() => {
        setGoodGuess(false);
      }, 3000);
  }else{
      setGuessed(false); 
      setBadGuess(true);
      setTimeout(() => {
        setBadGuess(false);
      }, 3000);
    }
}

  return (
    <div className="content" >
      <NavBar started={[isStarted, foundChar, getFinalTime, finalTime]}/>
      <WelcomePage startGameHandler={[startGame, isStarted]}/>
      <img id="bg-img" src={BgImg} alt="background" onClick={renderGuess} ref={bgImgRef} ></img>
      {guessed && <Guess location={[position, guessChar, foundChar]} />}
      {goodGuess && <div id="correct-guess">You found one!</div>}
      {badGuess && <div id="bad-guess">Oops! Try again!</div>}
      {gameIsFinished && <EndGame startGameHandler={[startGame, finalTime]}/>}
    </div>
  );
}

export default App;
