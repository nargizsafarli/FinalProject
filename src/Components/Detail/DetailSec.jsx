import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

function DetailSec() {
   const {id}=useParams
   const { data, loading, error } = useSelector((state) => state.product);
   console.log(data);
  return (
    <div>DetailSec</div>
  )
}

export default DetailSec