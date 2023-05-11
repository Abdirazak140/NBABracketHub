import Navbar from "../components/Navbar";
import Popup from 'reactjs-popup';
import { child, get, ref, set } from "firebase/database";
import { database, fireApp } from "../App";
import { getAuth } from "firebase/auth";
import Prediction from "../components/predictionBox";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import axios from "axios";
import cheerio from "cheerio";

function Dashboard(){
    const auth = getAuth(fireApp);
    const userId = auth.currentUser?.uid;

    function createPrediction(event: any){
        event.preventDefault();
        const selectedLeague = document.querySelector("select[name='sportsleague']") as HTMLSelectElement;
        const league: string = selectedLeague.value;
        const container = document.getElementById("dashboard");

        retrieveLeagueData();

        set(ref(database, `users/${userId}/predictions`),{
            [league]: null
        })

        const newPrediction = document.createElement("div");
        ReactDOM.render(<Prediction bracket={league}/>, newPrediction)
        container?.appendChild(newPrediction);
    }

    function retrieveLeagueData(){
        const espnUrl = 'http://www.espn.com/nba/bracket';
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const newUrl = proxyUrl + espnUrl;
       axios.get(newUrl).then(response => {
            let teams: Array<string> = [];
            const html = response.data;
            const $ = cheerio.load(html);
            const firstRound = $(".c1");

            firstRound.each((_: any, dl: any) => {
                $(dl).find("dt").each((_: any , dt: any) => {
                    let text = $(dt).text().trim();
                    const textArr = text.split("(");
                    const team1_text = textArr[1].split(")");
                    const team2_text = textArr[2].split(")");
                    const team1 = team1_text[1].substring(1);
                    const team2 = team2_text[1].substring(1);
                    teams.push(team1);
                    teams.push(team2);
                })
            })
            console.log(teams);
        
        }).catch(error => {
            console.log(error);
        })
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