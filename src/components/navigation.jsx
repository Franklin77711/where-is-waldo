import { useState, useEffect } from "react";
import Aang from "../pics/aang.png";
import Neo from "../pics/neo.png";
import Spider from "../pics/spider.png";
import "../stlyes/navigation.css"


function NavBar(isStarted){
    const {started} = isStarted
    const clock = started[0];
    const foundChar = started[1];
    const getFinalTime = started[2];
    const finalTime = started[3];
    const [time, setTime] = useState(0);
    const [index, setIndex] = useState(0);
    const [timer, setClock] = useState(true);
    const [finalTimeSet, setFinalTime] = useState(finalTime);
    const names = ["Aang", "Neo", "Spider-Man"];

    useEffect(() => {
      let interval;
      if (clock && !Object.values(foundChar).every(val => val)) {
          interval = setInterval(() => {
              setTime((prevTime) => prevTime + 10);
          }, 10);
      } else if (!clock || Object.values(foundChar).every(val => val)) {
          clearInterval(interval);
          setFinalTime(`${("0" + Math.floor((time / 60000) % 60)).slice(-2)}:${("0" + Math.floor((time / 1000) % 60)).slice(-2)}:${("0" + ((time / 10) % 100)).slice(-2)}`)
          setClock(false);
          setTime(0)
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

        useEffect(() =>{
          if(foundChar.Aang && foundChar.Neo && foundChar["Spider-Man"]){
      getFinalTime(finalTimeSet);
          }
        },[finalTimeSet]);


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