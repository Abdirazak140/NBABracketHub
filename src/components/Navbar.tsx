import { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as SiteTitle } from "../assets/SportBracketPredictions.svg";

function Navbar(){
    const [navBackground, setNavBackground] = useState(false);
    
    const changeNavBarStyle = () => {
        if (window.scrollY >= 10){
            setNavBackground(true);
        }
        else{
            setNavBackground(false);
        }
    }

    window.addEventListener("scroll", changeNavBarStyle);
    
    return(
        <nav className= {navBackground ? "navbar active" : "navbar"}>
            <SiteTitle className="pb-3"/>
            <ul className = "flex flex-row mt-7 mr-10">
                <li>
                    <Link to="/" className="link">Home</Link>
                </li>
                <li>
                    <Link to="/dashboard" className="link">Dashboard</Link>
                </li>
                <li className="flex justify-center items-center rounded-md w-24 h-7 mb-4 bg-blue-800 transition duration-150 ease-in-out hover:bg-blue-500 shadow-md hover:shadow-blue-200">
                    <Link to="/login" className="link">Login</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;