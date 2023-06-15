interface PropTypes {
    team_1: string;
    team_2: string;
}

function R1_Match({team_1, team_2}: PropTypes){
    return(
        <div className="mt-2.5 h-23 flex justify-center items-center border-y-2 border-r-2 border-black flex-col">
            <div className="flex flex-row">
                <p>Prediction: </p>
                <select>
                    <option value="none">None</option>
                    <option value="none">{team_1}</option>
                    <option value="none">{team_2}</option>
                </select>
            </div>
            <p>{team_1} vs. {team_2}</p>
        </div>
    )
}

export default R1_Match;