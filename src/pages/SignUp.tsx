import { Link, useNavigate  } from "react-router-dom"
import { fireApp, database } from "../App"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { ref, set } from "firebase/database";

function Signup(){
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    function storeNewUserData(email: string, name: string, password: string, userId: string){
        set(ref(database, 'users/' + userId), {
            name: name,
            email: email,
          });
    } 

    function createUser(event: any){
        event.preventDefault();
        const email_input = document.querySelector("#email-input") as HTMLInputElement;
        const name_input = document.querySelector("#name-input") as HTMLInputElement;
        const password_input = document.querySelector("#password-input") as HTMLInputElement;
        const verify_input = document.querySelector("#verify-input") as HTMLInputElement;

        const email: string = email_input.value;
        const name: string = name_input.value;
        const password: string = password_input.value;
        const password_verification: string = verify_input.value;

        if (password_verification !== password){
            console.log("Error: Password Verification");
            setErrorMessage("The Passwords you have entered do not match. Please Try Again");
        }
        else{
            const auth = getAuth(fireApp);
            createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
                const userId = userCredential.user.uid;
                storeNewUserData(email, name, password, userId);
                navigate("/dashboard");
            })
            .catch((error) => {
                const errorMessage = error.message;
                setErrorMessage(errorMessage);
            });
        }
    }

    return(
        <div>
            <div className="flex justify-center items-center w-full h-screen bg-slate-600">
                <form className="border-2 border-grey-500 w-80 bg-black shadow-lg rounded-lg p-6 h-100">
                    <div className="flex flex-row justify-center w-full">
                        <h2 className="font-bold text-3xl mb-4 text-white">Signup</h2>
                    </div>
                    <div className="flex flex-row justify-start w-full">
                        <Link to="/login" className="text-sm font-bold ml-1 underline text-white">Go Back</Link>
                    </div>
                    <input id="email-input" type="email" placeholder="Email" className="input2"></input>
                    <input id="name-input" type="text" placeholder="Name" className="input2"></input>
                    <input id="password-input" type="password" placeholder="Create Password" className="input2"></input>
                    <input id="verify-input" type="password" placeholder="Verify Password" className="input2"></input>
                    <p className="text-red-500 font-bold">{errorMessage}</p>       
                    <div className="flex flex-row justify-center w-full">
                        <button onClick={createUser} type="submit" className="rounded-full bg-zinc-500 shadow-sm w-36 h-11 mt-3">Create</button>
                    </div>               
                </form>
            </div>
        </div>
    )
}

export default Signup