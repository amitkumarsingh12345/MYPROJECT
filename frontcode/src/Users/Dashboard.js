import 'bootstrap/dist/css/bootstrap.min.css';  
import { Button, Container, Offcanvas } from 'react-bootstrap';  
import {useState} from 'react'  
function Dashboard() {  
  const [show, setShow] = useState(true);  
  const closeSidebar = () => setShow(false);  
  
  return (  
    <>  
    <Container className='p-4'>  
      <Button variant="primary">  
        Launch Sidebar  
      </Button>  
      <Offcanvas backdrop='false' show={show} onHide={closeSidebar}>  
        <Offcanvas.Header closeButton>  
          <Offcanvas.Title>Sidebar Title</Offcanvas.Title>  
        </Offcanvas.Header>  
        <Offcanvas.Body className='mt-0 mb-0'>  
          In this OffCanvas backdrop will not work.  
        </Offcanvas.Body>  
        <Offcanvas.Body>  
          In this OffCanvas backdrop will not work.  
        </Offcanvas.Body>  
        <Offcanvas.Body>  
          In this OffCanvas backdrop will not work.  
        </Offcanvas.Body>  
      </Offcanvas>  
      </Container>  
    </>  
  );  
}  
export default Dashboard;  