import React from 'react';
import './Manage.css';

function Manage () {
    return (
        <div className="content">
            <h1 className="title">Quan ly san pham</h1>
            <div className="clothes_list">
                <div className="clothes">
                    <img className="clothes_img " src='https://mcdn2-coolmate.cdn.vccloud.vn/uploads/December2021/hoddie24.jpg'></img>
                    <div className="clothes_name " >Áo Hoodie nam</div>
                    <button className="clothes_btn btn btn-danger " type="button" >Delete</button>
                </div>
                <div className="clothes">
                    <img className="clothes_img " src='https://mcdn2-coolmate.cdn.vccloud.vn/uploads/December2021/hoddie24.jpg'></img>
                    <div className="clothes_name " >Áo Hoodie nam</div>
                    <button className="clothes_btn btn btn-danger " type="button" >Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Manage;