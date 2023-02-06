import React from "react";
import "../App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Link,
} from "react-router-dom";

import Home from "../pages/Home";
import Stocks from "../pages/Stocks";
import Quote from "../pages/Quote";
import History from "../pages/History";
import Error from "../pages/Error";

import "bootstrap/dist/css/bootstrap.min.css";

import "./style.css";

export default function Navbar() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to={"/"} className="title">
            <h4>Stock Market Portal</h4>
          </Link>
          <ul className="main-nav">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/stocks">Stocks</NavLink>
            </li>
            <li>
              <NavLink to="/quote">Quote</NavLink>
            </li>
            <li>
              <NavLink to="/history">History</NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stocks" element={<Stocks />} />
        <Route path="/quote" element={<Quote />}>
          <Route path="symbol=:symbol/" element={<Quote />} />
        </Route>
        <Route path="/history" element={<History />}>
          <Route path="symbol=:symbol/" element={<History />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}
