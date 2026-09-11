import React from 'react'
import { useCart } from '../CartContext/CartContext';
import "./Cart.css";
import { useNavigate } from 'react-router-dom';
import lyra from "../../assets/principal/5.jpg"

const Cart = () => {
    const navigate = useNavigate();

    const handleCheckout = () =>{
        navigate("/checkout");
    };

    const {cart, updateQuantity, deleteProduct} = useCart();
    
    const subTotal = cart.reduce((acc, product) => {
        return acc + product.price * product.quantity;
    }, 0);
    const shippingCost = subTotal === 0 ? 0 : subTotal >= 1000 ? 0 : 150;
    const totalPrice = subTotal + shippingCost;
    
    
    const handleAddQuantity = (productId) => {
        updateQuantity(productId, 1)
    }

    const handleTossQuantity = (productId)=> {
        const product = cart.find((item) => item.id === productId)
        if(product.quantity > 1){
            updateQuantity(productId, -1)
        }
    }

  return (
    <div className="cart-container">
        <h2>TU<span> CARRITO</span></h2>
        {cart.length === 0 ? (
            <>
            <div className='uknown'>
            <p>¿Vas a comprar algo o solo estas viendo?</p>
            <br />
            <img src={lyra} className='lyra'/>
            </div>
            </>
        ):(
            <>
            <div className="cart-header">
                <p>Producto</p>
                <p>Precio</p>
                <p>Cantidad</p>
                <p>Total</p>
                <p>Acción</p>
            </div>
            <ul className="cart-items">
                {
                    cart.map((item) =>{
                        const totalBook = item.price * item.quantity 
                        return(
                            <li className="cart-item" key={item.id}>
                                <div className="product-info">
                                    <img src={item.image} alt="" className='product-images'/>
                                    <span>{item.name}</span>
                                </div>
                                <p>${Number(item.price).toFixed(2)}</p>

                                <div className="quantity-controls">
                                    <button className="quantity-btn" onClick={() => handleTossQuantity(item.id)}>
                                        -
                                    </button>
                                    <input type= "number" className="quantity-input" readOnly value={item.quantity}/>
                                    <button className="quantity-btn" onClick={() => handleAddQuantity(item.id)}>
                                        +
                                    </button>
                                </div>
                                <p>${totalBook.toFixed(2)}</p>
                                <button className="delete-btn" onClick={() => deleteProduct(item.id)}>
                                    <i className="fas fa-trash"></i>
                                </button>
                            </li>
                        )
                    })
                    
                }
            </ul>
            </>
        )}

        <div className="cart-summary">
            <h2>TU<span> CARRITO</span></h2>
            <p>Total Parcial: <span>${subTotal.toFixed(2)}</span></p>
            <p>Tarifa de envío: <span>${shippingCost.toFixed(2)}</span></p>
            <p className='total'>Total: <span>${totalPrice.toFixed(2)}</span></p>
            <button className="checkout-btn" onClick={handleCheckout}>PASAR A PAGAR Bv</button>
        </div>

    </div>
  )
}

export default Cart