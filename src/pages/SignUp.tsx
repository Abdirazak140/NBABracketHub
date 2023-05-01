import { Link, redirect  } from "react-router-dom"
import { fireApp } from "../App"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function Signup(){

    function createUser(){
        const email_input = document.querySelector("#email-input") as HTMLInputElement;
        const password_input = document.querySelector("#password-input") as HTMLInputElement;
        const email: string = email_input.value;
        const password: string = password_input.value;
        const auth = getAuth(fireApp);

        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user;
            
            return redirect("/dashboard");
        })
    }

    return(
        <div>
            <div className="flex justify-center items-center w-full h-screen bg-slate-600">
                <form className="border-2 border-grey-500 w-80 bg-black shadow-lg rounded-lg p-6 h-80">
                    <div className="flex flex-row justify-center w-full">
                        <h2 className="font-bold text-3xl mb-3 text-white">Signup</h2>
                    </div>
                    <div className="flex flex-row justify-start w-full">
                        <Link to="/login" className="text-sm font-bold ml-1 underline text-white">Go Back</Link>
                    </div>
                    <input id="email-input" type="email" placeholder="Email" className="input2"></input>
                    <input id="password-input" type="password" placeholder="Create Password" className="input2"></input>         
                    <div className="flex flex-row justify-center w-full">
                        <button onClick={createUser} type="submit" className="rounded-full bg-zinc-500 shadow-sm w-36 h-11 mt-3">Create</button>
                    </div>               
                </form>
            </div>
        </div>
    )
}

export default Signup