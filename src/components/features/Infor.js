import React from "react";
import './Infor.css';
import { authenticationService } from '../../services/authentication.service';
import { authHeader } from '../../helpers/auth-header';

class Infor extends React.Component {
  state = {
    guestName: '',
    sex: '',
    age: '',
    height: '',
    weight: '',
    id: ''
  };

  componentWillMount() {
    if (authenticationService.currentUserValue) {
      fetch(`https://rocky-gorge-10796.herokuapp.com/api/details`, {
        headers: authHeader(),

      })
        .then((res) => { return res.json(); })
        .then((data) => {
          if (data.success) {
            var temp_sex = ""
            if(data.success.sex === 1){
              temp_sex = "男性"
            }
            else if(data.success.sex === 0){
              temp_sex = "女性"
            }
            this.setState({
              guestName: data.success.name,
              sex: temp_sex,
              age: data.success.age || "",
              height: data.success.height || "",
              weight: data.success.weight || "",
              id: data.success.id
            });
          }
          else {
            authenticationService.logout();
            window.location.href = "/"
          }

          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const sex = target.sex;
    const age = target.age;
    const height = target.height;
    const weight = target.weight;

    this.setState({
      [name]: value,
      [sex]: value,
      [age]: value,
      [height]: value,
      [weight]: value
    }
    );
  };

  handleSubmit = (event) => {
    event.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Authorization", authHeader().Authorization);
    myHeaders.append("Accept", "application/json");

    var formdata = new FormData();
    formdata.append("age", this.state.age.toString());
    formdata.append("name", this.state.guestName);
    formdata.append("sex", this.state.sex === "男性" ? "1" : "0");
    formdata.append("weight", this.state.weight.toString());
    formdata.append("height", this.state.height.toString());

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch(`https://rocky-gorge-10796.herokuapp.com/api/updateUser/${this.state.id}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          window.alert("Update Profile Successfully!");
        }
        else {
          window.alert("Failed to Update Profile");
          window.location.reload();
        }

      })
      .catch(error => {
        window.alert("Failed to Update Profile");
        window.location.reload();
      });
  };

  render() {
    return (
      <div className="container">
        <h1>ユーザー情報</h1>
        <form onSubmit={this.handleSubmit}>


          <label>
            <div className="col-40 ip-title">名前: </div>
            <input className="col-60 ip-box"
              name="guestName"
              type="text"
              value={this.state.guestName}
              onChange={this.handleInputChange} />
          </label>
          <br />

          <label>
            <div className="col-40 ip-title">性別: </div>
            <select className="col-60 ip-box"
              name="sex"
              value={this.state.sex}
              onChange={this.handleInputChange}
            >
              <option disabled selected value=""></option>
              <option value="男性">男性</option>
              <option value="女性">女性</option>
            </select>
          </label>
          <br />

          <label>
            <div className="col-40 ip-title">年齢: </div>
            <input className="col-60 ip-box"
              name="age"
              type="number"
              value={this.state.age}
              onChange={this.handleInputChange} />
          </label>
          <br />

          <label>
            <div className="col-40 ip-title">身長(cm): </div>
            <input className="col-60 ip-box"
              name="height"
              type="number"
              value={this.state.height}
              onChange={this.handleInputChange} />
          </label>
          <br />

          <label>
            <div className="col-40 ip-title"> 重量(kg): </div>
            <input className="col-60 ip-box"
              name="weight"
              type="number"
              value={this.state.weight}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  };
};

// ReactDOM.render(
//   <ActionButton />,
//   document.getElementById('root')
// );

// function Infor () {
//   return (
//     <div>abc</div>
//   )
// }

export default Infor;
