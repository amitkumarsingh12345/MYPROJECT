import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';

const ViewProduct = () => {
  const [data, setData] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  const findHandler = async () => {
    const dt = await axios.get(`http://localhost:11000/product/${params.id}`);
    setData(dt?.data[0]);
  }
  useEffect(() => {
    findHandler();
  }, []);

  return (
    <div className='d-flex flex-column justify-content-center align-content-center align-items-center mt-2' >
      <div className=' bg-white p-md-5'>
        <div className=''>
          <img src={`/${data.image}`} className="card-img-top" alt='' style={{
            borderRadius: '5px',
            maxHeight: '200px'
          }} />
        </div>
        <div className='lh-1 mt-2'>
          <p>Product Name : {data.name}</p>
          <p>Product Price : {data.price}</p>
          <p>Product Quentity : {data.qty}</p>
          <p>Product Category : {data.category}</p>
          <p>Product Discription : {data.discription}</p>
          <p>
            <button className='btn btn-danger btn-sm me-1' onClick={() => navigate('/Products')}>Close</button>
            <button className='btn btn-primary btn-sm me-1' onClick={() => navigate(`/EditProduct/${data?._id}`)}>Edit</button>
            <button className='btn btn-warning btn-sm' onClick={() => navigate(`/DeleteProduct/${data?._id}`)}>Delete</button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ViewProduct