

function Guess (position){
    const {location} = position;
    const guessPos = location[0];
    const guessChar = location[1];
    const foundChar = location[2];

    return(
        <div id="guess-div" style={{top: `${guessPos[1]}px`, left: `${guessPos[0]}px`}} className="scale-up-animation">
            <p className={`guess-name ${foundChar.Aang ? "found-name": ""}`} onClick={()=>{guessChar("Aang")}}>Aang</p>
            <p className={`guess-name ${foundChar.Neo ? "found-name": ""}`} onClick={()=>{guessChar("Neo")}} >Neo</p>
            <p className={`guess-name ${foundChar["Spider-Man"] ? "found-name": ""}`} onClick={()=>{guessChar("Spider-Man")}}>Spider-Man</p>
        </div>
    )
}

export default Guess