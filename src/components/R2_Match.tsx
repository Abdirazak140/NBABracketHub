interface PropTypes {
    team_1: string;
    team_2: string;
    top_margin: string;
}

function R2_Match({team_1, team_2, top_margin}: PropTypes){
    return(
        <div className={`${top_margin} mb-13 h-30 flex justify-center items-center border-y-2 border-r-2 border-black flex-col`}>
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

export default R2_Match;