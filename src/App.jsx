import "./stlyes/App.css";
import "./stlyes/welcome.css";
import "./stlyes/guess.css"
import BgImg from './pics/background.jpg';
import WelcomePage from "./components/welcome";
import NavBar from "./components/navigation";
import Guess from "./components/guess";
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





const startGame =()=>{
  setIsStarted(true)
  getCharacters(db);
}
const [windowSize, setWindowSize] = useState([
  window.innerWidth,
  window.innerHeight,
]);

  const handleWindowResize = () => {
    setWindowSize([window.innerWidth, window.innerHeight]);
  }
function  renderGuess  (event) { 
  const bgImg = bgImgRef.current;
  console.log(foundChar)
  if(guessed){
    setGuessed(false);     
  }else{
    setPosition([event.pageX, event.pageY]);
    setActualPos([Math.round((position[0] / windowSize[0]) * 100) / 100, Math.round((position[1] / bgImg.clientHeight)* 100)/100]);
    setGuessed(true);
  }
}

const guessChar = (charName) =>{
  if(actualPos[0] >= charPosition[charName][0]-0.05 && 
    actualPos[0] <= charPosition[charName][0]+0.05 &&
    actualPos[1] >= charPosition[charName][1]-0.05 && 
    actualPos[1] <= charPosition[charName][1]+0.05){

    setfoundChar({...foundChar, [charName]: true});
    setGuessed(false); 
    setGoodGuess(true);
      setTimeout(() => {
        setGoodGuess(false);
      }, 3000);
    console.log("jó")
  }else{
      setGuessed(false); 
      setBadGuess(true);
      setTimeout(() => {
        setBadGuess(false);
      }, 3000);
    }
  console.log(charPosition[charName])
  console.log(actualPos)
  console.log(Math.round((actualPos[0]-0.01)*100)/100)
}



  return (
    <div className="content" >
      <NavBar started={[isStarted, foundChar]} />
      <WelcomePage startGameHandler={[startGame, isStarted]}/>
      <img id="bg-img" src={BgImg} alt="background" onClick={renderGuess} ref={bgImgRef} ></img>
      {guessed && <Guess location={[position, guessChar, foundChar]} />}
      {goodGuess && <div id="correct-guess">You found one!</div>}
      {badGuess && <div id="bad-guess">Oops! Try again!</div>}
    </div>
  );
}

export default App;
