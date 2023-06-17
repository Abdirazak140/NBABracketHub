import { useEffect, useState } from "react";
import { database } from "../App";
import { child, get, ref, set } from "firebase/database";
import { useParams } from "react-router-dom";
import axios from "axios";
import cheerio from "cheerio";
import R1_Match from "../components/R1_Match";
import R2_Match from "../components/R2_Match";
import R3_Match from "../components/R3_Match";
import { ImExit } from "react-icons/im";

function MakePredictions(){
    const [firstRoundTeams, setFirstRoundTeams] = useState([""])
    const [semiTeams, setSemiTeams] = useState([""])
    const [confTeams, setConfTeams] = useState([""])
    const [finalTeams, setFinalTeams] = useState([""])

    function RetreiveSemiFinalsData(){
        const espnUrl = 'http://www.espn.com/nba/bracket';
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const newUrl = proxyUrl + espnUrl;
        axios.get(newUrl).then(response => {
            let retreivedTeams: Array<string> = [];
            const html = response.data;
            const $ = cheerio.load(html);
            const firstRound = $(".c2");
            const secondRound = $(".c2");
            const thirdRound = $(".c3");
            const finalRound = $(".c3")

            firstRound.each((_: any, dl: any) => {
                $(dl).find("dt").each((_: any , dt: any) => {
                    let numOfTeams = $(dt).find("a");
                    if (numOfTeams.length === 1){
                        let text = $(dt).text().trim();
                        const textArr = text.split("(");
                        const team1_text = textArr[1].split(")");
                        const team1 = team1_text[1].substring(1);
                        retreivedTeams.push(team1);
                        retreivedTeams.push("Pending");
                    }
                    else if (numOfTeams.length === 0){
                        retreivedTeams.push("Pending", "Pending");
                    }
                    else{
                        $(dt).find("a").each((_: any, a: any) => {
                            let text = $(dt).text().trim();
                            const textArr = text.split("(");
                            const team1_text = textArr[1].split(")");
                            const team2_text = textArr[2].split(")");
                            const team1 = team1_text[1].substring(1);
                            const team2 = team2_text[1].substring(1);
                            retreivedTeams.push(team1);
                            retreivedTeams.push(team2);
                        })
                    } 
                })
            })

            setFirstRoundTeams(retreivedTeams);
            retreivedTeams = [];

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

    useEffect(() => {
        RetreiveSemiFinalsData();
    })

    return(
        <div className="flex items-center flex-col">
            <div className="w-1/2 h-14 mt-4 flex flex-row items-center space-x-2">
                <button onClick={SaveAndExit}>Save & Exit</button>
                <ImExit/>
            </div>

            <div className="flex flex-row ml-11 text-white text-sm font-bold">
                <div className="h-11 w-64 border-2 bg-black flex items-center justify-center">FIRST ROUND</div>
                <div className="h-11 w-52 border-2 bg-black flex items-center justify-center">CONF. SEMIFINALS</div>
                <div className="h-11 w-52 border-2 bg-black flex items-center justify-center">CONF. FINALS</div>
                <div className="h-11 w-52 border-2 bg-black flex items-center justify-center">NBA FINALS</div>
            </div>

            <div className="flex flex-row">

                <div className="flex flex-col items-end">
                    <div className="border-black h-full w-11 border-2 mt-2.5 flex flex-col justify-center">
                        <p className="break-words text-center text-3xl">E A S T E R N</p>
                    </div>
                    <div className="border-black h-full w-11 border-2 my-2.5 flex flex-col justify-center">
                        <p className="break-words text-center text-3xl">W E S T E R N</p>
                    </div>
                </div>

                <div className="h-full w-64">
                    <R1_Match team_1={firstRoundTeams[0]} team_2={firstRoundTeams[1]} score_1="" score_2=""/>
                    
                    <R1_Match team_1={firstRoundTeams[2]} team_2={firstRoundTeams[3]} score_1="" score_2=""/>

                    <R1_Match team_1={firstRoundTeams[4]} team_2={firstRoundTeams[5]} score_1="" score_2=""/>
                    
                    <R1_Match team_1={firstRoundTeams[6]} team_2={firstRoundTeams[7]} score_1="" score_2=""/>

                    <R1_Match team_1={firstRoundTeams[8]} team_2={firstRoundTeams[9]} score_1="" score_2=""/>

                    <R1_Match team_1={firstRoundTeams[10]} team_2={firstRoundTeams[11]} score_1="" score_2=""/>
                    
                    <R1_Match team_1={firstRoundTeams[12]} team_2={firstRoundTeams[13]} score_1="" score_2=""/>
                    
                    <R1_Match team_1={firstRoundTeams[14]} team_2={firstRoundTeams[15]} score_1="" score_2=""/>
                </div>


                <div className="h-full w-52">
                    <R2_Match team_1={semiTeams[0]} team_2={semiTeams[1]} top_margin="mt-13" score_1="" score_2=""/>

                    <R2_Match team_1={semiTeams[2]} team_2={semiTeams[3]} top_margin="mt-26" score_1="" score_2=""/>

                    <R2_Match team_1={semiTeams[4]} team_2={semiTeams[5]} top_margin="mt-26" score_1="" score_2=""/>

                    <R2_Match team_1={semiTeams[6]} team_2={semiTeams[7]} top_margin="mt-26" score_1="" score_2=""/>
                </div>

                
                <div className="h-full w-52">
                    <R3_Match team_1={confTeams[0]} team_2={confTeams[1]} top_margin="mt-37" bot_margin="mt-37" score_1="" score_2=""/>

                    <R3_Match team_1={confTeams[2]} team_2={confTeams[3]} top_margin="mt-70" bot_margin="" score_1="" score_2=""/>
                </div>


                <div className="h-full w-52">
                    <div className="mt-final h-99 flex justify-center items-center border-y-2 border-r-2 border-black flex-row space-x-10">
                        <div className="flex flex-col justify-evenly h-full p-2 font-thin text-sm">
                            <span>{finalTeams[0]}</span>
                            <span>{finalTeams[1]}</span>
                        </div>
                        <div className="flex flex-col justify-evenly h-full p-2 font-bold">
                            <span></span>
                            <span className="font-medium text-sm">Games</span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MakePredictions;