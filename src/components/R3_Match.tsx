interface PropTypes {
    team_1: string;
    team_2: string;
    top_margin: string;
    bot_margin: string;
    score_1: string;
    score_2: string;
}

function R3Match({team_1, team_2, top_margin, bot_margin, score_1, score_2}: PropTypes){
    return(
        <div className={`${top_margin} ${bot_margin} h-30 flex justify-center items-center border-y-2 border-r-2 border-black flex-row space-x-6`}>
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

export default R3Match;