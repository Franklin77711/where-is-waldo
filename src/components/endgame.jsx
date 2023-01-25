import { getDocs, collection, query, doc, addDoc, setDoc } from "firebase/firestore/lite";
import { useState } from "react";
import { db } from "../firebaseConfig";
import { useEffect } from "react";


function EndGame(startGame){
    const {startGameHandler} = startGame;
    const startGameClick = startGameHandler[0];
    const time = startGameHandler[1];
    const [leaderboard, setLeaderboard] = useState([]);    
    const [user, setUser] = useState("");
    const [username, setUsername] = useState("")
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [sortedLeaderboard, setSortedLeaderboard] = useState([]);
   
   const loginAnonymously = () =>{
    setUser(username)
    setIsAnonymous(true)
    }
   const setScore= async(timeprop, userprop)=>{
        await setDoc(doc(db, "Leaderboard", userprop), {
        name: userprop,
        time: timeprop,
      })
    }
        async function getLeaderboard(){
            const q = query(collection(db, "Leaderboard"));
            const chacSnapShot =  await getDocs(q);
            const char = chacSnapShot.docs.map(doc => doc.data());
            
            const sortedData = char.sort(function(a, b) {
                const aSplitted = a.time.split(':');
                const bSplitted = b.time.split(':');
                const aTime = Number(aSplitted[0]) * 3600 + Number(aSplitted[1]) * 60 + Number(aSplitted[2]);
                const bTime = Number(bSplitted[0]) * 3600 + Number(bSplitted[1]) * 60 + Number(bSplitted[2]);
                return aTime - bTime;
                
            });
            setSortedLeaderboard(sortedData);
            setLeaderboard(char)
          
        }
       
   useEffect(()=>{
    if(isAnonymous){
    setScore(time, user)
    getLeaderboard()
    }
   }, [isAnonymous])
    
    return(
        <div className={`endgame-page`}>

               {!isAnonymous && (
                <div id="login-div" className="endgame-div">
                    <h1>Your time is <span className="login-time">{time}!</span></h1>
                    <div id="login-div">
                     <input
                         type="text"
                         placeholder="Enter a username"
                         value={username}
                         onChange={e => setUsername(e.target.value)}
                     />
                     <button className="endgame-button" id="login-btn" onClick={loginAnonymously}>Register Score</button>
                    </div>
                </div>
            )}

            {isAnonymous && (
            <div className="endgame-div">
            <h1 className="endgame-heading">Leaderboard</h1>
            <div className="endgame-leaderboard">
            {sortedLeaderboard.map((data)=>{
                return(
                    <div key={data.name} className="user-container">
                        <p className="username">{data.name}</p>
                        <p className="userdata">{data.time}</p>
                    </div>
                )
            })}
            </div>
            <button className="endgame-button" onClick={startGameClick} >Start Game</button>
            </div>
            )}

        </div>
    )
}

export default EndGame