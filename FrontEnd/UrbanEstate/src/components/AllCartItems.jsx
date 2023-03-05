import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

import Footer from "./Footer";
import Header from "./Header";
import { Button, Container, Nav, Table } from "reactstrap";
import "./Home.css";
import { toast } from "react-toastify";
import getCartItemsFromSerive from "../service/CartService"


const USER_API_BASE_URL = "http://localhost:8080/buyer/";

const Remove_Cart = "http://localhost:8080/medi/api/cart/remove/";
const Remove_Cart_Items = "http://localhost:8080/medi/api/cart/remove";

const AllCartItems = () => {

  let navigate = useNavigate();

  const [Count, setCount] = useState(0);
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    getCartItems() 
  },[Count])
//================================================================================================================
  let reduceItemQty=(id)=>{

    let productID = id;
    let customerID = sessionStorage.getItem("userID");
    let token=sessionStorage.getItem("token");
    setCount(Count+1);
    const userDto = {
      productId: productID,
      customerId: customerID,
      quantity:-1
    };

    axios.post(USER_API_BASE_URL+"add",userDto,{
      headers :
      {
        Authorization: token,
      }
    }).then(

      (response)=>console.log(response.data),
      setCount=(Count+1),
      toast.success(' Quantity Updated', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        }),
        window.location.reload(),
        navigate("/Cart")

      ).catch=(error)=>{
      console.log(error)
    }
  };
  
//=============================================================================================================
  let increaseItemQty=(id)=>{
    
    let productID = id;
    let customerID = sessionStorage.getItem("userID");
    let token=sessionStorage.getItem("token");
    setCount(Count+1);

    const userDto = {
      productId: productID,
      customerId: customerID,
      quantity:1
    };

    axios.post(USER_API_BASE_URL+"add",userDto,{
      headers :
      {
        Authorization: token,
      }
    }).then(
      (response)=>console.log(response.data),
      setCount=(Count+1),
      toast.success(' Quantity Updated', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        }),
        // navigate("/cart"),
        window.location.reload(),
      navigate("/Cart")

    ).catch=(error)=>{
      console.log(error)
    }
  };
  

//============================================================================================================
  
    const removeCartItem = (id) => {
    const token = sessionStorage.getItem("token");
    let cid = sessionStorage.getItem("userID");
    let navigate = useNavigate;
    let propertyID = id;
    let customerID = cid;

    const userDto = {
      propertyId: propertyID,
      customerId: customerID,
    };
    // if(sessionStorage.getItem("token")){
    // axios.delete(Remove_Cart_Items,userDto,{
    // headers:{"Authorization": `$(token)`},}).then(
    //     (response)=>{
    //         navigate("/Cart");
    //     }
    //     )
    // // }

    const options = {
      method: "GET",
      url: "http://localhost:8080/buyer/property/removewishlist/"+cid+"/"+id,
      headers: {
        Authorization: token,
      },
      // data: { productId: productID, customerId: customerID },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        toast.success("Property has been removed from wishlist");
        // getCartItems();
      
           window.location.reload();
           
        
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  
//=============================================================================================================
  let id = sessionStorage.getItem("userID");
  const emptyCart = () => {
    if (sessionStorage.getItem("token")) {
      axios
        .delete(Remove_Cart + id)
        .then(
          (response) => console.log(response.data),
          // setCount=(Count+1),
          toast.warning("Cart is empty"),
          window.location.reload(),
          
          
          
        );
    }
  };

 
  useEffect(() => {
    getCartItems();
  }, []);
//==================================================================================================================
 
  //===========================================================================================================
  const getCartItems = () => {
    let id = sessionStorage.getItem("userID");
    console.log(id);
    let token = sessionStorage.getItem("token");
    console.log(token);
    if (sessionStorage.getItem("token")) {
      axios
        .get(USER_API_BASE_URL + "property/getWishlist/"+id, {
          headers: { Authorization: token },
        })
        .then((response) => {
          console.log(response);
          JSON.stringify(response);
          setProperties(response.data);
          let properties = response.data;
          sessionStorage.setItem("properties", properties);
        });
    } else {
      console.error("unexpected error");
    }
  };
  
//==================================================================================================================
  return (
    <div className="Home">
      <Header />
       
        {
          properties.length==0 && <div className="title" style={{margin:"50px"}}><h4>Your Wishlist is Empty</h4> <br/>
          <a href="/">
          <Button color="success">Search for Properties</Button>
          </a>
          </div>
        }
        
        {properties.length > 0 && <>
        <div style={{display:"flex"}}>
        <Container>
        <div className="product-container" style={{margin:"50px"}}><h4>Lets Book your new Property</h4></div>

            
              { properties.map((item) => (
                  // <tbody>
                  //   <tr>
                  //     <td>{item.propType}</td>
                  //     <td>
                  //       <Button color="primary" size="sm" onClick={()=>reduceItemQty(item.product.id)}>
                  //         -
                  //       </Button>
                  //       &nbsp;&nbsp;{item.price}&nbsp;&nbsp;
                  //       <Button color="primary" size="sm" onClick={()=>increaseItemQty(item.product.id)}>
                  //         +
                  //       </Button>
                  //     </td>
                  //     <td>{item.description} </td>
                  //     <td>{item.price} ₹</td>
                  //     <td>
                  //       <Button
                  //         color="danger"
                  //         onClick={() => removeCartItem(item.product.id)}
                  //       >
                  //         {" "}
                  //         Remove{" "}
                  //       </Button>
                  //     </td>
                  //   </tr>
                  // </tbody>
                  

                  <div class="card" style={{"width": "18rem", "margin":"auto"}}>
  <img class="card-img-top" src={"p-1.jpg"} alt="Card image cap"/>
  <div class="card-body">
    <h5 class="card-title">{item.propType}</h5>
    <p class="card-text">{item.description}</p>
    <h5 class="card-title">{item.price}&nbsp;&nbsp; ₹</h5>
    <h5 class="card-title">{item.area}&nbsp;&nbsp;SqFt</h5>
    <button onClick={() => removeCartItem(item.id)} class="btn btn-success">Remove from wishlist</button>
  </div>
</div>
                ))
                  }
        </Container>
      </div>
      <div>
        <a href="/Address" >
          <Button color="success">Check Out</Button>
        </a>{" "}
        <Button color="primary" onClick={emptyCart}>
          Empty Cart
        </Button>
      </div>
      </>}
      <Footer />
    </div>

  );
};
export default AllCartItems;
