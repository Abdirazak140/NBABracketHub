import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { AiOutlineMenu } from "react-icons/ai";

function Prediction({bracket, sendUser}: any){
    return(
        <div onClick={sendUser} className="flex flex-col justify-center items-center w-60 h-36 text-lg text-black bg-white border-black rounded-lg m-3 border-2">
            <Popup trigger={<AiOutlineMenu/>}>
                <div className="p-2 bg-white border-2 border-black shadow-sm">
                    <div className="cursor-pointer mb-1">Option 1</div>
                    <div className="cursor-pointer mb-1">Option 2</div>
                    <div className="cursor-pointer">Option 3</div>
                </div>
            </Popup>
            {bracket}
        </div>
    )
}

export default Prediction;