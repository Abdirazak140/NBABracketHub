import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Login(){
    return(
        <div>
            <Navbar/>
            <div className="flex justify-center items-center w-full h-screen bg-slate-300">
                <form className="border-2 w-80 bg-white shadow-lg rounded-lg p-6 h-80">
                    <div className="flex justify-center w-full">
                        <h2 className="font-bold text-3xl mb-4">Login</h2>
                    </div>
                    <div className="flex justify-start w-full">
                        <p className="text-sm font-medium">Don't have an account yet?</p>
                        <Link to="/signup" className="text-sm font-bold ml-1 underline">Sign Up!</Link>
                    </div>
                    <input type="text" placeholder="Username" className="input"></input>
                    <input type="password" placeholder="Password" className="input"></input>
                    <div className="flex justify-center w-full">
                        <button type="submit" className="rounded-full bg-zinc-300 shadow-sm w-36 h-11 mt-4">Submit</button>
                    </div>
                </form>
                <div className="border-2 border-black w-96 h-80 shadow-lg rounded-lg p-6 bg-zinc-800">
                <div className="flex justify-center w-full">
                        <h2 className="font-bold text-3xl mb-4 text-white">Track Your Bracket Predictions Live</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;