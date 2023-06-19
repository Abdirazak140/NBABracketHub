interface PropTypes {
    team_1: string;
    team_2: string;
    score_1: string;
    score_2: string;
}

function R1Match({team_1, team_2, score_1, score_2}: PropTypes){
    return(
        <div className="mt-2.5 h-23 flex justify-center items-center border-y-2 border-r-2 border-black flex-row space-x-10">
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

export default R1Match;