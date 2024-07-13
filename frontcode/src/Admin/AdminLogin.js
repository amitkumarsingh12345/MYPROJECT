import React, { useEffect, useState } from 'react'
import '../Users/App.css'
import axios from 'axios'
import { NavLink, Navigate, useNavigate, useSearchParams } from 'react-router-dom'

const AdminLogin = () => {
    const [alert, setAlert] = useState(false);
    const [warning, setWarning] = useState(0);
    const [change, setChange] = useState(false);
    const [wait, setWait] = useState(false);

    const [admin, setAdmin] = useState({
        name: "",
        password: ""
    });
    const [forget, setForget] = useState({
        name: "",
        password: ""
    });

    const changeHandler = event => {
        setForget({ ...forget, [event.target.name]: event.target.value });
    }
    const forgetHandler = async () => {
        const data = await axios.put('http://localhost:11000/admin', forget);
        console.log(data.data.Massage);
        if (data.data.Massage == 'Data Modified!!') {
            setChange(true);
        }
    }

    //--------------------------------*----------*--------------------------------------
    const navigate = useNavigate();
    const userHandler = (event) => {
        setAdmin({ ...admin, [event.target.name]: event.target.value });
    }

    const loginHandler = async (event) => {
        event.preventDefault();
        if (warning == 2) {
            setWait(true);
            setAlert(false);
            window.setTimeout(() => {
                setWarning(0);
                setWait(false);
            }, 20000);
        } else {
            const data = await axios.post('http://localhost:11000/adminlogin', admin);
            if (data?.data.name == admin.name && data?.data.password == admin.password) {
                localStorage.setItem('admin', JSON.stringify(data?.data?.name));
                navigate('/Products');
                setAlert(false);
            } else {
                setAlert(true);
                setWarning(warning + 1);
            }
        }
    }

    const cancelHandler = () => {
        navigate('/All');
    }

    return (
        <>
            <div className='w-75 w-md-50 container-fluid bg-white p-3 p-md-4 mt-3' style={{
                borderRadius: '5px',
                boxShadow: '0px 0px 1px gray'
            }}>
                <div className='d-flex justify-content-center'>
                    <img src="/iics.png" alt="..."></img>
                </div>
                <div className='d-flex justify-content-center'>
                    <span>Admin Panel</span>
                </div>
                <div className='container w-sm-75 w-lg-50 p-3' style={{ boxShadow: '0px 0px 2px warning' }}>
                    {wait ? <div className="alert alert-danger text-danger fw-bold" role="alert">
                        You are blocked for [2] minutes.
                    </div> : ""}

                    {alert ? <div className="alert alert-danger" role="alert">
                        This Acount not exist.<b className='text-danger'> Warning {" "}[{warning}]</b> {" "} for new acount.
                    </div> : ""
                    }

                    {
                        change ? <div className="alert alert-primary" role="alert">
                            Password updated & new password [{forget.password}]
                        </div> : ""
                    }

                    <form onSubmit={loginHandler}>
                        <div className='row'>
                            <div className="col-12">
                                <label htmlFor="yourName" className="form-label">Admin name</label>
                                <input type="text" name="name"
                                    value={admin.name}
                                    onChange={userHandler}
                                    className="form-control"
                                    required="true"
                                />
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-12">
                                <label htmlFor="yourName" className="form-label">Your Password</label>
                                <input type="password" name="password"
                                    value={admin.password}
                                    onChange={userHandler}
                                    className="form-control"
                                    required="true"
                                />


                                <div className="col">
                                    <NavLink to="/Signup" className='text-decoration-none' data-bs-toggle="modal" data-bs-target="#exampleModal">Forget password</NavLink>
                                    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLabel">Change Password</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <div className="mb-3">
                                                        <label for="exampleFormControlInput1" className="form-label">Admin name</label>
                                                        <input type="text" className="form-control" value={forget.name}
                                                            name="name"
                                                            onChange={changeHandler}
                                                            id="exampleFormControlInput1"
                                                            placeholder="name@example"
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label for="exampleFormControlInput1" className="form-label">New password</label>
                                                        <input type="password" className="form-control"
                                                            value={forget.password}
                                                            name="password"
                                                            onChange={changeHandler}
                                                            id="exampleFormControlInput1"
                                                            placeholder="newpassword@example"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="button" className="btn btn-primary" onClick={forgetHandler} data-bs-dismiss="modal">Save changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row mt-3'>
                            <div className="col">
                                <button className="btn btn-danger me-1 my-sm-0" onClick={cancelHandler}>Cancel</button>
                                <button type="submit" class="btn btn-success my-2 my-sm-0">Login</button>
                            </div>
                        </div>
                    </form>
                </div >
            </div >
        </>
    )
}

export default AdminLogin