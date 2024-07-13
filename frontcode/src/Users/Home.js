import React, { useEffect, useState } from 'react'
import './App.css';
import Carousels from './Caponents/Carousels';
import Cards from './Caponents/Cards';
import Nabtab from './Caponents/Nabtab';
import { useNavigate, useParams } from 'react-router-dom';
import Groupbtn from './Caponents/Groupbtn';
import NavtabForSm from './Caponents/NavtabForSm';
import { viewproductHandler } from '../Admin/GetProduct';
import Footer from './Caponents/Footer';


const Home = (props) => {
    const [allproduct, setAllproduct] = useState();
    const params = useParams();
    const user = localStorage.getItem('user');
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('admin');
    }, [])
    const productHandler = async () => {
        let data = await viewproductHandler();

        if (params.id && params.id != 'All') {
            data = data?.map((data) => data?.showdata?.filter((dt) => (((dt.category.toLowerCase()).indexOf((params.id.toLowerCase())) > -1) || ((dt.name.toLowerCase()).indexOf((params.id.toLowerCase())) > -1))));
            setAllproduct(data);
        } else {
            data = data?.map((data) => data?.showdata?.filter((dt) => dt.category != params.id));
            setAllproduct(data);
        }
    }
    useEffect(() => {
        productHandler();
    }, []);

    return (
        <>
            <div className='d-none '>
                <Nabtab />
            </div>
            <div className='d-block'>
                <NavtabForSm />
            </div>
            <Groupbtn />
            <div className='container-fluid mt-3'>
                <div className='row'>
                    <div className='col'>
                        <Carousels />
                    </div>
                </div>
            </div>{console.log(allproduct)}
            <div className='container-fluid ' style={{ boxShadow: '0px 0px 10px white' }}>
                <div className='row justify-content-space-evenly justify-content-sm-center d-flex flex-direction-column my-2'>
                    {
                        allproduct ? allproduct?.map((data) => data?.map((dt) => (
                            <div className='d-flex justify-content-center col-sm-6 col-md-4 col-lg-3 col-xl-2 my-2' >
                                <Cards props={dt} />
                            </div>
                        ))) : <div className='d-flex justify-content-center'>
                            <img src='datanotfound.avif' height={200} width={200} alt='' />
                        </div>
                    }
                </div>
            </div>
            <div className='bg-light text-dark position-fixed end-0 bottom-0 ' style={{
                borderRadius: '50%',
                zIndex: 1,
                cursor: 'pointer'
            }} onClick={() => window.scrollTo(100, 0)}>
                <i class="fa-solid fa-angle-up p-3 fs-4"></i>
            </div>

            {/* Footer Code */}

           <Footer/>
        </>
    )
}

export default Home