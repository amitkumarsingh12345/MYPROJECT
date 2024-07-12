import React, { useEffect, useState } from 'react'
import Category from './Categories'
import { Form, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditCategory = () => {
  const navigate = useNavigate();
  const [findcat, setFindcat] = useState(false);
  const params = useParams();
  const [data, setData] = useState({
    name: "",
    discription: ""
  });

  const findHandler = async (event) => {
    const dt = await axios.get(`http://localhost:11000/category/${params.id}`);
    setData({
      name: dt?.data[0]?.name,
      discription: dt?.data[0]?.discription
    });
    console.log(data);
  }

  useEffect(() => {
    findHandler();
  }, []);

  const dataHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  }

  const addHandler = async (event) => {
    event.preventDefault();
    let check = await axios.get(`http://localhost:11000/category`);
    check = check?.data?.filter((check) => (check.name.toLowerCase() == data.name.toLowerCase()));

    if (check.length > 0 && params.id != check[0]?._id) {
      setFindcat(true);
    } else {
      const dt = await axios.put(`http://localhost:11000/category/${params.id}`, data);
      navigate('/Categories');
    }
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Category Form</h2>
      {
        findcat ? <div className="alert alert-danger" role="alert">
          This category already exist? Please choose another category.
        </div> : ""
      }
      <Form onSubmit={addHandler} className=" bg-white p-2 p-md-5 mt-2" style={{
        borderRadius: '5px',
        boxShadow: '0px 0px 2px gray',
      }}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formCategoryName">
            <Form.Label>Category Name</Form.Label>
            <Form.Control type="text" placeholder="Enter category name" required="true" name="name" value={data.name} onChange={dataHandler} />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Enter description" required="true" name="discription" value={data.discription} onChange={dataHandler} />
          </Form.Group>
        </Row>

        <div className="text-center">
          <Button variant="success" type="submit">
            Update
          </Button>{'   '}
          <Button variant="danger" type="button" onClick={() => navigate('/Categories')}>
            Cancel
          </Button>
        </div>
      </Form>
    </div>

  );
}
export default EditCategory