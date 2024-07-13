import React, { useState } from 'react'
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import axios, { all } from 'axios';

let totalqty = 0, totalprice = 0;
let n = 0;
const Cart = () => {
    const data = JSON.parse(localStorage.getItem('order'));
    const [alldata, setAlldata] = useState(data);
    const [alert, setAlert] = useState(false);
    const navigate = useNavigate();

    let dt = JSON.parse(JSON.stringify(data));
    const qtyAddHandler = (index) => {
        const text = document.querySelectorAll('.q')[index].innerHTML;
        const qt = parseInt(text) + 1;
        document.querySelectorAll('.q')[index].innerHTML = qt;
        dt[index].qty = qt;
        localStorage.setItem('order', JSON.stringify(dt));
        setAlldata(dt);
    };

    const qtySubHandler = (index) => {
        const text = document.querySelectorAll('.q')[index].innerHTML;
        if (parseInt(text) > 1) {
            const qt = parseInt(text) - 1;
            document.querySelectorAll('.q')[index].innerHTML = qt;
            dt[index].qty = qt;
            localStorage.setItem('order', JSON.stringify(dt));
            setAlldata(dt);
        }
    };


    const orderHandler = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            dt.map(async (data) => await axios.post('http://localhost:11000/order', { ...data, useremail: user }))
            localStorage.removeItem('qt');
            setAlert(true);
            localStorage.removeItem('order');
            navigate('/Order');
        } else {
            navigate('/UserLogin');
        }
    }

    const deleteCartHandler = (index) => {
        let data = JSON.parse(localStorage.getItem('order'));
        data = data.filter((dt, i) => i != index);
        setAlldata(data);
        localStorage.setItem('order', JSON.stringify(data));
        let qnt = JSON.parse(localStorage.getItem('qt'));
        qnt = qnt - 1;
        localStorage.setItem('qt', JSON.stringify(qnt));
        navigate();
    }

    return (
        <>
            {
                alldata?.length > 0 ? <>
                    <div className='flex-column justify-content-center overflow-auto w-75 m-auto mt-2'>
                        {alert ? <div className="alert alert-success" role="alert">
                            Congratulation {JSON.parse(localStorage.getItem('username'))} !!! Your order successfully!!
                        </div> : ""
                        }

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
                                        <th>Delete</th>
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
                                                <td className='q'>{data.qty}</td>
                                                <td>{data.price * data.qty}</td>
                                                <span className='d-none'>
                                                    {totalqty = totalqty + data.qty}
                                                    {totalprice = totalprice + data.price * data.qty}
                                                </span>
                                                <td>
                                                    <Col xs={6} md={4}>
                                                        <Image src={data.image} roundedCircle style={{ width: '50px', height: '50px', backgroundSize: '100% 100%' }} />
                                                    </Col>
                                                </td>
                                                <td>
                                                    <div class="ms-3 btn-group btn-group-sm" role="group" >
                                                        <input type="button" value="-" class="btn btn-outline-secondary btn-secondary text-white ms-5" id='plus' onClick={() => qtySubHandler(index)} />
                                                        <input type="button" value="+" class="btn btn-outline-primary btn-primary text-white" id='plus' onClick={() => qtyAddHandler(index)} />
                                                    </div>
                                                </td>
                                                <td onClick={() => deleteCartHandler(index)}>
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
                                        <td colSpan={4}>{totalprice}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                        <div >
                            <button className='btn btn-warning me-2' onClick={orderHandler}>Placed Order</button>
                            <button className='btn btn-dark' onClick={() => navigate('/All')}>Cancel</button>
                        </div>
                    </div>
                </> : <div className='d-flex justify-content-center align-item-center'>
                    <img src='datanotfound.avif' alt='' className='mt-1 position absolute' onClick={() => navigate('/All')} />
                </div>
            }
        </>
    )
}

export default Cart