import Navbar from "../components/Navbar";

function Home(){
    return(
        <div>
            <Navbar/>
            <div className="bg-cover bg-center bracket-img w-full h-full flex flex-col justify-center items-center">
                <div className="bg-cover bg-center bg-grey-200">
                    <h1 className="text-7xl mb-8 text-blue-100 text-center">Keep track<br></br>of your<br></br>bracket predictions</h1>
                    <p className="text-3xl text-center text-purple-100">And see the results unfold.</p>
                </div>
            </div>
        </div>
    )
}

export default Home;