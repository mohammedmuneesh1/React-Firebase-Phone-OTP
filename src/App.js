import "./App.css";
import Login from "./page/login";
import { Route,Routes } from "react-router-dom";
import Verify from "./page/verify";
import Home from "./page/home";
  

function App() {
  return <>
  <Routes>
    <Route path="/"  element={<Login/>} />
    <Route path="/verify" element={<Verify/>} />
    <Route exact path="/home" element={<Home/>} />
  </Routes>
  </>
}

export default App;
