interface PropTypes {
    team_1: string;
    team_2: string;
    top_margin: string;
    score_1: string;
    score_2: string;
}

function R2_Match({team_1, team_2, top_margin, score_1, score_2}: PropTypes){
    return(
        <div className={`${top_margin} mb-13 h-30 flex justify-center items-center border-y-2 border-r-2 border-black flex-row space-x-8`}>
            <div className="flex flex-col justify-between h-full p-2 font-thin text-sm">
                <span>{team_1}</span>
                <span>{team_2}</span>
            </div>
            <div className="flex flex-col justify-between h-full p-2 font-bold">
                <span>{score_1}</span>
                <span className="font-medium text-sm">Games</span>
                <span>{score_2}</span>
            </div>
        </div>
    )
}

export default R2_Match;