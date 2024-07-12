import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const DeleteCategory = () => {
   const params =  useParams();
   const navigate = useNavigate();
   const editHandler = async() => {
       const data = await axios.delete(`http://localhost:11000/category/${params.id}`);
       navigate('/Categories');
   }
   useEffect( () => {
      editHandler();
   },[]);
}
export default DeleteCategory