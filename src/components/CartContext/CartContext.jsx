import React, { children, createContext, useContext, useState } from 'react'

const CartContext = createContext();


export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([])

    const addToCart = (product) => {
        setCart ((lastCart) => {
            const existingProduct = lastCart.findIndex(
                (article) => article.id === product.id
            );
            if(existingProduct >= 0){
                const updatedCart = [...lastCart];
                updatedCart[existingProduct] = {
                ...updatedCart[existingProduct],
                quantity: updatedCart[existingProduct].quantity + 1
            };
                return updatedCart
            }   else{
                    return [...lastCart, {...product, quantity: 1}]
            }
        });
    };

    const updateQuantity = (productId, quantity) => {
        setCart((lastCart) =>
            lastCart.map((product)=>
                product.id === productId
        ?{...product, quantity:product.quantity + quantity}
        : product
            )
        )
    }

    const deleteProduct = (productId) => {
        setCart((lastCart) =>
        lastCart.filter((product) => 
            product.id !== productId
    ))}

  return (
    <CartContext.Provider value={{cart, addToCart, updateQuantity, deleteProduct}}>
        {children}

    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext);