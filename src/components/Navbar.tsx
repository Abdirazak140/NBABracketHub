import { Link } from "react-router-dom";

function Navbar(){
    return(
        <nav className="w-full flex justify-end">
            <ul className = "flex flex-row mt-2">
                <li>
                    <Link to="/" className="mx-4">Home</Link>
                </li>
                <li>
                    <Link to="/dashboard" className="mx-4">Dashboard</Link>
                </li>
                <li>
                    <Link to="/login" className="mx-4">Login</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;