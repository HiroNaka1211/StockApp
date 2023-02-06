import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "../images/home-picture.jpg";

import "../component/style.css";

export default function Home() {
  return (
    <div className="container">
      <div className="centrePosition">
        <img src={Image}></img>
      </div>
      <p>
        <b>Welcome to the Stock Market Portal.</b>
        <br />
        You can click on <b>STOCKS</b> to see the information of all the
        available comanies or <b>QUOTE</b> to view the latest price infromation,
        or you can choose <b>HISTORY</b> to view stock price in the latest 100
        days of information.
      </p>
    </div>
  );
}
