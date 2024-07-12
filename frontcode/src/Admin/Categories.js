import React, { useEffect, useState } from 'react'
import Category from './Categories'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

const Categories = () => {
  const [viewdata, setViewdata] = useState();
  const navigate = useNavigate();

  const viewHandler = async () => {
    const dt = await axios.get('http://localhost:11000/category');
    setViewdata(dt.data);
  }
  useEffect(() => {
    viewHandler();
  }, []);

  const openHandler = (data) => navigate(`/ViewCategory/${data}`);
  return (
    <div className='overflow-auto'>
      <div className='m-2 d-flex'>
        <Button variant="dark" className='m-auto'>
          <Link to='/AddCategory' className='text-white text-decoration-none'>Add + </Link>
        </Button>
      </div>
      <Table striped>
        <thead className='table-dark'>
          <tr>
            <th>S.No</th>
            <th>Category</th>
            <th>Discription</th>
            <th>View</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            viewdata?.map((data, index) => (
              <tr style={{cursor:'pointer'}}>
                <td onClick={ ()=> openHandler(data?._id)}>{index + 1}</td>
                <td onClick={ ()=> openHandler(data?._id)}>{data.name}</td>
                <td onClick={ ()=> openHandler(data?._id)}>{data.discription}</td>
                <td>
                  <Button variant="primary">
                    <Link to={`/ViewCategory/${data._id}`} className='text-decoration-none text-white'>
                      <i className="fa-solid fa-street-view"></i>
                    </Link>
                  </Button>
                </td>
                <td>
                  <Button variant="danger">
                    <Link to={`/EditCategory/${data._id}`} className='text-decoration-none text-white'>
                    <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                  </Button>
                </td>
                <td>
                  <Button variant="warning">
                    <Link to={`/DeleteCategory/${data._id}`} className='text-decoration-none text-white'>
                    <i className="fa-solid fa-trash-can"></i>
                    </Link>
                  </Button>
                </td>
              </tr>
            ))
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

export default Categories