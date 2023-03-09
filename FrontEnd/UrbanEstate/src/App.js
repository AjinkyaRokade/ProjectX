import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import { Component } from 'react';
import {BrowserRouter, BrowserRouter as Router,Route, Routes} from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Wishlist from './components/Wishlist';
import { Container } from 'reactstrap';
import AboutUs from './components/AboutUs';
import InjectedCheckoutForm from './components/CheckoutForm';
import UpdatePassword from './components/UpdatePassword';
import ViewOrders from './components/ViewOrders';
import ProductDetails from './components/ProductDetails';
import ForgotPassword from './components/ForgotPassword';
import EnterOtp from './components/EnterOtp';
import NewPassword from './components/NewPassword';
import OrderDetails from './components/OrderDetails';
import ContactUs from './components/ContactUs';
import Admin from './components/Admin';
import AddShipment from './components/AddShipment';
import OwnerDetails from './components/OwnerDetails';
import Appointments from './components/Appointments';
function App() {
  
  
  return (
    <div className="App">
     <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/Login" element={<Login/>}/>
        <Route exact path="/SignUpUser" element={<SignUp/>}/>
        <Route exact path="/Wishlist" element={<Wishlist/>}/>
        <Route exact path="/AboutUs" element={<AboutUs/>}/>
        <Route exact path='/ChekoutForm' element={<InjectedCheckoutForm/>}/>
        <Route exact path='/updatepassword' element={<UpdatePassword/>}/>
        <Route exact path='/ViewOrders' element={<ViewOrders/>}/>
        <Route exact path='/PropertyDetails' element={<ProductDetails/>}/>
        <Route exact path='/ForgotPassword' element={<ForgotPassword/>}/>
        <Route exact path='/EnterOtp' element={<EnterOtp/>}/>
        <Route exact path='/NewPassword' element={<NewPassword/>}/>
        <Route exact path='/PropertyDetails/:id' element={<ProductDetails/>}/>
        <Route exact path='/OrderDetails/:id' element={<OrderDetails/>}/>
        <Route exact path='/Admin' element={<Admin/>}/>
        <Route exact path='/OwnerDetails/:id' element={<OwnerDetails/>}/>
        <Route exact path='/Appointments' element={<Appointments/>}/>
       
     </Routes>
     <ToastContainer position='top-right' autoClose={4000}/> 
     
    </div>
    
  );
}

export default App;
