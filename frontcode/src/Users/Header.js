import { useNavigate, useSearchParams } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './App.css';
import { useState } from "react";



const Header = () => {
   const navigate = useNavigate();
   const auth = localStorage.getItem("user");
   const admin = localStorage.getItem('admin');
   const [search, setSearch] = useState("");

   const Logout = () => {
      localStorage.removeItem("user");
      localStorage.removeItem("admin");
      localStorage.removeItem("qt");
      localStorage.removeItem("order");
      localStorage.removeItem("username");
      navigate('/All');
   }
   return (
      <Navbar expand="lg" className="bg-white position-sticky top-0"  style={{zIndex:1}}>
         <Container fluid>
            <Navbar.Brand href="#">Cart Management System</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
               {
                  auth ? <Nav
                     className="ms-auto my-2 my-lg-0 font-weight-bold"
                     style={{ maxHeight: '120px' }}
                     navbarScroll
                  >
                     <Nav.Link href="/"></Nav.Link>
                     <Nav.Link href="/Cart" className="me-1">
                        <span style={{ position: 'relative', top: '-18px', left: '16px', color: 'red', fontFamily: 'monospace' }}>{localStorage.getItem('qt')}</span>
                        <i className="fa-solid fa-cart-arrow-down" style={{ fontSize: '20px' }} ></i>
                     </Nav.Link>
                     <Nav.Link href="/Order">Order</Nav.Link>
                     <Nav.Link onClick={Logout} href="/Logout">Logout</Nav.Link>{' '}
                     <Nav.Link href="#">({JSON.parse(localStorage.getItem('username'))})</Nav.Link>
                  </Nav> :
                     <Nav
                        className="me-auto my-2 my-lg-0 font-weight-bold"
                        style={{ maxHeight: '120px' }}
                        navbarScroll
                     >
                        {admin ? <><Nav.Link href="/Products">Product</Nav.Link>
                           <Nav.Link href="/Categories">Category</Nav.Link>
                           <Nav.Link href="/Customer">Customer</Nav.Link>
                           <Nav.Link onClick={Logout} href="/Logout">Logout</Nav.Link></> : <>
                           <Nav.Link href="/Signup">Signup</Nav.Link>
                           <NavDropdown title="Login" id="navbarScrollingDropdown">
                              <NavDropdown.Item href="/AdminLogin">Admin Login</NavDropdown.Item>
                              <NavDropdown.Item href="/UserLogin">User Login</NavDropdown.Item>
                           </NavDropdown>

                           <Nav.Link href="/Cart">
                              <span style={{ position: 'relative', top: '-18px', left: '626px', color: 'red', fontFamily: 'monospace' }}>{localStorage.getItem('qt')}</span>
                              <i className="fa-solid fa-cart-arrow-down" style={{ fontSize: '20px', marginLeft: '610px' }} ></i>
                           </Nav.Link>
                        </>}
                     </Nav>
               }
               <Form className="d-flex">
                  <Form.Control
                     type="search"
                     placeholder="Search"
                     className="me-2"
                     aria-label="Search"
                     value={search}
                     onChange={(e) => setSearch(e.target.value)}
                  />
                  <Nav.Link href={`/${search}`}>
                    <Button className="text-dark" variant="outline-light" >Search</Button>
                  </Nav.Link>
               </Form>
            </Navbar.Collapse>
         </Container>
      </Navbar>

   )
}
export default Header
