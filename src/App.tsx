import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCU-njROKe-uM_yc03aUabAmAuomAP8Cv4",
  authDomain: "sportbracketpredictions.firebaseapp.com",
  projectId: "sportbracketpredictions",
  storageBucket: "sportbracketpredictions.appspot.com",
  messagingSenderId: "826690539160",
  appId: "1:826690539160:web:91d50a78a009d6f7df8aed",
  measurementId: "G-DLSPKFYJVD"
};

const fireApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(fireApp);

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
export { fireApp };