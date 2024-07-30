import React from "react";
import { Link, useNavigate } from "react-router-dom";
import myImage from "../assets/CouponLogo.png"; 
import AsyncSelect from "react-select/async";

export const NavBar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user'); // הסרת המשתמש מהאחסון המקומי
    navigate('/login'); // הפנייה לדף הבית
  };

  return (
    <div className="navbar-container">
      <img
        src={myImage}
        alt="Description of the image"
        className="navbar-image"
      />

      <div className="navbar">
        <Link className="active" to="/">
          {" "}
          Home <i className="fa fa-fw fa-home"></i>
        </Link>
        {!user ? (
          <Link to="/login">
            Login <i className="fa fa-fw fa-user"></i>{" "}
          </Link>
        ) : (
          <>
            {user.admin && (
              <Link to="/admin">
                Admin <i className="fa fa-solid fa-lock"></i>{" "}
              </Link>
            )}
            <div className="dropdown">
              <button className="dropbtn">
                Category <i className="fa fa-solid fa-list"></i>
                <i className="fa fa-caret-down"></i>
              </button>
              <div className="dropdown-content">
                <Link to="/Fashion">Fashion</Link>
                <Link to="/Beauty">Beauty</Link>
                <Link to="/Home">Home</Link>
                <Link to="/Food">Food</Link>
              </div>
            </div>
            <div className="navbar-right">
              <div className="user-actions">
                <Link to="/" className="logout-button" onClick={handleLogout}>
                  Logout <i className="fa fa-fw fa-sign-out"></i>
                </Link>
                <div className="user-info">Welcome, {user.firstname}</div> 
                <span className="spacer"></span> 
                
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
