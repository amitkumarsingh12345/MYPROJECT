import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const DeleteProduct = () => {
   const params =  useParams();
   const navigate = useNavigate();
   const deleteHandler = async() => {
       const data = await axios.delete(`http://localhost:11000/product/${params.id}`);
       navigate('/Products');
   }
   useEffect( () => {
      deleteHandler();
   },[]);
}
export default DeleteProduct