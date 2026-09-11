import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./components/login"
import Home from "./components/pages/Home"
import Comic from "./components/pages/Comic"
import Manga from "./components/pages/Manga"
import Navbar from "./components/navbar/Navbar"
import Cart from "./components/Cart/Cart"
import Checkout from "./components/Checkout/Checkout"
import DetailsComic from "./components/Detailsproduct/DetailsComic"
import DetailsManga from "./components/Detailsproduct/DetailsManga"
import Search from "./components/Search/search"
import Footer from "./components/footer/Footer"
import Procesing from "./components/Checkout/Process"
import { SearchProvider } from "./components/SearchContext/SearchContext"
import { CartProvider } from "./components/CartContext/CartContext"
import { useState } from "react"
import { AuthProvider } from "./components/AuthContext/AuthContext"

import appFirebase from './credentials'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
const auth = getAuth(appFirebase)

function App() {
 
  const [user, setUser] = useState(null) 

  onAuthStateChanged(auth, (userFirebase)=>{
    if(userFirebase){
      setUser(userFirebase)
    }
    else {
      setUser(null)
    }})

  return (
    <>
      <SearchProvider>
      <AuthProvider>
      <CartProvider>
      <Router>
      <Navbar/>
      <Routes>
        <Route path="/login" element ={<Login/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/comics" element ={<Comic/>}/>
        <Route path="/mangas" element ={<Manga/>}/>
        <Route path="/comics/:id" element ={<DetailsComic/>}/>
        <Route path="/mangas/:id" element ={<DetailsManga/>}/>
        <Route path="/cart" element ={<Cart/>}/>
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/search" element ={<Search/>}/>
        <Route path="/procesando" element={<Procesing />} />
      </Routes>
      <Footer/>
      </Router>
      </CartProvider>
      </AuthProvider>
      </SearchProvider>
    </>
  )
}

export default App
