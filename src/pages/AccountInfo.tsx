import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { ref, child, get} from "firebase/database";
import { fireApp, database } from "../App";
import { useEffect, useState } from "react";

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
    })
    
    return(
        <div className="flex justify-center items-center w-full h-screen bg-slate-600">
            <div className="flex flex-col border-2 border-grey-500 w-96 bg-black shadow-lg rounded-lg p-6 h-80">
                <h1 className="font-bold text-xl mb-4 text-white">Account Information:</h1>
                <div className="flex flex-row mt-4">
                    <p className="font-bold text-base text-white">Name:</p>
                    <p className="font-normal text-base text-white ml-3">{name}</p>
                </div>
                <div className="flex flex-row mt-4">
                    <p className="font-bold text-base text-white">Email:</p>
                    <p className="font-normal text-base text-white ml-3">{email}</p>
                </div>
                <Link to="/dashboard" className="text-sm font-bold underline text-white mt-4 w-16">Go Back</Link>
            </div>
        </div>
    )
}

export default AccountInfo;