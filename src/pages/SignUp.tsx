import { Link } from "react-router-dom"

function Signup(){
    return(
        <div>
            <div className="flex justify-center items-center w-full h-screen bg-slate-300">
                <form className="border-2 w-80 bg-white shadow-lg rounded-lg p-6 h-80">
                    <div className="flex flex-row items-center w-full">
                        <h2 className="font-bold text-3xl mb-4">Signup</h2>
                        <Link to="/login" className="text-sm font-bold ml-1 underline">Go Back</Link>
                    </div>
                    <input type="text" placeholder="Create Username" className="input"></input>
                    <input type="password" placeholder="Create Password" className="input"></input>
                    <div className="flex flex-row justify-center w-full">
                        <button type="submit" className="rounded-full bg-zinc-300 shadow-sm w-36 h-11 mt-4">Create</button>
                    </div>               
                </form>
            </div>
        </div>
    )
}

export default Signup