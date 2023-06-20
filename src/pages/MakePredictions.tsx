import { useEffect, useState } from "react";
import { database, fireApp } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { load } from "cheerio";
import { ImExit } from "react-icons/im";
import R3Match from "../components/R3_Match";
import R2Match from "../components/R2_Match";
import R1Match from "../components/R1_Match";
import { getAuth } from "firebase/auth";
import { ref, set } from "firebase/database";

function MakePredictions(){
    
    const navigate = useNavigate(); 
    const date = new Date();
    const currentYear = date.getFullYear();
    const auth = getAuth(fireApp);
    const userId = auth.currentUser?.uid;
    const [firstRoundTeams, setFirstRoundTeams] = useState([""])
    const [semiTeams, setSemiTeams] = useState([""])
    const [confTeams, setConfTeams] = useState([""])
    const [finalTeams, setFinalTeams] = useState([""])
    const [retreivedScores, setRetreivedScores] = useState([""]);
    const [makePredictions, setMakePredictions] = useState(false);

    function StorePredictions(match: number){
        set(ref(database, `user/${userId}/predictions/NBA Playoffs ${currentYear}/`),{

        })
    }

    function FetchPlayOffsTeams(){
        const espnUrl = 'http://www.espn.com/nba/bracket';
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const newUrl = proxyUrl + espnUrl;
        axios.get(newUrl).then(response => {
            let retreivedTeams: Array<string> = [];
            let scores: Array<string> = [];
            
            const html = response.data;
            const $ = load(html);
            const firstRound = $(".c1");
            const secondRound = $(".c2");
            const thirdRound = $(".c3");
            const finalRound = $(".c3")

            firstRound.each((_: any, dl: any) => {
                $(dl).find("dt").each((_: any , dt: any) => {
                    $(dt).find("a").each((_: any, a: any) => {
                        let text = $(a).text().trim();
                        if (text !== ""){
                            retreivedTeams.push(text);
                        }
                    })
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
                        retreivedTeams.push("");
                    }
                    else if (numOfTeams.length === 0){
                        retreivedTeams.push("", "");
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
                        retreivedTeams.push("");
                    }
                    else if (numOfTeams.length === 0){
                        retreivedTeams.push("", "");
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
                        retreivedTeams.push("");
                    }
                    else if (numOfTeams.length === 0){
                        retreivedTeams.push("", "");
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
            retreivedTeams = [];

            //Fetching Scores

            firstRound.each((_: any, dl: any) => {
                $(dl).find("dd").each((_: any , dd: any) => {
                    let text1 = $(dd).find("b").text().trim()
                    // @ts-ignore
                    let text2 = $(dd).find("b").html().trim().match(/\d+(?=\D*$)/)[0];
                    scores.push(text1[0], text2);  
                })
            })

            secondRound.each((_: any, dl: any) => {
                $(dl).find("dd").each((_: any , dd: any) => {
                    let text1 = $(dd).find("b").text().trim()
                    // @ts-ignore
                    let text2 = $(dd).find("b").html().trim().match(/\d+(?=\D*$)/)[0];
                    scores.push(text1[0], text2);  
                })
            })

            thirdRound.each((_: any, dl: any) => {
                $(dl).find("dd").each((_: any , dd: any) => {
                    let text1 = $(dd).find("b").text().trim()
                    // @ts-ignore
                    let text2 = $(dd).find("b").html().trim().match(/\d+(?=\D*$)/)[0];
                    scores.push(text1[0], text2);  
                })
            })

            finalRound.each((_: any, dl: any) => {
                $(dl).find("dd").each((_: any , dd: any) => {
                    let text1 = $(dd).find("b").text().trim()
                    // @ts-ignore
                    let text2 = $(dd).find("b").html().trim().match(/\d+(?=\D*$)/)[0];
                    scores.push(text1[0], text2);  
                })
            })

            setRetreivedScores(scores);
            console.log(retreivedScores);

        })
    }

    function SaveAndExit(){
        navigate("/dashboard/Overview");
    }

    useEffect(() => {
        FetchPlayOffsTeams();
    },[])

    return(
        <div className="flex items-center flex-col bg-honeydue">
            <div className="w-1/2 h-14 mt-4 flex flex-row items-center justify-between">
                <h1 className="text-4xl font-medium">NBA PLAYOFFS {currentYear}</h1>
                <button className="flex flex-row text-white justify-center items-center space-x-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={SaveAndExit}>
                    <p>Save & Exit</p>
                    <ImExit/>
                </button>
                <div className="bg-yellow-500 w-56 h-11 text-sm p-1">NOTE: The Playoffs have already started, cant make predictions</div>
            </div>

            <div className="flex flex-row ml-11 text-white text-sm font-bold">
                <div className="h-11 w-64 border-2 bg-black flex items-center justify-center">FIRST ROUND</div>
                <div className="h-11 w-52 border-2 bg-black flex items-center justify-center">CONF. SEMIFINALS</div>
                <div className="h-11 w-52 border-2 bg-black flex items-center justify-center">CONF. FINALS</div>
                <div className="h-11 w-52 border-2 bg-black flex items-center justify-center">NBA FINALS</div>
            </div>

            <div className="flex flex-row">

                <div className="flex flex-col items-end">
                    <div className="border-black h-full w-11 border-2 mt-2.5 flex flex-col justify-center bg-glucose font-bold">
                        <p className="break-words text-center text-3xl">E A S T E R N</p>
                    </div>
                    <div className="border-black h-full w-11 border-2 my-2.5 flex flex-col justify-center bg-glucose font-bold">
                        <p className="break-words text-center text-3xl">W E S T E R N</p>
                    </div>
                </div>

                <div className="h-full w-64 relative">
                    <R1Match team_1={firstRoundTeams[0]} team_2={firstRoundTeams[1]} score_1={retreivedScores[0]} score_2={retreivedScores[1]}/>
                    
                    <R1Match team_1={firstRoundTeams[2]} team_2={firstRoundTeams[3]} score_1={retreivedScores[2]} score_2={retreivedScores[3]}/>

                    <R1Match team_1={firstRoundTeams[4]} team_2={firstRoundTeams[5]} score_1={retreivedScores[4]} score_2={retreivedScores[5]}/>
                    
                    <R1Match team_1={firstRoundTeams[6]} team_2={firstRoundTeams[7]} score_1={retreivedScores[6]} score_2={retreivedScores[7]}/>

                    <R1Match team_1={firstRoundTeams[8]} team_2={firstRoundTeams[9]} score_1={retreivedScores[8]} score_2={retreivedScores[9]}/>

                    <R1Match team_1={firstRoundTeams[10]} team_2={firstRoundTeams[11]} score_1={retreivedScores[10]} score_2={retreivedScores[11]}/>
                    
                    <R1Match team_1={firstRoundTeams[12]} team_2={firstRoundTeams[13]} score_1={retreivedScores[12]} score_2={retreivedScores[13]}/>
                    
                    <R1Match team_1={firstRoundTeams[14]} team_2={firstRoundTeams[15]} score_1={retreivedScores[14]} score_2={retreivedScores[15]}/>
                </div>


                <div className="h-full w-52">
                    <R2Match team_1={semiTeams[0]} team_2={semiTeams[1]} top_margin="mt-13" score_1="4" score_2="0"/>
                    
                    <R2Match team_1={semiTeams[2]} team_2={semiTeams[3]} top_margin="mt-26" score_1="2" score_2="4"/>

                    <R2Match team_1={semiTeams[4]} team_2={semiTeams[5]} top_margin="mt-26" score_1="4" score_2="2"/>

                    <R2Match team_1={semiTeams[6]} team_2={semiTeams[7]} top_margin="mt-26" score_1="4" score_2="2"/>
                </div>

                
                <div className="h-full w-52">
                    <R3Match team_1={confTeams[0]} team_2={confTeams[1]} top_margin="mt-37" bot_margin="mt-37" score_1="3" score_2="4"/>

                    <R3Match team_1={confTeams[2]} team_2={confTeams[3]} top_margin="mt-70" bot_margin="" score_1="1" score_2="4"/>
                </div>


                <div className="h-full w-52">
                    <div className="mt-final h-99 flex justify-center items-center border-y-2 border-r-2 border-black flex-row space-x-10">
                        <div className="flex flex-col justify-evenly h-full p-2 font-thin text-sm">
                            <span>{finalTeams[0]}</span>
                            <span>{finalTeams[1]}</span>
                        </div>
                        <div className="flex flex-col justify-evenly h-full p-2 font-bold">
                            <span>3</span>
                            <span className="font-medium text-sm">Games</span>
                            <span>4</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MakePredictions;