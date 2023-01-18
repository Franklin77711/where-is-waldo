import "./stlyes/App.css";
import "./stlyes/welcome.css";
import BgImg from './pics/background.jpg';
import WelcomePage from "./components/welcome";
import NavBar from "./components/navigation";
import { useState } from "react";


function App() {

const [isStarted, setIsStarted] = useState(false);

const startGame =()=>{
  setIsStarted(true)
}
  return (
    <div className="content">
      <NavBar started={isStarted} />
      <WelcomePage startGameHandler={[startGame, isStarted]}/>
      <img className="bg-img" src={BgImg} ></img>
    </div>
  );
}

export default App;
