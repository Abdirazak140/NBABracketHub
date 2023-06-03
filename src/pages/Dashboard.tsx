import { child, get, ref, set } from "firebase/database";
import { database, fireApp } from "../App";
import { getAuth } from "firebase/auth";
import { ReactComponent as SiteTitle } from "../assets/NBABracketHub (1).svg";
import axios from "axios";
import cheerio from "cheerio";
import { useNavigate } from "react-router-dom";

function Dashboard(){
    const navigate = useNavigate();
    const date = new Date();
    const currentYear = date.getFullYear();
    const auth = getAuth(fireApp);
    const userId = auth.currentUser?.uid;

    function retrieveLeagueData(league: string){
        const espnUrl = 'http://www.espn.com/nba/bracket';
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const newUrl = proxyUrl + espnUrl;
        axios.get(newUrl).then(response => {
            let teams: Array<string> = [];
            const html = response.data;
            const $ = cheerio.load(html);

            //first round
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
            let counter: number = 0;
            for (let i: number = 1; i <= 8; i++){
                set(ref(database, `users/${userId}/predictions/${league}/r1/match_${i}`),{
                    team_1: teams[counter],
                    team_2: teams[counter+1],
                })
                counter+=2;
            }

            //second round
            teams = [];
            const secondRound = $(".c2");
            secondRound.each((_: any, dl: any) => {
                $(dl).find("dt").each((_: any , dt: any) => {
                    let numOfTeams = $(dt).find("a");
                    if (numOfTeams.length === 1){
                        let text = $(numOfTeams).text().trim();
                        teams.push(text);
                        teams.push("TBA");
                    }
                    else if (numOfTeams.length === 0){
                        teams.push("TBA", "TBA");
                    }
                    else{
                        $(dt).find("a").each((_: any, a: any) => {
                            let text = $(a).text().trim();
                            teams.push(text);
                        })
                    }
                })
            })
            counter = 0;
            for (let i: number = 1; i <= 4; i++){
                set(ref(database, `users/${userId}/predictions/${league}/r2/match_${i}`),{
                    team_1: teams[counter],
                    team_2: teams[counter+1],
                })
                counter+=2;
            }


            //third round
            teams = [];
            const thirdRound = $(".c3");
            thirdRound.each((_: any, dl: any) => {
                $(dl).find("dt").each((_: any , dt: any) => {
                    let numOfTeams = $(dt).find("a");
                    if (numOfTeams.length === 1){
                        let text = $(numOfTeams).text().trim();
                        teams.push(text);
                        teams.push("TBA");
                    }
                    else if (numOfTeams.length === 0){
                        teams.push("TBA", "TBA");
                    }
                    else{
                        $(dt).find("a").each((_: any, a: any) => {
                            let text = $(a).text().trim();
                            teams.push(text);
                        })
                    }
                })
            })
            counter = 0;
            for (let i: number = 1; i <= 2; i++){
                set(ref(database, `users/${userId}/predictions/${league}/r3/match_${i}`),{
                    team_1: teams[counter],
                    team_2: teams[counter+1],
                })
                counter+=2;
            }

            
            //final round
            teams = [];
            const finalRound = $(".c4");
            finalRound.each((_: any, dl: any) => {
                $(dl).find("dt").each((_: any , dt: any) => {
                    let numOfTeams = $(dt).find("a");
                    if (numOfTeams.length === 1){
                        let text = $(numOfTeams).text().trim();
                        teams.push(text);
                        teams.push("TBA");
                    }
                    else if (numOfTeams.length === 0){
                        teams.push("TBA", "TBA");
                    }
                    else{
                        $(dt).find("a").each((_: any, a: any) => {
                            let text = $(a).text().trim();
                            teams.push(text);
                        })
                    }
                })
            })
            counter = 0;
            for (let i: number = 1; i <= 1; i++){
                set(ref(database, `users/${userId}/predictions/${league}/r4/match_${i}`),{
                    team_1: teams[counter],
                    team_2: teams[counter+1],
                })
                counter+=2;
            }
        })
    }

    function SendUsertoPredictionsPanel(leagueClicked: any){ 
        navigate(`/make-bracket-predictions/${leagueClicked}/${userId}`);
    }

    return(
        <div className="flex h-screen bg-gray-100">
            <div className="bg-black w-1/4 flex flex-col justify-between items-center text-white">
                <SiteTitle/>
            </div>

            <div id="dashboard" className="w-3/4 h-full flex flex-col bg-white p-8 overflow-auto">
                <h1 className="text-4xl font-bold">Dashboard</h1>
                <div className="flex justify-between">
                    <div className="flex flex-col justify-center items-center w-96 h-64 text-lg text-black bg-white border-black rounded-lg m-3 border-2 shadow-2xl hover:shadow-sm">
                        <p>{`NBA Playoff ${currentYear}`}</p>
                    </div>

                    <div className="flex flex-col justify-center items-center w-60 h-64 text-lg text-black bg-white border-black rounded-lg m-3 border-2 shadow-2xl hover:shadow-sm">
                        <p>Live Game</p>
                        {/* Live game details go here */}
                    </div>
                </div>
                <div className="flex justify-evenly">
                    <div className="flex flex-col justify-center items-center w-60 h-36 text-lg text-black bg-white border-black rounded-lg m-3 border-2 shadow-2xl hover:shadow-sm">
                        <p>Western Conference Leaderboard</p>
                        {/* Western conference leaderboard details go here */}
                    </div>

                    <div className="flex flex-col justify-center items-center w-60 h-36 text-lg text-black bg-white border-black rounded-lg m-3 border-2 shadow-2xl hover:shadow-sm">
                        <p>Eastern Conference Leaderboard</p>
                        {/* Eastern conference leaderboard details go here */}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Dashboard;