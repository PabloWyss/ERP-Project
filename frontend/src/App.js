import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SideBar from "./Components/SideBar";
import Profile from "./Pages/Profile";
import Tags from "./Pages/Tags";
import Merchant from "./Pages/Merchant";
import Reports from "./Pages/Reports";
import Orders from "./Pages/Orders";
import Items from "./Pages/Items";
import SignIn from "./Pages/Auth/SignIn";
import SignUp from "./Pages/Auth/SignUp";
import Congratulations from "./Pages/Auth/Congratulations";
import Verification from "./Pages/Auth/Verification";
import Warehouse from "./Pages/Warehouse";
import Partners from "./Pages/Partners";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const currentUser = useSelector((store) => store.currentuser.currentuser);
  const [, setIsLoggedIn] = useState(false);
    useDispatch();

    useEffect(() => {
        if (currentUser === {}) {
            setIsLoggedIn(false);
        } else {
            const token = localStorage.getItem("token");
            if (token) {
                setIsLoggedIn(true);
            }
        }
    }, [currentUser]);
    useEffect(() => {
    if (currentUser === {}) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, [currentUser]);


  //const isPathExcluded = ['/signin', '/signup/verification', '/congratulations'].includes(location.pathname);

  return (
      <Router>
      <div className="flex">
          <SideBar/>
             <Routes>
                  <Route path="/signin" element={<SignIn/>}/>
                  <Route path="/signup" element={<SignUp/>}/>
                  <Route path="/congratulations" element={<Congratulations/>}/>
                  <Route path="/verification" element={<Verification/>}/>
                  <Route path="/items" element={<Items/>}/>
                  <Route path="/orders" element={<Orders/>}/>
                  <Route path="/warehouses" element={<Warehouse/>}/>
                  <Route path="/reports" element={<Reports/>}/>
                  <Route path="/tags" element={<Tags/>}/>
                  <Route path="/profile" element={<Profile/>}/>
                  <Route path="/merchants" element={<Merchant/>}/>
                  <Route path="/partners" element={<Partners/>}/>
                  <Route path="/" element={<Items/>}/>
              </Routes>
      </div>
  </Router>
  );
}

export default App;