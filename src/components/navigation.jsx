import { useState, useEffect } from "react";
import Aang from "../pics/aang.png";
import Neo from "../pics/neo.png";
import Spider from "../pics/spider.png";
import "../stlyes/navigation.css"

function NavBar(isStarted){
    const {started} = isStarted
    const clock = started[0];
    const foundChar = started[1]
    const [time, setTime] = useState(0);
    const [index, setIndex] = useState(0);
    const [timer, setClock] = useState(true);
    const [finalTime, setFinalTime] = useState("00:00:00")
    const names = ["Aang", "Neo", "Spider-Man"]

    const allFound = Object.values(foundChar).every(val => val === true);

    useEffect(() => {
      let interval;
      if (clock && !Object.values(foundChar).every(val => val)) {
          interval = setInterval(() => {
              setTime((prevTime) => prevTime + 10);
          }, 10);
      } else if (!clock || Object.values(foundChar).every(val => val)) {
          clearInterval(interval);
          setFinalTime(time)
          console.log(finalTime)
          setClock(false);
      }
      return () => clearInterval(interval);
  }, [clock, foundChar]);

      useEffect(()=>{
        if (index === 3){
            setIndex(0)
        }else{
          setTimeout(() => setIndex((index) => index + 1), 2000);       
        }
        }, [index]);

    return(
        <div className="navigation">
            <h1 className="nav-header">Where is <span id="char-name">{names[index]}</span></h1>
            <div className="timer">
                <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
                <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
            </div>
            <div className="nav-img">
                <img src={Aang} alt="Aang from Avatar" className={` ${foundChar.Aang ? "bw-img": ""}`}></img>
                <img src={Neo}alt="Neo from Matrix" className={` ${foundChar.Neo ? "bw-img": ""}`}></img>
                <img src={Spider} alt="Spider-man" className={`spider ${foundChar["Spider-Man"]? "bw-img": ""}`}></img>
            </div>
        </div>
    )
}
export default NavBar