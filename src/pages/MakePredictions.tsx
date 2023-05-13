import { useEffect, useState } from "react";
import { database } from "../App";
import { child, get, ref } from "firebase/database";
import { useParams } from "react-router-dom";

function MakePredictions(){
    const {league, userId} = useParams();
    const [teams, setTeams] = useState(["","","","","","","","","","","","","","","","",])
    useEffect(() => {
        get(child(ref(database), `users/${userId}/predictions/${league}`)).then((snapshot) => {
            
        })
    })

    return(
        <div className="flex items-center flex-col">
            <div className="w-1/2 h-14 mt-4"></div>
            <div className="flex flex-row">
                <div className="h-full w-64">
                    <div className="box mt-2.5">{teams[0]}<br/>vs.<br/>{teams[1]}</div>
                    <div className="box  mt-2.5">{teams[2]}<br/>vs.<br/>{teams[3]}</div>
                    <div className="box mt-2.5">{teams[4]}<br/>vs.<br/>{teams[5]}</div>
                    <div className="box mt-2.5">{teams[6]}<br/>vs.<br/>{teams[7]}</div>

                    <div className="box mt-2.5">{teams[8]}<br/>vs.<br/>{teams[9]}</div>
                    <div className="box mt-2.5">{teams[10]}<br/>vs.<br/>{teams[11]}</div>
                    <div className="box mt-2.5">{teams[12]}<br/>vs.<br/>{teams[13]}</div>
                    <div className="box mt-2.5">{teams[13]}<br/>vs.<br/>{teams[15]}</div>
                </div>
                <div className="h-full w-52 ml-4">
                    <div className="box box-semi mt-13 mb-13">Match</div>
                    <div className="box box-semi mt-26 mb-13">Match</div>
                    <div className="box box-semi mt-26 mb-13">Match</div>
                    <div className="box box-semi mt-26 mb-13">Match</div>
                </div>
                <div className="h-full w-52 ml-4">
                    <div className="box box-semi mt-37 mb-37">Match</div>
                    <div className="box box-semi mt-70">Match</div>
                </div>
                <div className="h-full w-52 ml-4">
                    <div className="box box-final mt-final">Match</div>
                </div>
            </div>
        </div>
    )
}

export default MakePredictions;