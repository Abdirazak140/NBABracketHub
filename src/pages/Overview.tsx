import { ref, set } from "firebase/database";
import { database, fireApp } from "../App";
import { getAuth } from "firebase/auth";
import Playoffs from "../assets/pngaaa.com-405120.png"
import axios from "axios";
import cheerio from "cheerio";
import { useNavigate } from "react-router-dom";
import Dashbar from "../components/Dashbar";

function Overview(){
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
    
    async function fetchStandings(){
        const options = {
        method: 'GET',
        url: 'https://api-nba-v1.p.rapidapi.com/standings',
        params: {
            league: 'standard',
            season: '2022',
            conference: 'east'
        },
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
        }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            sortTeams(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    function sortTeams(data: any){
        let easternConference = data.map
    }

    fetchStandings();

    function SendUsertoPredictionsPanel(leagueClicked: any){ 
        navigate(`/make-bracket-predictions/${leagueClicked}/${userId}`);
    }

    return(
        <div className="flex h-screen bg-gray-100">
            <Dashbar/>

            <div id="dashboard" className="w-3/4 h-full flex flex-col justify-between bg-white p-8 overflow-auto">
                <h1 className="text-4xl font-bold">Dashboard</h1>
                <div className="flex justify-between">
                    <div className="playoffs-btn flex flex-col justify-center items-center w-96 h-64 text-lg text-black bg-white border-black rounded-lg ml-3 border-2 shadow-2xl hover:shadow-sm">
                        <p>{`NBA Playoffs ${currentYear} Bracket Predictions`}</p>
                    </div>

                    <div className="flex flex-col justify-center items-center w-100 h-64 text-lg text-black bg-white border-black rounded-lg mr-3 border-2 shadow-2xl hover:shadow-sm">
                        <p>Live Game</p>
                        {/* Live game details go here */}
                    </div>
                </div>
                <div className="flex justify-evenly">
                    <div className="flex flex-col justify-center items-center w-full h-60 text-lg text-black bg-white border-black rounded-lg m-3 border-2 shadow-2xl hover:shadow-sm overflow-auto">
                        <p className="font-bold text-xl mb-4">Western Conference Leaderboard</p>
                        {/* {data.map((item, index) => (
                            <div key={index} className="flex justify-between w-full px-4 py-2">
                                <span className="text-left">{item.teamName}</span>
                                <span className="text-right">{item.score}</span>
                            </div>
                        ))} */}
                    </div>


                    <div className="flex flex-col justify-center items-center w-full h-60 text-lg text-black bg-white border-black rounded-lg m-3 border-2 shadow-2xl hover:shadow-sm overflow-auto">
                        <p className="font-bold text-xl mb-4">Eastern Conference Leaderboard</p>
                        {/* {data.map((item, index) => (
                            <div key={index} className="flex justify-between w-full px-4 py-2">
                                <span className="text-left">{item.teamName}</span>
                                <span className="text-right">{item.score}</span>
                            </div>
                        ))} */}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Overview;