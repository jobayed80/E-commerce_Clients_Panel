import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Home from './home';
const Extra = () => {

    const [products, setProducts] = useState([]);
    const [images, setImages] = useState([]);
    // Fetch all products from the server
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8081/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);



    return (
        <div>


            <div>
                <h2>Products</h2>
                
                 <ul>
                    {products.map(product => (
                        <li key={product.Id}>
                            <h3>{product.Product_Name}</h3>
                            <p>Type: {product.Type}</p>
                            <p>Price: ${product.Price}</p>
                            <h2>Images</h2>
                            <img
                                src={`data:${product.mime_type};base64,${product.image}`}
                                alt={product.product_name}
                                width="100"
                            />
                        </li>
                    ))}
                </ul> 
            </div>





        </div>
    )
}

export default Extra