import React from 'react'
import sec from "./ProductSec.module.css"
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
function ProductSec() {
  return (
    <div className={sec.container}>
       <p>Products</p>
      <div className={sec.product}>
        <Link to="/">HOME <FontAwesomeIcon icon={faAngleRight} className={sec.icon} /></Link>
        <Link to="/shop">PRODUCTS</Link>
      </div>
    </div>
  )
}

export default ProductSec