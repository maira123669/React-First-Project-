import {useState} from 'react'
import {Link,NavLink,Outlet} from 'react-router-dom'
import {ShoppingBag,Heart,Menu,X,Search,Instagram,Facebook,Twitter} from 'lucide-react'
import {useShop} from '../context/ShopContext'
export default function Layout(){
 const {count,wishlist}=useShop(); const [open,setOpen]=useState(false)
 const nav=[['Home','/'],['Shop','/shop'],['About','/about'],['Contact','/contact']]
 return <><div className="announcement">Complimentary delivery on orders over Rs. 10,000 <span>·</span> Thoughtful finds, delivered to you</div>
 <header className="header"><Link to="/" className="brand" onClick={()=>setOpen(false)}><span className="brand-mark">S</span>shop<span>sphere</span><i>.</i></Link>
 <nav className={open?'nav open':'nav'}>{nav.map(([n,p])=><NavLink key={p} to={p} onClick={()=>setOpen(false)}>{n}</NavLink>)}</nav>
 <div className="header-actions"><Link aria-label="Wishlist" to="/wishlist" className="icon-link"><Heart size={20}/><b>{wishlist.length}</b></Link><Link aria-label="Shopping bag" to="/cart" className="icon-link bag-link"><ShoppingBag size={20}/><b>{count}</b></Link><button className="mobile-menu" onClick={()=>setOpen(!open)} aria-label="Toggle menu">{open?<X/>:<Menu/>}</button></div></header>
 <main><Outlet/></main>
 <footer className="footer"><div className="footer-main"><div><Link to="/" className="brand footer-brand"><span className="brand-mark">S</span>shop<span>sphere</span><i>.</i></Link><p>Good things for everyday living. Discover thoughtful finds for every part of your life.</p><div className="socials"><a href="#instagram" aria-label="Instagram"><Instagram/></a><a href="#facebook" aria-label="Facebook"><Facebook/></a><a href="#twitter" aria-label="Twitter"><Twitter/></a></div></div><div><h4>Explore</h4><Link to="/shop">Shop all</Link><Link to="/shop?category=Electronics">Electronics</Link><Link to="/shop?category=Fashion">Fashion</Link><Link to="/wishlist">Wishlist</Link></div><div><h4>Help</h4><Link to="/contact">Contact us</Link><Link to="/orders">Your orders</Link><Link to="/about">About ShopSphere</Link></div><div><h4>Stay in the loop</h4><p>New finds and good offers, occasionally.</p><form className="newsletter" onSubmit={e=>{e.preventDefault();alert('Thank you for subscribing!')}}><input type="email" required placeholder="Your email address"/><button>Join</button></form></div></div><div className="footer-bottom"><span>© 2026 ShopSphere. All rights reserved.</span><span>Made for better everyday shopping.</span></div></footer></>
}