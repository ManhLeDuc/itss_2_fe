import React, { useState, useEffect } from 'react';
import './Cart.css';
import CartItem from './CartItem'

function Cart() {
    const [products, setProducts] = useState([])

    const sumProductsPrice = () => {
        let sum = 0;
        products.forEach((ele) => {
            sum += ele.price * ele.quantity;
        })
        return sum;
    }

    useEffect(() => {
        const storedProducts = localStorage.getItem('carts') || []
        setProducts(JSON.parse(storedProducts))
    }, [])

    const handleDelete = (index) => {
        let alo = localStorage.getItem('carts');
        let storedProducts;
        if (alo) {
            storedProducts = JSON.parse(alo);
        } else {
            return
        }
        storedProducts.splice(index, 1);
        setProducts(storedProducts);
        localStorage.setItem('carts', JSON.stringify(storedProducts));
    }

    return (
        <div>
            <div className="modal-body">
                <div className="cart-row">
                    <span className="cart-item cart-header cart-column">Product</span>
                    <span className="cart-price cart-header cart-column">Price</span>
                    <span className="cart-quantity cart-header cart-column">Quantity</span>
                </div>
                <div className="cart-items">
                    {products.map((product, index) => (
                        <CartItem product={product} handleDelete={() => { handleDelete(index) }}></CartItem>
                    ))}
                    <div className="cart-total">
                        <strong className="cart-total-title">Total:</strong>
                        <span className="cart-total-price">{`${sumProductsPrice()}¥`}</span>
                    </div>
                </div>

            </div>
        </div>
    )
}


export default Cart;
