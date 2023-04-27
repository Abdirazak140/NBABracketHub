import Navbar from "../components/Navbar";

function Dashboard(){
    return(
        <div>
            <Navbar/>
            <div className="w-full h-20 bg-slate-300 flex flex-row fixed top-20">
                <button className="dashboard-btn text-green-500 border-green-500 border-2">Create Prediction</button>
                <button className="dashboard-btn text-red-500 border-red-500 border-2">Delete Prediction</button>
            </div>
            <div className="w-full h-screen bg-slate-200"></div>
        </div>
    )
}

export default Dashboard;