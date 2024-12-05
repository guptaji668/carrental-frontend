

import {BrowserRouter as Router,Routes,Route} from "react-router-dom"

import AdminLogin from "./Components/Administrator/Administrator/AdminLogin";
import Dashboard from "./Components/Administrator/Administrator/Dashboard";
import Home from "./Components/UserInterface/Home";

import VehicleDetails from "./Components/UserInterface/VehicleDetails";
import VehicleDetailComponent from"./Components/UserInterface/VehicleDetailComponent"
import PaymentGateway from "./Components/UserInterface/PaymentGateway";


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route  element={<AdminLogin/>} path="/adminlogin"/>
          <Route  element={<Dashboard/>} path="/dashboard/*"/>
          <Route element={<Home/>} path="/home"/>
          <Route element={<VehicleDetails/>} path="/vehicledetails"/>
          <Route element={<VehicleDetailComponent/>} path="/vehicledetailComponent"/>
          <Route element={<PaymentGateway/>} path="/paymentgateway"/>
    
        
        </Routes>
      </Router>

    
    </div>
  );
}

export default App;
/** yha (dashboard/*) me (/*) islye lagya h ku ki humne kuch router ko iske ander daal dia h 
  saare router ab dashbaoad ke ander khulebge ex, dashboard/category,dashboard/subcategory
 */
///* path me hum jo naam dete h bo kuch bi de skte h yhi naam se router call karte h */