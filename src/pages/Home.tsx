import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fireApp } from "../App";


function Home(){
    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth(fireApp);
        const isLogin = onAuthStateChanged(auth, (user) => {
            if (user){
                navigate("/dashboard/Overview");
            }
        })
        return () => isLogin();
    },[]);

    return(
        <div>
            <Navbar/>
            <div className="w-full h-full">
                <div className="bg-cover bg-center bracket-img w-full flex flex-col justify-center items-center">
                    <div className="bg-glucose-transparent shadow-lg-honeydue">
                        <h1 className="text-7xl mb-8 text-federal text-center font-bold">Keep track<br></br>of your<br></br>bracket predictions</h1>
                        <p className="text-3xl text-center text-zaffre font-bold">And see the results unfold.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;