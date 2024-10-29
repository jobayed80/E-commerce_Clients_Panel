
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './about.css'
import { useNavigate } from 'react-router-dom';


const About = ({ setCartJo, cartJo }) => {

    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);

    // const [images, setImages] = useState([]);
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

    const handleSelectProduct = (product) => {
        setSelectedProducts(prev => [...prev, product]);
    };

    const handleAddToCart = () => {
        setCartJo(selectedProducts);
        navigate('/cart'); // Navigate to Cart after adding
    };




    return (
        <>
            <div >
                <h2>Products</h2>
                <ul className='about'>
                    {products.map(product => (
                        <li key={product.id}>
                           {product.Id} / {product.Product_Name} - ${product.Price}
                            <img
                                src={`data:${product.mime_type};base64,${product.image}`}
                                alt={product.product_name}
                                width="100"
                            />


                            <button onClick={() => handleSelectProduct(product)}>Select</button>

                        </li>
                    ))}
                </ul>
                <button onClick={handleAddToCart}>Add to Cart</button>
            </div>

        </>
    )
}

export default About