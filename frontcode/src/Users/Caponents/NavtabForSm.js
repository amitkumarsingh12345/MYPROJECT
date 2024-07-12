import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Nav from 'react-bootstrap/Nav';

const stl = {
    backgroundColor: 'white'
}

const NavtabForSm = () => {
    const [category, setCategory] = useState();
    const categoryHandler = async () => {
        const data = await axios.get('http://localhost:11000/category');
        setCategory(data?.data);
    }
    useEffect(() => {
        categoryHandler();
    }, []);

    return (
        <div className='container-fluid mt-2 overflow-auto' style={stl}>
            <div className='row d-flex justify-content-space-evenly flex-nowrap overflow-auto'>
                <div className='col text-center'>
                        <Nav.Item>
                            <Nav.Link href="/All">
                                    <img src={`iics.png`} alt='' style={{ height: '50px', width: '50px' }} />
                                    <p>
                                        All
                                    </p>
                            </Nav.Link>
                        </Nav.Item>
                    </div>
                {
                    category?.map((data, index) => (
                        <div className='col pt-1'>
                            <Nav.Link href={`/${data.name}`} eventKey={`link-${index + 1}`}>
                                <img src={`${data.name}.avif`} alt='' style={{ height: '50px', width: '50px' }} />
                                <p className='mb-0'>
                                    {data.name}
                                </p>
                            </Nav.Link>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default NavtabForSm