import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as SiteTitle } from "../assets/SportBracketPredictions.svg";
import { fireApp } from "../App"
import { getAuth, signOut } from "firebase/auth";

function Navbar(){
    const [navBackground, setNavBackground] = useState(false);
    const [user, setUser] = useState(false);
    const navigate = useNavigate();

    function LogOut(){
        const auth = getAuth();
        signOut(auth).then(() => {
            setUser(false);
            navigate("/login");
        })
    }

    useEffect(() => {
        const auth = getAuth(fireApp);
        const user = auth.currentUser;
        if (user){
            setUser(true);
        }
        else{
            setUser(false);
        }
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
            <SiteTitle className="pb-3"/>
            <ul className = "flex flex-row mt-7 mr-10">
                {!user ? (
                <li>
                    <Link to="/" className="link">Home</Link>
                </li>
                ) : (null)} 

                {user ? (
                <li>
                    <Link to="/dashboard" className="link">Dashboard</Link>
                </li>
                ) : (null)}

                {user ? (
                <div className="dropdown">
                    <button className="dropdown-btn">Account</button>
                    <div className="dropdown-content">
                        <Link to="/account-info" className="dropdown-content-btn">INFO</Link>
                        <button onClick={LogOut} className="dropdown-content-btn">Log Out</button>
                    </div>
                </div>
                ) : (null)}

                {!user ? (
                <li className="flex justify-center items-center rounded-md w-24 h-7 mb-4 bg-blue-800 transition duration-150 ease-in-out hover:bg-blue-500 shadow-md hover:shadow-blue-200">
                    <Link to="/login" className="link">Login</Link>
                </li>
                ) : (null)}
            </ul>
        </nav>
    )
}

export default Navbar;