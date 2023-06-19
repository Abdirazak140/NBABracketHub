import { getAuth, sendPasswordResetEmail  } from "firebase/auth";
import { ref, child, get} from "firebase/database";
import { fireApp, database } from "../App";
import { useEffect, useState } from "react";
import Dashbar from "../components/Dashbar";

function AccountInfo(){
    const [name, setName] = useState("Loading...");
    const [email, setEmail] = useState("Loading...");

    const auth = getAuth(fireApp);
    const userId = auth.currentUser?.uid;
    const reference = ref(database);

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
                    <div className="flex flex-row mt-4">
                        <div className="flex flex-col justify-center">
                            <p className="font-bold text-base text-gray-500">Name</p>
                            <p className="font-normal text-base text-black ml-3">{name}</p>
                        </div>
                        <button className="ml-20 w-20 mt-4 flex flex-row text-white justify-center items-center bg-gray-500 hover:bg-gray-700 text-white font-bold rounded">Edit</button>
                    </div>
                    <div className="flex flex-row mt-4">
                        <div className="flex flex-col justify-center">
                            <p className="font-bold text-base text-gray-500">Email</p>
                            <p className="font-normal text-base text-black ml-3">{email}</p>
                        </div>
                        <button className="ml-3 w-20 mt-4 flex flex-row text-white justify-center items-center bg-gray-500 hover:bg-gray-700 text-white font-bold rounded">Edit</button>
                    </div>
                    <button className="w-40 mt-4 flex flex-row text-white justify-center items-center bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Reset Password</button>
                </div>
            </div>
        </div>
    )
}

export default AccountInfo;