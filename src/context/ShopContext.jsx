import { createContext, useContext, useEffect, useMemo, useState } from 'react'
const ShopContext = createContext(null)
const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback } }
export function ShopProvider({children}) {
  const [cart,setCart] = useState(()=>read('ss-cart',[]))
  const [wishlist,setWishlist] = useState(()=>read('ss-wishlist',[]))
  const [orders,setOrders] = useState(()=>read('ss-orders',[]))
  useEffect(()=>localStorage.setItem('ss-cart',JSON.stringify(cart)),[cart])
  useEffect(()=>localStorage.setItem('ss-wishlist',JSON.stringify(wishlist)),[wishlist])
  useEffect(()=>localStorage.setItem('ss-orders',JSON.stringify(orders)),[orders])
  const addToCart = (product, qty=1) => setCart(old=>{const found=old.find(x=>x.id===product.id);return found?old.map(x=>x.id===product.id?{...x,qty:x.qty+qty}:x):[...old,{...product,qty}]})
  const updateQty = (id,qty)=>setCart(old=>qty<1?old.filter(x=>x.id!==id):old.map(x=>x.id===id?{...x,qty}:x))
  const removeFromCart = id=>setCart(old=>old.filter(x=>x.id!==id))
  const toggleWishlist = product=>setWishlist(old=>old.some(x=>x.id===product.id)?old.filter(x=>x.id!==product.id):[...old,product])
  const placeOrder = details => { const order={id:'SS'+Date.now().toString().slice(-8),date:new Date().toLocaleDateString(),items:cart,details,total:cart.reduce((s,x)=>s+x.price*x.qty,0)};setOrders(old=>[order,...old]);setCart([]);return order }
  const count = cart.reduce((s,x)=>s+x.qty,0)
  const total = cart.reduce((s,x)=>s+x.price*x.qty,0)
  const value=useMemo(()=>({cart,wishlist,orders,count,total,addToCart,updateQty,removeFromCart,toggleWishlist,placeOrder}),[cart,wishlist,orders,count,total])
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}
export const useShop=()=>useContext(ShopContext)