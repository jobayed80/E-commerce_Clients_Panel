import React, { useState , useEffect} from 'react'
import Nav from './comp/nav'
import {BrowserRouter} from 'react-router-dom'
import Rout from './comp/rout'
import Footer from './comp/footer'
import Homeproduct from './comp/home_product'
import './index.css'
const App = () => {


  // Add To cart
  const [cart, setCart] = useState([])
  const Swal = require('sweetalert2')





  //Shop Page product
  const [shop, setShop] = useState(Homeproduct)
    //Shop Search Filter
  const [search, setSearch] = useState('')
  //Shop category filter
  const Filter = (x) =>
  {
    const catefilter = Homeproduct.filter((product) => 
    {
      return product.cat === x 
    })
    setShop(catefilter)
  }
  const allcatefilter = () =>
  {
    setShop(Homeproduct)
  }
  //Shop Search Filter
  const searchlength = (search || []).length === 0
  const searchproduct = () =>
  {
  if(searchlength)
  {
    alert("Please Search Something !")
    setShop(Homeproduct)
  }
  else
  {
    
      const searchfilter = Homeproduct.filter((x) => 
      {
        return x.cat === search
      })
      setShop(searchfilter)
  }
}
  //Add To cart
  const addtocart = (product) =>
  {
    const exist = cart.find((x) => {
      return x.id === product.id
    })
    if(exist)
    {
      alert("This product is alleardy added in cart")
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "This product is alleardy added in cart!",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    }
    else
    { 
      setCart([...cart, {...product, qty:1}])
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Added to cart successfully"
      });
      console.log("Jobayed kire"+product.Price)
    }
  }

  


   
  return (
    <>
    <BrowserRouter>
    <Nav search={search} setSearch={setSearch} searchproduct={searchproduct}/>
    <Rout setCart={setCart} cart={cart} shop={shop} Filter={Filter} allcatefilter={allcatefilter} addtocart={addtocart}/>
    <Footer />
    </BrowserRouter>
    </>
  )
}

export default App
