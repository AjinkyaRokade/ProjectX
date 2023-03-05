import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardTitle, Container } from "reactstrap";
import Footer from "./Footer";
import Header from "./Header";
import './Home.css';



const ProductDetails=()=>{
    let navigate=useNavigate();
    const sendBack=()=>{
        navigate('/');
    }

    let token= sessionStorage.getItem("token");
    let [property,setProperty]=useState([]);
    let {id} = useParams();
    console.log("ajinkya")
    console.log({id});
     let URL="http://localhost:8080/properties/get/"+id;
    useEffect(()=>{
     axios.get(URL,{
        headers:{
            Authorization:token
        }
     }).then(
        (response)=>{
        console.log(response.data)
        setProperty(response.data)
        }
     )
    },[])
    return(
        <div className="Home">
            <Header/>
                <h5 className="title" style={{margin:"30px"}}>Property Details</h5>
                <Container>
                    <Card>
                    <div className="productDetails" >
                    <img src={property.imageUrl}/>
                    </div>
                    <div className="title">
                        <h1>{property.description}</h1>
                    </div>
                    </Card>
                    <div style={{margin:"30px"}}>
                    <Button size="lg" color="link" onClick={sendBack}> Back</Button>
                    </div>
                    
                </Container>
            <Footer/>
        </div>
    )
}
export default ProductDetails;

//{product.productName}