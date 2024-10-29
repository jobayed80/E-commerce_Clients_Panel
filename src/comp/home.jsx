
import React, { useEffect, useState } from 'react'
import './home.css'
import { Link } from 'react-router-dom'
import Homeproduct from './home_product'
import Extra from './extra'
import axios from 'axios';
import { AiFillEye, AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { BiLogoFacebook, BiLogoTwitter, BiLogoInstagram, BiLogoYoutube } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { Image } from 'antd';


const Home = ({ addtocart }) => {

  const navigate = useNavigate();
  const Swal = require('sweetalert2')

  const [productsAll, setProductsAll] = useState([]);
  // Fetch all products from the server
  useEffect(() => {
    const fetchProductsAll = async () => {
      try {
        const response = await axios.get('http://localhost:8081/products');
        setProductsAll(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProductsAll();
  }, []);



  // individual data for Clothing from database
  const [searchQuery, setSearchQuery] = useState('Clothing');
  const [products, setProducts] = useState([]);
  const fetchProducts = async (query = '') => {
    const res = await axios.get('http://localhost:8081/SearchProduct_Type', {
      params: { type: searchQuery }
    });
    setProducts(res.data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const [searchQueryTech, setSearchQueryTech] = useState('Tech Accessories');
  const [productsTech, setProductsTech] = useState([]);
  const fetchProductsTech = async (query = '') => {
    const res = await axios.get('http://localhost:8081/SearchProduct_Type', {
      params: { type: searchQueryTech }
    });
    setProductsTech(res.data);
  };
  useEffect(() => {
    fetchProductsTech();
  }, []);


  const [searchQueryShoes, setSearchQueryShoes] = useState('Shoes');
  const [productsShoes, setProductsShoes] = useState([]);
  const fetchProductsShoes = async (query = '') => {
    const res = await axios.get('http://localhost:8081/SearchProduct_Type', {
      params: { type: searchQueryShoes }
    });
    setProductsShoes(res.data);
  };

  useEffect(() => {
    fetchProductsShoes();
  }, []);

  const [searchQueryKids, setSearchQueryKids] = useState('Kids Fashion');
  const [productsKids, setProductsKids] = useState([]);
  const fetchProductsKids = async (query = '') => {
    const res = await axios.get('http://localhost:8081/SearchProduct_Type', {
      params: { type: searchQueryKids }
    });
    setProductsKids(res.data);
  };

  useEffect(() => {
    fetchProductsKids();
  }, []);

  const [searchQueryCosmetics, setSearchQueryCosmetics] = useState('Cosmetics');
  const [productsCosmetics, setProductsCosmetics] = useState([]);
  const fetchProductsCosmetics = async (query = '') => {
    const res = await axios.get('http://localhost:8081/SearchProduct_Type', {
      params: { type: searchQueryCosmetics }
    });
    setProductsCosmetics(res.data);
  };

  useEffect(() => {
    fetchProductsCosmetics();
  }, []);







  // Product category
  const [newProduct, setNewProduct] = useState([])
  const [featuredProduct, setFeaturdProduct] = useState([])
  const [topProduct, setTopProduct] = useState([])


  //Tranding Product
  const [trendingProduct, setTrendingProduct] = useState(Homeproduct)
  // Filter of tranding product
  const filtercate = (x) => {
    const filterproduct = Extra.filter((curElm) => {
      return curElm.type === x
    })
    setTrendingProduct(filterproduct)
  }

  //All Trending Product
  const allTrendingProduct = () => {
    setTrendingProduct(Homeproduct)
  }


  useEffect(() => {
    productcategory()
  })
  const productcategory = () => {
    // New Product
    const newcategory = Homeproduct.filter((x) => {
      return x.type === 'new'
    })
    setNewProduct(newcategory)

    // Featured Product
    const featuredcategory = Homeproduct.filter((x) => {
      return x.type === 'featured'
    })
    setFeaturdProduct(featuredcategory)

    // Top Product
    const topcategory = Homeproduct.filter((x) => {
      return x.type === 'top'
    })
    setTopProduct(topcategory)











  }

  return (
    <>
      <div className='home'>




        <div className='top_banner'>
          <div className='contant'>
            {/* <h3>silver aluminum</h3>
                <h2>Apple Watch</h2>
                <p>30% off at your first odder</p> */}
            <Link to='/shop' className='link'>Shop Now</Link>
          </div>
        </div>
        <div className='trending'>
          <div className='container'>
            <div className='left_box'>
              <div className='header'>
                <div className='heading'>
                  <h2 onClick={() => allTrendingProduct()}>trending product</h2>
                </div>
                <div className='cate'>
                  <h3 onClick={() => filtercate('new')}>New</h3>
                  <h3 onClick={() => filtercate('featured')}>Featured</h3>
                  <h3 onClick={() => filtercate('top')}>top selling</h3>
                </div>
              </div>
              <div className='products'>
                <div className='container'>
                  {
                    trendingProduct.map((curElm) => {
                      return (
                        <>
                          <div className='box'>
                            <div className='img_box'>
                              <Image
                               
                                src={curElm.image}
                              />
                              <img src={curElm.image} alt=''></img>
                              <div className='icon'>
                                <div className='icon_box'>
                                  <AiFillEye />
                                </div>
                                <div className='icon_box'>
                                  <AiFillHeart />
                                </div>
                              </div>
                            </div>
                            <div className='info'>
                              <h3>{curElm.Name}</h3>
                              <p>${curElm.price}</p>
                              <button className='btn' onClick={() => addtocart(curElm)}>Add to cart</button>

                            </div>
                          </div>
                        </>
                      )
                    })
                  }
                  {/* End all display data from Local */}

                  {/* Start all display data from database */}
                  {
                    productsAll.map((curElm) => {
                      return (
                        <>
                          <div className='box'>
                            <div className='img_box'>
                              <img
                                src={`data:${curElm.mime_type};base64,${curElm.image}`}
                                alt={curElm.Product_Name}
                                width="100"
                              />
                              <div className='icon'>
                                <div className='icon_box'>
                                  <AiFillEye />
                                </div>
                                <div className='icon_box'>
                                  <AiFillHeart />
                                </div>
                              </div>
                            </div>
                            <div className='info'>
                              <h3>{curElm.Product_Name}</h3>
                              <p>${curElm.Price}</p>
                              <button className='btn' onClick={() => addtocart(curElm)}>Add to cart</button>

                            </div>
                          </div>
                        </>
                      )
                    })
                  }
                  {/* End database all data display */}
                </div>
                <button>Show More</button>
              </div>
            </div>
            <div className='right_box'>
              <div className='right_container'>
                <div className='testimonial'>
                  <div className='head'>
                    <h3>our testmonial</h3>
                  </div>
                  <div className='detail'>
                    <div className='img_box'>
                      <img src='image/T1.avif' alt='testmonial'></img>
                    </div>
                    <div className='info'>
                      <h3>stephan robot</h3>
                      <h4>web designer</h4>
                      <p>Duis faucibus enim vitae nunc molestie, nec facilisis arcu pulvinar nullam mattisr nullam mattis.</p>
                    </div>
                  </div>
                </div>
                <div className='newsletter'>
                  <div className='head'>
                    <h3>newsletter</h3>
                  </div>
                  <div className='form'>
                    <p>join our malling list</p>
                    <input type='email' placeholder='E-mail' autoComplete='off'></input>
                    <button>subscribe</button>
                    <div className='icon_box'>
                      <div className='icon'>
                        <BiLogoFacebook />
                      </div>
                      <div className='icon'>
                        <BiLogoTwitter />
                      </div>
                      <div className='icon'>
                        <BiLogoInstagram />
                      </div>
                      <div className='icon'>
                        <BiLogoYoutube />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className='banners'>
          <div className='container'>
            <div className='left_box'>
              <div className='box'>
                <img src='image/both.jpg' alt='banner'></img>
              </div>
              <div className='box'>
                <img src='image/Multi-Banner-2.avif' alt='banner'></img>
              </div>
            </div>
            <div className='right_box'>
              <div className='top'>
                <img src='image/Multi-Banner-3.webp' alt=''></img>
                <img src='image/Multi-Banner-4.avif' alt=''></img>
              </div>
              <div className='bottom'>
                <img src='image/homeBanner.jpg' alt=''></img>
              </div>
            </div>
          </div>
        </div>

        <div className='product_type'>
          <div className='container'>
            <div style={{ height: "52vh" }} className='box'>
              <div className='header'>
                <h2>New Clothing</h2>
              </div>
              {
                products.map((curElm) => {
                  return (
                    <>
                      <div className='productbox'>
                        <div className='img-box'>
                          <img
                            src={`data:${curElm.mime_type};base64,${curElm.image}`}
                            alt={curElm.Product_Name}
                            width="100"
                          />
                        </div>
                        <div className='detail'>
                          <h3>{curElm.Product_Name}</h3>
                          <p>$ {curElm.Price}</p>
                          <div className='icon'>
                            <button><AiFillEye /></button>
                            <button><AiFillHeart /></button>
                            <button onClick={() => addtocart(curElm)}><AiOutlineShoppingCart /></button>
                          </div>
                        </div>
                      </div>
                    </>
                  )
                })
              }
            </div>
            <div className='box'>
              <div className='header'>
                <h2>Tech Accessories Product</h2>
              </div>
              {
                productsTech.map((curElm) => {
                  return (
                    <>
                      <div className='productbox'>
                        <div className='img-box'>
                          <img
                            src={`data:${curElm.mime_type};base64,${curElm.image}`}
                            alt={curElm.Product_Name}
                            width="100"
                          />
                        </div>
                        <div className='detail'>
                          <h3>{curElm.Product_Name}</h3>
                          <p>$ {curElm.Price}</p>
                          <div className='icon'>
                            <button><AiFillEye /></button>
                            <button><AiFillHeart /></button>
                            <button onClick={() => addtocart(curElm)}><AiOutlineShoppingCart /></button>
                          </div>
                        </div>
                      </div>
                    </>
                  )
                })
              }
            </div>
            <div className='box'>
              <div className='header'>
                <h2>Shoes Product</h2>
              </div>
              {
                productsShoes.map((curElm) => {
                  return (
                    <>
                      <div className='productbox'>
                        <div className='img-box'>
                          <img
                            src={`data:${curElm.mime_type};base64,${curElm.image}`}
                            alt={curElm.Product_Name}
                            width="100"
                          />
                        </div>
                        <div className='detail'>
                          <h3>{curElm.Product_Name}</h3>
                          <p>$ {curElm.Price}</p>
                          <div className='icon'>
                            <button><AiFillEye /></button>
                            <button><AiFillHeart /></button>
                            <button onClick={() => addtocart(curElm)}><AiOutlineShoppingCart /></button>
                          </div>
                        </div>
                      </div>
                    </>
                  )
                })
              }
            </div>

            <div className='box'>
              <div className='header'>
                <h2>Kids Fashion Product</h2>
              </div>
              {
                productsKids.map((curElm) => {
                  return (
                    <>
                      <div className='productbox'>
                        <div className='img-box'>
                          <img
                            src={`data:${curElm.mime_type};base64,${curElm.image}`}
                            alt={curElm.Product_Name}
                            width="100"
                          />
                        </div>
                        <div className='detail'>
                          <h3>{curElm.Product_Name}</h3>
                          <p>$ {curElm.Price}</p>
                          <div className='icon'>
                            <button><AiFillEye /></button>
                            <button><AiFillHeart /></button>
                            <button onClick={() => addtocart(curElm)}><AiOutlineShoppingCart /></button>
                          </div>
                        </div>
                      </div>
                    </>
                  )
                })
              }
            </div>

            <div className='box'>
              <div className='header'>
                <h2>Cosmetics Product</h2>
              </div>
              {
                productsCosmetics.map((curElm) => {
                  return (
                    <>
                      <div className='productbox'>
                        <div className='img-box'>
                          <img
                            src={`data:${curElm.mime_type};base64,${curElm.image}`}
                            alt={curElm.Product_Name}
                            width="100"
                          />
                        </div>
                        <div className='detail'>
                          <h3>{curElm.Product_Name}</h3>
                          <p>$ {curElm.Price}</p>
                          <div className='icon'>
                            <button><AiFillEye /></button>
                            <button><AiFillHeart /></button>
                            <button onClick={() => addtocart(curElm)}><AiOutlineShoppingCart /></button>
                          </div>
                        </div>
                      </div>
                    </>
                  )
                })
              }
            </div>



          </div>
        </div>
      </div>
    </>
  )
}

export default Home