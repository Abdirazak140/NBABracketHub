import { useEffect, useState } from "react";
import { database } from "../App";
import { child, get, ref, set } from "firebase/database";
import { useParams } from "react-router-dom";
import axios from "axios";
import cheerio from "cheerio";

function MakePredictions(){
    const {league, userId} = useParams();
    const [teams, setTeams] = useState([""])
    const [semiTeams, setSemiTeams] = useState([""])
    const [confTeams, setConfTeams] = useState([""])
    const [finalTeams, setFinalTeams] = useState([""])

    useEffect(() => {
        const getTeams = async () => {
            let newTeams = [];
            for (let i=1; i<=8; i++){
                const snapshot = await get(child(ref(database), `users/${userId}/predictions/${league}/r1/match_${i}`));
                newTeams.push(snapshot.val().team_1);
                newTeams.push(snapshot.val().team_2);
            }
            setTeams(newTeams);
        }
        getTeams();
        RetreiveSemiFinalsData();
    },[userId, league])

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
    

    function RetreiveSemiFinalsData(){
        const espnUrl = 'http://www.espn.com/nba/bracket';
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const newUrl = proxyUrl + espnUrl;
        axios.get(newUrl).then(response => {
            let retreivedTeams: Array<string> = [];
            const html = response.data;
            const $ = cheerio.load(html);
            const secondRound = $(".c2");
            const thirdRound = $(".c3");
            const finalRound = $(".c3")

            secondRound.each((_: any, dl: any) => {
                $(dl).find("dt").each((_: any , dt: any) => {
                    let numOfTeams = $(dt).find("a");
                    if (numOfTeams.length === 1){
                        let text = $(numOfTeams).text().trim();
                        retreivedTeams.push(text);
                        retreivedTeams.push("Pending");
                    }
                    else if (numOfTeams.length === 0){
                        retreivedTeams.push("Pending", "Pending");
                    }
                    else{
                        $(dt).find("a").each((_: any, a: any) => {
                            let text = $(a).text().trim();
                            retreivedTeams.push(text);
                        })
                    }
                })
            })

            setSemiTeams(retreivedTeams);
            retreivedTeams = [];

            thirdRound.each((_: any, dl: any) => {
                $(dl).find("dt").each((_: any , dt: any) => {
                    let numOfTeams = $(dt).find("a");
                    if (numOfTeams.length === 1){
                        let text = $(numOfTeams).text().trim();
                        retreivedTeams.push(text);
                        retreivedTeams.push("Pending");
                    }
                    else if (numOfTeams.length === 0){
                        retreivedTeams.push("Pending", "Pending");
                    }
                    else{
                        $(dt).find("a").each((_: any, a: any) => {
                            let text = $(a).text().trim();
                            retreivedTeams.push(text);
                        })
                    }
                })
            })
            setConfTeams(retreivedTeams);
            retreivedTeams = [];

            finalRound.each((_: any, dl: any) => {
                $(dl).find("dt").each((_: any , dt: any) => {
                    let numOfTeams = $(dt).find("a");
                    if (numOfTeams.length === 1){
                        let text = $(numOfTeams).text().trim();
                        retreivedTeams.push(text);
                        retreivedTeams.push("Pending");
                    }
                    else if (numOfTeams.length === 0){
                        retreivedTeams.push("Pending", "Pending");
                    }
                    else{
                        $(dt).find("a").each((_: any, a: any) => {
                            let text = $(a).text().trim();
                            retreivedTeams.push(text);
                        })
                    }
                })
            })
            setFinalTeams(retreivedTeams);
            
        })
    }

    function SaveAndExit(){
        
    }

    return(
        <div className="flex items-center flex-col">
            <div className="w-1/2 h-14 mt-4">
                <button onClick={SaveAndExit}>Save & Exit</button>
            </div>

            <div className="flex flex-row">
                <div className="h-full w-64">
                    <div className="box mt-2.5">
                        <div className="flex flex-row">
                            <p>Prediction: </p>
                            <select>
                                <option value="none">None</option>
                                <option value="none">{teams[0]}</option>
                                <option value="none">{teams[1]}</option>
                            </select>
                        </div>
                        <p>{teams[0]} vs. {teams[1]}</p>
                    </div>
                    <div className="box  mt-2.5">
                        <div className="flex flex-row">
                            <p>Prediction: </p>
                            <select>
                                <option value="none">None</option>
                                <option value="none">{teams[2]}</option>
                                <option value="none">{teams[3]}</option>
                            </select>
                        </div>
                        <p>{teams[2]} vs. {teams[3]}</p>
                    </div>
                    <div className="box mt-2.5">
                        <div className="flex flex-row">
                            <p>Prediction: </p>
                            <select>
                                <option value="none">None</option>
                                <option value="none">{teams[4]}</option>
                                <option value="none">{teams[5]}</option>
                            </select>
                        </div>
                        <p>{teams[4]} vs. {teams[5]}</p>
                    </div>
                    <div className="box mt-2.5">
                        <div className="flex flex-row">
                            <p>Prediction: </p>
                            <select>
                                <option value="none">None</option>
                                <option value="none">{teams[6]}</option>
                                <option value="none">{teams[7]}</option>
                            </select>
                        </div>
                        <p>{teams[6]} vs. {teams[7]}</p>
                    </div>

                    <div className="box mt-2.5">
                        <div className="flex flex-row">
                            <p>Prediction: </p>
                            <select>
                                <option value="none">None</option>
                                <option value="none">{teams[8]}</option>
                                <option value="none">{teams[9]}</option>
                            </select>
                        </div>
                        <p>{teams[8]} vs. {teams[9]}</p>
                    </div>
                    <div className="box mt-2.5">
                        <div className="flex flex-row">
                            <p>Prediction: </p>
                            <select>
                                <option value="none">None</option>
                                <option value="none">{teams[10]}</option>
                                <option value="none">{teams[11]}</option>
                            </select>
                        </div>
                        <p>{teams[10]} vs. {teams[11]}</p>
                    </div>
                    <div className="box mt-2.5">
                        <div className="flex flex-row">
                            <p>Prediction: </p>
                            <select>
                                <option value="none">None</option>
                                <option value="none">{teams[12]}</option>
                                <option value="none">{teams[13]}</option>
                            </select>
                        </div>
                        <p>{teams[12]} vs. {teams[13]}</p>
                    </div>
                    <div className="box mt-2.5">
                        <div className="flex flex-row">
                            <p>Prediction: </p>
                            <select>
                                <option value="none">None</option>
                                <option value="none">{teams[14]}</option>
                                <option value="none">{teams[15]}</option>
                            </select>
                        </div>
                        <p>{teams[14]} vs. {teams[15]}</p>
                    </div>
                </div>
                <div className="h-full w-52 ml-4">
                    <div className="box box-semi mt-13 mb-13 flex flex-col">
                        <div className="flex flex-row">
                            <p>Prediction: </p>
                            <select>
                                <option value="none">None</option>
                                <option value="none">None</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                        <p>{semiTeams[0]} vs. {semiTeams[1]}</p>
                    </div>
                    <div className="box box-semi mt-26 mb-13 flex flex-col">
                        <div className="flex flex-row">
                            <p>Prediction: </p>
                            <select>
                                <option value="none">None</option>
                                <option value="none">None</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                        <p>{semiTeams[2]} vs. {semiTeams[3]}</p>
                    </div>
                    <div className="box box-semi mt-26 mb-13 flex flex-col">
                        <div className="flex flex-row">
                            <p>Prediction: </p>
                            <select>
                                <option value="none">None</option>
                                <option value="none">None</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                        <p>{semiTeams[4]} vs. {semiTeams[5]}</p>
                    </div>
                    <div className="box box-semi mt-26 mb-13 flex flex-col">
                        <div className="flex flex-row">
                            <p>Prediction: </p>
                            <select>
                                <option value="none">None</option>
                                <option value="none">None</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                        <p>{semiTeams[6]} vs. {semiTeams[7]}</p>
                    </div>
                </div>
                <div className="h-full w-52 ml-4">
                    <div className="box box-semi mt-37 mb-37 flex flex-col">
                        <div className="flex flex-row">
                            <p>Prediction: </p>
                            <select>
                                <option value="none">None</option>
                                <option value="none">None</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                        <p>{confTeams[0]} vs. {confTeams[1]}</p>
                    </div>
                    <div className="box box-semi mt-70 flex flex-col">
                        <div className="flex flex-row">
                            <p>Prediction: </p>
                            <select>
                                <option value="none">None</option>
                                <option value="none">None</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                        <p>{confTeams[2]} vs. {confTeams[3]}</p>
                    </div>
                </div>
                <div className="h-full w-52 ml-4">
                    <div className="box box-final mt-final flex flex-col">
                        <div className="flex flex-row">
                            <p>Prediction: </p>
                            <select>
                                <option value="none">None</option>
                                <option value="none">None</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                        <p>{finalTeams[0]} vs. {finalTeams[1]}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MakePredictions;