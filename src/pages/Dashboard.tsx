import Navbar from "../components/Navbar";
import Popup from 'reactjs-popup';
import { child, get, ref, set } from "firebase/database";
import { database, fireApp } from "../App";
import { getAuth } from "firebase/auth";
import Prediction from "../components/predictionBox";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import axios from "axios";

function Dashboard(){
    const auth = getAuth(fireApp);
    const userId = auth.currentUser?.uid;

    function createPrediction(event: any){
        event.preventDefault();
        const selectedLeague = document.querySelector("select[name='sportsleague']") as HTMLSelectElement;
        const league: string = selectedLeague.value;
        const container = document.getElementById("dashboard");

        retrieveLeagueData(league);

        set(ref(database, `users/${userId}/predictions`),{
            [league]: null
        })

        const newPrediction = document.createElement("div");
        ReactDOM.render(<Prediction bracket={league}/>, newPrediction)
        container?.appendChild(newPrediction);
    }

    async function retrieveLeagueData(league: string){
        // if (league === ""){

        // }
        const options = {
            method: 'GET',
            url: 'https://basketapi1.p.rapidapi.com/api/basketball/group/tournament/4618/season/22873/matches',
            headers: {
              'X-RapidAPI-Key': 'f25a3c0601msh66d2f137054c227p1a9429jsn9b16330dc6c6',
              'X-RapidAPI-Host': 'basketapi1.p.rapidapi.com'
            }
          };
        
        try {
            const response = await axios(options);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        // get(child(ref(database), `users/${userId}`)).then((snapshot) => {
            
        // }
    }, [])
    
    return(
        <div>
            <Navbar/>
            <div className="w-full h-20 bg-slate-300 flex flex-row justify-center fixed top-20">
                <Popup trigger={<button className="dashboard-btn text-green-500 border-green-500 border-2">Create Prediction</button>}>
                    <form className="flex flex-col items-center border-2 border-black w-96 bg-blue-300 shadow-lg rounded-lg p-6 h-72">
                        <h1>Select a Sports League:</h1>
                        <select name="sportsleague" className="mt-4">
                            <option value="NBA Playoffs">Nba Playoffs</option>
                            {/* <option value="NFL Playoffs">NFL Playoffs</option>
                            <option value="Stanley Cup Playoffs">Stanley Cup Playoffs</option> */}
                        </select>
                        <button onClick={createPrediction} type="submit" className="rounded-full bg-zinc-300 shadow-sm w-36 h-11 mt-11">Create</button>
                    </form>
                </Popup>
                <button className="dashboard-btn text-red-500 border-red-500 border-2">Delete Prediction</button>
            </div>
            <div id="dashboard" className="w-full h-screen bg-slate-200 flex flex-wrap pt-40"></div>
        </div>
    )
}

export default Dashboard;