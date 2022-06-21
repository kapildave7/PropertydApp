import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

const test = (event) => {
  console.log(event);
};
const Header = () => {
  const [activeClass, setActiveclass] = useState("active");
  return (
    <div className="ui secondary pointing menu header-menu">
      <Link to="/" className={`${activeClass} item`} onClick={test}>
        PropertyDapp
      </Link>
      <Link to="/properties/invest" className=" item" onClick={test}>
        Invest
      </Link>
      <Link to="/properties/listing/" className=" item">
        Listing
      </Link>

      <div className="right menu">
        <Link to="/properties/profile/" className=" item">
          Profile
        </Link>
        <Link to="/properties/listing/" className=" item">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Header;
