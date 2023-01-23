import "./stlyes/App.css";
import "./stlyes/welcome.css";
import "./stlyes/guess.css"
import BgImg from './pics/background.jpg';
import WelcomePage from "./components/welcome";
import NavBar from "./components/navigation";
import Guess from "./components/guess";
import { useState, useEffect } from "react";
import { app, db } from "./firebaseConfig";
import {collection, getDocs } from 'firebase/firestore/lite';



function App() {

  async function getCharacters(db) {
    const characters = collection(db, 'Characters');
    const chacSnapShot = await getDocs(characters);
    const char = chacSnapShot.docs.map(doc => doc.data());
    setCharPosition(char)
  }
const [isStarted, setIsStarted] = useState(false);
const [guessed, setGuessed] = useState(false);
const [position, setPosition] = useState([0,0]);
const [actualPos, setActualPos] = useState([0,0])
const [charPosition, setCharPosition] = useState();



const startGame =()=>{
  setIsStarted(true)
}
const [windowSize, setWindowSize] = useState([
  window.innerWidth,
  window.innerHeight,
]);

  const bgImg = document.getElementById("bg-img");

  const handleWindowResize = () => {
    setWindowSize([window.innerWidth, window.innerHeight]);
  }
function  renderGuess  (event) { 
  event.preventDefault();
  handleWindowResize();
  getCharacters(db);
  console.log(charPosition)
  if(guessed){
    setPosition([0,0]);
    setActualPos([Math.round((position[0] / windowSize[0]) * 100) / 100, Math.round((position[1] / bgImg.clientHeight)* 100)/100]);
    setGuessed(false);
     
  }else{
    setPosition([event.pageX, event.pageY]);
    setGuessed(true);
  }
}



  return (
    <div className="content" >
      <NavBar started={isStarted} />
      <WelcomePage startGameHandler={[startGame, isStarted]}/>
      <img id="bg-img" src={BgImg} alt="background" onClick={renderGuess} ></img>
      {guessed && <Guess location={position}/>}
    </div>
  );
}

export default App;
