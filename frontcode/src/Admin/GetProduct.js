import axios from "axios";

export const viewproductHandler = async () => {
    let data = await axios.get('http://localhost:11000/product');
    data = data?.data;
    return data;
}
