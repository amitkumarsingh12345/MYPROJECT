import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Toast from 'react-bootstrap/Toast';

const AddToCart = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(false);
  const data = JSON.parse(params.id);
  const qty = parseInt(data.qty);
  const [qt, setQt] = useState(qty);
  const email = JSON.parse(localStorage.getItem('user'));

  //Tost -----------------------------------
  const [showA, setShowA] = useState(true);
  const toggleShowA = () => {
    setShowA(!showA)
    navigate('/');
  }
  //Tost -----------------------------------

  const orderHandler = async () => {
    if (localStorage.getItem('user')) {
      const order = await axios.post('http://localhost:11000/order', {
        name: data.name,
        price: data.price,
        category: data.category,
        useremail: email,
        qty: qt,
        image: data.image
      });

      if (order.data.Massage == 'Order Success') {
        console.log(order.data.Massage);
        setOrder(true);
      }
    } else {
      navigate('/UserLogin');
    }
  }

  const qtyHandler = (e) => {
    if (e.target.value == '-') {
      if (qt > 1) {
        setQt(qt - 1);
      }
    } else if (e.target.value == '+') {
      setQt(qt + 1);
    }
  }

  return (

    <div className='d-flex flex-column justify-content-center align-content-center 
    align-items-center mt-2' >

      {
        order ? <Toast show={showA} onClose={toggleShowA} className='px-5'>
          <Toast.Header>
            <img
              src={`/${data.image}`}
              className="rounded me-2"
              alt=""
              style={{
                height: '20px',
                width: '20px',
                borderRadius: '50%'
              }}
            />
            <strong className="me-auto">{data.name}</strong>
            <small className='text-success fw-bold fs-5'>Successfull!!</small>
          </Toast.Header>
          <Toast.Body className='lh-1'>
            <p style={{ borderBottom: '1px solid gray' }} className='pb-1'>Price: {data.price}</p>
            <p style={{ borderBottom: '1px solid gray' }} className='pb-1'>Qty: {qt}</p>
            <p style={{ borderBottom: '1px solid gray' }} className='pb-1'>Category: {data.category}</p>
          </Toast.Body>
        </Toast> : ""
      }

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
          <p>Product Quentity : {qt}</p>
          <p>Product Category : {data.category}</p>
          <p>Product Discription : {data.discription}</p>
          <p className='text-center'>
            <button value="-" className='btn btn-outline-dark btn-sm px-2' onClick={qtyHandler}>-</button>
            <button id='buy' className='btn btn-warning btn-sm mx-2' onClick={orderHandler}>Buy now</button>
            <button value="+" className='btn btn-outline-dark btn-sm px-2' onClick={qtyHandler}>+</button>
          </p>
        </div>
      </div>
    </div>









  )
}

export default AddToCart