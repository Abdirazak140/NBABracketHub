import { AiOutlineLogin } from "react-icons/ai";
import { ReactComponent as SiteTitle } from "../assets/NBABracketHub (1).svg";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { fireApp } from "../App";
import { useState } from "react";

function Dashbar(){
    const auth = getAuth(fireApp);
    const name = auth.currentUser?.displayName;
    const navigate = useNavigate();
    const [overviewStyle, setOverviewStyle] = useState(true);
    const [settingsStyle, setSettingsStyle] = useState(false);

    function LogOut(){
        const auth = getAuth();
        signOut(auth).then(() => {
            navigate("/login");
        })
    }

    return(
        <div className="bg-nav-grey w-1/4 flex flex-col items-start space-y-5 items-center text-white justify-between">
            <SiteTitle/>

            <div className="flex flex-col items-start space-y-4 py-4 px-8 w-full pb-8">
                <Link onClick={() =>{setOverviewStyle(true); setSettingsStyle(false);}} to="/dashboard/Overview" className={`text-lg font-medium ${overviewStyle ? "text-honeydue" : "text-gray-300"} hover:text-honeydue`}>Overview</Link>
                <Link onClick={() =>{setSettingsStyle(true); setOverviewStyle(false); }} to="/dashboard/Settings" className={`text-lg font-medium ${settingsStyle ? "text-honeydue" : "text-gray-300"} hover:text-honeydue`}>Settings</Link>
            </div>
                
            <div className="flex flex-col items-start space-y-4 py-4 px-8 w-full pb-8">
                <h1 className="text-md font-bold text-gray-300 underline">PROFILE</h1>
                <span className="text-lg font-medium">{name}</span>
                <button onClick={LogOut} className="flex items-center mt-4 space-x-2 bg-gray-300 text-white py-2 px-4 rounded-md hover:bg-gray-700">
                    <AiOutlineLogin className="text-black"/> 
                    <span className="text-black">Log Out</span>
                </button>
            </div>
        </div>
    )
}

export default Dashbar