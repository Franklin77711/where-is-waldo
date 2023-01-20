

function Guess (position){
    const {location} = position
    console.log(location)

    return(
        <div id="guess-div" style={{top: `${location[1]}px`, left: `${location[0]}px`}}>
            <p className="guess-name">Aang</p>
            <p className="guess-name">Neo</p>
            <p className="guess-name">Spider-Man</p>
        </div>
    )
}

export default Guess