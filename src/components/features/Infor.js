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
            this.setState({
              guestName: data.success.name,
              sex: data.success.sex === 0 ? "male" : "female",
              age: data.success.age,
              height: data.success.height,
              weight: data.success.weight,
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
    formdata.append("sex", this.state.sex === "male" ? "0" :"1");
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
        window.alert("Update Profile Successfully!");
      })
      .catch(error => {
        window.alert("Failed to Update Profile");
        window.location.reload();
      });
  };

  render() {
    return (
      <div className="container">
        <h1>User's Information</h1>
        <form onSubmit={this.handleSubmit}>


          <label>
            <div className="col-40 ip-title">Name: </div>
            <input className="col-60 ip-box"
              name="guestName"
              type="text"
              value={this.state.guestName}
              onChange={this.handleInputChange} />
          </label>
          <br />

          <label>
            <div className="col-40 ip-title">Sex: </div>
            <select className="col-60 ip-box"
              name="sex"
              value={this.state.sex}
              onChange={this.handleInputChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
          <br />

          <label>
            <div className="col-40 ip-title">Age: </div>
            <input className="col-60 ip-box"
              name="age"
              type="text"
              value={this.state.age}
              onChange={this.handleInputChange} />
          </label>
          <br />

          <label>
            <div className="col-40 ip-title">Height(cm): </div>
            <input className="col-60 ip-box"
              name="height"
              type="text"
              value={this.state.height}
              onChange={this.handleInputChange} />
          </label>
          <br />

          <label>
            <div className="col-40 ip-title"> Weight(kg): </div>
            <input className="col-60 ip-box"
              name="weight"
              type="text"
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
