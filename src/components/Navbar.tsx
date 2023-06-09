import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as SiteTitle } from "../assets/NBABracketHub (1).svg";
import { fireApp } from "../App"
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Navbar(){
    const [navBackground, setNavBackground] = useState(false);
    const [user, setUser] = useState(false);

    useEffect(() => {
        const auth = getAuth(fireApp);
        const isLogin = onAuthStateChanged(auth, (user) => {
            if (user){
                setUser(true);
            }
            else{
                setUser(false);
            }
        })
        return () => isLogin();
    },[]);

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
            {!user ? (<SiteTitle className="mt-2"/>) : (null)}    
            <ul className = "flex flex-row mt-7 mr-10">
                {!user ? (
                <li>
                    <Link to="/" className="link">Home</Link>
                </li>
                ) : (null)} 

                {!user ? (
                <li className="flex justify-center items-center rounded-md w-24 h-7 mb-4 bg-federal transition duration-150 ease-in-out hover:bg-zaffre shadow-md hover:shadow-zaffre">
                    <Link to="/login" className="link">Login</Link>
                </li>
                ) : (null)}
            </ul>
        </nav>
    )
}

export default Navbar;