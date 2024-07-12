import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';

function Acordian({ data }) {
    const [qt, setQt] = useState(1);
    const [order, setOrder] = useState();
    const email = localStorage.getItem('user');
    const navigate = useNavigate();

    const orderHandler = (...prop) => {
        const qt = localStorage.getItem('qt');
        const prod = qt ? parseInt(qt) + 1 : 1;
        setQt(prod);

        const orders = {
            name: prop[0],
            price: prop[2],
            category: prop[1],
            email: email,
            qty: 1,
            image: prop[3],
        };

        let arr = [];
        if (prod == 1) {
            arr.push(orders);
            localStorage.setItem('qt', prod);
        } else {
            const data = JSON.parse(localStorage.getItem('order'));
            const filtered = data?.filter((dt) => dt.name == prop[0]);
            console.log(filtered);
            if (filtered.length > 0) {
                filtered[0].qty = (filtered[0].qty + 1);
                arr.push(...data);
                localStorage.setItem('qt', prod - 1);
            } else {
                arr.push(...data, orders);
                localStorage.setItem('qt', prod);
            }
        }
        setOrder(arr);
       navigate();
    }

    return (
        <div>
            {order ? localStorage.setItem('order', JSON.stringify(order)) : ""}
            <div className='fs-10 fw-bold' style={{ lineHeight: '1px' }}>
                <p>Name :{data.name}</p>
                <p>From <i class="fa-solid fa-indian-rupee-sign"></i>{' '}{data.price}</p>
            </div>
            <div className='d-flex justify-content-evenly'>
                <div className='me-1'>
                    <button className='btn btn-warning btn-sm' onClick={() => orderHandler(data.name, data.category, data.price, data.image)}>
                        Add to Cart
                    </button>
                </div>
                <div className=''>
                    <Nav.Link href={`/AddToCart/${JSON.stringify(data)}`} className="">
                        <button className='btn btn-warning btn-sm'>Buy now</button>
                    </Nav.Link>

                </div>
            </div>
        </div>
    );
}

export default Acordian;