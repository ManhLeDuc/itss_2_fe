function Checkout() {
    return (
        <div>
            <div className="container mt-4">
                <form className="needs-validation" name="frmthanhtoan" method="post" action="#">
                    <input type="hidden" name="kh_tendangnhap" value="dnpcuong" />

                    <div className="py-5 text-center">

                        <h2>Thanh toán</h2>
                        <p className="lead">Vui lòng kiểm tra thông tin Khách hàng, thông tin Giỏ hàng trước khi Đặt hàng.</p>
                    </div>

                    <div className="row">
                        <div className="col-md-4 order-md-2 mb-4">
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-muted">Giỏ hàng</span>
                                <span className="badge badge-secondary badge-pill">2</span>
                            </h4>
                            <ul className="list-group mb-3">
                                <input type="hidden" name="sanphamgiohang[1][gia]" value="389.000" />
                                <input type="hidden" name="sanphamgiohang[1][soluong]" value="1" />

                                <li className="list-group-item d-flex justify-content-between lh-condensed">
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
                                </li>
                                <li className="list-group-item d-flex justify-content-between">
                                    <span>Tổng thành tiền</span>
                                    <strong>888.000</strong>
                                </li>
                            </ul>


                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Mã khuyến mãi" />
                                <div className="input-group-append">
                                    <button type="submit" className="btn btn-secondary">Xác nhận</button>
                                </div>
                            </div>

                        </div>
                        <div className="col-md-8 order-md-1">
                            <h4 className="mb-3">Thông tin khách hàng</h4>

                            <div className="row">
                                <div className="col-md-12">
                                    <label for="kh_name">Họ tên</label>
                                    <input type="text" className="form-control" name="kh_name" id="kh_name" value="Bùi Anh Tú" />
                                </div>
                                <div className="col-md-12">
                                    <label for="kh_address">Địa chỉ</label>
                                    <input type="text" className="form-control" name="kh_address" id="kh_address"
                                        value="Hai Bà Trưng, Hà Nội" />
                                </div>
                                <div className="col-md-12">
                                    <label for="kh_phonenumber">Điện thoại</label>
                                    <input type="text" className="form-control" name="kh_phonenumber" id="kh_phonenumber"
                                        value="0123456789" />
                                </div>
                                <div className="col-md-12">
                                    <label for="kh_email">Email</label>
                                    <input type="text" className="form-control" name="kh_email" id="kh_email"
                                        value="bat@gmail.com" />
                                </div>
                            </div>

                            <h4 className="mb-3">Hình thức thanh toán</h4>

                            <div className="d-block my-3">
                                <div className="custom-control custom-radio">
                                    <input id="httt-1" name="httt_ma" type="radio" className="custom-control-input" required="" value="1" />
                                    <span className="custom-control-label" for="httt-1">Tiền mặt</span>
                                </div>
                                <div className="custom-control custom-radio">
                                    <input id="httt-2" name="httt_ma" type="radio" className="custom-control-input" required="" value="2" />
                                    <span className="custom-control-label" for="httt-2">Chuyển khoản</span>
                                </div>
                                <div className="custom-control custom-radio">
                                    <input id="httt-3" name="httt_ma" type="radio" className="custom-control-input" required="" value="3" />
                                    <span className="custom-control-label" for="httt-3">Ship COD</span>
                                </div>
                            </div>
                            <hr className="mb-4" />
                            <button className="btn btn-primary btn-lg btn-block" type="submit" name="btn-DatHang">Đặt hàng</button>
                        </div>
                    </div>
                </form>

            </div>
        </div>

    )
}

export default Checkout;