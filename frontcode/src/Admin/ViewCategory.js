import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Collapse from 'react-bootstrap/Collapse';
import { useNavigate, useParams} from 'react-router-dom';
import { viewproductHandler } from './GetProduct';

import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

const ViewCategory = () => {
  const [data, setData] = useState();
  const [alldata, setAlldata] = useState();
  const [find, setFind] = useState();
  const params = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  let ind=1;

  const editHandler = async () => {
    const dt = await axios.get(`http://localhost:11000/category/${params.id}`);
    setData(dt?.data[0]);
    setFind(dt?.data[0].name);

    const product = await viewproductHandler();
    setAlldata(product);
  }
  useEffect(() => {
    editHandler();
  }, []);
  const openHandler = (data) => navigate(`/ViewProduct/${data}`);

  return (
    <div className="container mt-4">
      <div className=" bg-white p-2 p-md-5 mt-2" style={{
        borderRadius: '5px',
        boxShadow: '0px 0px 2px gray',
      }}>
        <Button
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
          className='bg-transparent'
          style={{
            border: 'none'
          }}
        >
          <Card className='m-auto'>
            <Card.Header as="h5">Category</Card.Header>
            <Card.Body>
              <Card.Title>{data?.name}</Card.Title>
              <Card.Text>
                {data?.discription}
              </Card.Text>
              <Button variant="dark me-2" onClick={() => navigate('/Categories')}>Close</Button>
              <Button variant="dark" >View Product</Button>
            </Card.Body>
          </Card>
        </Button>
        <Collapse in={open}>
          <div id="example-collapse-text">
          <div className='overflow-auto'>
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
                        alldata?.map((data)=>data?.showdata?.filter((dt)=> dt.category == find).map( (data,index) =>(
                              <tr style={{cursor:'pointer'}}>
                                <td onClick={ ()=> openHandler(data?._id)}>{ind++}</td>
                                <td onClick={ ()=> openHandler(data?._id)}>{data.name}</td>
                                <td onClick={ ()=> openHandler(data?._id)}>{data.price}</td>
                                <td onClick={ ()=> openHandler(data?._id)}>{data.qty}</td>
                                <td onClick={ ()=> openHandler(data?._id)}>{data.category}</td>
                                <td onClick={ ()=> openHandler(data?._id)}>{data.discription}</td>
                                <td onClick={ ()=> openHandler(data?._id)}>
                                    <Col xs={6} md={4}>
                                        <Image src={`/${data.image}`} roundedCircle style={{ width: '50px', height: '50px', backgroundSize: '100% 100%' }} />
                                    </Col></td>
                                <td>
                                    <NavDropdown id="navbarScrollingDropdown">
                                        <NavDropdown.Item href={`/ViewProduct/${data?._id}`} className='border-bottom'>View</NavDropdown.Item>
                                        <NavDropdown.Item href={`/EditProduct/${data?._id}`} className='border-bottom'>Edit</NavDropdown.Item>
                                        <NavDropdown.Item href={`/DeleteProduct/${data?._id}`}>Delete</NavDropdown.Item>
                                    </NavDropdown>
                                </td>
                            </tr>
                        )))
                    }
                </tbody>
            </Table>
            <div className='m-2 d-flex'>
                <Button variant="dark" className='m-auto'>
                    <Link to='/AddProduct' className='text-white text-decoration-none'>Add + </Link>
                </Button>
            </div>
        </div>
          </div>
        </Collapse>
      </div>
    </div>
  )
}
export default ViewCategory