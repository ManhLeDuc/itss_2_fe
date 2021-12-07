import React from "react";
import './Cart.css';

function Cart() {
    return (
        <div>
            <div className="modal-body">
                <div className="cart-row">
                    <span className="cart-item cart-header cart-column">Product</span>
                    <span className="cart-price cart-header cart-column">Price</span>
                    <span className="cart-quantity cart-header cart-column">Quantity</span>
                </div>
                <div className="cart-items">
                    <div className="cart-row">
                        <div className="cart-item cart-column">
                            <img alt="error" className="cart-item-image" src="https://mcdn2.coolmate.me/uploads/November2021/BT5A8038-Edit-copy_copy.jpg" width="100" height="100"></img>
                            <span className="cart-item-title">Áo Hoodie nam có mũ trùm Classic </span>
                        </div>
                        <span className="cart-price cart-column">250000đ</span>
                        <div className="cart-quantity cart-column">
                            <input className="cart-quantity-input" type="number" value="1"></input>
                            <button className="btn btn-danger" type="button">Delete</button>
                        </div>
                    </div>
                    <div className="cart-row">
                        <div className="cart-item cart-column">
                            <img alt="error" className="cart-item-image" src="https://mcdn2.coolmate.me/uploads/November2021/uBT5A8285-(1)_46.jpg" width="100" height="100"></img>
                            <span className="cart-item-title">Quần Jeans Basic Slim </span>
                        </div>
                        <span className="cart-price cart-column">250000đ</span>
                        <div className="cart-quantity cart-column">
                            <input className="cart-quantity-input" type="number" value="2"></input>
                            <button className="btn btn-danger" type="button">Delete</button>
                        </div>
                    </div>
                    <div className="cart-total">
                        <strong className="cart-total-title">Total:</strong>
                        <span className="cart-total-price">750000VNĐ</span>
                    </div>
                </div>

            </div>
        </div>
    )
}


export default Cart;
