import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link,useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { viewproductHandler } from './GetProduct';

const Products = () => {
    const [alldata, setAlldata] = useState();
    const navigate = useNavigate();
    let ind=1;

    useEffect(() => {
        let data = viewproductHandler();
        data = data.then( (dt) => setAlldata(dt));
    }, []);
     const openHandler = (data) => navigate(`/ViewProduct/${data}`);

    return (
        <div className='overflow-auto'>
            <div className='m-2 d-flex'>
                <Button variant="dark" className='m-auto'>
                    <Link to='/AddProduct' className='text-white text-decoration-none'>Add + </Link>
                </Button>
            </div>
            <Table striped>
                <thead className='table-dark'>
                    <tr>
                        <th>S.No</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Category</th>
                        <th>Discription</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        alldata?.map((data)=>data?.showdata?.map((data,index)=>(
                              <tr style={{cursor:'pointer'}}>
                                <td onClick={ ()=> openHandler(data?._id)}>{ind++}</td>
                                <td onClick={ ()=> openHandler(data?._id)}>{data.name}</td>
                                <td onClick={ ()=> openHandler(data?._id)}>{data.price}</td>
                                <td onClick={ ()=> openHandler(data?._id)}>{data.qty}</td>
                                <td onClick={ ()=> openHandler(data?._id)}>{data.category}</td>
                                <td onClick={ ()=> openHandler(data?._id)}>{data.discription}</td>
                                <td onClick={ ()=> openHandler(data?._id)}>
                                    <Col xs={6} md={4}>
                                        <Image src={data.image} roundedCircle style={{ width: '50px', height: '50px', backgroundSize: '100% 100%' }} />
                                    </Col>
                                    </td>
                                <td>
                                    <NavDropdown id="navbarScrollingDropdown">
                                        <NavDropdown.Item href={`/ViewProduct/${data?._id}`} className='border-bottom'><i className="fa-solid fa-street-view"></i>{" "}View</NavDropdown.Item>
                                        <NavDropdown.Item href={`/EditProduct/${data?._id}`} className='border-bottom'><i className="fa-solid fa-pen-to-square"></i>{" "}Edit</NavDropdown.Item>
                                        <NavDropdown.Item href={`/DeleteProduct/${data?._id}`}><i className="fa-solid fa-trash-can"></i>{" "}Delete</NavDropdown.Item>
                                    </NavDropdown>
                                </td>
                            </tr>
                        )))
                    }
                </tbody>
            </Table>
            <div className='bg-light text-dark position-fixed end-0 bottom-0 ' style={{
                borderRadius: '50%',
                zIndex: 1,
                cursor: 'pointer'
            }} onClick={() => window.scrollTo(100, 0)}>
                <i class="fa-solid fa-angle-up p-3 fs-4"></i>
            </div>
        </div>
    )
}

export default Products