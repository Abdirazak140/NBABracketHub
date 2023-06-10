import { Link, useNavigate  } from "react-router-dom"
import { fireApp, database } from "../App"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { ref, set } from "firebase/database";

function Signup(){
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    function storeNewUserData(email: string, name: string, userId: string){
        set(ref(database, 'users/' + userId), {
            name: name,
            email: email,
            predictions: {}
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
                storeNewUserData(email, name, userId);
                navigate("/dashboard/Overview");
            })
            .catch((error) => {
                const errorMessage = error.message;
                setErrorMessage(errorMessage.substring(9));
            });
        }
    }

    return(
        <div>
            <div className="flex justify-center items-center w-full h-screen bg-glucose">
                <form className="border-2 border-grey-500 w-100 bg-honeydue-shade shadow-lg rounded-lg p-11 h-100">
                    <div className="flex flex-row justify-center w-full">
                        <h2 className="font-bold text-3xl mb-4 text-black">Signup</h2>
                    </div>
                    <div className="flex flex-col justify-center">
                        <input id="email-input" type="email" placeholder="Email" className="input1"></input>
                        <input id="name-input" type="text" placeholder="Name" className="input1"></input>
                        <input id="password-input" type="password" placeholder="Create Password" className="input1"></input>
                        <input id="verify-input" type="password" placeholder="Verify Password" className="input1"></input>
                        <p className="text-red-500 font-bold">{errorMessage}</p>   
                    </div>    
                    <div className="flex flex-row justify-center w-full">
                        <button onClick={createUser} type="submit" className="rounded-full bg-glucose font-semibold shadow-sm w-36 h-11 mt-4">Create</button>
                    </div>
                    <div className="flex flex-row justify-center w-full">
                        <Link to="/login" className="text-sm font-bold mt-5 underline text-black">Go Back</Link>
                    </div>              
                </form>
            </div>
        </div>
    )
}

export default Signup