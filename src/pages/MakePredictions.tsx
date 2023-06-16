import { useEffect, useState } from "react";
import { database } from "../App";
import { child, get, ref, set } from "firebase/database";
import { useParams } from "react-router-dom";
import axios from "axios";
import cheerio from "cheerio";
import R1_Match from "../components/R1_Match";
import R2_Match from "../components/R2_Match";
import R3_Match from "../components/R3_Match";

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

                <div className="flex flex-col">
                    <div className="border-black h-full w-24 border-2 mt-2.5 flex flex-col">
                        <p className="transform rotate-90">Eastern Conference</p>
                    </div>
                    <div className="border-black h-full w-24 border-2 my-2.5 flex flex-col">Western Conference</div>
                </div>

                <div className="h-full w-64">
                    <R1_Match team_1={teams[0]} team_2={teams[1]} score_1="" score_2=""/>
                    
                    <R1_Match team_1={teams[2]} team_2={teams[3]} score_1="" score_2=""/>

                    <R1_Match team_1={teams[4]} team_2={teams[5]} score_1="" score_2=""/>
                    
                    <R1_Match team_1={teams[0]} team_2={teams[1]} score_1="" score_2=""/>

                    <R1_Match team_1={teams[0]} team_2={teams[1]} score_1="" score_2=""/>

                    <R1_Match team_1={teams[0]} team_2={teams[1]} score_1="" score_2=""/>
                    
                    <R1_Match team_1={teams[0]} team_2={teams[1]} score_1="" score_2=""/>
                    
                    <R1_Match team_1={teams[0]} team_2={teams[1]} score_1="" score_2=""/>
                </div>


                <div className="h-full w-52">
                    <R2_Match team_1={teams[0]} team_2={teams[1]} top_margin="mt-13" score_1="" score_2=""/>

                    <R2_Match team_1={teams[0]} team_2={teams[1]} top_margin="mt-26" score_1="" score_2=""/>

                    <R2_Match team_1={teams[0]} team_2={teams[1]} top_margin="mt-26" score_1="" score_2=""/>

                    <R2_Match team_1={teams[0]} team_2={teams[1]} top_margin="mt-26" score_1="" score_2=""/>
                </div>

                
                <div className="h-full w-52">
                    <R3_Match team_1={teams[0]} team_2={teams[1]} top_margin="mt-37" bot_margin="mt-37" score_1="" score_2=""/>

                    <R3_Match team_1={teams[0]} team_2={teams[1]} top_margin="mt-70" bot_margin="" score_1="" score_2=""/>
                </div>


                <div className="h-full w-52">
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