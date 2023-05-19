import Navbar from "../components/Navbar";

function Home(){
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