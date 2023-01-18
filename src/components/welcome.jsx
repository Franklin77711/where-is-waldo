import Aang from "../pics/aang.png";
import Neo from "../pics/neo.png";
import Spider from "../pics/spider.png";

function WelcomePage (startGame){
    const {startGameHandler} = startGame;
    const startGameClick = startGameHandler[0];
    const needHide = startGameHandler[1]
    
    return(
        <div className={`welcome-div ${needHide ? "hide-welcome": "" }`}>
            <h1 className="welcome-heading">Welcome to Where Is Waldo</h1>
            <p className="welcome-para">(Cartoon Edition)</p>
            <h2>Find These characters</h2>
            <div className="welcome-img">
              <img src={Aang} alt="Aang from Avatar"></img>
              <img src={Neo}alt="Neo from Matrix"></img>
              <img src={Spider} alt="Spider-man"></img>
            </div>
            <button className="welcome-button" onClick={startGameClick}>Start</button>
        </div>
    )
}

export default WelcomePage