import { getAuth, sendPasswordResetEmail, updateEmail  } from "firebase/auth";
import { ref, child, get, set, update} from "firebase/database";
import { fireApp, database } from "../App";
import { useEffect, useState } from "react";
import Dashbar from "../components/Dashbar";

function Settings(){
    const [name, setName] = useState("Loading...");
    const [email, setEmail] = useState("Loading...");
    const [showNameInput, setShowNameInput] = useState(false);
    const [showEmailInput, setShowEmailInput] = useState(false);
    const [userMessage, setUserMessage] = useState("");

    const auth = getAuth(fireApp);
    const userId = auth.currentUser?.uid;
    const reference = ref(database);

    function ResetPassword(){
        if (auth.currentUser?.email) {
            sendPasswordResetEmail(auth, auth.currentUser.email).then(() => {
                setUserMessage("Password reset email has been sent successfully");
            }).catch((error) => {
                console.log(error);
            })
        }
    }
    

    function ChangeName(){
        const name_input = document.querySelector("#name-input") as HTMLInputElement;
        const new_name: string = name_input.value;
        update(ref(database, `users/${userId}`), {
            name: new_name,
        });
        setName(new_name);
        setShowNameInput(false);
        setUserMessage("Name has been changed successfully");
    }

    function ChangeEmail(){
        const email_input = document.querySelector("#email-input") as HTMLInputElement;
        const new_email: string = email_input.value;
        if (auth.currentUser && new_email){
            updateEmail(auth.currentUser, new_email).then(() => {
                setEmail(new_email);
                setShowEmailInput(false);
            }).catch((error) => {
                setUserMessage(error);
            })
        }
    }

    useEffect(() => {
        get(child(reference, `users/${userId}`)).then((snapshot) => {
            setEmail(snapshot.val().email);
            setName(snapshot.val().name);
            return name;
        }).catch((error) => {
          console.error(error);
        });
    },[name, email, reference, userId])
    
    return(
        <div className="flex flex-row w-full h-screen bg-white">
            <Dashbar/>
            <div className="w-3/4 h-full flex flex-col justify-between bg-white p-8 overflow-auto">
                <h1 className="text-4xl font-bold mb-5">Settings</h1>
                <div className="w-full h-full flex flex-col bg-white p-8 overflow-auto border-grey-400 border-2 rounded-md">
                    <h1 className="text-2xl font-bold ">Profile:</h1>
                    <div className="flex flex-row mt-4 justify-between">
                        <div className="flex flex-col justify-center">
                            <p className="font-bold text-base text-gray-500">Name</p>
                            <p className="font-normal text-base text-black ml-3">{name}</p>
                        </div>
                        {showNameInput ? (
                        <div className="flex flex-row space-x-3 mr-96">
                            <input id="name-input" className="w-36 border-black border-1 p-2 bg-gray-300"></input>
                            <button onClick={ChangeName} className="w-20 flex flex-row text-white justify-center items-center bg-gray-500 hover:bg-gray-700 text-white font-bold rounded">Enter</button>
                            <button onClick={() => {setShowNameInput(false)}} className="w-20 flex flex-row text-white justify-center items-center bg-gray-500 hover:bg-gray-700 text-white font-bold rounded">Cancel</button>
                        </div>
                        ) : (
                        <button onClick={() => {setShowNameInput(true)}} className="mr-96 w-20 mt-4 flex flex-row text-white justify-center items-center bg-gray-500 hover:bg-gray-700 text-white font-bold rounded">Edit</button>) }
                    </div>
                    <div className="flex flex-row mt-4 justify-between">
                        <div className="flex flex-col justify-center">
                            <p className="font-bold text-base text-gray-500">Email</p>
                            <p className="font-normal text-base text-black ml-3">{email}</p>
                        </div>
                        {showEmailInput ? (
                        <div className="flex flex-row space-x-3 mr-96">
                            <input id="email-input" className="w-36 border-black border-1 p-2 bg-gray-300"></input>
                            <button onClick={ChangeEmail} className="w-20 flex flex-row text-white justify-center items-center bg-gray-500 hover:bg-gray-700 text-white font-bold rounded">Enter</button>
                            <button onClick={() => {setShowEmailInput(false)}} className="w-20 flex flex-row text-white justify-center items-center bg-gray-500 hover:bg-gray-700 text-white font-bold rounded">Cancel</button>
                        </div>
                        ) : (
                        <button onClick={() => {setShowEmailInput(true)}} className="mr-96 w-20 mt-4 flex flex-row text-white justify-center items-center bg-gray-500 hover:bg-gray-700 text-white font-bold rounded">Update</button>) }
                    </div>
                    <button onClick={ResetPassword} className="w-40 mt-4 flex flex-row text-white justify-center items-center bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Reset Password</button>
                    <p className="mt-3 font-bold text-base text-red-500">{userMessage}</p>
                </div>
            </div>
        </div>
    )
}

export default Settings;