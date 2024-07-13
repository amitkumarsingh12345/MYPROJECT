import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './App.css';

const Signup = () => {
  const [pass, setPass] = useState(false);
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    password: "",
    email: "",
    confirmpassword: "",
    phone: ""
  });

  const userHandler = event => {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  const submitHandler = async event => {
    event.preventDefault();
    if (user.confirmpassword == user.password) {
      const userexist = await axios.get(`http://localhost:11000/user/${user.email}`, user);
      if (userexist) {
        setAlert(true);
      } else {
        const data = await axios.post('http://localhost:11000/user', user);
        if (data) {
          navigate('/UserLogin');
        } 
      }
    } else {
      setPass(true);
    }
  }

  const cancelHandler = () => {
    navigate('/All');
  }

  return (
    <div className="container p-0">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <div className='container'>
          {
        alert ? <div className="alert alert-danger" role="alert">
          This Acount Already Exist? Please <Link to='/UserLogin' className="text-decoration-none fw-bold">Login</Link>
        </div> : ""
      }
            <form onSubmit={submitHandler} className=" bg-white p-2 p-md-5 mt-2" style={{
              borderRadius: '5px',
              boxShadow: '0px 0px 1px gray'
            }}>
              <div className='row'>
                <div className="col-12">
                  <label htmlFor="yourName" className="form-label">Your Name</label>
                  <input type="text" name="name"
                    value={user.name}
                    onChange={userHandler} className="form-control"
                    required="true"
                  />
                </div>
              </div>
              <div className='row'>
                <div className="col-12">
                  <label htmlFor="yourName" className="form-label">Your Email</label>
                  <input type="email" name="email"
                    value={user.email}
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
                    value={user.password}
                    onChange={userHandler}
                    className="form-control"
                    required="true"
                  />
                </div>
              </div>
              <div className='row'>
                <div className="col-12">
                  <label htmlFor="yourName" className="form-label">Confirm Password</label>
                  <input type="password" name="confirmpassword"
                    value={user.confirmpassword}
                    onChange={userHandler}
                    className="form-control"
                    required="true"
                  />
                  {pass ? <label htmlFor="yourName" className="form-label text-danger">Confirm Your Password!!</label> : ""}
                </div>
              </div>
              <div className='row'>
                <div className="col-12">
                  <label htmlFor="yourName" className="form-label">Your Phone</label>
                  <input type="number" name="phone"
                    value={user.phone}
                    onChange={userHandler}
                    className="form-control"
                    required="true"
                  />
                </div>
              </div>
              <div className='row mt-3'>
                <div className="col">
                  <button class="btn btn-success my-2 my-sm-0 me-1" type="submit">Create</button>
                  <button className="btn btn-danger my-2 my-sm-0" onClick={cancelHandler}>Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  )
}
export default Signup;