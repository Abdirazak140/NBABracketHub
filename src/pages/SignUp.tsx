import { Link } from "react-router-dom"

function Signup(){
    return(
        <div>
            <div className="flex justify-center items-center w-full h-screen bg-slate-600">
                <form className="border-2 border-grey-500 w-80 bg-black shadow-lg rounded-lg p-6 h-80">
                    <div className="flex flex-row justify-center w-full">
                        <h2 className="font-bold text-3xl mb-4 text-white">Signup</h2>
                    </div>
                    <div className="flex flex-row justify-start w-full">
                        <Link to="/login" className="text-sm font-bold ml-1 underline text-white">Go Back</Link>
                    </div>
                    <input type="text" placeholder="Create Username" className="input2"></input>
                    <input type="password" placeholder="Create Password" className="input2"></input>
                    <div className="flex flex-row justify-center w-full">
                        <button type="submit" className="rounded-full bg-zinc-500 shadow-sm w-36 h-11 mt-3">Create</button>
                    </div>               
                </form>
            </div>
        </div>
    )
}

export default Signup