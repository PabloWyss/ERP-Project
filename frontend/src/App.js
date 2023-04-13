import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SideBar from "./Components/SideBar";
import Profile from "./Pages/Profile";
import Tags from "./Pages/Tags";
 import Warehouse from "./Pages/Warehouse";
import Reports from "./Pages/Reports";
 import Orders from "./Pages/Orders";
 import Items from "./Pages/Items";


function App() {
  return (
    <Router>
      <div className="flex">
        <SideBar />
        <Routes>
          <Route path="/items" element={<Items />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/warehouse" element={<Warehouse />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Items />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
