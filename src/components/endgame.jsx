function EndGame(startGame){
    const {startGameHandler} = startGame;
    const startGameClick = startGameHandler[0];
    const needHide = startGameHandler[1]

    
    return(
        <div className={`endgame-page`} >
            <div className="endgame-div">
            <h1 className="endgame-heading">Leaderboard</h1>
            
            <button className="endgame-button" onClick={startGameClick} >Start Game</button>
            </div>
        </div>
    )
}

export default EndGame