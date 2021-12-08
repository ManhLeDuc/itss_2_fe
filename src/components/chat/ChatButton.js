import React from "react";
import chatLogo from "./1738750.png"

class ChatButton extends React.Component {

  render() {
    return (
      <div>
        <img src={chatLogo} style={{
          color: "red", position: "fixed",
          bottom: 0,
          right: 0,
          width: "90px",
          padding: "10px",
          paddingRight: "30px",
        }} alt="fireSpot" onClick={()=>{window.open("https://www.messenger.com/t/www.hacom.vn")}}/>
      </div>
    );
  }
}

export default ChatButton
