import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { fireApp } from "../App";
import { useState } from "react";
import { GoogleAuthProvider } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { IconContext } from "react-icons";

function Login(){
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();

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
            setErrorMessage(errorMessage.substring(9));
        });
    }

    function GoogleLogin(event: any){
        event.preventDefault();
        const auth = getAuth(fireApp);
        signInWithPopup(auth, provider).then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            navigate("/dashboard");
        }).catch((error) => {
            const errorMessage = error.message;
            setErrorMessage(errorMessage.substring(9));
        });
    }

    return(
        <div>
            <Navbar/>
            <div className="flex justify-center items-center w-full h-screen bg-glucose">
                <form className="border-2 w-96 bg-honeydue-shade shadow-lg rounded-lg p-6 h-login-h">
                    <div className="flex justify-center w-full">
                        <h2 className="font-bold text-3xl mb-4">Login</h2>
                    </div>
                    <div className="flex flex-col justify-center">
                        <input id="email-input" type="email" placeholder="Email" className="input1"></input>
                        <input id="password-input" type="password" placeholder="Password" className="input1"></input>
                        <p className="text-red-500 font-bold">{errorMessage}</p> 
                    </div>
                    <div className="flex justify-center w-full">
                        <button onClick={UserLogin} type="submit" className="rounded-full bg-zinc-300 shadow-sm w-36 h-11 mt-4">Submit</button>
                    </div>
                    <p className="text-sm font-medium text-center mt-5">-Or sign in using-</p>
                    <div className="flex justify-center w-full mt-5">
                        <button onClick={GoogleLogin} className="bg-white border-4 text-black font-bold py-2 px-2 rounded inline-flex items-center hover:bg-honeydue-shade">
                                <IconContext.Provider value={{ size: "30px"}}>
                                    <FcGoogle/>
                                </IconContext.Provider>
                                <span className="ml-2 px-5">Google</span>
                        </button>
                    </div>
                    <div className="flex justify-start w-full mt-5">
                        <p className="text-sm font-bold">Don't have an account yet?</p>
                        <Link to="/signup" className="text-sm font-bold ml-1 underline">Sign Up!</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;