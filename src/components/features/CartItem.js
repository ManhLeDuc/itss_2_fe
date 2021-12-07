import React from 'react';
import './Cart.css';

const cartItem = (props) => {
  return (
    <div className="cart-row">
      <div className="cart-item cart-column">
        <img alt="error" className="cart-item-image" src={props.product.image_url} width="100" height="100"></img>
        <span className="cart-item-title">{props.product.name}</span>
      </div>
      <span className="cart-price cart-column">{`${props.product.price}¥`}</span>
      <div className="cart-quantity cart-column">
        <input className="cart-quantity-input" type="number" value={props.product.quantity}></input>
        <button className="btn btn-danger" type="button" onClick={props.handleDelete}>Delete</button>
      </div>
    </div>
  )
}

export default cartItem;
