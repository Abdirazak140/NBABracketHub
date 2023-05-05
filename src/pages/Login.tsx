import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Bracket from "../assets/bracket.png";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { fireApp } from "../App";
import { useState } from "react";

function Login(){
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    function UserLogin(event: any){
        event.preventDefault();
        const email_input = document.querySelector("#email-input") as HTMLInputElement;
        const password_input = document.querySelector("#password-input") as HTMLInputElement;

        const email: string = email_input.value;
        const password: string = password_input.value;

        const auth = getAuth(fireApp);
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            // const user = userCredential.user;
            navigate("/dashboard");
        })
        .catch((error) => {
            const errorMessage = error.message;
            setErrorMessage(errorMessage);
        });
    }

    return(
        <div>
            <Navbar/>
            <div className="flex justify-center items-center w-full h-screen bg-slate-300">
                <form className="border-2 w-80 bg-white shadow-lg rounded-lg p-6 h-96">
                    <div className="flex justify-center w-full">
                        <h2 className="font-bold text-3xl mb-4">Login</h2>
                    </div>
                    <div className="flex justify-start w-full">
                        <p className="text-sm font-medium">Don't have an account yet?</p>
                        <Link to="/signup" className="text-sm font-bold ml-1 underline">Sign Up!</Link>
                    </div>
                    <input id="email-input" type="email" placeholder="Email" className="input1"></input>
                    <input id="password-input" type="password" placeholder="Password" className="input1"></input>
                    <p className="text-red-500 font-bold">{errorMessage}</p> 
                    <div className="flex justify-center w-full">
                        <button onClick={UserLogin} type="submit" className="rounded-full bg-zinc-300 shadow-sm w-36 h-11 mt-4">Submit</button>
                    </div>
                </form>
                <div className="border-2 border-black w-96 h-96 shadow-lg rounded-lg p-6 bg-zinc-800">
                    <div className="flex flex-col items-center w-full">
                        <h2 className="font-bold text-3xl mb-4 text-white">Track Your Bracket Predictions Live</h2>
                        <img src={Bracket} alt="bracket" className="w-60 h-60"></img>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;