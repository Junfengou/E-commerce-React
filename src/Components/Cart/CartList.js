import React from 'react'
import { detailProduct } from '../../data';
import CartItem from "./CartItem"

export default function CartList({value}) {
   
    const {cart} = value
    console.log("cart item:", value, cart);
    

    return (
        <div className="container-fluid">
            { cart.map(item => {
                return <CartItem  key={item.id} item={item} value={value} />
                
            })}
            
        </div>
    )
}
