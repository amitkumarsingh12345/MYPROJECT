import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import axios from 'axios';

let totalqty = 0, totalprice = 0;
const Order = () => {
  const [alldata, setAlldata] = useState();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const orderHandler = async () => {
    let data = await axios.get('http://localhost:11000/order');
    data = data?.data.filter((dt) => dt.email == user)[0].showdata;
    console.log(data)
    setAlldata(data);
  }

  useEffect(() => {
    orderHandler();
  }, [])

  const orderDeleteHandler = async (index) => {
    await axios.delete(`http://localhost:11000/order/${index}`);
    orderHandler();
  }

  return (
    <>
      {
        alldata?.length > 0 ? <>
          <div className='d-flex flex-column justify-content-center overflow-auto w-75 m-auto mt-2'>
            <h3 className='text-center'>All Order</h3>
            <div className=''>
              <Table striped>
                <thead className='table-dark'>
                  <tr>
                    <th>S.No</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Qty</th>
                    <th>Total</th>
                    <th>Image</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className='fw-bold'>
                  <span className='d-none'>
                    {totalqty = 0}
                    {totalprice = 0}
                  </span>
                  {
                    alldata?.map((data, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{data.name}</td>
                        <td>{data.price}</td>
                        <td>{data.category}</td>
                        <td>{data.qty}</td>
                        <td>{data.price * data.qty}</td>
                        <td>
                          <span className='d-none'>
                            {totalqty = totalqty + data.qty}
                            {totalprice = totalprice + data.price * data.qty}
                          </span>
                          <Col xs={6} md={4}>
                            <Image src={data.image} roundedCircle style={{ width: '50px', height: '50px', backgroundSize: '100% 100%' }} />
                          </Col>
                        </td>
                        <td onClick={() => orderDeleteHandler(data._id)}>
                          <span className='btn'>
                            <i className="fa-solid fa-trash-can fs-5"></i>
                          </span>
                        </td>
                      </tr>
                    ))
                  }
                  <tr className='table-primary'>
                    <td colSpan={4}>Total</td>
                    <td>{totalqty}</td>
                    <td colSpan={3}>{totalprice}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </> : <div className='d-flex justify-content-center align-item-center'>
          <img src='datanotfound.avif' alt='' className='mt-1 position absolute' onClick={() => navigate('/All')} />
        </div>
      }
    </>
  )
}

export default Order