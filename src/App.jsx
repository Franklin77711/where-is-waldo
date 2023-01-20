import "./stlyes/App.css";
import "./stlyes/welcome.css";
import "./stlyes/guess.css"
import BgImg from './pics/background.jpg';
import WelcomePage from "./components/welcome";
import NavBar from "./components/navigation";
import Guess from "./components/guess";
import { useState } from "react";


function App() {

const [isStarted, setIsStarted] = useState(false);
const [guessed, setGuessed] = useState(false);
const [position, setPosition] = useState([0,0])
const AangLoc = document.getElementById('guess-div')

const startGame =()=>{
  setIsStarted(true)
}

const renderGuess = (event) =>{ 
  if(guessed){
    setPosition([0,0]);
    setGuessed(false);
  }else{
    setPosition([event.pageX, event.pageY]);
    setGuessed(true);
  }
  console.log(AangLoc)
}

  return (
    <div className="content">
      <NavBar started={isStarted} />
      <WelcomePage startGameHandler={[startGame, isStarted]}/>
      <img id="bg-img" src={BgImg} alt="background" onClick={renderGuess}></img>
      {guessed && <Guess location={position}/>}
    </div>
  );
}

export default App;
