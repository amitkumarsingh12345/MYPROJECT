import Carousel from 'react-bootstrap/Carousel';

function Carousels() {
    return (
        <Carousel data-bs-theme="white">
            <Carousel.Item className='h-25' style={{ height: '200px' }}>
                <img
                    className="d-block w-100"
                    src="https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/77e402bbfdae0e68.jpg?q=20"
                    alt="First slide"
                    style={{ height: '200px' }}
                />
                {/* <Carousel.Caption className='text-white'>
                    <h5>Cart Management System</h5>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption> */}
            </Carousel.Item>
            <Carousel.Item className='h-25' style={{ height: '200px' }}>
                <img
                    className="d-block w-100"
                    src="https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/919fce212dd25e83.jpg?q=20
"
                    alt="First slide"
                    style={{ height: '200px' }}
                />
                {/* <Carousel.Caption className='text-white'>
                    <h5>Cart Management System</h5>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption> */}
            </Carousel.Item>
            <Carousel.Item style={{ height: '200px' }}>
                <img
                    className="d-block w-100"
                    src="https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/bf42fbdd3d37c8c3.jpg?q=20"
                    alt="Second slide"
                    style={{ height: '200px' }}
                />
                {/* <Carousel.Caption >
                    <h5>Cart Management System</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption> */}
            </Carousel.Item>
            <Carousel.Item style={{ height: '200px' }}>
                <img
                    className="d-block w-100"
                    src="https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/9384b37a848c5e60.jpg?q=20"
                    alt="Third slide"
                    style={{ height: '200px' }}
                />
                <Carousel.Caption className='text-light'>
                    {/* <h5>Cart Management System</h5>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p> */}
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default Carousels;