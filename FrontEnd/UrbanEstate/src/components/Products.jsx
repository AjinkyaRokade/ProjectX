import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Card,
  CardBody,
  //CardTitle,
  CardSubtitle,
  CardText,
  //CardFooter,
  Button,
  CardImg,
  //Container,
} from "reactstrap";

const USER_API_BASE_URL = "http://localhost:8080/";
const Products = ({ prop }) => {
  const sendId = (id) => {
    navigate("/PropertyDetails/"+id);
  };

  const navigate = useNavigate();
  let userRole = JSON.parse(sessionStorage.getItem("user"));
  const addToWishlistHandler = () => {
    // if (userRole.role === "ROLE_ADMIN") {
    //   navigate("/Admin");
    // } 
    if (sessionStorage.getItem("token")) {
      console.log("user is logged in");
      if(userRole==='ROLE_ADMIN'){
        navigate('/Admin')
      }
      toast.success("Property added to wishlist successfully");

      axios.get(USER_API_BASE_URL+"buyer/property/addwishlist/"+sessionStorage.getItem("userID")+"/"+prop.id).then((res) => {
        console.log(res.data);
      });
    } else {
      console.log("user is not logged in");
      // alert("Kindly Login First");
      toast.warning("Kindly Login First");
      navigate("/Login");
    }
  };
  return (
    <div style={{ backgroundColor: "transparent" }}>
      <Card
        onClick={() => sendId(prop.id)}
        style={{
          backgroundColor: "white",
          color: "light",
          width: "18rem",
          height: "22rem",
          margin: "-5px",
          // padding: "-2px"
        }}
      >
        <CardSubtitle className="title">
          <a href="/PropertyDetails"></a> {prop.propType}
        </CardSubtitle>
        <img alt="Sample" className="cardImage" src={prop.images} />
        <CardText className="body">{prop.description} </CardText>
        <CardText className="body">{prop.area}</CardText>
        <CardText className="body">{prop.price}₹/Sqft</CardText>
      </Card>
       
       {(sessionStorage.getItem("token") && sessionStorage.getItem("userRole").includes("ADMIN")) 
       ?
       <></>
      
      :<Button
      style={{ margin: "5px" }}
      color="primary"
      onClick={addToWishlistHandler}
    >
      Add to Wishlist
    </Button>
      }
      
       
    </div>
  );
};
export default Products;
