import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const [data, setData] = useState();
    const navigate = useNavigate("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [qty, setQty] = useState("");
    const [discription, setDiscription] = useState("");

    const categoryHandler = async () => {
        let dt = await axios.get('http://localhost:11000/category');
        setData(dt?.data);
    }

    useEffect(() => {
        categoryHandler();
    }, []);

    const addHandler = async event => {
        event.preventDefault();
        console.log(image);
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('image', image);
        formData.append('qty', qty);
        formData.append('discription', discription);

        let result = await axios.post('http://localhost:11000/product', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        navigate('/Products');
    }

    const cancelHandler = () => {
        navigate('/Products');
    }

    return (
        <div className="container p-0">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <div className='container'>
                        <form onSubmit={addHandler} method="" className=" bg-white p-2 p-md-5 mt-2" style={{
                            borderRadius: '5px',
                            boxShadow: '0px 0px 2px gray',
                        }}>
                            <div className='row'>
                                <div className="col-12">
                                    <label htmlFor="yourName" className="form-label">Product name</label>
                                    <input type="text" name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)} className="form-control"
                                        required="true"
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-12">
                                    <label htmlFor="yourName" className="form-label">Product price</label>
                                    <input type="text" name="price"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        className="form-control"
                                        required="true"
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-12">
                                    <label htmlFor="yourName" className="form-label">Product category</label>
                                    <select class="form-select" aria-label="Default select example" onChange={(e) => setCategory(e.target.value)}>
                                        <option selected required="true">Open this select menu</option>
                                        {
                                            data?.map((data, index) => <option value={data.name}>{data.name}</option>)
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-12">
                                    <label htmlFor="yourName" className="form-label">Product image</label>
                                    <input type="file" name="image"
                                        onChange={(event) => setImage(event.target.files[0])}
                                        className="form-control"
                                        required="true"
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-12">
                                    <label htmlFor="yourName" className="form-label">Product qty</label>
                                    <input type="number" name="qty"
                                        value={qty}
                                        onChange={(e) => setQty(e.target.value)}
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-12">
                                    <label htmlFor="yourName" className="form-label">Product discription</label>
                                    <input type="text" name="discription"
                                        value={discription}
                                        onChange={(e) => setDiscription(e.target.value)}
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
export default AddProduct;