import { useState } from "react";
import { Link } from "react-router-dom";

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
            <h1 className="ml-10 mt-4 text-2xl">Title Here</h1>
            <ul className = "flex flex-row mt-5 mr-10">
                <li>
                    <Link to="/" className="link">Home</Link>
                </li>
                <li>
                    <Link to="/dashboard" className="link">Dashboard</Link>
                </li>
                <li className="flex justify-center items-center rounded-md w-24 mb-4 bg-white transition-all duration-300 hover:bg-blue hover:shadow-sm hover:shadow-blue">
                    <Link to="/login" className="link">Login</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;