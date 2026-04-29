import axios from "axios";
const API = `http://localhost:5000/api/cart`;

export async function addToCartAPI(productId ,token){
    const res = await axios.post(
        `${API}/addToCart`,
        {
            productId,
            quantity:1

        },
        {headers:{  Authorization :`Bearer ${token}`}}
    )
return res.data;
}