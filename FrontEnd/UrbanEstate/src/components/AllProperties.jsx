import React, { useEffect,useState } from 'react';
import axios from "axios";
import Properties from "./Properties";
import "../Layouts/Allcards.css";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from 'reactstrap';


const USER_API_BASE_URL = "http://localhost:8080/properties";

const AllProperties=()=>{

const [search,setSearch]=useState([]);
    const searchItemByCity=(e)=>{

       setSearch(properties.filter((p)=>{
        if(p.address.city.toUpperCase().includes(e.target.value.toUpperCase()))
        return p;
        
    })) 


    }
    

    useEffect(()=>{
        
        getAllproperties();
       },[]);


      const getAllproperties=()=>{
       axios.get(USER_API_BASE_URL).then(
           (response)=>{
               console.log(response);
               JSON.stringify(response);
               setProperties(response.data);
               setSearch(response.data);
           },
           (error)=>{
               console.log(error);
           }
       );
      };

    const [properties,setProperties]=useState([])
return(
    <div > 
        <Container>
        <div  class="input-group rounded" style={{margin:"50px",}} dark >
                <input
                  type="search"
                  class="form-control rounded"
                  placeholder="Search Properties in your city"
                  aria-label="Search"
                  aria-describedby="search-addon"
                  onChange={searchItemByCity}/>
                <button className='btn btn-dark'>Search</button>
                  
              </div>
              <h3 style={{"color":"Black", fontFamily:"fantasy"}}>Recently Added properties</h3>
              </Container>
        <div style={{marginTop:"50px",backgroundColor:"color: white "}}>
        {/* rgb(202, 233, 252) */}
        
        </div>
        {/* {Product.map((item) => {
            return (<Products prod={item}/>)
        })} */}
        {
            properties.length > 0
            ? search.map((item)=><div className='Allcards'><Properties  prop={item}/></div> )
            :<div className='title'><h1>Sorry! Server is Down... Please try again later.</h1></div>
        }
        <br></br>
        <button className='btn btn-success' ><a href='/Wishlist' style={{color:"white", textDecoration:"none"}}>Go to wishlist</a></button>
    </div>
)
}
export default AllProperties;