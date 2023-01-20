import { useState, useEffect } from "react";
import Aang from "../pics/aang.png";
import Neo from "../pics/neo.png";
import Spider from "../pics/spider.png";
import "../stlyes/navigation.css"

function NavBar(isStarted){
    const started = isStarted.started
    const [time, setTime] = useState(0);
    const [index, setIndex] = useState(0);
    const names = ["Aang", "Neo", "Spider-Man"]

    useEffect(() => {
        let interval;
        if (started) {
          interval = setInterval(() => {
            setTime((prevTime) => prevTime + 10);
          }, 10);
        } else if (!started) {
          clearInterval(interval);
        }
        return () => clearInterval(interval);
      }, [started]);

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
                <img src={Aang} alt="Aang from Avatar"></img>
                <img src={Neo}alt="Neo from Matrix"></img>
                <img src={Spider} alt="Spider-man" className="spider"></img>
            </div>
        </div>
    )
}
export default NavBar