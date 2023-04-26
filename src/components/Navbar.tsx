import { Link } from "react-router-dom";

function Navbar(){
    return(
        <nav className="w-full flex justify-between">
            <h1 className="ml-3 mt-3 text-2xl">Title Here</h1>
            <ul className = "flex flex-row mt-4 mr-4">
                <li>
                    <Link to="/" className="link">Home</Link>
                </li>
                <li>
                    <Link to="/dashboard" className="link">Dashboard</Link>
                </li>
                <li>
                    <Link to="/login" className="link">Login</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;