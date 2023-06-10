import { fireApp } from "../App";
import { getAuth } from "firebase/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dashbar from "../components/Dashbar";
import { useEffect, useState } from "react";
import { MdLiveTv } from "react-icons/md";
import { IconContext } from "react-icons";

function Overview(){
    const navigate = useNavigate();
    const date = new Date();
    const currentYear = date.getFullYear();
    const auth = getAuth(fireApp);
    const userId = auth.currentUser?.uid;

    const [team1, setTeam1] = useState("team");
    const [team2, setTeam2] = useState("team");
    const [team1_score, setTeam1_Score] = useState("20");
    const [team2_score, setTeam2_Score] = useState("53");
    const [team1_logo, setTeam1_Logo] = useState("https://upload.wikimedia.org/wikipedia/fr/0/0e/San_Antonio_Spurs_2018.png");
    const [team2_logo, setTeam2_Logo] = useState("https://upload.wikimedia.org/wikipedia/fr/0/0e/San_Antonio_Spurs_2018.png");
    const [period, setPeriod] = useState("4th Quarter")

    const [easternTeams, setEasternTeams] = useState([]);
    const [westernTeams, setWesternTeams] = useState([]);
    const [eloading, setEloading] = useState(true);
    const [wloading, setlWoading] = useState(true);

    async function fetchLiveMatch(){
        const options = {
            method: 'GET',
            url: 'https://api-nba-v1.p.rapidapi.com/games',
            params: {live: 'all'},
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
            }
        };
          
        try {
            const response = await axios.request(options);
            console.log(response.data);

        } catch (error) {
            console.error(error);
        }
    }

    async function fetchEasternStandings(){
        function sortEasternTeams(data: any){
            let tempTeams: any = [];
            for (let i=0; i<14; i++){
                const team = {
                    name: data[i].team.name,
                    wins: data[i].conference.win,
                    loss: data[i].conference.loss,
                    rank: data[i].conference.rank
                }
                tempTeams[data[i].conference.rank] = team;
            }
            setEasternTeams(tempTeams)
            setEloading(false);
        }
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
            sortEasternTeams(response.data.response);
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchWesternStandings(){
        function sortWesternTeams(data: any){
            let tempTeams: any = [];
            for (let i=0; i<14; i++){
                const team = {
                    name: data[i].team.name,
                    wins: data[i].conference.win,
                    loss: data[i].conference.loss,
                    rank: data[i].conference.rank
                }
                tempTeams[data[i].conference.rank] = team;
            }
            setWesternTeams(tempTeams)
            setlWoading(false);
        }
        const options = {
            method: 'GET',
            url: 'https://api-nba-v1.p.rapidapi.com/standings',
            params: {
                league: 'standard',
                season: '2022',
                conference: 'west'
            },
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            sortWesternTeams(response.data.response);
        } catch (error) {
            console.error(error);
        }
    }

    function SendUsertoPredictionsPanel(){ 
        navigate("/make-bracket-predictions");
    }
    
    useEffect(() => {
        // fetchEasternStandings();
        // fetchWesternStandings();
        // fetchLiveMatch();
    },[])
    
    return(
        <div className="flex h-screen bg-gray-100">
            <Dashbar/>

            <div id="dashboard" className="w-3/4 h-full flex flex-col justify-between bg-white p-8 overflow-auto">
                <h1 className="text-4xl font-bold mb-5">Dashboard</h1>

                <div className="flex justify-evenly space-x-8" onClick={SendUsertoPredictionsPanel}>
                    <div className="playoffs-btn flex flex-col justify-center items-center w-100 h-64 text-lg text-black bg-white border-black rounded-lg ml-3 border-2 shadow-2xl hover:shadow-sm">
                        <p>{`NBA Playoffs ${currentYear} Bracket Predictions`}</p>
                    </div>

                    <div className="flex flex-col justify-center items-center w-full h-64 text-lg text-black bg-glucose border-black rounded-lg mr-3 border-2 shadow-2xl hover:shadow-sm">
                        <div className="flex flex-row justify-center items-center space-x-2 mb-4 bg-glucose">
                            <IconContext.Provider value={{ color: "red", size: "40px"}}>
                                <MdLiveTv/>
                            </IconContext.Provider>
                            <p className="font-semibold text-2xl">LIVE GAME</p>
                        </div>
                        <div className="flex flex-row justify-center space-x-8 w-full bg-glucose">
                            <div className="flex flex-col items-center">
                                <img className="h-24 w-full mb-2" src={team1_logo} alt="team 1 logo"/>
                                <span className="font-semibold text-xl">{team1}</span>
                                <span className="text-xl">{team1_score}</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <img className="h-24 w-full mb-2" src={team2_logo} alt="team 1 logo"/>
                                <span className="font-semibold text-xl">{team2}</span>
                                <span className="text-xl">{team2_score}</span>
                            </div>
                        </div>
                        <span className="text-xl">{period}</span>
                    </div>
                </div>

                <div className="flex justify-evenly">
                    <div className="flex flex-col justify-center items-center w-full h-80 bg-white border-black rounded-lg m-3 border-2 shadow-2xl hover:shadow-sm">
                        <div className="h-full w-full overflow-y-scroll">
                            <div className="w-full flex justify-center"><span className="text-bold text-xl m-2">WESTERN STANDINGS</span></div>
                            { !wloading ?
                                (westernTeams.map((team: any) => {
                                    return (
                                        <div key={team.rank} className="flex justify-between items-center p-2">
                                            <span className="text-sm font-bold">{team.rank}. {team.name}</span>
                                            <div className="flex space-x-4">
                                                <span className="text-sm">Wins: {team.wins}</span>
                                                <span className="text-sm">Loss: {team.loss}</span>
                                            </div>
                                        </div>
                                    )
                                })) : (<p className="text-xl mb-4">Loading...</p>)
                            }
                        </div>
                    </div>

                    <div className="flex flex-col justify-center items-center w-full h-80 bg-white border-black rounded-lg m-3 border-2 shadow-2xl hover:shadow-sm">
                        <div className="h-full w-full overflow-y-scroll">
                            <div className="w-full flex justify-center"><span className="text-bold text-xl m-2">EASTERN STANDINGS</span></div>
                            { !eloading ?
                                (easternTeams.map((team: any) => {
                                    return (
                                        <div key={team.rank} className="flex justify-between items-center p-2">
                                            <span className="text-sm font-bold">{team.rank}. {team.name}</span>
                                            <div className="flex space-x-4">
                                                <span className="text-sm">Wins: {team.wins}</span>
                                                <span className="text-sm">Loss: {team.loss}</span>
                                            </div>
                                        </div>
                                    )
                                })) : (<p className="text-xl mb-4">Loading...</p>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Overview;