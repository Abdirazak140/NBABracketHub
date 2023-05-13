function Prediction({bracket, sendUser}: any){
    return(
        <div onClick={sendUser} className="flex justify-center items-center w-60 h-36 text-lg text-black bg-white border-black rounded-lg m-3 border-2">{bracket}</div>
    )
}

export default Prediction;