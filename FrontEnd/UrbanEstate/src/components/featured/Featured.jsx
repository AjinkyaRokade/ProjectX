import React from "react"
import "./Featured.css"
import FeaturedCard from "./FeaturedCard"

const Featured = () => {
  return (
    <>
      <section className='featured background'>
        <div className='container'>
          <h2 >Featured Property Types</h2><br></br><br></br>
          <FeaturedCard />
        </div>
      </section>
    </>
  )
}

export default Featured
