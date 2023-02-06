import React from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

import "../component/style.css";

export default function NotFound() {
  const server = "http://localhost:3000/";
  const location = useLocation();
  const url = server + location["pathname"];
  return (
    <div className="whole">
      <div className="centrePosition">
        <h1>404</h1>
        <h2>Page not found</h2>
        <p>The page you're looking for ( URL {url} ) doesn't exist</p>
        <div>
          <Link to={"/"}>
            <Button color="primary" outline>
              Go back Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
