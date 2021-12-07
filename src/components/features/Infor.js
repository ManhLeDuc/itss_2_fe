import React from "react";
import './Infor.css';

class Infor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guestName: 'Nguyen Van A',
      sex: 'Nam',
      age: '20',
      height: '1.8',
      weight: '50'
    };
  };

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
    alert('Name: '
      + this.state.guestName + ', Sex: '
      + this.state.sex + ' , Age: '
      + this.state.age + ' , Height: '
      + this.state.height + ', Weight '
      + this.state.weight 
    );
    event.preventDefault();
  };

  render() {
    return (
      <div className = "container">
      <h1>User's Information</h1>
      <form onSubmit={this.handleSubmit}>
       

        <label>
        <div className = "col-40 ip-title">Name: </div>
          <input className = "col-60 ip-box"
            name="guestName"
            type="text"
            value={this.state.guestName}
            onChange={this.handleInputChange} />
        </label>
        <br />

        <label>
        <div className = "col-40 ip-title">Sex: </div>
          <select className = "col-60 ip-box"
            name="sex"
            value={this.state.sex}
            onChange={this.handleInputChange}
          >
            <option value="nam">Nam</option>
            <option value="nu">Nu</option>
          </select>
        </label>
        <br />

        <label>
        <div className = "col-40 ip-title">Age: </div>
          <input className = "col-60 ip-box"
            name="age"
            type="text"
            value={this.state.age}
            onChange={this.handleInputChange} />
        </label>
        <br />

        <label>
          <div className = "col-40 ip-title">Height(m): </div>
          <input className = "col-60 ip-box"
            name="height"
            type="text"
            value={this.state.height}
            onChange={this.handleInputChange} />
        </label>
        <br />

        <label>
         <div className = "col-40 ip-title"> Weight(kg): </div>
          <input className = "col-60 ip-box"
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