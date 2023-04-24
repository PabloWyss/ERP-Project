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
import Warehouses from "./Pages/Warehouses/WarehouseTable";
import Partners from "./Pages/Partners";
import { useDispatch, useSelector } from "react-redux";
import OrderDetails from "./Pages/Orders/OrderDetails";
import CreateItemVariant from "./Pages/CreateItemVariant";
import CreateItemModel from "./Pages/CreateModel";
import CreateItem from "./Pages/CreateItem";
import Item from "./Pages/Items/Item";
import MerchantNEW from "./Pages/Merchant/merchantNEW";
import Models from "./Pages/Model";
import ModelPage from "./Pages/Model/ModelPage";
import NewOrder from "./Pages/Orders/NewOrder";
import QRReader from "./Pages/QRReader";
import Variants from "./Pages/Variants";
import WarehouseDetailsView from "./Pages/Warehouses/WarehouseDetailsView/indesx";
import CreateWarehouse from "./Pages/Warehouses/CreateWarehouse";

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

  return (
    <Router>
      <div className="flex">
        <SideBar />
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/congratulations" element={<Congratulations />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/models" element={<Models/>}/>
          <Route path="/models/:modelID" element={<ModelPage/>}/>
          <Route path="/readqr/" element={<QRReader/>}/>
          <Route
            path="/models/create/"
            element={<CreateItemModel />}
          />
          <Route path="/items" element={<Items />} />
          <Route path="/items/:itemID" element={<Item />} />
          <Route path="/items/new/" element={<CreateItem />} />
          <Route path="/variants/:itemID" element={<Variants />} />
          <Route
            path="/items/itemVariant/create/:itemID"
            element={<CreateItemVariant />}
          />

          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:orderID" element={<OrderDetails />} />
          <Route path="/orders/new" element={<NewOrder />} />
          <Route path="/warehouses" element={<Warehouses />} />
          <Route path="/warehouses/new" element={<CreateWarehouse />} />
           <Route path="/warehouses/:warehouseID" element={<WarehouseDetailsView />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/merchants/me" element={<Merchant />} />
          <Route path="/merchants/new" element={<MerchantNEW />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/" element={<Items />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
