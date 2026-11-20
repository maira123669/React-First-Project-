import {Routes,Route} from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Checkout,{OrderSuccess} from './pages/Checkout'
import {Wishlist,Orders,About,Contact} from './pages/AccountPages'
import {ShopProvider} from './context/ShopContext'
function NotFound(){return <div className="wrap empty-state"><h1>Page not found</h1><p>That page seems to have wandered off.</p><a className="btn btn-dark" href="/">Back home</a></div>}
export default function App(){return <ShopProvider><Routes><Route element={<Layout/>}><Route index element={<Home/>}/><Route path="shop" element={<Shop/>}/><Route path="product/:id" element={<Product/>}/><Route path="cart" element={<Cart/>}/><Route path="wishlist" element={<Wishlist/>}/><Route path="checkout" element={<Checkout/>}/><Route path="order-success" element={<OrderSuccess/>}/><Route path="orders" element={<Orders/>}/><Route path="about" element={<About/>}/><Route path="contact" element={<Contact/>}/><Route path="*" element={<NotFound/>}/></Route></Routes></ShopProvider>}