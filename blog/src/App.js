import Topbar from "./components/topbar/Topbar";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import  {Single } from "./pages/single/Single";
import { H } from "./pages/h/H";


import  Write  from "./pages/write/Write";

import { BrowserRouter as Router,Route,Link, Routes } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const {user}=useContext(Context);
  return (
    <Router>
      <Topbar/>
      <Routes>
      <Route exact path="/" element={<H />} />
      <Route path="/login" element={user?<H/>:<Login/>} />
      <Route path="/register" element={user ?<H/>:<Register/>} />
      <Route path="/settings" element={user?<Settings/>:<Register/>} />
      <Route path="/write" element={user?<Write />:<Register/>} />
      <Route path="/post/:postId" element={<Single/>} />
      </Routes>
    
    
    </Router>
  
    
  );
}

export default App;
