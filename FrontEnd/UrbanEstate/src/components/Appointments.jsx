import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "./footer/Footer";
import Header from "./Header";
const Appointments =()=>{

    let token = sessionStorage.getItem("token");
    let userid = sessionStorage.getItem("userID");
    const [appt, setAppt]=useState([]);
    useEffect(()=>{
        axios.get("http://localhost:8080/appointment/showbuyer/"+userid,{headers:{
            Authorization:token
        }}).then((response)=>{
            console.log(response.data)
            setAppt(response.data);
        })
    },[])
    return(
        <div>
            <Header></Header>
            <h1>All Appointments</h1>
            {appt.map((apps)=>{
               
               <h5 class="card-title">{apps.date}</h5>
            })}
            <Footer></Footer>
        </div>
    );
};
export default Appointments;