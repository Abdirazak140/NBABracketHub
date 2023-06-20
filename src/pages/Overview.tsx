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

    const [liveGame, setLiveGame] = useState(false);
    const [team1, setTeam1] = useState("");
    const [team2, setTeam2] = useState("");
    const [team1_score, setTeam1_Score] = useState("");
    const [team2_score, setTeam2_Score] = useState("");
    const [team1_logo, setTeam1_Logo] = useState("");
    const [team2_logo, setTeam2_Logo] = useState("");
    const [period, setPeriod] = useState("");

    const [easternTeams, setEasternTeams] = useState([]);
    const [westernTeams, setWesternTeams] = useState([]);
    const [eloading, setEloading] = useState(true);
    const [wloading, setlWoading] = useState(true);

    async function fetchLiveMatch(){
        function displayMatchStats(data: any){
            setTeam1(data.teams.home.name);
            setTeam2(data.teams.visitors.name);

            setTeam1_Logo(data.teams.home.logo);
            setTeam2_Logo(data.teams.visitors.logo);

            setTeam1_Score(data.scores.home.points);
            setTeam2_Score(data.scores.visitors.points);

            if (data.periods.current == 1){
                setPeriod("1st Quarter");
            }
            else if(data.periods.current == 2){
                setPeriod("2nd Quarter");
            }
            else if(data.periods.current == 3){
                setPeriod("3rd Quarter");
            }
            else{
                setPeriod("4th Quarter");
            }
            
        }
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
            if (response.data[0] != null){
                setLiveGame(true);
                displayMatchStats(response.data[0]);
            }
            else{
                setLiveGame(false);
            }
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
        fetchEasternStandings();
        fetchWesternStandings();
        fetchLiveMatch();
    },[])
    
    return(
        <div className="flex h-screen bg-gray-100">
            <Dashbar/>

            <div id="dashboard" className="w-3/4 h-full flex flex-col justify-between bg-white p-8 overflow-auto">
                <h1 className="text-4xl font-bold mb-5">Dashboard</h1>

                <div className="flex justify-evenly space-x-8" onClick={SendUsertoPredictionsPanel}>
                    <div className="playoffs-btn flex flex-col justify-center items-center w-100 h-64 text-lg text-black bg-white border-black rounded-lg ml-3 border-2 shadow-2xl hover:shadow-sm">
                        <p>{`Make NBA Playoffs ${currentYear} Bracket Predictions`}</p>
                    </div>

                    <div className="flex flex-col justify-center items-center w-full h-64 text-lg text-black bg-glucose border-black rounded-lg mr-3 border-2 shadow-2xl hover:shadow-sm">
                        {liveGame ? (
                            <div>
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
                            </div>
                        ) : (
                            <p className="font-semibold text-2xl">No Live Games Currently</p>
                        )}
                        
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