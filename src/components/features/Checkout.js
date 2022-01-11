import React, { useState, useEffect } from 'react';
import { authenticationService } from '../../services/authentication.service';
import { authHeader } from '../../helpers/auth-header';

function Checkout() {

    const [products, setProducts] = useState({})
    const [userInfo, setUserInfo] = useState({})

    const handleSubmit = (event) => {
        event.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Authorization", authHeader().Authorization);
        myHeaders.append("Accept", "application/json");

        var formdata = new FormData();
        var tempArr = []
        var stringData = "";

        Object.keys(products).forEach((ele) => {
            tempArr.push({ id: products[ele].id, size_id: products[ele].size_id, quantity: products[ele].quantity });
        })

        stringData = JSON.stringify({ items: tempArr });

        formdata.append("json_items", stringData);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(`https://rocky-gorge-10796.herokuapp.com/api/doOrder`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    localStorage.removeItem("carts");
                    window.alert("Order Successfully!");
                    window.location.href = '/';
                }
                else {
                    window.alert("Failed to Order");
                    window.location.reload();
                }

            })
            .catch(error => {
                window.alert("Failed to Order");
                window.location.reload();
            });
    };

    useEffect(() => {
        if (authenticationService.currentUserValue) {
            fetch(`https://rocky-gorge-10796.herokuapp.com/api/details`, {
                headers: authHeader(),

            })
                .then((res) => { return res.json(); })
                .then((data) => {
                    if (data.success) {
                        setUserInfo({ name: data.success.name, email: data.success.email, address: data.success.address })
                    }
                    else {
                        authenticationService.logout();
                        window.location.href = '/';
                    }

                })
                .catch((error) => {
                    authenticationService.logout();
                    window.location.href = '/';
                });
        }
        const storedProducts = localStorage.getItem('carts') || JSON.stringify({})
        setProducts(JSON.parse(storedProducts))
    }, [])

    const sumProductsPrice = () => {
        let sum = 0;
        Object.keys(products).forEach((ele) => {
            sum += products[ele].price * products[ele].quantity;
        })
        return sum;
    }

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div>
            <div className="container mt-4">
                <form className="needs-validation" name="frmthanhtoan" onSubmit={handleSubmit}>
                    <input type="hidden" name="kh_tendangnhap" value="dnpcuong" />

                    <div className="py-5 text-center">

                        <h2>支払い</h2>
                        <p className="lead">すべて確認してください</p>
                    </div>

                    <div className="row">
                        <div className="col-md-4 order-md-2 mb-4">
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-muted">ショッピングカート</span>
                                <span className="badge badge-secondary badge-pill">2</span>
                            </h4>
                            <ul className="list-group mb-3">
                                <input type="hidden" name="sanphamgiohang[1][gia]" value="389.000" />
                                <input type="hidden" name="sanphamgiohang[1][soluong]" value="1" />

                                {/* <li className="list-group-item d-flex justify-content-between lh-condensed">
                                    <div>
                                        <h6 className="my-0">Áo Hoodie nam</h6>
                                        <small className="text-muted">389.000 x 1</small>
                                    </div>
                                    <span className="text-muted">389.000</span>
                                </li>
                                <input type="hidden" name="sanphamgiohang[2][gia]" value="499.000" />
                                <input type="hidden" name="sanphamgiohang[2][soluong]" value="1" />

                                <li className="list-group-item d-flex justify-content-between lh-condensed">
                                    <div>
                                        <h6 className="my-0">Quần Jeans</h6>
                                        <small className="text-muted">499.000 x 1</small>
                                    </div>
                                    <span className="text-muted">499.000</span>
                                </li> */}
                                <li className="list-group-item d-flex justify-content-between">
                                    <span>合計</span>
                                    <strong>{`${numberWithCommas(sumProductsPrice())}円`}</strong>
                                </li>
                            </ul>


                            {/* <div className="input-group">
                                <input type="text" className="form-control" placeholder="Mã khuyến mãi" />
                                <div className="input-group-append">
                                    <button type="submit" className="btn btn-secondary">Xác nhận</button>
                                </div>
                            </div> */}

                        </div>
                        <div className="col-md-8 order-md-1">
                            <h4 className="mb-3">クライアント情報</h4>

                            <div className="row">
                                <div className="col-md-12">
                                    <label for="kh_name">名前</label>
                                    <input type="text" className="form-control" name="kh_name" id="kh_name" value={userInfo.name} />
                                </div>
                                <div className="col-md-12">
                                    <label for="kh_address">住所</label>
                                    <input type="text" className="form-control" name="kh_address" id="kh_address"
                                        value={userInfo.address} />
                                </div>
                                {/* <div className="col-md-12">
                                    <label for="kh_phonenumber">Điện thoại</label>
                                    <input type="text" className="form-control" name="kh_phonenumber" id="kh_phonenumber"
                                        value="0123456789" />
                                </div> */}
                                <div className="col-md-12">
                                    <label for="kh_email">メール</label>
                                    <input type="text" className="form-control" name="kh_email" id="kh_email"
                                        value={userInfo.email} />
                                </div>
                            </div>

                            <h4 className="mb-3">支払方法</h4>

                            <div className="d-block my-3">
                                <div className="custom-control custom-radio">
                                    <input id="httt-1" name="httt_ma" type="radio" className="custom-control-input" required="" value="1" />
                                    <span className="custom-control-label" for="httt-1">現金</span>
                                </div>
                                <div className="custom-control custom-radio">
                                    <input id="httt-2" name="httt_ma" type="radio" className="custom-control-input" required="" value="2" />
                                    <span className="custom-control-label" for="httt-2">Bitcoin</span>
                                </div>
                                <div className="custom-control custom-radio">
                                    <input id="httt-3" name="httt_ma" type="radio" className="custom-control-input" required="" value="3" />
                                    <span className="custom-control-label" for="httt-3">ETH</span>
                                </div>
                            </div>
                            <hr className="mb-4" />
                            <button className="btn btn-primary btn-lg btn-block" type="submit" name="btn-DatHang" >確認</button>
                        </div>
                    </div>
                </form>

            </div>
        </div>

    )
}

export default Checkout;
