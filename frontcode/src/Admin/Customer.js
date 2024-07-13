import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CgProfile } from "react-icons/cg";
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';

let totalqty = 0, totalprice = 0;
const Customer = () => {
    const [data, setData] = useState();
    const customerHandler = async () => {
        const cust = await axios.get('http://localhost:11000/order');
        setData(cust?.data);
    }
    useEffect(() => {
        customerHandler();
    }, [])

    return (
        <>
            <h4 style={{ textAlign: 'center' }}>All Customer</h4>
            <Accordion>
                {
                    data ? data.map((data, index) => (
                        <Accordion.Item eventKey={index}>
                            <Accordion.Header>
                                <div className='d-flex justify-content-center align-items-center text-primary fs-5'>
                                    <div className='me-md-5'>
                                        <CgProfile style={{
                                            display: 'inline-block',
                                            height: '50px',
                                            width: '50px'
                                        }} />
                                    </div>
                                    <div className='me-md-5'>
                                        {data.name}
                                    </div>
                                    <div className='me-md-5'>
                                        {data.email}
                                    </div>
                                    <div className='me-md-5'>
                                        {data.phone}
                                    </div>
                                </div>
                            </Accordion.Header>
                            <Accordion.Body>
                                <div className='overflow-auto p-md-3'>
                                    <Table striped className='m-auto mt-3'>
                                        <thead className='table-dark'>
                                            <tr>
                                                <th>S.No</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Qty</th>
                                                <th>Total</th>
                                                <th>Category</th>
                                                <th>Image</th>
                                                <th>Date</th>
                                                <th>Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            <span className='d-none'>
                                                {totalqty = 0}
                                                {totalprice = 0}
                                            </span>

                                            {data.showdata?.map((data, index) => (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{data.name}</td>
                                                    <td>{data.price}</td>
                                                    <td>{data.qty}</td>
                                                    <td>{data.price * data.qty}</td>
                                                    <td>{data.category}</td>
                                                    <td>
                                                        <span className='d-none'>
                                                            {totalqty = totalqty + data.qty}
                                                            {totalprice = totalprice + data.price * data.qty}
                                                        </span>
                                                        <img src={`${data.image}`} alt='' style={{
                                                            width: '50px',
                                                            height: '50px',
                                                            backgroundSize: '100% 100%',
                                                            borderRadius: '50%'
                                                        }} />
                                                    </td>
                                                    <td>{data.date}</td>
                                                    <td>{data.time}</td>
                                                </tr>
                                            ))}
                                            <tr className='table-primary'>
                                                <td colSpan={3}>Total</td>
                                                <td>{totalqty}</td>
                                                <td colSpan={5}>{totalprice}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    )) : <h3>User Not Found</h3>
                }
            </Accordion>
            <div className='bg-light text-dark position-fixed end-0 bottom-0 ' style={{
                borderRadius: '50%',
                zIndex: 1,
                cursor: 'pointer'
            }} onClick={() => window.scrollTo(100, 0)}>
                <i class="fa-solid fa-angle-up p-3 fs-4"></i>
            </div>
        </>
    )
}

export default Customer