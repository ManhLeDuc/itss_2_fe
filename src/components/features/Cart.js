import React from "react";
import './Cart.css';

function Cart () {
  return (
    <div>
        <div class="modal-body">
                        <div class="cart-row">
                            <span class="cart-item cart-header cart-column">Sản Phẩm</span>
                            <span class="cart-price cart-header cart-column">Giá</span>
                            <span class="cart-quantity cart-header cart-column">Số Lượng</span>
                        </div>
                        <div class="cart-items">
                            <div class="cart-row">
                            <div class="cart-item cart-column">
                                <img class="cart-item-image" src="https://mcdn2.coolmate.me/uploads/November2021/BT5A8038-Edit-copy_copy.jpg" width="100" height="100"></img>
                                <span class="cart-item-title">Áo Hoodie nam có mũ trùm Classic </span>
                            </div>
                            <span class="cart-price cart-column">250000đ</span>
                            <div class="cart-quantity cart-column">
                                <input class="cart-quantity-input" type="number" value="1"></input>
                                <button class="btn btn-danger" type="button">Xóa</button>
                            </div>
                        </div>
                        <div class="cart-row">
                            <div class="cart-item cart-column">
                                <img class="cart-item-image" src="https://mcdn2.coolmate.me/uploads/November2021/uBT5A8285-(1)_46.jpg" width="100" height="100"></img>
                                <span class="cart-item-title">Quần Jeans Basic Slim </span>
                            </div>
                            <span class="cart-price cart-column">250000đ</span>
                            <div class="cart-quantity cart-column">
                                <input class="cart-quantity-input" type="number" value="2"></input>
                                <button class="btn btn-danger" type="button">Xóa</button>
                            </div>
                        </div>
                        <div class="cart-total">
                            <strong class="cart-total-title">Tổng Cộng:</strong>
                            <span class="cart-total-price">750000VNĐ</span>
                        </div>
                    </div>
                               
                    </div>
    </div>
  )
}


export default Cart;